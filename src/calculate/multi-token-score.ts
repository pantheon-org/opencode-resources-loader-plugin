import { Resource } from '../types';

/**
 * Calculate multi-token match boost
 */
export const calculateMultiTokenScore = (
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
