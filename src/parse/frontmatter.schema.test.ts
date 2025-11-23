import { describe, test, expect } from 'bun:test';
import { validateFrontmatter } from './frontmatter.schema';

describe('FrontmatterSchema', () => {
  test('valid frontmatter passes validation', () => {
    const raw = {
      title: 'Valid Resource',
      description: 'A valid description',
      type: 'checklist',
      version: '1.2.3',
      tags: ['a', 'b'],
      temperature: 0.5,
    };

    const res = validateFrontmatter(raw);
    expect(res.valid).toBe(true);
    if (res.valid) {
      expect(res.data.title).toBe('Valid Resource');
      expect(res.data.type).toBe('checklist');
      expect(res.data.version).toBe('1.2.3');
    }
  });

  test('invalid version fails validation', () => {
    const raw = { title: 'X', version: 'not-a-semver' };
    const res = validateFrontmatter(raw);
    expect(res.valid).toBe(false);
    if (!res.valid) {
      expect(res.errors.length).toBeGreaterThan(0);
    }
  });

  test('temperature out of range fails validation', () => {
    const raw = { temperature: 2 };
    const res = validateFrontmatter(raw);
    expect(res.valid).toBe(false);
  });
});
