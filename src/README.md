# Resource Loader Plugin

## Overview

The Resource Loader Plugin automatically discovers and loads documentation resources from `.opencode` subdirectories, making them available as native OpenCode tools. This plugin provides both **dynamic resource discovery** and **direct resource loading** capabilities.

## Features

### Resource Discovery

- **Three Discovery Tools**: `resource_list`, `resource_search`, `resource_info`
- **Intelligent Search**: Multi-word queries with relevance scoring
- **Advanced Filtering**: By type, category, tags, or keywords
- **Metadata Access**: View frontmatter and related resources before loading
- **Search Caching**: 5-minute TTL for improved performance

### Automatic Discovery

- **Six Resource Types**:
  - `agent/` - Specialized agent configurations
  - `checklist/` - Step-by-step checklists for processes
  - `command/` - Slash commands and workflows
  - `knowledge-base/` - Reference documentation and patterns
  - `task/` - Task templates and workflows
  - `template/` - Reusable templates and examples

- **Dynamic Tool Generation**: Creates tools with naming pattern `{type}_{resource_name}`
  - Example: `checklist_api_documentation`, `knowledge_base_jenkins_patterns`

- **Global and Local Support**: Discovers resources from:
  - `~/.opencode/` (global, lowest priority)
  - `~/.config/opencode/` (global config, medium priority)
  - `.opencode/` (project-local, highest priority)

- **Silent Message Insertion**: Uses the `noReply` pattern to inject resource content into context without triggering AI responses

- **Nested Resource Support**: Handles subdirectories with proper naming
  - Example: `.opencode/task/deployment/prod-deploy.md` → `task_deployment_prod_deploy`

- **Frontmatter Support**: YAML metadata for enhanced descriptions, categories, and tags

## How It Works

### Discovery Phase

1. On plugin initialization, scans for markdown files (`.md`) in all resource type directories
2. Generates tool names by combining type prefix with file path structure
3. Extracts first paragraph as tool description
4. Registers a dynamic tool for each discovered resource

### Execution Phase

When a tool is invoked:

1. Sends silent message with resource header
2. Injects full resource content into session context
3. Returns minimal confirmation to user

## Usage

### For Users

Once the plugin is loaded, resources are automatically available as tools:

```bash
# In OpenCode, you can now call:
checklist_api_documentation
knowledge_base_jenkins_patterns
task_deployment_prod_deploy
template_skill_reference
```

### For Developers

The plugin is automatically loaded by OpenCode when placed in `.opencode/plugin/`:

```typescript
// No manual import needed - OpenCode auto-loads from:
// - .opencode/plugin/resource-loader.ts
// - ~/.opencode/plugin/resource-loader.ts
// - ~/.config/opencode/plugin/resource-loader.ts
```

## Resource Structure

### Expected Directory Layout

```
.opencode/
├── checklist/
│   ├── api-documentation.md
│   ├── deployment-documentation.md
│   └── architecture-documentation.md
├── knowledge-base/
│   ├── jenkins-patterns.md
│   ├── gitlab-ci-examples.md
│   └── pipeline-best-practices.md
├── task/
│   ├── deployment/
│   │   └── prod-deploy.md
│   └── maintenance/
│       └── cleanup.md
└── template/
    ├── skill-reference-template.md
    └── standard-doc-structure.md
```

### Markdown Format

Resources should be standard markdown files:

```markdown
# Resource Title

First paragraph becomes the tool description and should be descriptive and concise.

## Section 1

Content here...

## Section 2

More content...
```

## Tool Naming Convention

Tool names are generated using this pattern:

1. Take resource type and convert hyphens to underscores: `knowledge-base` → `knowledge_base`
2. Add subdirectory path (if any): `deployment/` → `deployment_`
3. Add filename (without `.md`): `prod-deploy.md` → `prod_deploy`
4. Result: `task_deployment_prod_deploy`

### Examples

| File Path                              | Generated Tool Name                 |
| -------------------------------------- | ----------------------------------- |
| `checklist/api-documentation.md`       | `checklist_api_documentation`       |
| `knowledge-base/jenkins-patterns.md`   | `knowledge_base_jenkins_patterns`   |
| `task/deployment/prod-deploy.md`       | `task_deployment_prod_deploy`       |
| `template/skill-reference-template.md` | `template_skill_reference_template` |

## Comparison with Existing Plugin

### resource-loader.ts (NEW)

- **Purpose**: Auto-discovery of markdown resources as tools
- **Pattern**: Skills-inspired approach with tool generation
- **Use Case**: Direct invocation of specific resources
- **Message Pattern**: Silent insertion (noReply)

### project-documentation.ts (EXISTING)

- **Purpose**: Project analysis and resource management
- **Pattern**: Three specific tools (analyze, load, clear)
- **Use Case**: Dynamic resource loading with parameters
- **Message Pattern**: Tool returns with structured results

These plugins complement each other:

- Use `resource-loader.ts` for quick access to known resources
- Use `project-documentation.ts` for discovery, search, and analysis

## Configuration

### Restart Required

The plugin scans for resources during initialization. To reload after adding new resources:

```bash
# Restart OpenCode to discover new resources
```

### Priority Handling

When duplicate tool names are detected:

1. Project-local resources (`.opencode/`) override global locations
2. Global config (`~/.config/opencode/`) overrides global home (`~/.opencode/`)
3. A warning is logged to console
4. Last discovered resource wins (highest priority)

## Performance

- **Discovery**: Runs once at plugin initialization
- **Execution**: Minimal overhead using silent message insertion
- **Memory**: Resources loaded on-demand, not pre-cached
- **Network**: No external calls, all local filesystem access

## Troubleshooting

### Resources Not Appearing

1. Check file extension is `.md`
2. Verify directory structure matches expected layout
3. Restart OpenCode to trigger re-discovery
4. Check console for error messages

### Duplicate Tool Names

If you see warnings about duplicate tool names:

1. Check for resources with same name in different locations
2. Consider renaming one resource
3. Project-local resources take priority

### Tool Not Working

1. Verify markdown file is valid UTF-8
2. Check file permissions are readable
3. Look for console errors during initialization
4. Ensure the file contains content

## Discovery Tools

### resource_list

List all available resources with optional filtering.

**Arguments:**

- `type` (optional): Filter by type (agent, checklist, command, knowledge-base, task, template, all)
- `category` (optional): Filter by category (Documentation, Development, Operations, Quality, Security)
- `tag` (optional): Filter by tag
- `limit` (optional): Maximum results to return (default: 50)

**Usage:**

```typescript
// List all checklists
resource_list({ type: 'checklist' });

// List documentation-related resources
resource_list({ category: 'Documentation' });

// List resources with specific tag
resource_list({ tag: 'api' });

// List all resources
resource_list({ type: 'all' });
```

**Performance:** Fast, low context impact (metadata only)

### resource_search

Search resources by keyword with relevance scoring.

**Arguments:**

- `query` (required): Search query (case-insensitive)
- `type` (optional): Filter by type
- `max_results` (optional): Maximum results to return (default: 10)

**Usage:**

```typescript
// Search by keyword across all fields
resource_search({ query: 'api documentation' });

// Search within specific type
resource_search({ query: 'deployment', type: 'task' });

// Limit results
resource_search({ query: 'security', max_results: 5 });
```

**Performance:** Fast (<100ms for 100+ resources), cached (5-min TTL)

**Scoring:** Multi-field relevance scoring (exact name: 20, tags: 15, description: 5, content: 2)

### resource_info

Get detailed information about a specific resource.

**Arguments:**

- `tool_name` (required): Exact tool name (e.g., `checklist_api_documentation`)

**Usage:**

```typescript
// Get full metadata and related resources
resource_info({ tool_name: 'checklist_api_documentation' });
```

**Performance:** Fast, low context impact (metadata only)

## Efficient Resource Discovery Pattern

**Recommended Workflow:**

### Step 1: Start Broad

```typescript
// Get overview of available resources
resource_list({ type: 'checklist' });
// Scan descriptions for relevance
```

### Step 2: Narrow Down

```typescript
// Search for specific topics
resource_search({ query: 'api security', type: 'checklist' });
// Review top 3-5 results
```

### Step 3: Get Details

```typescript
// Check frontmatter for related resources
resource_info({ tool_name: 'checklist_api_security' });
// Verify it matches your needs
```

### Step 4: Load Minimal Set

```typescript
// Load only what you need
checklist_api_security();
knowledge_base_security_patterns();

// ⚠️ IMPORTANT: Context Window Management
// - Start with 1-2 most relevant resources
// - Load related resources only if gaps exist
// - Avoid loading everything at once
// - Large resources (>30k chars) show warnings
```

## Context Window Management

**Resource Size Warnings:**

- Resources > 30k chars: Warning logged
- Resources > 50k chars: Error with suggestion to split

**Best Practices:**

- Check resource size with `resource_info` before loading
- Load incrementally: start with 1-2 most relevant
- Use discovery tools to preview before full load
- Monitor context window usage throughout session

## Tool Configuration

Discovery tools follow OpenCode's standard tool configuration patterns.

**Global Configuration:**

```json
{
  "$schema": "https://opencode.ai/config.json",
  "tools": {
    "resource_list": true,
    "resource_search": true,
    "resource_info": true
  }
}
```

**Wildcard Control:**

```json
{
  "tools": {
    "resource_*": true // Enable all discovery tools
  }
}
```

**Per-Agent Configuration:**

```json
{
  "agent": {
    "analyzer": {
      "tools": {
        "resource_list": true,
        "resource_search": true,
        "resource_info": true,
        "read": true,
        "write": false
      }
    }
  }
}
```

**Markdown Frontmatter:**

```yaml
---
description: Documentation agent with resource discovery
mode: subagent
tools:
  resource_list: true
  resource_search: true
  resource_info: true
---
```

## Security Classification

**Low-Risk Tools** (Safe for all agents):

- `resource_list`: Read-only metadata listing
- `resource_search`: Read-only content search
- `resource_info`: Read-only metadata retrieval

**Recommendation:** Enable by default for all agents

**Resource Loading Tools** (Variable risk):

- `checklist_*`, `knowledge_base_*`, `task_*`: Medium risk (loads content)
- `command_*`, `agent_*`: Low-Medium risk (loads configuration)
- `template_*`: Low-Medium risk (loads template structure)

**Recommendation:** Enable per-agent based on role

## Performance Characteristics

| Tool               | Speed | Memory   | Context Impact        |
| ------------------ | ----- | -------- | --------------------- |
| `resource_list`    | Fast  | Low      | Low (metadata)        |
| `resource_search`  | Fast  | Low-Med  | Low (metadata)        |
| `resource_info`    | Fast  | Low      | Low (metadata)        |
| `checklist_*`      | Fast  | Low-High | High (full content)   |
| `knowledge_base_*` | Fast  | Low-High | High (full content)   |
| `task_*`           | Fast  | Low-Med  | Medium (task content) |

## Frontmatter Schema

Resources should include YAML frontmatter for enhanced discoverability.

**Required Fields:**

```yaml
description: string # One-line description (max 200 chars)
type: ResourceType # Must match directory
```

**Recommended Fields:**

```yaml
category: string # Documentation|Development|Operations|Quality|Security
tags: string[] # Keywords for search (minimum 2)
```

**Example:**

```yaml
---
description: Comprehensive API documentation checklist with REST and GraphQL support
type: checklist
category: Documentation
version: 1.2.0
last_updated: 2025-11-19
tags: [api, rest, graphql, openapi, documentation]
---
```

See [Frontmatter Schema](../../docs/frontmatter-schema.md) for complete documentation.

## Migration

### Add Frontmatter to Existing Resources

```bash
# Dry run to preview changes
bun run scripts/migrate-frontmatter.ts --dry-run

# Migrate all resources
bun run scripts/migrate-frontmatter.ts

# Migrate specific type
bun run scripts/migrate-frontmatter.ts --type=checklist
```

## Agent Configuration Recipes

### Full Discovery Agent

```json
{
  "agent": {
    "explorer": {
      "tools": {
        "resource_*": true,
        "checklist_*": true,
        "knowledge_base_*": true,
        "read": true
      }
    }
  }
}
```

### Discovery-Only Agent (Minimal Context)

```json
{
  "agent": {
    "scout": {
      "tools": {
        "resource_list": true,
        "resource_search": true,
        "resource_info": true,
        "read": true
      }
    }
  }
}
```

## Future Enhancements

Possible future additions:

- **Template Variables**: Support for parameterized resources
- **Hot Reload**: Auto-discovery on file changes
- **Section Arguments**: Tool args to load specific sections
- **Semantic Search**: Vector-based similarity search
- **Resource Versioning**: Support for multiple versions

## References

- [OpenCode Plugin Documentation](https://opencode.ai/docs/plugins/)
- [Anthropic Agent Skills Specification](https://github.com/anthropics/skills)
- Original implementation: [opencode-skills](https://github.com/malhashemi/opencode-skills)
