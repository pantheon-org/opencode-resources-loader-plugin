import { parseFrontmatter } from './parse';
import { Resource, type ResourceIndex } from './types';

/**
 * Build in-memory index for efficient searching
 */
export const buildResourceIndex = (resources: Resource[]): ResourceIndex => {
  const index: ResourceIndex = {
    byType: new Map(),
    byCategory: new Map(),
    byTag: new Map(),
    byNameToken: new Map(),
    all: resources,
  };

  for (const resource of resources) {
    // Index by type
    if (!index.byType.has(resource.type)) {
      index.byType.set(resource.type, []);
    }
    index.byType.get(resource.type)!.push(resource);

    // Parse frontmatter for indexing
    const { frontmatter } = parseFrontmatter(resource.content);

    // Index by category
    if (frontmatter?.category) {
      if (!index.byCategory.has(frontmatter.category)) {
        index.byCategory.set(frontmatter.category, []);
      }
      index.byCategory.get(frontmatter.category)!.push(resource);
    }

    // Index by tags
    if (frontmatter?.tags) {
      for (const tag of frontmatter.tags) {
        const tagLower = tag.toLowerCase();
        if (!index.byTag.has(tagLower)) {
          index.byTag.set(tagLower, []);
        }
        index.byTag.get(tagLower)!.push(resource);
      }
    }

    // Index by name tokens for faster searches
    const nameTokens = resource.name.toLowerCase().split(/[-_\s]+/);
    for (const token of nameTokens) {
      if (token.length > 2) {
        if (!index.byNameToken.has(token)) {
          index.byNameToken.set(token, []);
        }
        index.byNameToken.get(token)!.push(resource);
      }
    }
  }

  return index;
};
