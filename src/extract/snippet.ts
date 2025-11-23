/**
 * Extract content snippet around match
 */
export const extractSnippet = (
  content: string,
  matchIndex: number,
  queryLength: number,
): string => {
  const start = Math.max(0, matchIndex - 100);
  const end = Math.min(content.length, matchIndex + queryLength + 100);
  return '...' + content.substring(start, end).trim() + '...';
};
