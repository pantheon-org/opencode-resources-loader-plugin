import { CACHE_TTL, searchCache, SearchResult } from '../types';

/**
 * Get cached search results if still valid
 */
export const getCachedSearch = (key: string): SearchResult[] | null => {
  const entry = searchCache.get(key);
  if (!entry) return null;

  const now = Date.now();
  if (now - entry.timestamp > CACHE_TTL) {
    searchCache.delete(key);
    return null;
  }

  return entry.results;
};
