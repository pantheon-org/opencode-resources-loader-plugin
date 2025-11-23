import { Frontmatter } from '../types';

/**
 * Calculate tag match score
 */
export const calculateTagScore = (
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
