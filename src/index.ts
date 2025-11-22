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

import type { Plugin, ToolDefinition } from '@opencode-ai/plugin';
import { tool } from '@opencode-ai/plugin';
import { Glob } from 'bun';
import { join, dirname, basename, relative, sep } from 'path';
import { z } from 'zod';
import yaml from 'yaml';
import os from 'os';

// Types
interface Resource {
  name: string; // Generated from filename (e.g., "api-documentation")
  fullPath: string; // Full path to markdown file
  toolName: string; // Generated tool name (e.g., "checklist_api_documentation")
  description: string; // First paragraph or auto-generated description
  type: ResourceType; // checklist, knowledge-base, task, or template
  content: string; // Markdown content
  path: string; // Full path to file
}

type ResourceType = 'agent' | 'checklist' | 'command' | 'knowledge-base' | 'task' | 'template';

/**
 * Frontmatter metadata structure
 * Supports standard fields and type-specific extensions
 */
interface Frontmatter {
  title?: string;
  description?: string;
  type?: ResourceType;
  category?: string;
  version?: string;
  tags?: string[];
  // Type-specific fields
  reference?: string; // Checklist: URL or path to standards/RFCs
  applies_to?: string[]; // Checklist: Project types this applies to
  temperature?: number; // Task: LLM temperature setting
  mode?: string; // Task: Always "task" for task files
  estimated_duration?: string; // Task: Time estimate
  difficulty?: string; // Knowledge base: beginner | intermediate | advanced
  related_resources?: string[]; // Knowledge base: Related file paths
}

/**
 * Generate tool name from resource path and type
 * Examples:
 *   .opencode/checklist/api-documentation.md → checklist_api_documentation
 *   .opencode/knowledge-base/jenkins-patterns.md → knowledge_base_jenkins_patterns
 *   .opencode/task/deployment/prod-deploy.md → task_deployment_prod_deploy
 */
const generateToolName = (resourcePath: string, baseDir: string, type: ResourceType): string => {
  const rel = relative(baseDir, resourcePath);
  const dirPath = dirname(rel);
  const fileName = basename(resourcePath, '.md');

  // Get subdirectory structure after the type directory
  const pathParts = dirPath.split(sep);
  const typeIndex = pathParts.findIndex((p) => p === type);
  const subDirs = typeIndex !== -1 ? pathParts.slice(typeIndex + 1).filter((p) => p !== '.') : [];

  // Build tool name: type_subdir_filename
  const typePrefix = type.replace(/-/g, '_');
  const nameParts = [...subDirs, fileName].join('_').replace(/-/g, '_');

  return nameParts ? `${typePrefix}_${nameParts}` : typePrefix;
};

/**
 * Parse YAML frontmatter from markdown content
 * Returns frontmatter object and content body
 */
const parseFrontmatter = (
  content: string,
): {
  frontmatter: Frontmatter | null;
  body: string;
} => {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: null, body: content };
  }

  try {
    const frontmatter = yaml.parse(match[1]) as Frontmatter;
    return { frontmatter, body: match[2] };
  } catch (error) {
    console.warn(
      `Failed to parse frontmatter:`,
      error instanceof Error ? error.message : String(error),
    );
    return { frontmatter: null, body: content };
  }
};

/**
 * Extract description from markdown content
 * Prefers frontmatter description, falls back to first paragraph
 */
const extractDescription = (content: string, frontmatter: Frontmatter | null): string => {
  // Prefer frontmatter description
  if (frontmatter?.description) {
    return frontmatter.description;
  }

  // Remove any frontmatter
  const withoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, '');

  // Split into lines and find first meaningful paragraph
  const lines = withoutFrontmatter.split('\n');
  let description = '';

  for (const line of lines) {
    const trimmed = line.trim();
    // Skip empty lines and headings
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Found first paragraph
    description = trimmed;
    break;
  }

  // Truncate to reasonable length
  if (description.length > 150) {
    description = description.substring(0, 147) + '...';
  }

  return description || 'Documentation resource';
};

/**
 * Parse a markdown resource file and return structured resource data
 * Returns null if parsing fails (with error logging)
 */
const parseResource = async (
  resourcePath: string,
  baseDir: string,
  type: ResourceType,
): Promise<Resource | null> => {
  try {
    // Read file
    const content = await Bun.file(resourcePath).text();

    // Parse frontmatter
    const { frontmatter, body } = parseFrontmatter(content);

    // Generate name from filename (fallback if no frontmatter title)
    const fileName = basename(resourcePath, '.md');
    const name = frontmatter?.title || fileName.replace(/_/g, '-');

    // Extract description (prefers frontmatter)
    const description = extractDescription(content, frontmatter);

    // Generate tool name from path
    const toolName = generateToolName(resourcePath, baseDir, type);

    return {
      name,
      fullPath: dirname(resourcePath),
      toolName,
      description,
      type,
      content: content.trim(),
      path: resourcePath,
    };
  } catch (error) {
    console.error(
      `❌ Error parsing resource ${resourcePath}:`,
      error instanceof Error ? error.message : String(error),
    );
    return null;
  }
};

/**
 * Discover all markdown files in the specified resource directories
 */
// eslint-disable-next-line complexity
const discoverResources = async (
  basePaths: string[],
  types: ResourceType[],
): Promise<Resource[]> => {
  const resources: Resource[] = [];
  let foundPath = false;

  for (const basePath of basePaths) {
    for (const type of types) {
      const typePath = join(basePath, type);

      try {
        // Find all markdown files recursively in this type directory
        const glob = new Glob('**/*.md');

        for await (const match of glob.scan({
          cwd: typePath,
          absolute: true,
        })) {
          const resource = await parseResource(match, typePath, type);
          if (resource) {
            resources.push(resource);
          }
        }

        foundPath = true;
      } catch (error) {
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          (error as { code: string }).code === 'ENOENT'
        ) {
          // Directory does not exist, expected in some cases
        } else {
          console.warn(`Unexpected error while scanning resources in ${typePath}:`, error);
        }
      }
    }
  }

  if (!foundPath) {
    console.warn(
      `⚠️ Could not find any resource directories. Tried:`,
      ...basePaths.map((path) => `\n     ${path}`),
      `\n   This is normal if none of the directories exist yet.`,
    );
  }

  // Detect duplicate tool names
  const toolNames = new Set<string>();
  const duplicates: string[] = [];

  for (const resource of resources) {
    if (toolNames.has(resource.toolName)) {
      duplicates.push(resource.toolName);
    }
    toolNames.add(resource.toolName);
  }

  if (duplicates.length > 0) {
    console.warn(`⚠️  Duplicate tool names detected:`, duplicates);
  }

  return resources;
};

/**
 * In-memory resource index for fast search and filtering
 */
interface ResourceIndex {
  byType: Map<ResourceType, Resource[]>;
  byCategory: Map<string, Resource[]>;
  byTag: Map<string, Resource[]>;
  byNameToken: Map<string, Resource[]>;
  all: Resource[];
}

/**
 * Build in-memory index for efficient searching
 */
// eslint-disable-next-line complexity
const buildResourceIndex = (resources: Resource[]): ResourceIndex => {
  const index: ResourceIndex = {
    byType: new Map(),
    byCategory: new Map(),
    byTag: new Map(),
    byNameToken: new Map(),
    all: resources,
  };

  for (const resource of resources) {
    // Index by type
    if (!index.byType.has(resource.type)) {
      index.byType.set(resource.type, []);
    }
    index.byType.get(resource.type)!.push(resource);

    // Parse frontmatter for indexing
    const { frontmatter } = parseFrontmatter(resource.content);

    // Index by category
    if (frontmatter?.category) {
      if (!index.byCategory.has(frontmatter.category)) {
        index.byCategory.set(frontmatter.category, []);
      }
      index.byCategory.get(frontmatter.category)!.push(resource);
    }

    // Index by tags
    if (frontmatter?.tags) {
      for (const tag of frontmatter.tags) {
        const tagLower = tag.toLowerCase();
        if (!index.byTag.has(tagLower)) {
          index.byTag.set(tagLower, []);
        }
        index.byTag.get(tagLower)!.push(resource);
      }
    }

    // Index by name tokens for faster searches
    const nameTokens = resource.name.toLowerCase().split(/[-_\s]+/);
    for (const token of nameTokens) {
      if (token.length > 2) {
        if (!index.byNameToken.has(token)) {
          index.byNameToken.set(token, []);
        }
        index.byNameToken.get(token)!.push(resource);
      }
    }
  }

  return index;
};

interface SearchResult {
  resource: Resource;
  score: number;
  matchedFields: string[];
  snippet?: string;
}

/**
 * Tokenize search query into individual tokens
 */
const tokenizeQuery = (query: string): string[] => {
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter((token) => token.length > 2);
};

/**
 * Calculate relevance score for a resource against a query
 */
/**
 * Calculate name match score
 */
const calculateNameScore = (name: string, queryLower: string, matchedFields: string[]): number => {
  if (name.toLowerCase() === queryLower) {
    matchedFields.push('exact_name');
    return 20;
  } else if (name.toLowerCase().includes(queryLower)) {
    matchedFields.push('name');
    return 10;
  }
  return 0;
};

/**
 * Calculate tag match score
 */
const calculateTagScore = (
  frontmatter: Frontmatter | null,
  queryLower: string,
  matchedFields: string[],
): number => {
  if (!frontmatter?.tags) return 0;

  const exactTagMatch = frontmatter.tags.some((tag) => tag.toLowerCase() === queryLower);
  const partialTagMatch = frontmatter.tags.some((tag) => tag.toLowerCase().includes(queryLower));

  if (exactTagMatch) {
    matchedFields.push('exact_tag');
    return 15;
  } else if (partialTagMatch) {
    matchedFields.push('tag');
    return 7;
  }
  return 0;
};

/**
 * Extract content snippet around match
 */
const extractSnippet = (content: string, matchIndex: number, queryLength: number): string => {
  const start = Math.max(0, matchIndex - 100);
  const end = Math.min(content.length, matchIndex + queryLength + 100);
  return '...' + content.substring(start, end).trim() + '...';
};

/**
 * Calculate multi-token match boost
 */
const calculateMultiTokenScore = (
  resource: Resource,
  tokens: string[],
  matchedFields: string[],
): number => {
  if (tokens.length <= 1) return 0;

  const tokenMatchCount = tokens.filter(
    (token) =>
      resource.name.toLowerCase().includes(token) ||
      resource.description.toLowerCase().includes(token),
  ).length;

  if (tokenMatchCount > 1) {
    matchedFields.push('multi_token');
    return tokenMatchCount * 3;
  }
  return 0;
};

const calculateRelevanceScore = (
  resource: Resource,
  query: string,
  frontmatter: Frontmatter | null,
): SearchResult => {
  const queryLower = query.toLowerCase();
  const tokens = tokenizeQuery(query);
  let score = 0;
  const matchedFields: string[] = [];
  let snippet: string | undefined;

  // 1. Name matches
  score += calculateNameScore(resource.name, queryLower, matchedFields);

  // 2. Tool name match
  if (resource.toolName.toLowerCase().includes(queryLower)) {
    score += 8;
    matchedFields.push('tool_name');
  }

  // 3. Tags match
  score += calculateTagScore(frontmatter, queryLower, matchedFields);

  // 4. Category match
  if (frontmatter?.category?.toLowerCase().includes(queryLower)) {
    score += 6;
    matchedFields.push('category');
  }

  // 5. Description match
  if (resource.description.toLowerCase().includes(queryLower)) {
    score += 5;
    matchedFields.push('description');
  }

  // 6. Title match
  if (frontmatter?.title?.toLowerCase().includes(queryLower)) {
    score += 4;
    matchedFields.push('title');
  }

  // 7. Content match with snippet
  const matchIndex = resource.content.toLowerCase().indexOf(queryLower);
  if (matchIndex !== -1) {
    score += 2;
    matchedFields.push('content');
    snippet = extractSnippet(resource.content, matchIndex, query.length);
  }

  // 8. Multi-token boost
  score += calculateMultiTokenScore(resource, tokens, matchedFields);

  return { score, resource, matchedFields, snippet };
};

/**
 * Search resources with relevance scoring
 */
const searchResources = (
  index: ResourceIndex,
  query: string,
  type?: ResourceType,
  maxResults: number = 10,
): SearchResult[] => {
  // Input validation
  if (!query || query.trim().length === 0) {
    return [];
  }

  // Sanitize query
  const sanitizedQuery = query.replace(/[^\w\s-]/g, '').trim();
  if (sanitizedQuery.length === 0) {
    console.warn(`⚠️ Query sanitized to empty string: '${query}'`);
    return [];
  }

  // Handle long queries gracefully
  const effectiveQuery =
    sanitizedQuery.length > 100 ? sanitizedQuery.substring(0, 100) : sanitizedQuery;

  // Get resources to search
  const resourcesToSearch = type ? index.byType.get(type) || [] : index.all;

  // Calculate scores for all resources
  const results: SearchResult[] = [];
  for (const resource of resourcesToSearch) {
    const { frontmatter } = parseFrontmatter(resource.content);
    const result = calculateRelevanceScore(resource, effectiveQuery, frontmatter);

    if (result.score > 0) {
      results.push(result);
    }
  }

  // Sort by score (descending) and limit results
  return results.sort((a, b) => b.score - a.score).slice(0, maxResults);
};

/**
 * Search result cache with TTL
 */
interface CacheEntry {
  results: SearchResult[];
  timestamp: number;
}

const searchCache = new Map<string, CacheEntry>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Get cached search results if still valid
 */
const getCachedSearch = (key: string): SearchResult[] | null => {
  const entry = searchCache.get(key);
  if (!entry) return null;

  const now = Date.now();
  if (now - entry.timestamp > CACHE_TTL) {
    searchCache.delete(key);
    return null;
  }

  return entry.results;
};

/**
 * Cache search results
 */
const cacheSearch = (key: string, results: SearchResult[]): void => {
  searchCache.set(key, {
    results,
    timestamp: Date.now(),
  });
};

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

  return { tool: tools };
};

/**
 * Format search results for output
 */
const formatSearchResults = (results: SearchResult[]) => {
  return {
    count: results.length,
    results: results.map((r) => {
      const { frontmatter } = parseFrontmatter(r.resource.content);
      return {
        score: r.score,
        toolName: r.resource.toolName,
        name: r.resource.name,
        type: r.resource.type,
        description: r.resource.description,
        category: frontmatter?.category || 'Uncategorized',
        tags: frontmatter?.tags || [],
        matchedFields: r.matchedFields.join(', '),
        snippet: r.snippet,
      };
    }),
  };
};
