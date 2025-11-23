import { dirname, basename } from 'path';
import { Resource, ResourceType } from '../types';
import { parseFrontmatter } from '../parse/frontmatter';
import { extractDescription } from '../extract/description';
import { generateToolName } from '../generate-tool-name';

/**
 * Parse a markdown resource file and return structured resource data
 * Returns null if parsing fails (with error logging)
 */
export const parseResource = async (
  resourcePath: string,
  baseDir: string,
  type: ResourceType,
): Promise<Resource | null> => {
  try {
    // Read file
    const content = await Bun.file(resourcePath).text();

    // Parse frontmatter
    const { frontmatter, body } = parseFrontmatter(content);

    // Generate name from filename (fallback if no frontmatter title)
    const fileName = basename(resourcePath, '.md');
    const name = frontmatter?.title || fileName.replace(/_/g, '-');

    // Extract description (prefers frontmatter)
    const description = extractDescription(content, frontmatter);

    // Generate tool name from path
    const toolName = generateToolName(resourcePath, baseDir, type);

    return {
      name,
      fullPath: dirname(resourcePath),
      toolName,
      description,
      type,
      content: content.trim(),
      path: resourcePath,
    };
  } catch (error) {
    console.error(
      `❌ Error parsing resource ${resourcePath}:`,
      error instanceof Error ? error.message : String(error),
    );
    return null;
  }
};
