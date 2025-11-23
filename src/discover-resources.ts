import { Glob } from 'bun';
import { join } from 'path';
import { ResourceType, Resource } from './types';
import { parseResource } from './parse';

/**
 * Discover all markdown files in the specified resource directories
 */
// eslint-disable-next-line complexity
export const discoverResources = async (
  basePaths: string[],
  types: ResourceType[],
): Promise<Resource[]> => {
  const resources: Resource[] = [];
  let foundPath = false;

  for (const basePath of basePaths) {
    for (const type of types) {
      const typePath = join(basePath, type);

      try {
        // Find all markdown files recursively in this type directory
        const glob = new Glob('**/*.md');

        for await (const match of glob.scan({
          cwd: typePath,
          absolute: true,
        })) {
          const resource = await parseResource(match, typePath, type);
          if (resource) {
            resources.push(resource);
          }
        }

        foundPath = true;
      } catch (error) {
        if (
          error &&
          typeof error === 'object' &&
          'code' in error &&
          (error as { code: string }).code === 'ENOENT'
        ) {
          // Directory does not exist, expected in some cases
        } else {
          console.warn(`Unexpected error while scanning resources in ${typePath}:`, error);
        }
      }
    }
  }

  if (!foundPath) {
    console.warn(
      `⚠️ Could not find any resource directories. Tried:`,
      ...basePaths.map((path) => `\n     ${path}`),
      `\n   This is normal if none of the directories exist yet.`,
    );
  }

  // Detect duplicate tool names
  const toolNames = new Set<string>();
  const duplicates: string[] = [];

  for (const resource of resources) {
    if (toolNames.has(resource.toolName)) {
      duplicates.push(resource.toolName);
    }
    toolNames.add(resource.toolName);
  }

  if (duplicates.length > 0) {
    console.warn(`⚠️  Duplicate tool names detected:`, duplicates);
  }

  return resources;
};
