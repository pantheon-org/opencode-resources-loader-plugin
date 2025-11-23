import { Frontmatter } from '../types';
import yaml from 'yaml';

/**
 * Parse YAML frontmatter from markdown content
 * Returns frontmatter object and content body
 */
export const parseFrontmatter = (
  content: string,
): {
  frontmatter: Frontmatter | null;
  body: string;
} => {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: null, body: content };
  }

  try {
    const frontmatter = yaml.parse(match[1]) as Frontmatter;
    return { frontmatter, body: match[2] };
  } catch (error) {
    console.warn(
      `Failed to parse frontmatter:`,
      error instanceof Error ? error.message : String(error),
    );
    return { frontmatter: null, body: content };
  }
};
