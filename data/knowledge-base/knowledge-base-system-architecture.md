---
title: OpenCode Knowledge Base System Architecture
description: Comprehensive guide to the OpenCode knowledge base system including structure, categories, usage patterns, and integration
type: knowledge-base
category: meta
version: 1.0.0
tags:
  - knowledge-base
  - architecture
  - meta
  - documentation
  - system
related_resources:
  - ../command/list-knowledge-bases.md
  - ../template/opencode-knowledge-base-tmpl.yaml
  - ../task/opencode-knowledge-base.md
last_updated: 2025-11-19
---

# OpenCode Knowledge Base System Architecture

> Complete reference for understanding and working with the OpenCode knowledge base system

## Overview

The OpenCode knowledge base system provides comprehensive reference documentation for patterns, best practices, and
domain-specific knowledge. Knowledge bases are markdown articles that capture institutional knowledge in a structured,
searchable format. They serve as the foundation for teaching agents and developers about established patterns,
frameworks, and proven solutions.

**Key Characteristics:**

- Markdown format with YAML frontmatter
- Structured sections (concepts, patterns, practices, examples)
- Comprehensive coverage of specific topics
- Reusable across agents, commands, and tasks
- Hierarchical organization (global and project-specific)

## Knowledge Base Purpose

Knowledge bases solve several critical problems:

### 1. Knowledge Capture

Preserve institutional knowledge about patterns, best practices, and solutions in accessible format.

### 2. Consistency

Ensure teams follow the same patterns and practices by documenting them centrally.

### 3. Onboarding

Help new team members learn patterns quickly through comprehensive reference material.

### 4. Decision Support

Provide context and examples to support informed decision-making.

### 5. Quality Standards

Establish and communicate quality standards through documented best practices.

## Knowledge Base Structure

All knowledge bases follow a consistent markdown structure:

### Frontmatter (YAML Metadata)

```yaml
---
title: 'Knowledge Base Title'
description: 'Brief description of content'
type: knowledge-base
category: documentation|cicd|development|patterns|domain
version: 1.0.0
difficulty: beginner|intermediate|advanced
tags: [tag1, tag2, tag3]
related_resources: ['path/to/related/resource']
---
```

### Core Sections

1. **Overview**: Introduction, scope, and when to use this knowledge base
2. **Core Concepts**: Key concepts with definitions, purpose, and examples
3. **Common Patterns**: Solutions to recurring problems with implementation details
4. **Best Practices**: DO and DON'T guidance with explanations
5. **Examples**: Complete working examples demonstrating concepts
6. **Quick Reference**: Tables, cheat sheets, command references
7. **Troubleshooting**: Common issues and solutions
8. **Related Resources**: Links to related documentation

### Content Organization

**Progressive Detail:**

- Start with high-level overview
- Define core concepts
- Present common patterns
- Show working examples
- Provide quick reference

**Consistent Format:**

- Clear headings and subheadings
- Code blocks with syntax highlighting
- Tables for comparisons
- Bullet lists for enumerations
- Callouts for important notes

## Knowledge Base Categories

Knowledge bases are organized into five primary categories:

### Documentation Knowledge Bases

**Purpose:** Guides for creating documentation, diagrams, and content

**Examples:**

- `mermaid-diagrams` - Visual documentation with Mermaid
- `acceptance-criteria` - Writing clear acceptance criteria
- `template-standard` - Documentation template standards

**When to use:** Creating or improving documentation

**Characteristics:**

- Focus on documentation quality
- Include formatting standards
- Provide writing guidelines
- Emphasize clarity and completeness

### CI/CD Knowledge Bases

**Purpose:** Pipeline patterns, platform-specific guides, deployment strategies

**Examples:**

- `pipeline-best-practices` - Cross-platform CI/CD best practices
- `jenkins-patterns` - Jenkins pipeline patterns
- `gitlab-ci-examples` - GitLab CI/CD examples
- `github-actions-templates` - GitHub Actions workflows

**When to use:** Setting up or optimizing CI/CD pipelines

**Characteristics:**

- Platform-specific guidance
- Security-focused
- Performance optimization
- Production-ready examples

### Development Knowledge Bases

**Purpose:** Coding practices, architecture patterns, development workflows

**Examples:**

- `loading-strategy` - Resource loading optimization
- `plugin-architecture` - Plugin design patterns
- `plugin-migration` - Migration strategies

**When to use:** Building features, refactoring, improving code quality

**Characteristics:**

- Code-focused
- Architecture patterns
- Performance considerations
- Practical examples

### Patterns and Frameworks Knowledge Bases

**Purpose:** Methodologies, prioritization, requirement management

**Examples:**

- `moscow-prioritization` - MoSCoW prioritization framework
- `acceptance-criteria` - Acceptance criteria best practices

**When to use:** Planning, requirement analysis, decision-making

**Characteristics:**

- Framework documentation
- Methodology explanation
- Decision-making tools
- Process guidance

### Domain-Specific Knowledge Bases

**Purpose:** Specialized topics and technologies

**Examples:**

- `ai-tool-approval-patterns` - AI tool approval guidance
- `plugin-architecture` - OpenCode plugin development
- `plugin-migration` - Plugin migration patterns

**When to use:** Working with specific technologies or domains

**Characteristics:**

- Deep domain expertise
- Specialized terminology
- Technology-specific guidance
- Expert-level content

## Knowledge Base Types

### Reference Knowledge Base

**Focus:** Quick lookup of commands, configurations, patterns

**Sections:**

- Core Concepts
- Common Patterns
- Quick Reference

**Example:** `gitlab-ci-examples`, `github-actions-templates`

**Typical Size:** 200-400 lines

### Guide Knowledge Base

**Focus:** How-to explanations with examples and best practices

**Sections:**

- Overview
- Core Concepts
- Best Practices
- Examples
- Troubleshooting

**Example:** `pipeline-best-practices`, `mermaid-diagrams`

**Typical Size:** 300-500 lines

### Concept Knowledge Base

**Focus:** Deep explanation of concepts and when/how to use them

**Sections:**

- Overview
- Core Concepts
- Decision Framework
- Advanced Topics

**Example:** `moscow-prioritization`, `acceptance-criteria`

**Typical Size:** 200-350 lines

## Knowledge Base Usage Patterns

### Pattern 1: Reference Lookup

Agents/developers consult KB for quick answers:

```
1. Identify knowledge need
2. Load relevant knowledge base
3. Find specific pattern or answer
4. Apply to current context
```

**Used by:** All agents when they need domain knowledge

### Pattern 2: Learning Resource

New developers/agents learn patterns:

```
1. Load knowledge base
2. Read overview and concepts
3. Study examples
4. Practice applying patterns
```

**Used by:** Onboarding, training, skill development

### Pattern 3: Validation Reference

Validate work against documented standards:

```
1. Complete work
2. Load relevant knowledge base
3. Compare against best practices
4. Make improvements
```

**Used by:** Quality checks, code reviews

### Pattern 4: Decision Support

Make informed decisions with documented guidance:

```
1. Face decision point
2. Load relevant knowledge base
3. Review patterns and tradeoffs
4. Make informed decision
```

**Used by:** Architecture decisions, technology choices

## Knowledge Base Discovery

### File System Organization

**Global Knowledge Bases:**

```
~/.config/opencode/knowledge-base/*.md
```

**Project Knowledge Bases:**

```
.opencode/knowledge-base/*.md
```

**Override Behavior:** Project knowledge bases override global ones with the same name.

### Discovery Methods

**Shell Commands:**

```bash
# List global knowledge bases
ls -1 ~/.config/opencode/knowledge-base/*.md | xargs -I {} basename {} .md | sort

# List project knowledge bases
ls -1 .opencode/knowledge-base/*.md | xargs -I {} basename {} .md | sort
```

**Frontmatter Reading:**

```bash
# Extract title from knowledge base
head -20 kb-file.md | grep '^title:' | cut -d: -f2-
```

## Knowledge Base Lifecycle

### 1. Creation

- Use `opencode-knowledge-base` meta-task
- Follow `opencode-knowledge-base-tmpl.yaml` structure
- Define clear scope and audience
- Include 2-3 working examples

### 2. Usage

- Referenced by agents for context
- Consulted by developers for guidance
- Used by commands for patterns
- Referenced by tasks for implementation

### 3. Validation

- Review against template requirements
- Ensure completeness
- Verify examples work
- Check best practices included

### 4. Maintenance

- Review quarterly or on technology changes
- Update for new patterns
- Incorporate feedback
- Update version number

## Best Practices

### Knowledge Base Creation

✅ **DO:**

- Focus on one topic/domain
- Include working examples
- Provide both good and bad examples
- Document common pitfalls
- Link to related resources

❌ **DON'T:**

- Cover too many topics (split instead)
- Skip examples section
- Use jargon without explanation
- Omit troubleshooting
- Forget version tracking

### Knowledge Base Usage

✅ **DO:**

- Read entire KB when learning new topic
- Use quick reference for lookups
- Adapt patterns to your context
- Provide feedback for improvements
- Update KB when finding gaps

❌ **DON'T:**

- Blindly copy examples
- Skip reading concepts section
- Ignore best practices
- Assume KB is always current
- Use KB for wrong domain

### Knowledge Base Maintenance

✅ **DO:**

- Review quarterly
- Update on technology changes
- Track versions properly
- Document breaking changes
- Test examples after updates

❌ **DON'T:**

- Let KBs become stale
- Make breaking changes without version bump
- Skip testing after updates
- Ignore user feedback
- Remove content carelessly

## Integration Points

### With Agents

Agents load KBs for domain knowledge:

```
Agent Task → Identify Knowledge Need → Load KB → Apply Patterns
```

**Example:** Documentalist agent loads `mermaid-diagrams` for diagram creation

### With Commands

Commands reference KBs for guidance:

```
Command Execution → Load Relevant KB → Provide Patterns → Complete Task
```

**Example:** `/arch-docs` command references architecture KBs

### With Tasks

Tasks reference KBs for implementation patterns:

```
Task Step → Identify Pattern Need → Load KB → Apply Pattern → Continue
```

**Example:** `pipeline-architect` task references `pipeline-best-practices`

### With Checklists

Checklists validate against KB standards:

```
Checklist Item → Reference KB → Validate Compliance → Mark Complete
```

**Example:** Pipeline checklist validates against `pipeline-best-practices`

## Knowledge Base Content Principles

### Clarity

- Use clear, accessible language
- Define technical terms
- Provide context
- Use consistent terminology

### Completeness

- Cover all critical aspects
- Include edge cases
- Document known issues
- Link to additional resources

### Practicality

- Include working examples
- Show real-world scenarios
- Provide troubleshooting
- Offer quick reference

### Organization

- Logical progression
- Consistent formatting
- Clear headings
- Balanced depth

## Common Use Cases

### Use Case 1: Learn Diagram Syntax

**Scenario:** Need to create diagrams in documentation

**Solution:**

1. Load `mermaid-diagrams` knowledge base
2. Review diagram types and syntax
3. Study examples
4. Create diagram using patterns

### Use Case 2: Set Up CI/CD Pipeline

**Scenario:** Need production-ready pipeline configuration

**Solution:**

1. Load platform-specific KB (`gitlab-ci-examples`, `github-actions-templates`)
2. Review best practices in `pipeline-best-practices`
3. Select relevant patterns
4. Adapt to project needs

### Use Case 3: Prioritize Requirements

**Scenario:** Need to prioritize product backlog

**Solution:**

1. Load `moscow-prioritization` knowledge base
2. Understand framework concepts
3. Apply categorization method
4. Document prioritization decisions

## Knowledge Base Metadata Reference

### Frontmatter Fields

| Field             | Required | Description                | Example                                 |
| ----------------- | -------- | -------------------------- | --------------------------------------- |
| title             | Yes      | Human-readable title       | "Pipeline Best Practices"               |
| description       | Yes      | Brief content description  | "CI/CD best practices across platforms" |
| type              | Yes      | Always "knowledge-base"    | knowledge-base                          |
| category          | Yes      | Primary category           | cicd                                    |
| version           | Yes      | Semantic version           | 1.0.0                                   |
| difficulty        | No       | Difficulty level           | intermediate                            |
| tags              | Yes      | 5-10 searchable keywords   | [cicd, pipeline, security]              |
| related_resources | No       | Paths to related resources | ["../task/pipeline.md"]                 |

### Categories

- **documentation**: Documentation creation and standards
- **cicd**: CI/CD pipelines and deployment
- **development**: Development practices and patterns
- **patterns**: Frameworks and methodologies
- **domain**: Specialized domain knowledge
- **meta**: System architecture and meta-knowledge

## Knowledge Base Size Guidelines

Optimal sizes by type:

| KB Type       | Target Size   | Purpose                     |
| ------------- | ------------- | --------------------------- |
| Reference     | 200-400 lines | Quick pattern lookup        |
| Guide         | 300-500 lines | How-to with examples        |
| Concept       | 200-350 lines | Deep conceptual explanation |
| Comprehensive | 500-800 lines | Complete domain coverage    |

**General guideline:** Aim for comprehensive but focused. Split very broad topics into multiple KBs.

## Troubleshooting

### Issue 1: Knowledge Base Not Found

**Symptoms:**

- Error: "Knowledge base X not found"
- Agent/command fails to load KB

**Solution:**

1. Check KB exists in `~/.config/opencode/knowledge-base/` or `.opencode/knowledge-base/`
2. Verify filename matches exactly (case-sensitive, `.md` extension)
3. Ensure frontmatter is valid YAML

### Issue 2: Outdated Content

**Symptoms:**

- Examples don't work with current tools
- Best practices conflict with newer approaches

**Solution:**

1. Review KB against current documentation
2. Update examples and patterns
3. Increment version number
4. Document changes in commit

### Issue 3: Missing Information

**Symptoms:**

- KB doesn't cover needed scenario
- Examples too basic

**Solution:**

1. Add new section or expand existing
2. Include more comprehensive examples
3. Add troubleshooting section
4. Update version number

## Related Resources

- [OpenCode Knowledge Base Template](../template/opencode-knowledge-base-tmpl.yaml)
- [Knowledge Base Creation Task](../task/opencode-knowledge-base.md)
- [Task System Architecture](./task-system-architecture.md)
- [Template System Architecture](./template-system-architecture.md)

---

## Metadata

- **Category**: Meta
- **Tags**: knowledge-base, architecture, documentation, system, meta
- **Difficulty**: Intermediate
- **Target Audience**: KB authors, agent developers, command creators
- **Reading Time**: 15 minutes
