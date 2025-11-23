import { parseFrontmatter } from './parse';
import { Resource, type ResourceIndex } from './types';

/**
 * Helper to add resource to a map index
 */
const addToIndex = <K>(map: Map<K, Resource[]>, key: K, resource: Resource): void => {
  if (!map.has(key)) {
    map.set(key, []);
  }
  map.get(key)!.push(resource);
};

/**
 * Index resource by tags
 */
const indexByTags = (
  index: ResourceIndex,
  resource: Resource,
  tags: string[] | undefined,
): void => {
  if (!tags) return;

  for (const tag of tags) {
    addToIndex(index.byTag, tag.toLowerCase(), resource);
  }
};

/**
 * Index resource by name tokens
 */
const indexByNameTokens = (index: ResourceIndex, resource: Resource): void => {
  const nameTokens = resource.name.toLowerCase().split(/[-_\s]+/);
  for (const token of nameTokens) {
    if (token.length > 2) {
      addToIndex(index.byNameToken, token, resource);
    }
  }
};

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
    addToIndex(index.byType, resource.type, resource);

    // Parse frontmatter for indexing
    const { frontmatter } = parseFrontmatter(resource.content);

    // Index by category
    if (frontmatter?.category) {
      addToIndex(index.byCategory, frontmatter.category, resource);
    }

    // Index by tags
    indexByTags(index, resource, frontmatter?.tags);

    // Index by name tokens for faster searches
    indexByNameTokens(index, resource);
  }

  return index;
};
