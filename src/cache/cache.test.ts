import { describe, test, expect, beforeEach } from 'bun:test';
import { cacheSearch, getCachedSearch } from './index';
import { searchCache, CACHE_TTL } from '../types';

describe('Cache Functionality', () => {
  beforeEach(() => {
    // Clear cache before each test
    searchCache.clear();
  });

  test('getCachedSearch returns null for non-existent key', () => {
    const result = getCachedSearch('non-existent-key');
    expect(result).toBeNull();
  });

  test('cacheSearch and getCachedSearch work together', () => {
    const key = 'test-key';
    const results = [
      {
        resource: {
          name: 'test',
          type: 'command' as const,
          path: 'test.md',
          fullPath: '/test/test.md',
          toolName: 'command_test',
          description: 'Test resource',
          content: 'Test content',
        },
        score: 10,
        matchedFields: ['name'],
      },
    ];

    cacheSearch(key, results);
    const cached = getCachedSearch(key);
    expect(cached).toEqual(results);
  });

  test('getCachedSearch returns null for expired cache entries', () => {
    const key = 'expire-test';
    const results = [
      {
        resource: {
          name: 'test',
          type: 'command' as const,
          path: 'test.md',
          fullPath: '/test/test.md',
          toolName: 'command_test',
          description: 'Test resource',
          content: 'Test content',
        },
        score: 10,
        matchedFields: ['name'],
      },
    ];

    // Manually set an expired entry
    searchCache.set(key, {
      results,
      timestamp: Date.now() - CACHE_TTL - 1000, // 1 second past expiry
    });

    const cached = getCachedSearch(key);
    expect(cached).toBeNull();
    expect(searchCache.has(key)).toBe(false); // Should be deleted
  });

  test('getCachedSearch returns valid non-expired entries', () => {
    const key = 'valid-test';
    const results = [
      {
        resource: {
          name: 'test',
          type: 'task' as const,
          path: 'test.md',
          fullPath: '/test/test.md',
          toolName: 'task_test',
          description: 'Test resource',
          content: 'Test content',
        },
        score: 15,
        matchedFields: ['description'],
      },
    ];

    // Set a recent entry
    searchCache.set(key, {
      results,
      timestamp: Date.now() - 1000, // 1 second ago (well within TTL)
    });

    const cached = getCachedSearch(key);
    expect(cached).toEqual(results);
  });

  test('cache handles multiple entries independently', () => {
    const key1 = 'key1';
    const key2 = 'key2';
    const results1 = [
      {
        resource: {
          name: 'test1',
          type: 'agent' as const,
          path: 'test1.md',
          fullPath: '/test/test1.md',
          toolName: 'agent_test1',
          description: 'Test resource 1',
          content: 'Test content 1',
        },
        score: 20,
        matchedFields: ['name'],
      },
    ];
    const results2 = [
      {
        resource: {
          name: 'test2',
          type: 'checklist' as const,
          path: 'test2.md',
          fullPath: '/test/test2.md',
          toolName: 'checklist_test2',
          description: 'Test resource 2',
          content: 'Test content 2',
        },
        score: 25,
        matchedFields: ['description'],
      },
    ];

    cacheSearch(key1, results1);
    cacheSearch(key2, results2);

    expect(getCachedSearch(key1)).toEqual(results1);
    expect(getCachedSearch(key2)).toEqual(results2);
  });
});
