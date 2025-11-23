import { calculateMultiTokenScore } from './multi-token-score';
import { calculateNameScore } from './name-score';
import { calculateTagScore } from './tag-score';
import { extractSnippet } from '../extract/snippet';
import { tokenizeQuery } from '../tokenize-query';
import { Frontmatter, Resource, SearchResult } from '../types';

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
