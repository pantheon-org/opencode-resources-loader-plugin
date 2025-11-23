import { Frontmatter } from '../types';

/**
 * Extract description from markdown content
 * Prefers frontmatter description, falls back to first paragraph
 */
export const extractDescription = (content: string, frontmatter: Frontmatter | null): string => {
  // Prefer frontmatter description
  if (frontmatter?.description) {
    return frontmatter.description;
  }

  // Remove any frontmatter
  const withoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, '');

  // Split into lines and find first meaningful paragraph
  const lines = withoutFrontmatter.split('\n');
  let description = '';

  for (const line of lines) {
    const trimmed = line.trim();
    // Skip empty lines and headings
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Found first paragraph
    description = trimmed;
    break;
  }

  // Truncate to reasonable length
  if (description.length > 150) {
    description = description.substring(0, 147) + '...';
  }

  return description || 'Documentation resource';
};
