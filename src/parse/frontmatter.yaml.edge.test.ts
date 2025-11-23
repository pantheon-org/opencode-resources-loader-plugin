import { describe, it, expect } from 'bun:test';
import { parseFrontmatter } from './frontmatter';

describe('frontmatter YAML edge cases', () => {
  it('parses folded block scalars into allowed field `description`', () => {
    const md = `---\ndescription: >\n  This is a long\n  folded paragraph\n---\n` + '\n# Title\n';
    const result = parseFrontmatter(md);
    expect(result.errors).toBeUndefined();
    expect(result.frontmatter?.description).toBeDefined();
    expect(
      String(result.frontmatter?.description).includes('This is a long folded paragraph'),
    ).toBe(true);
  });

  it('parses anchors and aliases into allowed array fields', () => {
    const md =
      `---\nshared: &def\n  - one\n  - two\napplies_to: *def\nrelated_resources: *def\n---\n` +
      '\n# Title\n';
    const result = parseFrontmatter(md);
    expect(result.errors).toBeUndefined();
    expect(Array.isArray(result.frontmatter?.applies_to)).toBe(true);
    expect(Array.isArray(result.frontmatter?.related_resources)).toBe(true);
    expect(result.frontmatter?.applies_to?.[0]).toBe('one');
    expect(result.frontmatter?.related_resources?.[1]).toBe('two');
  });

  it('parses simple arrays into `tags`', () => {
    const md = `---\ntags: [a, b, c]\nversion: 1.2.3\n---\n` + '\n';
    const result = parseFrontmatter(md);
    expect(result.errors).toBeUndefined();
    expect(Array.isArray(result.frontmatter?.tags)).toBe(true);
    expect(result.frontmatter?.tags?.[1]).toBe('b');
    expect(result.frontmatter?.version).toBe('1.2.3');
  });
});
