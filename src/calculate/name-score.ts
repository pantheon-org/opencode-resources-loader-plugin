/**
 * Calculate name match score
 */
export const calculateNameScore = (
  name: string,
  queryLower: string,
  matchedFields: string[],
): number => {
  if (name.toLowerCase() === queryLower) {
    matchedFields.push('exact_name');
    return 20;
  } else if (name.toLowerCase().includes(queryLower)) {
    matchedFields.push('name');
    return 10;
  }
  return 0;
};
