---
title: OpenCode Template System Architecture
description: Comprehensive guide to the OpenCode template system including structure, categories, usage patterns, and integration
type: knowledge-base
category: meta
version: 1.0.0
tags:
  - templates
  - architecture
  - meta
  - patterns
  - system
related_resources:
  - ../command/list-templates.md
  - ../template/opencode-template-tmpl.yaml
  - ../task/opencode-template.md
last_updated: 2025-11-19
---

# OpenCode Template System Architecture

> Complete reference for understanding and working with the OpenCode template system

## Overview

The OpenCode template system provides structured guidance for creating consistent, high-quality resources. Templates
define standard formats, best practices, examples, and validation criteria for various resource types. They serve as
blueprints for creating agents, commands, tasks, checklists, knowledge bases, and domain-specific documents.

**Key Characteristics:**

- YAML format with structured sections
- Comprehensive guidance and examples
- Best practices and validation criteria
- Reusable across creation workflows
- Hierarchical organization (global and project-specific)

## Template Purpose

Templates solve several critical problems:

### 1. Consistency

Ensure all resources of a given type follow the same structure and conventions.

### 2. Completeness

Provide checklists and requirements to ensure nothing is forgotten.

### 3. Quality

Embed best practices and validation criteria directly in the creation process.

### 4. Efficiency

Reduce time spent deciding structure by providing proven patterns.

### 5. Knowledge Transfer

Capture institutional knowledge in reusable, accessible format.

## Template Structure

All templates follow a consistent YAML structure:

### Core Metadata Section

```yaml
template_title: 'Template Name'
template_description: 'Brief description of template purpose'
template_version: '1.0.0'
template_category: 'Category name'
last_updated: 'YYYY-MM-DD'
reference: 'path/to/related/documentation'
```

### Structure Guidelines Section

Defines the high-level organization and requirements:

```yaml
structure:
  component_name:
    format: 'How this component should be formatted'
    required: true
    note: 'Additional guidance'
```

### Content Principles Section

Core principles for content creation:

```yaml
content_principles:
  clarity: ['Clear language', 'Specific details']
  completeness: ['Cover all aspects', 'Include examples']
  actionability: ['Make it executable', 'Provide verification']
  organization: ['Logical order', 'Consistent formatting']
```

### Formatting Standards Section

Markdown and other formatting conventions:

```yaml
formatting:
  markdown_elements:
    headings: ['# Title', '## Section', '### Subsection']
    emphasis: ['**Bold**', '_Italic_', '`Code`']
```

### Examples Section

Complete working examples:

```yaml
example_basic: |
  Simple example with minimal fields

example_complete: |
  Comprehensive example with all fields
```

### Best Practices Section

Key recommendations:

```yaml
best_practices:
  - 'Practice 1'
  - 'Practice 2'
  - 'Practice 3'
```

### Integration Section

How template integrates with other resources:

```yaml
integration:
  with_commands: 'How commands use this template'
  with_tasks: 'How tasks use this template'
```

## Template Categories

Templates are organized into five primary categories:

### OpenCode Resource Templates

**Purpose:** Create OpenCode ecosystem resources

**Templates:**

- `opencode-agent-tmpl.yaml` - Specialized agents for domains
- `opencode-command-tmpl.yaml` - Custom slash commands
- `opencode-task-tmpl.yaml` - Multi-step workflow definitions
- `opencode-checklist-tmpl.yaml` - Validation checklists
- `opencode-knowledge-base-tmpl.yaml` - Knowledge base articles
- `opencode-template-tmpl.yaml` - Meta-template for creating templates

**When to use:** Building new agents, commands, tasks, checklists, knowledge bases, or templates

**Characteristics:**

- Meta-templates (create other resources)
- Follow OpenCode conventions
- Include frontmatter specifications
- Provide complete examples

### Documentation Templates

**Purpose:** Structure documentation for consistency

**Templates:**

- `standard-doc-structure-tmpl.yaml` - Standard documentation organization
- API documentation templates
- Architecture documentation templates

**When to use:** Creating or standardizing project documentation

**Characteristics:**

- Focus on structure and organization
- Include section requirements
- Provide formatting standards
- Emphasize completeness

### Workflow Templates

**Purpose:** Support specific workflows and processes

**Templates:**

- `jira-ticket-description-tmpl.yaml` - Well-structured JIRA tickets
- `ai-tool-assessment-report-tmpl.yaml` - Tool evaluation reports
- `ai-tool-rfc-submission-tmpl.yaml` - RFC submission format

**When to use:** Executing standardized workflows (ticket creation, tool approval, etc.)

**Characteristics:**

- Process-oriented
- Include required fields for workflows
- Often integrate with external systems
- Provide acceptance criteria

### Reference Templates

**Purpose:** Quick reference and pattern lookup

**Templates:**

- `common-shell-commands-tmpl.yaml` - Shell command reference
- `task-reference-template-tmpl.yaml` - Task pattern reference
- `task-listing-format-tmpl.yaml` - Task listing format

**When to use:** Need quick lookup or format guidance

**Characteristics:**

- Concise and scannable
- Focus on patterns and examples
- Less prescriptive than other templates
- Support rapid decision-making

### Domain-Specific Templates

**Purpose:** Specialized domains and use cases

**Templates:**

- AI tool approval templates
- Pipeline configuration templates
- Security assessment templates

**When to use:** Working in specialized domains

**Characteristics:**

- Domain expertise embedded
- Specialized terminology
- Industry-specific standards
- Compliance requirements

## Template Usage Patterns

### Pattern 1: Creation Workflow

Templates guide resource creation:

```
1. Load template
2. Review structure and requirements
3. Fill in required sections
4. Add optional sections as needed
5. Validate against checklist
6. Save resource
```

**Used by:** Creation commands and tasks (create-agent, create-command, etc.)

### Pattern 2: Validation Reference

Templates provide validation criteria:

```
1. Create resource
2. Load relevant template
3. Compare against template requirements
4. Identify missing elements
5. Improve resource
```

**Used by:** Quality checks and reviews

### Pattern 3: Learning Resource

Templates teach best practices:

```
1. Read template structure
2. Study examples
3. Understand principles
4. Apply patterns to new resources
```

**Used by:** New contributors learning conventions

### Pattern 4: Format Specification

Templates define output formats:

```
1. Generate content
2. Load format template
3. Structure output according to template
4. Ensure consistency
```

**Used by:** Output formatting in commands/agents

## Template Discovery

### File System Organization

**Global Templates:**

```
~/.config/opencode/template/*.yaml
```

**Project Templates:**

```
.opencode/template/*.yaml
```

**Override Behavior:** Project templates override global templates with the same name.

### Discovery Methods

**Shell Commands:**

```bash
# List global templates
ls -1 ~/.config/opencode/template/*.yaml | xargs -I {} basename {}

# List project templates
ls -1 .opencode/template/*.yaml | xargs -I {} basename {}
```

**YAML Parsing:**

```bash
# Extract title from template
grep '^template_title:' template-file.yaml | cut -d: -f2-
```

## Template Lifecycle

### 1. Creation

- Use `opencode-template` meta-task
- Follow `opencode-template-tmpl.yaml` structure
- Define clear purpose and scope
- Include comprehensive examples

### 2. Usage

- Referenced by creation tasks/commands
- Loaded during resource creation
- Used for validation
- Consulted for patterns

### 3. Validation

- Review against `opencode-template-tmpl.yaml`
- Ensure completeness
- Verify examples work
- Check best practices included

### 4. Maintenance

- Review quarterly or on standard changes
- Update for convention changes
- Incorporate feedback
- Update version number

## Template Design Patterns

### Pattern 1: Structural Template

**Purpose:** Define resource structure and organization

**Characteristics:**

- Emphasizes sections and hierarchy
- Provides structural requirements
- Includes organization logic

**Example:** `opencode-task-tmpl.yaml`, `standard-doc-structure-tmpl.yaml`

### Pattern 2: Content Template

**Purpose:** Define content requirements and style

**Characteristics:**

- Focuses on content completeness
- Specifies required information
- Defines content principles

**Example:** `jira-ticket-description-tmpl.yaml`

### Pattern 3: Format Template

**Purpose:** Define output formatting and presentation

**Characteristics:**

- Specifies formatting rules
- Provides display options
- Includes formatting examples

**Example:** `task-listing-format-tmpl.yaml`

### Pattern 4: Reference Template

**Purpose:** Provide quick lookup and patterns

**Characteristics:**

- Concise pattern catalog
- Example-focused
- Quick reference format

**Example:** `common-shell-commands-tmpl.yaml`

### Pattern 5: Meta-Template

**Purpose:** Template for creating templates

**Characteristics:**

- Self-referential structure
- Defines template standards
- Guides template creation

**Example:** `opencode-template-tmpl.yaml`

## Best Practices

### Template Creation

✅ **DO:**

- Follow `opencode-template-tmpl.yaml` structure
- Include 2-3 complete examples
- Specify required vs optional sections
- Embed best practices
- Provide validation criteria

❌ **DON'T:**

- Create overly complex templates (split instead)
- Skip examples section
- Use ambiguous language
- Omit integration guidance
- Forget version tracking

### Template Usage

✅ **DO:**

- Read entire template before starting
- Follow structure guidance
- Use examples as reference
- Validate against requirements
- Adapt appropriately for context

❌ **DON'T:**

- Skip sections without reason
- Ignore best practices
- Copy examples without adaptation
- Deviate from structure without documentation
- Use wrong template for the job

### Template Maintenance

✅ **DO:**

- Review quarterly
- Update on convention changes
- Track versions properly
- Document breaking changes
- Test after modifications

❌ **DON'T:**

- Let templates become stale
- Make breaking changes without version bump
- Skip testing after updates
- Ignore user feedback
- Remove sections carelessly

## Integration Points

### With Tasks

Tasks use templates for resource creation:

```
Task Step → Load Template → Apply Structure → Create Resource
```

**Example:** `opencode-command` task uses `opencode-command-tmpl.yaml`

### With Commands

Commands reference templates for user guidance:

```
Command Invocation → Template Loading → Structure Application → Output
```

**Example:** `/create-agent` command uses `opencode-agent-tmpl.yaml`

### With Checklists

Checklists validate against template requirements:

```
Resource Created → Load Checklist → Compare to Template → Validate
```

**Example:** Checklist items derived from template requirements

### With Knowledge Bases

Knowledge bases provide patterns referenced by templates:

```
Template Section → Reference KB → Apply Pattern → Generate Content
```

**Example:** Template references `mermaid-diagrams.md` for diagram guidance

## Template Metadata Reference

### Standard Fields

| Field                | Required | Description               | Example                               |
| -------------------- | -------- | ------------------------- | ------------------------------------- |
| template_title       | Yes      | Human-readable name       | "OpenCode Agent Template"             |
| template_description | Yes      | Brief purpose description | "Template for creating custom agents" |
| template_version     | Yes      | Semantic version          | "1.0.0"                               |
| template_category    | Yes      | Primary category          | "meta"                                |
| last_updated         | Yes      | Last update date          | "2025-11-19"                          |
| reference            | No       | Related documentation     | "../docs/agents.md"                   |

### Categories

- **meta**: Templates for OpenCode resources
- **documentation**: Documentation structure templates
- **workflow**: Process and workflow templates
- **reference**: Quick reference templates
- **domain**: Domain-specific templates

## Template Size Guidelines

Optimal template sizes by type:

| Template Type | Target Size   | Purpose                      |
| ------------- | ------------- | ---------------------------- |
| Structural    | 250-400 lines | Define resource structure    |
| Content       | 200-350 lines | Specify content requirements |
| Format        | 150-250 lines | Define output formatting     |
| Reference     | 100-200 lines | Quick pattern lookup         |
| Meta          | 250-350 lines | Template creation guidance   |

**General guideline:** Target 250-300 lines (±10% tolerance)

Aim for focused, comprehensive templates. Split very broad topics into multiple templates.

## Common Use Cases

### Use Case 1: Create New Agent

**Scenario:** Need specialized agent for domain

**Solution:**

1. Load `opencode-agent-tmpl.yaml`
2. Review agent structure requirements
3. Fill in agent configuration
4. Add tool specifications
5. Validate against template checklist

### Use Case 2: Standardize Documentation

**Scenario:** Project documentation inconsistent

**Solution:**

1. Load `standard-doc-structure-tmpl.yaml`
2. Identify missing sections
3. Reorganize per template structure
4. Add required sections
5. Validate completeness

### Use Case 3: Create JIRA Ticket

**Scenario:** Need well-structured ticket

**Solution:**

1. Load `jira-ticket-description-tmpl.yaml`
2. Fill required fields
3. Add acceptance criteria
4. Include context and examples
5. Validate against checklist

## Troubleshooting

### Issue 1: Template Not Found

**Symptoms:**

- Error: "Template X not found"
- Command/task fails to load template

**Solution:**

1. Check template exists in `~/.config/opencode/template/` or `.opencode/template/`
2. Verify filename matches exactly (case-sensitive, `.yaml` extension)
3. Validate YAML syntax is correct

### Issue 2: Template Structure Invalid

**Symptoms:**

- YAML parsing errors
- Missing required sections

**Solution:**

1. Validate YAML syntax with linter
2. Compare against `opencode-template-tmpl.yaml`
3. Check all required fields present
4. Verify indentation correct

### Issue 3: Template Examples Don't Work

**Symptoms:**

- Examples fail when applied
- Generated resources invalid

**Solution:**

1. Test examples independently
2. Update examples to match current conventions
3. Validate examples against actual usage
4. Document any known limitations

## Related Resources

- [OpenCode Template Meta-Template](../template/opencode-template-tmpl.yaml)
- [Template Creation Task](../task/opencode-template.md)
- [Template Standard Documentation](../docs/template-standard.md)
- [Task System Architecture](./task-system-architecture.md)

---

## Metadata

- **Category**: Meta
- **Tags**: templates, architecture, patterns, system, meta
- **Difficulty**: Intermediate
- **Target Audience**: Template authors, command developers, task creators
- **Reading Time**: 15 minutes
