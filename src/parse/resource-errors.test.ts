import { describe, test, expect } from 'bun:test';
import {
  addResourceError,
  getResourceError,
  listResourceErrors,
  clearResourceError,
  clearAllResourceErrors,
} from './resource-errors';

describe('resource-errors registry', () => {
  test('add, get, list, clear behavior', () => {
    clearAllResourceErrors();

    addResourceError('/path/to/A.md', [{ message: 'Invalid title' }]);
    addResourceError('/path/to/B.md', [{ message: 'Missing type' }]);

    const a = getResourceError('/path/to/A.md');
    expect(a).toBeDefined();
    expect(a?.errors.length).toBe(1);

    const list = listResourceErrors();
    expect(list.length).toBeGreaterThanOrEqual(2);

    clearResourceError('/path/to/A.md');
    const afterClear = getResourceError('/path/to/A.md');
    expect(afterClear).toBeNull();

    clearAllResourceErrors();
    expect(listResourceErrors().length).toBe(0);
  });
});
