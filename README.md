# OpenCode Resources Loader Plugin

[![npm version](https://img.shields.io/npm/v/@pantheon-ai/opencode-resources-loader.svg)](https://www.npmjs.com/package/@pantheon-ai/opencode-resources-loader)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-1.0-orange.svg)](https://bun.sh/)

**Automatically discover and load documentation resources from `.opencode` subdirectories as native OpenCode tools**

Transform your markdown documentation into instantly accessible OpenCode tools with intelligent search, dynamic discovery, and seamless integration.

[Quick Start](#quick-start) • [Documentation](https://pantheon-org.github.io/opencode-resources-loader-plugin/) • [Contributing](./CONTRIBUTING.md)

---

## Features

🔍 **Smart Discovery**

- Three powerful discovery tools: `resource_list`, `resource_search`, `resource_info`
- Intelligent search with multi-word queries and relevance scoring
- 5-minute search caching for optimal performance

📦 **Six Resource Types**

- **Agents**: Specialized agent configurations
- **Checklists**: Step-by-step process guides
- **Commands**: Slash commands and workflows
- **Knowledge Bases**: Reference documentation
- **Tasks**: Task templates and workflows
- **Templates**: Reusable examples

🔄 **Dynamic Tool Generation**

- Automatic tool creation with pattern `{type}_{resource_name}`
- Example: `checklist_api_documentation`, `knowledge_base_jenkins_patterns`

🌐 **Multi-Location Support**

- Project-local: `.opencode/` (highest priority)
- Global config: `~/.config/opencode/`
- Global home: `~/.opencode/`

🏷️ **Rich Metadata**

- YAML frontmatter support
- Categories and tags for organization
- Version tracking and related resources

⚡ **Performance Optimized**

- Fast in-memory indexing
- Cached search results
- Context-aware size management

## Quick Start

### Installation

Add the plugin to your [OpenCode config](https://opencode.ai/docs/config/):

```json
{
  "$schema": "https://opencode.ai/config.json",
  "plugin": ["@pantheon-ai/opencode-resources-loader"]
}
```

### Create Resources

Organize your documentation in `.opencode` directories:

```
.opencode/
├── checklist/
│   └── api-documentation.md
├── knowledge-base/
│   └── best-practices.md
└── task/
    └── deployment.md
```

### Use Discovery Tools

```typescript
// List all available resources
resource_list({ type: 'all' });

// Search for specific topics
resource_search({ query: 'api documentation' });

// Get detailed info
resource_info({ tool_name: 'checklist_api_documentation' });

// Load a resource directly
checklist_api_documentation();
```

## Resource Structure

### Directory Layout

```
.opencode/
├── agent/              # Specialized agent configurations
├── checklist/          # Step-by-step checklists
├── command/            # Slash commands
├── knowledge-base/     # Reference documentation
├── task/               # Task templates
└── template/           # Reusable templates
```

### Markdown with Frontmatter

```markdown
---
description: Comprehensive API documentation checklist
type: checklist
category: Documentation
tags: [api, rest, graphql, documentation]
version: 1.0.0
---

# API Documentation Checklist

Your content here...
```

## Tool Naming Convention

Tools are automatically named from file paths:

| File Path                            | Generated Tool Name               |
| ------------------------------------ | --------------------------------- |
| `checklist/api-documentation.md`     | `checklist_api_documentation`     |
| `knowledge-base/jenkins-patterns.md` | `knowledge_base_jenkins_patterns` |
| `task/deployment/prod-deploy.md`     | `task_deployment_prod_deploy`     |

## Discovery Tools

### resource_list

List and filter resources by type, category, or tags.

```typescript
// List all checklists
resource_list({ type: 'checklist' });

// Filter by category
resource_list({ category: 'Documentation' });

// Filter by tag
resource_list({ tag: 'api' });
```

### resource_search

Search with intelligent relevance scoring.

```typescript
// Search across all fields
resource_search({ query: 'api documentation' });

// Search within specific type
resource_search({ query: 'deployment', type: 'task' });

// Limit results
resource_search({ query: 'security', max_results: 5 });
```

### resource_info

Get detailed resource metadata.

```typescript
// View full metadata and related resources
resource_info({ tool_name: 'checklist_api_documentation' });
```

## Performance

- **Discovery**: Runs once at initialization
- **Search**: < 100ms for 100+ resources
- **Caching**: 5-minute TTL for search results
- **Memory**: Efficient on-demand loading

## Context Window Management

The plugin helps manage context usage:

- **Size Warnings**: Resources > 30k characters show warnings
- **Size Limits**: Resources > 50k characters return errors
- **Discovery First**: Preview resources before loading with `resource_info`
- **Load Incrementally**: Start with 1-2 most relevant resources

### Recommended Workflow

1. **List**: `resource_list({ type: 'checklist' })`
2. **Search**: `resource_search({ query: 'api security' })`
3. **Check**: `resource_info({ tool_name: 'checklist_api_security' })`
4. **Load**: `checklist_api_security()`

## Configuration

### Restart Required

Resources are discovered at plugin initialization. Restart OpenCode after adding new resources:

```bash
# Restart OpenCode to discover new resources
opencode
```

### Tool Configuration

Enable/disable discovery tools in your OpenCode config:

```json
{
  "tools": {
    "resource_list": true,
    "resource_search": true,
    "resource_info": true
  }
}
```

## Priority Handling

When duplicate tool names exist, priority is:

1. **Highest**: `.opencode/` (project-local)
2. **Medium**: `~/.config/opencode/` (global config)
3. **Lowest**: `~/.opencode/` (global home)

Project-local resources always override global ones.

## Documentation

- **[Full Documentation](https://pantheon-org.github.io/opencode-resources-loader-plugin/)** - Complete documentation site
- **[API Reference](https://pantheon-org.github.io/opencode-resources-loader-plugin/api)** - Detailed API docs
- **[Architecture](https://pantheon-org.github.io/opencode-resources-loader-plugin/architecture)** - System design
- **[Development Guide](https://pantheon-org.github.io/opencode-resources-loader-plugin/development)** - Contributing guide

## Development

```bash
# Install dependencies
bun install

# Run tests
bun test

# Type checking
bun run type-check

# Linting
bun run lint

# Format code
bun run format
```

See [Development Guide](https://pantheon-org.github.io/opencode-resources-loader-plugin/development) for details.

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
3. Remember: project-local resources take priority

### Tool Not Working

1. Verify markdown file is valid UTF-8
2. Check file permissions are readable
3. Look for console errors during initialization
4. Ensure the file contains content

## Contributing

We welcome contributions! See our [Contributing Guide](./CONTRIBUTING.md) for details.

Quick links:

- **[Issues](https://github.com/pantheon-org/opencode-resources-loader-plugin/issues)** - Report bugs or request features
- **[Discussions](https://github.com/pantheon-org/opencode-resources-loader-plugin/discussions)** - Ask questions
- **[Pull Requests](https://github.com/pantheon-org/opencode-resources-loader-plugin/pulls)** - Submit changes

## License

MIT License - see [LICENSE](./LICENSE) file for details.

## Support

- **Issues**: [GitHub Issues](https://github.com/pantheon-org/opencode-resources-loader-plugin/issues)
- **Discussions**: [GitHub Discussions](https://github.com/pantheon-org/opencode-resources-loader-plugin/discussions)
- **Documentation**: [GitHub Pages](https://pantheon-org.github.io/opencode-resources-loader-plugin/)

---

**Built with ❤️ for the OpenCode community**
