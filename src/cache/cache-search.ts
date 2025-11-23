import { searchCache, SearchResult } from '../types';

/**
 * Cache search results
 */
export const cacheSearch = (key: string, results: SearchResult[]): void => {
  searchCache.set(key, {
    results,
    timestamp: Date.now(),
  });
};
