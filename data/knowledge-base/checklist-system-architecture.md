---
title: OpenCode Checklist System Architecture
description: Comprehensive guide to the OpenCode checklist system including structure, categories, usage patterns, and integration
type: knowledge-base
category: meta
version: 1.0.0
tags:
  - checklists
  - architecture
  - meta
  - validation
  - quality
  - system
related_resources:
  - ../command/list-checklists.md
  - ../template/opencode-checklist-tmpl.yaml
  - ../task/opencode-checklist.md
last_updated: 2025-11-19
---

# OpenCode Checklist System Architecture

> Complete reference for understanding and working with the OpenCode checklist system

## Overview

The OpenCode checklist system provides comprehensive validation criteria for ensuring quality and completeness across
all types of deliverables. Checklists are structured markdown documents with checkbox items that guide systematic
verification of work products. They serve as quality gates that ensure nothing is forgotten and standards are met
consistently.

**Key Characteristics:**

- Markdown format with YAML frontmatter
- Checkbox format for systematic verification
- Organized into 8-12 major sections
- Comprehensive coverage (20-400+ items)
- Reusable across commands, tasks, and agents
- Hierarchical organization (global and project-specific)

## Checklist Purpose

Checklists solve several critical problems:

### 1. Quality Assurance

Ensure deliverables meet comprehensive quality standards through systematic verification.

### 2. Completeness

Prevent oversight by providing exhaustive lists of items to verify.

### 3. Consistency

Ensure the same standards are applied every time through structured validation.

### 4. Knowledge Capture

Preserve quality standards and best practices in actionable format.

### 5. Process Standardization

Create repeatable, reliable processes for quality verification.

## Checklist Structure

All checklists follow a consistent markdown structure:

### Frontmatter (YAML Metadata)

```yaml
---
title: 'Checklist Title'
description: 'Brief description of what this checklist validates'
type: checklist
category: documentation|quality|development|operations|process
version: 1.0.0
tags: [tag1, tag2, tag3]
reference: 'path/to/related/documentation'
applies_to: [project-type1, project-type2]
---
```

### Core Sections

1. **Introduction**: Purpose, when to use, how to use
2. **Major Sections** (8-12): Organized validation areas
3. **Checkbox Items**: Verifiable items in `- [ ] **Key Point**: Explanation` format
4. **Subsections**: Hierarchical organization within major sections
5. **Quality Standards**: Section defining quality criteria
6. **Review Checklist**: Final validation before completion
7. **References**: Related resources and documentation

### Checkbox Format

**Standard Item:**

```markdown
- [ ] **Key requirement**: Explanation of what to check
```

**Nested Items:**

```markdown
- [ ] **Parent item**: Main requirement
  - [ ] Sub-requirement 1
  - [ ] Sub-requirement 2
```

**Item with Details:**

```markdown
- [ ] **Requirement with context**:
  - [ ] Specific detail 1
  - [ ] Specific detail 2
  - [ ] Specific detail 3
```

## Checklist Categories

Checklists are organized into five primary categories:

### Documentation Checklists

**Purpose:** Validate various types of documentation

**Examples:**

- `api-documentation` - API documentation validation
- `architecture-documentation` - Architecture docs with diagrams
- `development-documentation` - Dev setup and workflows
- `deployment-documentation` - Deployment procedures
- `onboarding-documentation` - Onboarding for new team members
- `pipeline-documentation` - CI/CD pipeline documentation

**When to use:** Creating or reviewing documentation

**Characteristics:**

- Comprehensive coverage of doc types
- Format and structure validation
- Content completeness checks
- Quality standards enforcement

### Quality Checklists

**Purpose:** Ensure quality standards and completeness

**Examples:**

- `documentation-discovery` - Discover existing documentation
- `strict-documentation-validation` - Enforce strict standards
- `task-discovery-validation` - Validate task discovery
- `template-discovery-validation` - Validate template discovery
- `knowledge-base-discovery-validation` - Validate KB discovery
- `command-discovery-validation` - Validate command discovery

**When to use:** Validating quality, discovering resources

**Characteristics:**

- Process-oriented
- Discovery and validation
- Quality enforcement
- Completeness verification

### Development Checklists

**Purpose:** Create OpenCode ecosystem resources

**Examples:**

- `opencode-agent` - Agent creation and validation
- `opencode-command` - Command creation and validation

**When to use:** Building new OpenCode resources

**Characteristics:**

- Meta-checklists
- Template compliance
- Integration validation
- Quality assurance for resources

### Operations Checklists

**Purpose:** Operational workflows and safety

**Examples:**

- `github-workflow-safety` - Safe GitHub operations

**When to use:** Operations, deployments, workflows

**Characteristics:**

- Safety-focused
- Operational procedures
- Best practices enforcement
- Risk mitigation

### Process Checklists

**Purpose:** Organizational processes and workflows

**Examples:**

- `ai-tool-approval` - Tool evaluation per RFC 98
- `jira-ticket-creation` - Ticket standards and structure

**When to use:** Tool approval, ticket creation, processes

**Characteristics:**

- Process standardization
- Organizational compliance
- Structured workflows
- Quality gates

## Checklist Size Guidelines

Checklists vary in size based on complexity:

### Quick Reference (15-30 items)

- **Sections:** 3-5
- **Use case:** Daily operations, quick verification
- **Example:** Simple validation checklists

### Standard Process (40-80 items)

- **Sections:** 6-10
- **Use case:** Standard procedures, feature development
- **Example:** Basic documentation checklists

### Comprehensive (100-200 items)

- **Sections:** 10-15
- **Use case:** Complex evaluations, audits, major initiatives
- **Example:** API documentation, architecture documentation

### Exhaustive (200+ items)

- **Sections:** 12-20
- **Use case:** Complete standards compliance, enterprise processes
- **Example:** opencode-command checklist (829+ items)

## Checklist Usage Patterns

### Pattern 1: Creation Validation

Validate work during creation:

```
1. Create deliverable
2. Load relevant checklist
3. Verify each item
4. Make improvements
5. Complete validation
```

**Used by:** All creation workflows

### Pattern 2: Review Gate

Quality gate before completion:

```
1. Complete work
2. Load checklist
3. Systematic review
4. Address gaps
5. Final approval
```

**Used by:** Review processes, quality gates

### Pattern 3: Process Guide

Guide step-by-step execution:

```
1. Start process
2. Follow checklist items
3. Complete each step
4. Verify completion
5. Process complete
```

**Used by:** Operational procedures

### Pattern 4: Discovery Framework

Systematic discovery process:

```
1. Define scope
2. Follow discovery checklist
3. Find all items
4. Validate completeness
5. Document findings
```

**Used by:** Resource discovery, documentation discovery

## Checklist Discovery

### File System Organization

**Global Checklists:**

```
~/.config/opencode/checklist/*.md
```

**Project Checklists:**

```
.opencode/checklist/*.md
```

**Override Behavior:** Project checklists override global checklists with the same name.

### Discovery Methods

**Shell Commands:**

```bash
# List global checklists
ls -1 ~/.config/opencode/checklist/*.md | xargs -I {} basename {} .md | sort

# List project checklists
ls -1 .opencode/checklist/*.md | xargs -I {} basename {} .md | sort
```

**Frontmatter Reading:**

```bash
# Extract title from checklist
head -20 checklist-file.md | grep '^title:' | cut -d: -f2-
```

## Checklist Lifecycle

### 1. Creation

- Use `opencode-checklist` meta-task
- Follow `opencode-checklist-tmpl.yaml` structure
- Define clear purpose and scope
- Organize items logically
- Include quality standards

### 2. Usage

- Referenced by commands for validation
- Used by tasks for quality checks
- Applied by agents for verification
- Followed during creation/review

### 3. Validation

- Review against template requirements
- Ensure completeness
- Verify item clarity
- Check organization

### 4. Maintenance

- Review quarterly or on standard changes
- Update for process changes
- Incorporate feedback
- Update version number

## Best Practices

### Checklist Creation

✅ **DO:**

- Start with clear purpose statement
- Use consistent formatting
- Make items specific and verifiable
- Group related items logically
- Include context where needed
- Link to supporting documentation
- Balance completeness with usability

❌ **DON'T:**

- Create overlapping checklists
- Use ambiguous language
- Make items too broad
- Skip organization
- Forget examples
- Ignore user feedback

### Checklist Usage

✅ **DO:**

- Read entire checklist first
- Check items systematically
- Document findings
- Address all gaps
- Seek clarification when unclear

❌ **DON'T:**

- Skip items
- Check without verifying
- Rush through validation
- Ignore failed items
- Modify checklist during use

### Checklist Maintenance

✅ **DO:**

- Review regularly
- Update on process changes
- Track versions properly
- Document changes
- Test after updates

❌ **DON'T:**

- Let checklists become stale
- Make breaking changes without version bump
- Skip testing
- Ignore feedback
- Remove items carelessly

## Integration Points

### With Commands

Commands use checklists for validation:

```
Command Execution → Load Checklist → Validate Output → Complete
```

**Example:** `/api-docs` uses `api-documentation` checklist

### With Tasks

Tasks reference checklists for quality checks:

```
Task Step → Execute → Load Checklist → Validate → Continue
```

**Example:** `opencode-command` task uses `opencode-command` checklist

### With Agents

Agents apply checklists for verification:

```
Agent Work → Load Checklist → Systematic Verification → Output
```

**Example:** documentalist uses documentation checklists

### With Templates

Checklists validate template compliance:

```
Template Application → Create Output → Checklist Validation → Verify
```

**Example:** Checklist items derived from template requirements

## Common Use Cases

### Use Case 1: Validate API Documentation

**Scenario:** Completed API documentation needs validation

**Solution:**

1. Load `api-documentation` checklist
2. Verify each section systematically
3. Check endpoints, authentication, examples
4. Address any gaps
5. Complete validation

### Use Case 2: Create New Command

**Scenario:** Creating new OpenCode command

**Solution:**

1. Use `opencode-command` task
2. Task applies `opencode-command` checklist
3. Verify template compliance
4. Check integration points
5. Validate completion

### Use Case 3: Tool Approval

**Scenario:** Need to evaluate new AI tool

**Solution:**

1. Load `ai-tool-approval` checklist
2. Evaluate security, privacy, compliance
3. Document findings
4. Complete comprehensive assessment
5. Generate approval recommendation

## Checklist Metadata Reference

### Frontmatter Fields

| Field       | Required | Description              | Example                                   |
| ----------- | -------- | ------------------------ | ----------------------------------------- |
| title       | Yes      | Checklist name           | "API Documentation Checklist"             |
| description | Yes      | Brief purpose            | "Validate API documentation completeness" |
| type        | Yes      | Always "checklist"       | checklist                                 |
| category    | Yes      | Primary category         | documentation                             |
| version     | Yes      | Semantic version         | 1.0.0                                     |
| tags        | No       | 5-10 keywords            | [api, rest, documentation]                |
| reference   | No       | Related docs             | "../docs/api-docs.md"                     |
| applies_to  | No       | Applicable project types | [rest-api, graphql-api]                   |

### Categories

- **documentation**: Documentation validation
- **quality**: Quality standards and discovery
- **development**: Resource creation validation
- **operations**: Operational workflows
- **process**: Organizational processes

## Troubleshooting

### Issue 1: Checklist Not Found

**Symptoms:**

- Error: "Checklist X not found"
- Command/task fails to load checklist

**Solution:**

1. Check checklist exists in `~/.config/opencode/checklist/` or `.opencode/checklist/`
2. Verify filename matches exactly (case-sensitive, `.md` extension)
3. Ensure frontmatter is valid YAML

### Issue 2: Too Many Items

**Symptoms:**

- Checklist overwhelming
- Items unclear or redundant

**Solution:**

1. Review and consolidate items
2. Break into multiple checklists if needed
3. Improve item clarity
4. Add better organization

### Issue 3: Items Not Verifiable

**Symptoms:**

- Unclear what to check
- Ambiguous requirements

**Solution:**

1. Make items specific
2. Add examples
3. Provide success criteria
4. Link to references

## Related Resources

- [OpenCode Checklist Template](../template/opencode-checklist-tmpl.yaml)
- [Checklist Creation Task](../task/opencode-checklist.md)
- [Task System Architecture](./task-system-architecture.md)
- [Template System Architecture](./template-system-architecture.md)

---

## Metadata

- **Category**: Meta
- **Tags**: checklists, architecture, validation, quality, system, meta
- **Difficulty**: Intermediate
- **Target Audience**: Checklist authors, command developers, quality engineers
- **Reading Time**: 12 minutes
