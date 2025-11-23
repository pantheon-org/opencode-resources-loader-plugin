import { calculateRelevanceScore } from './calculate/relevant-score';
import { parseFrontmatter } from './parse/frontmatter';
import { ResourceIndex, ResourceType, SearchResult } from './types';

/**
 * Search resources with relevance scoring
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
