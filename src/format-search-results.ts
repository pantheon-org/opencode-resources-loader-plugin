import { parseFrontmatter } from './parse';
import { SearchResult } from './types';

/**
 * Format search results for output
 */
export const formatSearchResults = (results: SearchResult[]) => {
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
