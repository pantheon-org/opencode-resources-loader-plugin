/**
 * Represents a discovered and parsed resource
 *
 * @example
 * ```typescript
 * const resource: Resource = {
 *   name: "api-documentation",
 *   fullPath: "/project/.opencode/checklist/api-documentation.md",
 *   toolName: "checklist_api_documentation",
 *   description: "Comprehensive API documentation checklist",
 *   type: "checklist",
 *   content: "# API Documentation\n\nContent here...",
 *   path: "/project/.opencode/checklist/api-documentation.md"
 * };
 * ```
 */
export interface Resource {
  /** Generated from filename (e.g., "api-documentation") */
  name: string;
  /** Full path to markdown file */
  fullPath: string;
  /** Generated tool name (e.g., "checklist_api_documentation") */
  toolName: string;
  /** First paragraph or auto-generated description */
  description: string;
  /** Resource type: agent, checklist, command, knowledge-base, task, or template */
  type: ResourceType;
  /** Full markdown content including frontmatter */
  content: string;
  /** Full path to file (same as fullPath, kept for compatibility) */
  path: string;
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
 *
 * Supports standard fields and type-specific extensions for enhanced resource metadata.
 *
 * @example
 * ```yaml
 * ---
 * description: Comprehensive API documentation checklist
 * type: checklist
 * category: Documentation
 * tags: [api, rest, graphql]
 * version: 1.0.0
 * reference: https://swagger.io/specification/
 * ---
 * ```
 *
 * @example
 * ```typescript
 * const frontmatter: Frontmatter = {
 *   description: "Production deployment workflow",
 *   type: "task",
 *   category: "Operations",
 *   tags: ["deployment", "ci-cd"],
 *   mode: "task",
 *   temperature: 0.3,
 *   estimated_duration: "30 minutes"
 * };
 * ```
 */
export interface Frontmatter {
  /** Resource title (overrides filename) */
  title?: string;
  /** One-line description (max 200 chars) */
  description?: string;
  /** Resource type (must match directory) */
  type?: ResourceType;
  /** Category: Documentation, Development, Operations, Quality, Security */
  category?: string;
  /** Semantic version (e.g., "1.2.0") */
  version?: string;
  /** Keywords for search (minimum 2 recommended) */
  tags?: string[];

  // Type-specific fields
  /** Checklist: URL or path to standards/RFCs */
  reference?: string;
  /** Checklist: Project types this applies to */
  applies_to?: string[];
  /** Task/Agent: LLM temperature setting (0.0-1.0) */
  temperature?: number;
  /** Task: Always "task" for task files */
  mode?: string;
  /** Task: Time estimate (e.g., "30 minutes") */
  estimated_duration?: string;
  /** Knowledge base: beginner | intermediate | advanced */
  difficulty?: string;
  /** Knowledge base: Related resource tool names */
  related_resources?: string[];
}

/**
 * In-memory resource index for fast search and filtering
 *
 * Multi-map index structure enabling O(1) lookups by type, category, tag, and name tokens.
 *
 * @example
 * ```typescript
 * const index = buildResourceIndex(resources);
 *
 * // Fast type-based lookup
 * const checklists = index.byType.get('checklist');
 *
 * // Category filtering
 * const docResources = index.byCategory.get('Documentation');
 *
 * // Tag-based search
 * const apiResources = index.byTag.get('api');
 *
 * // Name token search
 * const deploymentResources = index.byNameToken.get('deployment');
 * ```
 */
export interface ResourceIndex {
  /** Resources indexed by type (agent, checklist, etc.) */
  byType: Map<ResourceType, Resource[]>;
  /** Resources indexed by category */
  byCategory: Map<string, Resource[]>;
  /** Resources indexed by tags (lowercase) */
  byTag: Map<string, Resource[]>;
  /** Resources indexed by name tokens (split on -, _, space) */
  byNameToken: Map<string, Resource[]>;
  /** All resources (reference to original array) */
  all: Resource[];
}

/**
 * Search result with relevance score and match details
 *
 * @example
 * ```typescript
 * const result: SearchResult = {
 *   resource: myResource,
 *   score: 45,
 *   matchedFields: ['name', 'tags', 'description'],
 *   snippet: '...API documentation checklist with REST...'
 * };
 *
 * console.log(`Match score: ${result.score}`);
 * console.log(`Matched in: ${result.matchedFields.join(', ')}`);
 * ```
 */
export interface SearchResult {
  /** The matched resource */
  resource: Resource;
  /** Relevance score (higher is better) */
  score: number;
  /** Fields that matched the query */
  matchedFields: string[];
  /** Optional content snippet showing match context */
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
