import { describe, test, expect } from 'bun:test';
import { calculateMultiTokenScore } from './multi-token-score';
import { Resource } from '../types';

describe('calculateMultiTokenScore', () => {
  const baseResource: Resource = {
    name: 'test-resource',
    type: 'command',
    path: 'test.md',
    fullPath: '/test/test.md',
    toolName: 'command_test',
    description: 'Test description for scoring',
    content: 'Test content',
  };

  test('returns 0 for single token queries', () => {
    const matchedFields: string[] = [];
    const score = calculateMultiTokenScore(baseResource, ['single'], matchedFields);
    expect(score).toBe(0);
    expect(matchedFields).toEqual([]);
  });

  test('returns 0 for empty token array', () => {
    const matchedFields: string[] = [];
    const score = calculateMultiTokenScore(baseResource, [], matchedFields);
    expect(score).toBe(0);
    expect(matchedFields).toEqual([]);
  });

  test('calculates score when multiple tokens match name', () => {
    const resource: Resource = {
      ...baseResource,
      name: 'test-resource-example',
    };
    const matchedFields: string[] = [];
    const score = calculateMultiTokenScore(resource, ['test', 'resource'], matchedFields);
    expect(score).toBe(6); // 2 tokens * 3 = 6
    expect(matchedFields).toContain('multi_token');
  });

  test('calculates score when multiple tokens match description', () => {
    const resource: Resource = {
      ...baseResource,
      description: 'This is a test description with multiple words',
    };
    const matchedFields: string[] = [];
    const score = calculateMultiTokenScore(resource, ['test', 'description'], matchedFields);
    expect(score).toBe(6); // 2 tokens * 3 = 6
    expect(matchedFields).toContain('multi_token');
  });

  test('calculates score when tokens match both name and description', () => {
    const resource: Resource = {
      ...baseResource,
      name: 'test-api-resource',
      description: 'API documentation for testing',
    };
    const matchedFields: string[] = [];
    const score = calculateMultiTokenScore(resource, ['test', 'api'], matchedFields);
    expect(score).toBe(6); // 2 tokens * 3 = 6
    expect(matchedFields).toContain('multi_token');
  });

  test('returns 0 when only one token matches', () => {
    const resource: Resource = {
      ...baseResource,
      name: 'test-resource',
      description: 'Some description',
    };
    const matchedFields: string[] = [];
    const score = calculateMultiTokenScore(resource, ['test', 'nomatch'], matchedFields);
    expect(score).toBe(0);
    expect(matchedFields).toEqual([]);
  });

  test('returns 0 when no tokens match', () => {
    const resource: Resource = {
      ...baseResource,
      name: 'example',
      description: 'Some description',
    };
    const matchedFields: string[] = [];
    const score = calculateMultiTokenScore(resource, ['test', 'nomatch'], matchedFields);
    expect(score).toBe(0);
    expect(matchedFields).toEqual([]);
  });

  test('handles case-insensitive matching', () => {
    const resource: Resource = {
      ...baseResource,
      name: 'TEST-RESOURCE',
      description: 'DESCRIPTION WITH WORDS',
    };
    const matchedFields: string[] = [];
    const score = calculateMultiTokenScore(resource, ['test', 'description'], matchedFields);
    expect(score).toBe(6); // 2 tokens * 3 = 6
    expect(matchedFields).toContain('multi_token');
  });

  test('calculates correct score for three matching tokens', () => {
    const resource: Resource = {
      ...baseResource,
      name: 'test-api-documentation',
      description: 'API documentation for testing purposes',
    };
    const matchedFields: string[] = [];
    const score = calculateMultiTokenScore(
      resource,
      ['test', 'api', 'documentation'],
      matchedFields,
    );
    expect(score).toBe(9); // 3 tokens * 3 = 9
    expect(matchedFields).toContain('multi_token');
  });

  test('handles partial token matches', () => {
    const resource: Resource = {
      ...baseResource,
      name: 'testing-resources',
      description: 'Resource documentation',
    };
    const matchedFields: string[] = [];
    // "test" is contained in "testing", "resource" is contained in "resources"
    const score = calculateMultiTokenScore(resource, ['test', 'resource'], matchedFields);
    expect(score).toBe(6); // 2 tokens * 3 = 6
    expect(matchedFields).toContain('multi_token');
  });
});
