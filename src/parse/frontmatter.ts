import { Frontmatter } from '../types';
import yaml from 'yaml';

/**
 * Parse YAML frontmatter from markdown content
 *
 * Extracts and parses YAML frontmatter blocks from markdown files.
 * Frontmatter must be enclosed in triple-dash markers (---) at the start of the file.
 *
 * @param content - Raw markdown content including frontmatter
 * @returns Object with parsed frontmatter (or null) and body content
 *
 * @example
 * const { frontmatter, body } = parseFrontmatter(markdownContent);
 * if (frontmatter) {
 *   console.log('Tags:', frontmatter.tags);
 *   console.log('Category:', frontmatter.category);
 * }
 *
 * @remarks
 * Expected format:
 * ```markdown
 * ---
 * description: Resource description
 * type: checklist
 * tags: [api, documentation]
 * ---
 *
 * # Content here
 * ```
 *
 * Error handling:
 * - Invalid YAML: Returns null frontmatter, logs warning
 * - Missing frontmatter: Returns null frontmatter, full content as body
 * - Parse errors are non-fatal, allowing resource to still be loaded
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
