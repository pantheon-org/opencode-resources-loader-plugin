import { calculateMultiTokenScore } from './multi-token-score';
import { calculateNameScore } from './name-score';
import { calculateTagScore } from './tag-score';
import { extractSnippet } from '../extract/snippet';
import { tokenizeQuery } from '../tokenize-query';
import { Frontmatter, Resource, SearchResult } from '../types';

/**
 * Calculate relevance score for a resource against a search query
 *
 * Multi-field scoring algorithm with weighted matches across:
 * - Name (20 points for exact match)
 * - Tool name (8 points)
 * - Tags (15 points per tag)
 * - Category (6 points)
 * - Description (5 points)
 * - Title (4 points)
 * - Content (2 points)
 * - Multi-token bonus (10 points for complete phrase)
 *
 * @param resource - Resource to score
 * @param query - Search query (case-insensitive)
 * @param frontmatter - Parsed frontmatter metadata (can be null)
 * @returns SearchResult with score, matched fields, and optional snippet
 *
 * @example
 * const result = calculateRelevanceScore(resource, 'api security', frontmatter);
 * console.log(`Score: ${result.score}, Matched: ${result.matchedFields.join(', ')}`);
 *
 * Scoring is additive - multiple matches increase total score.

 * Higher scores indicate better relevance.
 * Content matches include contextual snippets.
 */
export const calculateRelevanceScore = (
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
