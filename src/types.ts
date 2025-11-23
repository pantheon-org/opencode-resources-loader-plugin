// Types
export interface Resource {
  name: string; // Generated from filename (e.g., "api-documentation")
  fullPath: string; // Full path to markdown file
  toolName: string; // Generated tool name (e.g., "checklist_api_documentation")
  description: string; // First paragraph or auto-generated description
  type: ResourceType; // checklist, knowledge-base, task, or template
  content: string; // Markdown content
  path: string; // Full path to file
}

export type ResourceType =
  | 'agent'
  | 'checklist'
  | 'command'
  | 'knowledge-base'
  | 'task'
  | 'template';

/**
 * Frontmatter metadata structure
 * Supports standard fields and type-specific extensions
 */
export interface Frontmatter {
  title?: string;
  description?: string;
  type?: ResourceType;
  category?: string;
  version?: string;
  tags?: string[];
  // Type-specific fields
  reference?: string; // Checklist: URL or path to standards/RFCs
  applies_to?: string[]; // Checklist: Project types this applies to
  temperature?: number; // Task: LLM temperature setting
  mode?: string; // Task: Always "task" for task files
  estimated_duration?: string; // Task: Time estimate
  difficulty?: string; // Knowledge base: beginner | intermediate | advanced
  related_resources?: string[]; // Knowledge base: Related file paths
}

/**
 * In-memory resource index for fast search and filtering
 */
export interface ResourceIndex {
  byType: Map<ResourceType, Resource[]>;
  byCategory: Map<string, Resource[]>;
  byTag: Map<string, Resource[]>;
  byNameToken: Map<string, Resource[]>;
  all: Resource[];
}

export interface SearchResult {
  resource: Resource;
  score: number;
  matchedFields: string[];
  snippet?: string;
}

/**
 * Search result cache with TTL
 */
export interface CacheEntry {
  results: SearchResult[];
  timestamp: number;
}

export const searchCache = new Map<string, CacheEntry>();
export const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
