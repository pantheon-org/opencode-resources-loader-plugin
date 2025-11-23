/**
 * Tokenize search query into individual tokens
 */
export const tokenizeQuery = (query: string): string[] => {
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter((token) => token.length > 2);
};
