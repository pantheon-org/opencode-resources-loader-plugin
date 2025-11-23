import { Frontmatter } from '../types';
import yaml from 'yaml';
import { validateFrontmatter } from './frontmatter.schema';
import { addResourceError, clearResourceError } from './resource-errors';

/**
 * Parse YAML frontmatter from markdown content.
 *
 * Looks for a YAML frontmatter block at the top of the file delimited by
 * triple dashes (---). Returns the parsed frontmatter object when present
 * and valid, otherwise returns null and the original content as body.
 *
 * @param content - Raw markdown content including optional frontmatter
 * @param filePath - Optional file path used for error reporting
 * @returns Object with parsed frontmatter (or null) and body content
 */
export const parseFrontmatter = (
  content: string,
  filePath?: string,
): {
  frontmatter: Frontmatter | null;
  body: string;
} => {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: null, body: content };
  }

  try {
    const parsed = yaml.parse(match[1]);

    // Validate parsed frontmatter using zod schema
    const validation = validateFrontmatter(parsed);
    if (validation.valid) {
      // Valid frontmatter — clear any previous error entry
      if (filePath) {
        try {
          clearResourceError(filePath);
        } catch (e) {
          // ignore
        }
      }

      // Cast to Frontmatter for downstream code compatibility
      return { frontmatter: validation.data as Frontmatter, body: match[2] };
    }

    // Validation failed: record the error and return null frontmatter (non-fatal)
    console.warn(`Frontmatter validation failed:`, validation.errors);
    try {
      addResourceError(filePath || 'unknown', validation.errors as unknown[]);
    } catch (e) {
      // ignore
    }
    return { frontmatter: null, body: content };
  } catch (error) {
    console.warn(
      `Failed to parse frontmatter:`,
      error instanceof Error ? error.message : String(error),
    );
    return { frontmatter: null, body: content };
  }
};
