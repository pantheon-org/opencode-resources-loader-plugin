/**
 * OpenCode Resource Loader Plugin
 *
 * Automatically discovers and loads resources from .opencode subdirectories:
 * - checklist/
 * - knowledge-base/
 * - task/
 * - template/
 *
 * Features:
 * - Discovers markdown files from project .opencode/ and global ~/.opencode/
 * - Registers dynamic tools with pattern \{type\}_\{resource_name\}
 * - Delivers resource content via silent message insertion (noReply pattern)
 * - Supports nested resources with proper naming
 *
 * Design Decisions:
 * - Message insertion pattern ensures resource content persists
 * - Base directory context enables relative path resolution
 * - Resources require restart to reload (acceptable trade-off)
 *
 * @see https://opencode.ai/docs/plugins/
 */

/* eslint-disable max-lines */
/* eslint-disable import/max-dependencies */

import type { Plugin, ToolDefinition } from '@opencode-ai/plugin';
import { tool } from '@opencode-ai/plugin';
import { join } from 'path';
import { z } from 'zod';
import os from 'os';
import { ResourceType } from './types';
import { discoverResources } from './discover-resources';
import { parseFrontmatter } from './parse';
import { cacheSearch, getCachedSearch } from './cache';
import { formatSearchResults } from './format-search-results';
import { searchResources } from './search-resources';
import { buildResourceIndex } from './build-resource-index';

export const ResourceLoaderPlugin: Plugin = async (ctx) => {
  // Resource types to discover
  const resourceTypes: ResourceType[] = [
    'agent',
    'checklist',
    'command',
    'knowledge-base',
    'task',
    'template',
  ];

  // Discovery order: lowest to highest priority (last wins on duplicate tool names)
  const resources = await discoverResources(
    [
      join(os.homedir(), '.opencode'), // Global home
      join(os.homedir(), '.config/opencode'), // Global config
      join(ctx.directory, '.opencode'), // Project-local (highest priority)
    ],
    resourceTypes,
  );

  console.log(`📚 Discovered ${resources.length} resources across ${resourceTypes.length} types`);

  // Build in-memory index for fast searching
  const index = buildResourceIndex(resources);

  // Create a tool for each resource
  const tools: Record<string, ToolDefinition> = {};

  // Size constants for context window management
  const MAX_SAFE_SIZE = 50_000; // characters
  const WARN_SIZE = 30_000;

  for (const resource of resources) {
    tools[resource.toolName] = tool({
      description: `[${resource.type}] ${resource.description}`,
      args: {}, // No args for MVP - can add section args later
      execute: async (args, toolCtx) => {
        // Check resource size
        if (resource.content.length > MAX_SAFE_SIZE) {
          return JSON.stringify({
            error: `Resource too large (${resource.content.length.toLocaleString()} chars)`,
            suggestion: 'Consider splitting resource or requesting specific sections',
            resourceName: resource.name,
            size: resource.content.length,
          });
        }

        if (resource.content.length > WARN_SIZE) {
          console.warn(
            `⚠️ Large resource loaded: ${resource.name} (${resource.content.length.toLocaleString()} chars)`,
          );
        }

        // Message insertion - silent prompt (no AI response)
        const sendSilentPrompt = (text: string) =>
          ctx.client.session.prompt({
            path: { id: toolCtx.sessionID },
            body: {
              noReply: true,
              parts: [{ type: 'text', text }],
            },
          });

        await sendSilentPrompt(`Loading ${resource.type}: ${resource.name}\n${resource.name}`);

        await sendSilentPrompt(`Base directory: ${resource.fullPath}\n\n${resource.content}`);

        // Return minimal confirmation
        return `Loaded ${resource.type}: ${resource.name}`;
      },
    });
  }

  // Add discovery tools
  tools.resource_list = tool({
    description: 'List all available resources, optionally filtered by type, category, or tags',
    args: {
      type: z
        .enum(['agent', 'checklist', 'command', 'knowledge-base', 'task', 'template', 'all'])
        .optional()
        .describe('Filter by resource type'),
      category: z
        .string()
        .optional()
        .describe("Filter by category (e.g., 'Documentation', 'Development')"),
      tag: z.string().optional().describe('Filter by tag'),
      limit: z.number().optional().default(50).describe('Maximum results to return'),
    },
    execute: async ({ type, category, tag, limit }) => {
      let filtered = index.all;

      // Apply type filter
      if (type && type !== 'all') {
        filtered = index.byType.get(type) || [];
      }

      // Apply category filter
      if (category) {
        const categoryResources = index.byCategory.get(category) || [];
        filtered = filtered.filter((r) => categoryResources.includes(r));
      }

      // Apply tag filter
      if (tag) {
        const tagResources = index.byTag.get(tag.toLowerCase()) || [];
        filtered = filtered.filter((r) => tagResources.includes(r));
      }

      // Limit results
      const results = filtered.slice(0, limit);

      // Format results
      const formatted = results.map((r) => {
        const { frontmatter } = parseFrontmatter(r.content);
        return {
          toolName: r.toolName,
          name: r.name,
          type: r.type,
          description: r.description,
          category: frontmatter?.category || 'Uncategorized',
          tags: frontmatter?.tags || [],
        };
      });

      return JSON.stringify({
        count: formatted.length,
        total: filtered.length,
        resources: formatted,
      });
    },
  });

  tools.resource_search = tool({
    description: 'Search resources by keyword in name, description, tags, or content',
    args: {
      query: z.string().describe('Search query (case-insensitive)'),
      type: z
        .enum(['agent', 'checklist', 'command', 'knowledge-base', 'task', 'template', 'all'])
        .optional()
        .describe('Filter by resource type'),
      max_results: z.number().optional().default(10).describe('Maximum results to return'),
    },
    execute: async ({ query, type, max_results }) => {
      // Input validation
      if (!query || query.trim().length === 0) {
        return JSON.stringify({
          error: 'Search query cannot be empty',
          suggestion: "Try: resource_search({ query: 'your topic' })",
        });
      }

      // Check cache
      const cacheKey = `${query}:${type || 'all'}:${max_results}`;
      const cached = getCachedSearch(cacheKey);
      if (cached) {
        return JSON.stringify(formatSearchResults(cached));
      }

      // Perform search
      const results = searchResources(
        index,
        query,
        type && type !== 'all' ? type : undefined,
        max_results,
      );

      // Cache results
      cacheSearch(cacheKey, results);

      // Handle no results
      if (results.length === 0) {
        const categories = Array.from(index.byCategory.keys());
        return JSON.stringify({
          results: [],
          message: `No resources found matching '${query}'`,
          suggestions: [
            'Try broader search terms',
            'Check spelling',
            "Use resource_list({ type: 'all' }) to see all available resources",
          ],
          availableCategories: categories,
        });
      }

      return JSON.stringify(formatSearchResults(results));
    },
  });

  tools.resource_info = tool({
    description:
      'Get detailed information about a specific resource including metadata and related resources',
    args: {
      tool_name: z.string().describe("Exact tool name (e.g., 'checklist_api_documentation')"),
    },
    execute: async ({ tool_name }) => {
      // Find resource
      const resource = resources.find((r) => r.toolName === tool_name);

      if (!resource) {
        const available = resources
          .map((r) => r.toolName)
          .slice(0, 10)
          .join(', ');
        return JSON.stringify({
          error: `Resource '${tool_name}' not found`,
          suggestion: `Available resources: ${available}`,
          hint: "Use resource_search({ query: 'topic' }) to find related resources",
        });
      }

      // Parse frontmatter
      const { frontmatter } = parseFrontmatter(resource.content);

      // Build response
      return JSON.stringify({
        toolName: resource.toolName,
        name: resource.name,
        type: resource.type,
        description: resource.description,
        path: resource.path,
        size: resource.content.length,
        metadata: {
          title: frontmatter?.title,
          category: frontmatter?.category,
          tags: frontmatter?.tags,
          version: frontmatter?.version,
          reference: frontmatter?.reference,
          difficulty: frontmatter?.difficulty,
          mode: frontmatter?.mode,
          temperature: frontmatter?.temperature,
          estimated_duration: frontmatter?.estimated_duration,
        },
        related_resources: frontmatter?.related_resources || [],
      });
    },
  });

  // Expose resource errors registry
  tools.resource_errors = tool({
    description: 'List resource validation errors (most recent first)',
    args: {},
    execute: async () => {
      const { listResourceErrors } = await import('./parse/resource-errors');
      return JSON.stringify(listResourceErrors());
    },
  });

  return { tool: tools };
};
