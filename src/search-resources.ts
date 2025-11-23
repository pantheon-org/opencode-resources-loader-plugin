import { calculateRelevanceScore } from './calculate/relevant-score';
import { parseFrontmatter } from './parse/frontmatter';
import { ResourceIndex, ResourceType, SearchResult } from './types';

/**
 * Search resources with relevance scoring and filtering
 *
 * Performs a multi-field search across resource names, descriptions, tags, and content.
 * Uses intelligent relevance scoring with weighted matches and returns results sorted by score.
 *
 * @param index - Pre-built resource index for fast searching
 * @param query - Search query string (case-insensitive, sanitized automatically)
 * @param type - Optional resource type filter (agent, checklist, command, knowledge-base, task, template)
 * @param maxResults - Maximum number of results to return (default: 10)
 * @returns Array of search results sorted by relevance score (highest first)
 *
 * @example
 * // Search all resources
 * const results = searchResources(index, 'api documentation');
 *
 * @example
 * // Search within specific type
 * const checklists = searchResources(index, 'security', 'checklist', 5);
 *
 * @remarks
 * - Query is sanitized: special characters removed, trimmed
 * - Long queries (>100 chars) are truncated
 * - Empty/invalid queries return empty array
 * - Scoring: exact name (20), tags (15), description (5), content (2)
 */
export const searchResources = (
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
