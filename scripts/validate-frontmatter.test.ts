import { describe, it, expect } from 'bun:test';
import { findYamlPosition } from './lib/yaml-position';

describe('findYamlPosition', () => {
  it('finds simple scalar key position', () => {
    const fm = `title: Test\ndescription: Something here\ntags:\n  - one\n  - two\ntemperature: 0.5\n`;
    const pos = findYamlPosition(fm, ['description']);
    expect(pos).toBeTruthy();
    expect(pos!.line).toBe(2);
  });

  it('finds array item position', () => {
    const fm = `tags:\n  - one\n  - two\n  - three\n`;
    const pos = findYamlPosition(fm, ['tags', '1']);
    expect(pos).toBeTruthy();
    // item index 1 corresponds to second line within tags block -> line 3 overall
    expect(pos!.line).toBe(3);
  });

  it('returns null for missing path', () => {
    const fm = `title: A\n`;
    const pos = findYamlPosition(fm, ['nonexistent']);
    expect(pos).toBeNull();
  });
});
