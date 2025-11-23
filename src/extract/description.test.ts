import { describe, test, expect } from 'bun:test';
import { extractDescription } from './description';
import { Frontmatter } from '../types';

describe('extractDescription', () => {
  test('prefers frontmatter description when available', () => {
    const content = `---
description: Frontmatter description
---

# Header

First paragraph content.`;

    const frontmatter: Frontmatter = {
      description: 'Frontmatter description',
    };

    const result = extractDescription(content, frontmatter);
    expect(result).toBe('Frontmatter description');
  });

  test('extracts first paragraph when no frontmatter', () => {
    const content = `# Header

First paragraph content.

Second paragraph.`;

    const result = extractDescription(content, null);
    expect(result).toBe('First paragraph content.');
  });

  test('skips empty lines and headers to find first paragraph', () => {
    const content = `

# Main Header

## Sub Header

First actual paragraph.`;

    const result = extractDescription(content, null);
    expect(result).toBe('First actual paragraph.');
  });

  test('removes frontmatter before extracting description', () => {
    const content = `---
title: Test
category: Testing
---

# Header

Actual content paragraph.`;

    const result = extractDescription(content, null);
    expect(result).toBe('Actual content paragraph.');
  });

  test('truncates long descriptions to 150 characters', () => {
    const longParagraph =
      'This is a very long paragraph that contains more than one hundred and fifty characters and should be truncated with an ellipsis at the end to keep descriptions concise.';
    const content = `# Header

${longParagraph}`;

    const result = extractDescription(content, null);
    expect(result.length).toBe(150); // 147 chars + '...'
    expect(result).toEndWith('...');
  });

  test('does not truncate descriptions under 150 characters', () => {
    const shortParagraph = 'This is a short description.';
    const content = `# Header

${shortParagraph}`;

    const result = extractDescription(content, null);
    expect(result).toBe(shortParagraph);
  });

  test('returns default message when no content found', () => {
    const content = `# Header

## Another Header

### Yet Another Header`;

    const result = extractDescription(content, null);
    expect(result).toBe('Documentation resource');
  });

  test('returns default message for empty content', () => {
    const content = '';

    const result = extractDescription(content, null);
    expect(result).toBe('Documentation resource');
  });

  test('handles content with only whitespace', () => {
    const content = `   

   
   `;

    const result = extractDescription(content, null);
    expect(result).toBe('Documentation resource');
  });

  test('handles content with only headers', () => {
    const content = `# Header 1
## Header 2
### Header 3`;

    const result = extractDescription(content, null);
    expect(result).toBe('Documentation resource');
  });

  test('extracts description from content with mixed line breaks', () => {
    const content = `---
title: Test
---


# Header


First paragraph after multiple line breaks.`;

    const result = extractDescription(content, null);
    expect(result).toBe('First paragraph after multiple line breaks.');
  });

  test('handles markdown with code blocks', () => {
    const content = `# Header

This is the first paragraph.

\`\`\`javascript
const code = 'block';
\`\`\`

Second paragraph.`;

    const result = extractDescription(content, null);
    expect(result).toBe('This is the first paragraph.');
  });

  test('prefers frontmatter even with good content', () => {
    const content = `---
description: Custom frontmatter description
---

# Header

This is a great paragraph that would normally be used.`;

    const frontmatter: Frontmatter = {
      description: 'Custom frontmatter description',
    };

    const result = extractDescription(content, frontmatter);
    expect(result).toBe('Custom frontmatter description');
  });

  test('handles frontmatter with empty description field', () => {
    const content = `---
description: ""
---

# Header

Actual paragraph content.`;

    const frontmatter: Frontmatter = {
      description: '',
    };

    const result = extractDescription(content, frontmatter);
    expect(result).toBe('Actual paragraph content.');
  });
});
