# Frontmatter Schema Documentation

## Overview

Frontmatter provides structured metadata for resources in YAML format. It appears at the beginning of markdown files, enclosed by triple dashes (`---`).

## Basic Structure

```yaml
---
# Required fields
description: string
type: ResourceType

# Recommended fields
category: string
tags: string[]

# Optional fields
version: string
title: string

# Type-specific fields (see below)
---
```

## Required Fields

### description

**Type**: `string`  
**Required**: Yes  
**Max Length**: 200 characters

A concise, one-line description of the resource. This appears in search results and listings.

**Example**:

```yaml
description: Comprehensive API documentation checklist with REST and GraphQL support
```

**Guidelines**:

- Keep it under 200 characters
- Make it descriptive and specific
- Avoid redundant phrases like "This is a..."
- Focus on what the resource provides

### type

**Type**: `ResourceType`  
**Required**: Yes  
**Values**: `agent`, `checklist`, `command`, `knowledge-base`, `task`, `template`

Must match the directory the resource is in.

**Example**:

```yaml
type: checklist
```

**Validation**:

- Must match one of the six resource types
- Must match the parent directory name

## Recommended Fields

### category

**Type**: `string`  
**Recommended**: Yes  
**Values**: `Documentation`, `Development`, `Operations`, `Quality`, `Security`, or custom

Categorizes the resource for filtering and organization.

**Example**:

```yaml
category: Documentation
```

**Standard Categories**:

- `Documentation`: Documentation-related resources
- `Development`: Development workflows and tools
- `Operations`: Deployment and operations
- `Quality`: Testing and quality assurance
- `Security`: Security practices and audits

### tags

**Type**: `string[]`  
**Recommended**: Yes  
**Min Length**: 2 tags

Keywords for search and discovery.

**Example**:

```yaml
tags: [api, rest, graphql, openapi, documentation]
```

**Guidelines**:

- Use lowercase
- Include at least 2 tags
- Use specific, searchable terms
- Include acronyms (API, REST, CI/CD)
- Include technology names (Jenkins, GitLab, TypeScript)

## Optional Fields

### version

**Type**: `string`  
**Format**: Semantic versioning (e.g., `1.2.0`)

Tracks resource version for change management.

**Example**:

```yaml
version: 1.2.0
```

### title

**Type**: `string`

Alternative title for the resource (defaults to filename).

**Example**:

```yaml
title: Complete API Documentation Guide
```

### last_updated

**Type**: `string`  
**Format**: ISO 8601 date (e.g., `2025-11-19`)

Tracks when the resource was last modified.

**Example**:

```yaml
last_updated: 2025-11-19
```

## Type-Specific Fields

### Checklist-Specific

#### reference

**Type**: `string`  
**Format**: URL or file path

Reference to standards, RFCs, or source documentation.

**Example**:

```yaml
reference: https://swagger.io/specification/
```

#### applies_to

**Type**: `string[]`

Project types or contexts where this checklist applies.

**Example**:

```yaml
applies_to: [web-api, microservices, rest-services]
```

### Task-Specific

#### mode

**Type**: `string`  
**Value**: Always `"task"`

Identifies the resource as a task for OpenCode.

**Example**:

```yaml
mode: task
```

#### temperature

**Type**: `number`  
**Range**: 0.0 to 1.0

LLM temperature setting for task execution.

**Example**:

```yaml
temperature: 0.7
```

#### estimated_duration

**Type**: `string`

Estimated time to complete the task.

**Example**:

```yaml
estimated_duration: 30 minutes
```

### Knowledge Base-Specific

#### difficulty

**Type**: `string`  
**Values**: `beginner`, `intermediate`, `advanced`

Skill level required to understand the content.

**Example**:

```yaml
difficulty: intermediate
```

#### related_resources

**Type**: `string[]`

Related resource tool names or file paths.

**Example**:

```yaml
related_resources:
  - checklist_api_documentation
  - knowledge_base_rest_patterns
```

## Complete Examples

### Checklist Example

```yaml
---
description: Comprehensive API documentation checklist with REST and GraphQL support
type: checklist
category: Documentation
tags: [api, rest, graphql, openapi, documentation]
version: 1.2.0
last_updated: 2025-11-19
reference: https://swagger.io/specification/
applies_to: [web-api, microservices, rest-services]
---
# API Documentation Checklist

Your content here...
```

### Task Example

```yaml
---
description: Production deployment workflow with rollback procedures
type: task
category: Operations
tags: [deployment, production, ci-cd, rollback]
version: 2.0.0
mode: task
temperature: 0.3
estimated_duration: 45 minutes
---
# Production Deployment

Your content here...
```

### Knowledge Base Example

```yaml
---
description: Design patterns for scalable REST APIs
type: knowledge-base
category: Development
tags: [rest, api, design-patterns, architecture]
version: 1.0.0
difficulty: intermediate
related_resources:
  - checklist_api_documentation
  - knowledge_base_microservices_patterns
---
# REST API Design Patterns

Your content here...
```

### Agent Example

```yaml
---
description: Code review agent focused on security best practices
type: agent
category: Security
tags: [security, code-review, static-analysis]
version: 1.1.0
temperature: 0.5
---
# Security Code Review Agent

Your content here...
```

### Command Example

```yaml
---
description: Generate comprehensive project documentation
type: command
category: Documentation
tags: [documentation, automation, markdown]
version: 1.0.0
---
# Generate Documentation Command

Your content here...
```

### Template Example

```yaml
---
description: Standard structure for OpenCode skill documentation
type: template
category: Documentation
tags: [template, skills, documentation-template]
version: 1.0.0
---
# Skill Documentation Template

Your content here...
```

## Validation Rules

### Required Field Validation

- `description`: Must be present and non-empty
- `type`: Must match parent directory

### Type Validation

- `type` must be one of: `agent`, `checklist`, `command`, `knowledge-base`, `task`, `template`
- Must match the directory the file is in

### Tag Validation

- Should include at least 2 tags
- Tags should be lowercase
- Tags should be specific and searchable

### Version Validation

- Should follow semantic versioning (major.minor.patch)
- Example: `1.2.0`, `2.0.0-beta`, `1.0.0-rc.1`

## Best Practices

### Description Writing

**Good Examples**:

```yaml
description: Comprehensive API documentation checklist with REST and GraphQL support
description: Production deployment workflow with automated rollback
description: Security code review agent with OWASP Top 10 focus
```

**Bad Examples**:

```yaml
description: This is a checklist  # Too generic
description: API  # Too short
description: This resource contains information about... # Redundant
```

### Tag Selection

**Good Examples**:

```yaml
tags: [api, rest, graphql, openapi, documentation]  # Specific, searchable
tags: [deployment, kubernetes, helm, gitops]  # Technology-focused
tags: [security, owasp, code-review, static-analysis]  # Domain-specific
```

**Bad Examples**:

```yaml
tags: [good, useful]  # Too generic
tags: [documentation]  # Too few, too broad
tags: [API, REST, GRAPHQL]  # Should be lowercase
```

### Category Selection

**Guidelines**:

- Use standard categories when possible
- Create custom categories sparingly
- Be consistent across related resources

### Related Resources

**Guidelines**:

- Use tool names (e.g., `checklist_api_documentation`)
- List 2-5 most relevant resources
- Ensure bidirectional relationships when possible

## Migration

### Adding Frontmatter to Existing Resources

Use the migration script:

```bash
# Dry run to preview changes
bun run scripts/migrate-frontmatter.ts --dry-run

# Migrate all resources
bun run scripts/migrate-frontmatter.ts

# Migrate specific type
bun run scripts/migrate-frontmatter.ts --type=checklist
```

### Manual Migration

1. Add `---` markers at the top of the file
2. Add required fields (`description`, `type`)
3. Add recommended fields (`category`, `tags`)
4. Add optional and type-specific fields as needed
5. Validate YAML syntax

## Troubleshooting

### Invalid YAML

If frontmatter fails to parse:

1. Check for proper `---` markers
2. Validate YAML syntax (use a YAML validator)
3. Check for special characters that need quoting
4. Ensure proper indentation (2 spaces)

### Type Mismatch

If type doesn't match directory:

```yaml
# File: .opencode/checklist/api-docs.md
type: checklist  # ✅ Correct
type: task       # ❌ Wrong - doesn't match directory
```

### Description Too Long

If description exceeds 200 characters:

1. Remove unnecessary words
2. Focus on key features
3. Save details for content body

### Missing Tags

If resource has no tags:

1. Add at least 2 specific tags
2. Include technology names
3. Include domain keywords
4. Make tags searchable

## Schema Definition

TypeScript interface:

```typescript
interface Frontmatter {
  // Standard fields
  title?: string;
  description?: string;
  type?: ResourceType;
  category?: string;
  version?: string;
  tags?: string[];
  last_updated?: string;

  // Type-specific fields
  reference?: string; // Checklist
  applies_to?: string[]; // Checklist
  temperature?: number; // Task/Agent
  mode?: string; // Task
  estimated_duration?: string; // Task
  difficulty?: string; // Knowledge base
  related_resources?: string[]; // Knowledge base
}
```

## References

- [YAML Specification](https://yaml.org/spec/)
- [Semantic Versioning](https://semver.org/)
- [OpenCode Documentation](https://opencode.ai/docs/)
