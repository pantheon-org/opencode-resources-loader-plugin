import { describe, test, expect, spyOn } from 'bun:test';
import { parseFrontmatter } from './frontmatter';

describe('parseFrontmatter', () => {
  test('parses valid frontmatter', () => {
    const content = `---
title: Test Title
description: Test description
category: Testing
tags:
  - test
  - example
---

Body content here.`;

    const result = parseFrontmatter(content);

    expect(result.frontmatter).toBeDefined();
    expect(result.frontmatter?.title).toBe('Test Title');
    expect(result.frontmatter?.description).toBe('Test description');
    expect(result.frontmatter?.category).toBe('Testing');
    expect(result.frontmatter?.tags).toEqual(['test', 'example']);
    expect(result.body).toBe('\nBody content here.');
  });

  test('returns null frontmatter for content without frontmatter', () => {
    const content = `# Regular Markdown

This is just regular content without frontmatter.`;

    const result = parseFrontmatter(content);

    expect(result.frontmatter).toBeNull();
    expect(result.body).toBe(content);
  });

  test('returns null frontmatter for empty content', () => {
    const content = '';

    const result = parseFrontmatter(content);

    expect(result.frontmatter).toBeNull();
    expect(result.body).toBe('');
  });

  test('handles invalid YAML in frontmatter', () => {
    const content = `---
title: Test
invalid: [unclosed array
description: test
---

Body content.`;

    const consoleWarnSpy = spyOn(console, 'warn').mockImplementation(() => {});

    const result = parseFrontmatter(content);

    expect(result.frontmatter).toBeNull();
    expect(result.body).toBe(content);
    expect(consoleWarnSpy).toHaveBeenCalled();

    consoleWarnSpy.mockRestore();
  });

  test('handles frontmatter with no body content', () => {
    const content = `---
title: Test Title
description: Test description
---
`;

    const result = parseFrontmatter(content);

    expect(result.frontmatter).toBeDefined();
    expect(result.frontmatter?.title).toBe('Test Title');
    expect(result.body).toBe('');
  });

  test('handles frontmatter with complex nested structures', () => {
    const content = `---
title: Complex Test
metadata:
  author: John Doe
  date: 2025-01-01
  tags:
    - nested
    - complex
related_resources:
  - resource1
  - resource2
---

Body content.`;

    const result = parseFrontmatter(content);

    expect(result.frontmatter).toBeDefined();
    expect(result.frontmatter?.title).toBe('Complex Test');
    expect(result.body).toBe('\nBody content.');
  });

  test('handles incomplete frontmatter markers', () => {
    const content = `---
title: Test
description: Test

Body without closing marker.`;

    const result = parseFrontmatter(content);

    expect(result.frontmatter).toBeNull();
    expect(result.body).toBe(content);
  });

  test('handles frontmatter with only opening marker', () => {
    const content = `---
title: Test`;

    const result = parseFrontmatter(content);

    expect(result.frontmatter).toBeNull();
    expect(result.body).toBe(content);
  });

  test('handles content with multiple frontmatter-like sections', () => {
    const content = `---
title: Real Frontmatter
---

Body content.

---
Not frontmatter
---`;

    const result = parseFrontmatter(content);

    expect(result.frontmatter).toBeDefined();
    expect(result.frontmatter?.title).toBe('Real Frontmatter');
    expect(result.body).toContain('---\nNot frontmatter\n---');
  });

  test('preserves body content spacing', () => {
    const content = `---
title: Test
---

First paragraph.

Second paragraph.`;

    const result = parseFrontmatter(content);

    expect(result.body).toBe('\nFirst paragraph.\n\nSecond paragraph.');
  });

  test('handles Error objects in catch block', () => {
    const content = `---
title: Test
invalid: @invalid@yaml@
---

Body.`;

    const consoleWarnSpy = spyOn(console, 'warn').mockImplementation(() => {});

    const result = parseFrontmatter(content);

    expect(result.frontmatter).toBeNull();
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('Failed to parse frontmatter:'),
      expect.any(String),
    );

    consoleWarnSpy.mockRestore();
  });

  test('handles non-Error exceptions in catch block', () => {
    const content = `---
title: Test
---

Body.`;

    // Mock yaml.parse to throw a non-Error
    const yaml = require('yaml');
    const originalParse = yaml.parse;
    yaml.parse = () => {
      throw 'String error';
    };

    const consoleWarnSpy = spyOn(console, 'warn').mockImplementation(() => {});

    const result = parseFrontmatter(content);

    expect(result.frontmatter).toBeNull();
    expect(consoleWarnSpy).toHaveBeenCalledWith('Failed to parse frontmatter:', 'String error');

    // Restore
    yaml.parse = originalParse;
    consoleWarnSpy.mockRestore();
  });
});
