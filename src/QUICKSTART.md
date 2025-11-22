# Quick Start: Resource Loader Plugin

## What is it?

A plugin that automatically discovers and loads `.opencode` resources with intelligent search capabilities.

## Available Tools (in this project)

### Checklists (5)

```
checklist_development_documentation
checklist_api_documentation
checklist_architecture_documentation
checklist_onboarding_documentation
checklist_deployment_documentation
```

### Knowledge Base (8)

```
knowledge_base_plugin_architecture
knowledge_base_plugin_migration
knowledge_base_gitlab_ci_examples
knowledge_base_mermaid_diagrams
knowledge_base_loading_strategy
knowledge_base_pipeline_best_practices
knowledge_base_github_actions_templates
knowledge_base_jenkins_patterns
```

### Templates (4)

```
template_common_shell_commands
template_skill_reference_template
template_README
template_standard_doc_structure
```

## Discovery Tools (NEW!)

### Find Resources Dynamically

```typescript
// List all checklists
resource_list({ type: 'checklist' });

// Search for API-related resources
resource_search({ query: 'api' });

// Get details about a specific resource
resource_info({ tool_name: 'checklist_api_documentation' });
```

**Benefits:**

- No need to know exact tool names
- Search by keyword, category, or tags
- Preview metadata before loading
- Low context impact (metadata only)

## How to Use Resources

### Efficient Pattern (Recommended)

```typescript
// 1. Search for what you need
resource_search({ query: 'api documentation', type: 'checklist' });

// 2. Review results and get details
resource_info({ tool_name: 'checklist_api_documentation' });

// 3. Load only what you need
checklist_api_documentation();
```

### Direct Loading

If you know the exact tool name:

```typescript
// Load a checklist
checklist_api_documentation();

// Reference a pattern
knowledge_base_jenkins_patterns();

// Use a template
template_skill_reference_template();
```

The content will be automatically loaded into your session context.

## Adding New Resources

1. Create a markdown file with frontmatter:

```yaml
---
description: Brief one-line description of the resource
type: checklist # or knowledge-base, task, template, agent, command
category: Documentation # Documentation|Development|Operations|Quality|Security
tags: [api, rest, documentation] # Minimum 2 tags
---
# Your Resource Title

Content here...
```

1. Place in appropriate directory:
   - `.opencode/agent/my-agent.md`
   - `.opencode/checklist/my-checklist.md`
   - `.opencode/command/my-command.md`
   - `.opencode/knowledge-base/my-pattern.md`
   - `.opencode/task/my-workflow.md`
   - `.opencode/template/my-template.md`

2. Restart OpenCode

3. Your new tool will be available as:
   - `agent_my_agent`
   - `checklist_my_checklist`
   - `command_my_command`
   - `knowledge_base_my_pattern`
   - `task_my_workflow`
   - `template_my_template`

4. Discover it with: `resource_search({ query: "my" })`

## Tips

- **Use discovery tools first**: Search before loading to save context
- **Add frontmatter**: Enables categorization and intelligent search
- **Use descriptive filenames**: They become tool names
- **Tag thoughtfully**: Include 3-5 relevant tags for discoverability
- **Standard markdown**: No special formatting required
- **Nested folders work**: `.opencode/task/deployment/prod.md` → `task_deployment_prod`
- **Check resource size**: Use `resource_info` to preview before loading

## Context Window Management

⚠️ **Important:**

- Resources > 30k chars: Warning logged
- Resources > 50k chars: Error returned
- Use discovery tools to preview before loading
- Load incrementally (1-2 resources at a time)

## Testing

Run the test script to see all discovered tools:

```bash
cd .opencode/plugin
bun test-resource-loader.ts
```

## Example Workflows

### Scenario 1: Find API Documentation Checklist

```typescript
// Search for API checklists
resource_search({ query: 'api', type: 'checklist' });
// Returns: checklist_api_documentation (score: 50)

// Get details
resource_info({ tool_name: 'checklist_api_documentation' });
// Shows: metadata, related resources, size

// Load it
checklist_api_documentation();
```

### Scenario 2: Explore Jenkins Patterns

```typescript
// List all Jenkins-related resources
resource_search({ query: 'jenkins' });
// Returns multiple matches across types

// Get related resources
resource_info({ tool_name: 'knowledge_base_jenkins_patterns' });
// Check related_resources field

// Load minimal set
knowledge_base_jenkins_patterns();
```

### Scenario 3: Browse by Category

```typescript
// List all documentation resources
resource_list({ category: 'Documentation', limit: 20 });

// Filter by type
resource_list({ type: 'knowledge-base', category: 'Documentation' });

// Search within category
resource_search({ query: 'deployment', type: 'task' });
```

## More Info

- Full documentation: `README.md`
- Frontmatter schema: `../../docs/frontmatter-schema.md`
- Migration script: `../../scripts/migrate-frontmatter.ts`
- Tests: `index.test.ts`
