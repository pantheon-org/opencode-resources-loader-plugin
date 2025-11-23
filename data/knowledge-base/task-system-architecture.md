---
title: OpenCode Task System Architecture
description: Comprehensive guide to the OpenCode task system including structure, categories, usage patterns, and integration
type: knowledge-base
category: meta
version: 1.0.0
tags:
  - tasks
  - architecture
  - meta
  - workflow
  - system
related_resources:
  - ../command/list-tasks.md
  - ../template/opencode-task-tmpl.yaml
  - ../task/opencode-task.md
last_updated: 2025-11-19
---

# OpenCode Task System Architecture

> Complete reference for understanding and working with the OpenCode task system

## Overview

The OpenCode task system provides structured, multi-step workflows for complex operations. Tasks define repeatable
processes with clear inputs, execution steps, success criteria, and quality checks. They serve as the foundation for
automation through commands and agents.

**Key Characteristics:**

- Multi-step workflows (typically 3-7 steps)
- Clear input requirements and success criteria
- Reusable across commands, agents, and other tasks
- Markdown format with YAML frontmatter
- Hierarchical organization (global and project-specific)

## Task Structure

All tasks follow a consistent 10-section structure:

### 1. Frontmatter (YAML Metadata)

```yaml
---
description: Brief description of what the task accomplishes
mode: task
temperature: 0.7
version: 1.0.0
last_updated: 2025-01-15
category: Analysis|Documentation|Development|Operations|Research
---
```

### 2. Purpose

What the task accomplishes and the problem it solves.

### 3. When to Use

- **Appropriate use cases**: Specific scenarios where this task should be used
- **Anti-patterns**: Situations where this task is NOT appropriate

### 4. Input Requirements

- **Required inputs**: Must be provided for task execution
- **Optional inputs**: Enhance task execution but not required

### 5. Task Execution Steps

Sequential steps (3-7 typically) with:

- **Actions**: What to do in this step
- **Tools**: Which tools to use
- **Outputs**: What this step produces

### 6. Task Output Summary

What the task produces upon completion.

### 7. Success Criteria

Measurable criteria indicating task completion:

- Deliverables present
- Quality standards met
- Validation checks passed

### 8. Quality Checks

Validation requirements before considering task complete:

- Completeness checks
- Accuracy verifications
- Best practice compliance

### 9. Examples

2-3 complete working examples demonstrating:

- Different scenarios
- Various input combinations
- Expected outputs

### 10. References

Related resources:

- Templates
- Checklists
- Knowledge bases
- Documentation

## Task Categories

Tasks are organized into five primary categories:

### Analysis Tasks

**Purpose**: Understanding existing systems, technology stacks, deployment strategies

**When to use**: Need to analyze codebases, infrastructure, or project context

**Examples:**

- `technology-detection` - Identify programming languages, frameworks, tools
- `infrastructure-analysis` - Analyze databases, messaging systems, architecture patterns
- `deployment-strategy` - Analyze deployment configurations and containerization
- `project-context` - Quick project understanding using shell commands

### Documentation Tasks

**Purpose**: Discovering and managing documentation

**When to use**: Before creating or updating documentation

**Examples:**

- `documentation-discovery` - Find and catalog all existing documentation

### Development Tasks

**Purpose**: Creating OpenCode ecosystem resources

**When to use**: Building new agents, commands, tasks, checklists, knowledge bases, templates

**Examples:**

- `opencode-agent` - Create specialized agents with proper configuration
- `opencode-command` - Create custom slash commands for workflows
- `opencode-task` - Create reusable task definitions
- `opencode-checklist` - Create comprehensive validation checklists
- `opencode-knowledge-base` - Create knowledge base articles
- `opencode-template` - Create templates for new resource types

**Note**: These are "meta tasks" that create other resources in the OpenCode ecosystem.

### Operations Tasks

**Purpose**: CI/CD, deployment, and operational workflows

**When to use**: Setting up pipelines, deployment automation

**Examples:**

- `pipeline-architect` - Design multi-stage builds, security scanning, deployment automation

### Research Tasks

**Purpose**: Research, evaluation, and approval processes

**When to use**: Tool evaluation, approval documentation generation

**Examples:**

- `ai-tool-approval-research` - Generate comprehensive tool approval documentation

## Task Invocation

Tasks are invoked by three primary mechanisms:

### 1. Commands

Commands execute tasks for complex workflows:

```markdown
# Example: /create-command uses opencode-command task

- Command defines high-level user request
- Task provides detailed execution workflow
- Agent follows task steps to complete command
```

### 2. Agents

Agents reference tasks for multi-step operations:

```markdown
# Example: documentalist agent uses documentation-discovery task

- Agent has broad capabilities
- Task provides specific workflow for particular operations
- Agent adapts task steps to context
```

### 3. Other Tasks

Tasks can reference other tasks for sub-workflows:

```markdown
# Example: opencode-agent might use documentation-discovery

- Parent task defines overall workflow
- Child task handles specific sub-workflow
- Results flow back to parent task
```

## Task Discovery

### File System Organization

**Global Tasks:**

```
~/.config/opencode/task/*.md
```

**Project Tasks:**

```
.opencode/task/*.md
```

**Override Behavior:** Project tasks override global tasks with the same name.

### Discovery Methods

**Shell Commands:**

```bash
# List global tasks
ls -1 ~/.config/opencode/task/*.md | xargs -I {} basename {} .md | sort

# List project tasks
ls -1 .opencode/task/*.md | xargs -I {} basename {} .md | sort
```

**Frontmatter Reading:**

```bash
# Extract description from task file
head -20 task-file.md | grep 'description:' | cut -d: -f2-
```

## Task Lifecycle

### 1. Creation

- Use `opencode-task` meta task
- Follow template structure
- Define clear purpose and scope

### 2. Usage

- Invoked by commands/agents/tasks
- Input requirements gathered
- Steps executed sequentially
- Outputs produced

### 3. Validation

- Success criteria checked
- Quality checks performed
- Output validated

### 4. Maintenance

- Review quarterly or on major changes
- Update for process/tool changes
- Incorporate feedback
- Update version number

## Task Design Patterns

### Pattern 1: Analysis Task

**Characteristics:**

- Reads existing state (files, configurations)
- Produces structured analysis
- No modifications to source

**Example Structure:**

1. Discover files/configurations
2. Parse and analyze content
3. Categorize findings
4. Generate report

### Pattern 2: Generation Task

**Characteristics:**

- Creates new resources
- Validates before writing
- Produces documentation

**Example Structure:**

1. Gather requirements
2. Load templates
3. Design resource structure
4. Generate content
5. Validate output
6. Save resource

### Pattern 3: Transformation Task

**Characteristics:**

- Reads existing content
- Applies transformations
- Writes modified content

**Example Structure:**

1. Read source
2. Validate input
3. Apply transformation
4. Validate output
5. Write result

### Pattern 4: Orchestration Task

**Characteristics:**

- Coordinates multiple sub-tasks
- Manages workflow state
- Aggregates results

**Example Structure:**

1. Plan workflow
2. Execute sub-task 1
3. Execute sub-task 2
4. Aggregate results
5. Produce final output

## Best Practices

### Task Creation

✅ **DO:**

- Keep steps focused and sequential
- Define clear success criteria
- Include 2-3 working examples
- Specify required vs optional inputs
- Document edge cases

❌ **DON'T:**

- Create overly complex tasks (split instead)
- Skip quality checks section
- Omit examples
- Use ambiguous language
- Forget version tracking

### Task Usage

✅ **DO:**

- Read task documentation before use
- Gather all required inputs
- Follow steps sequentially
- Validate outputs against success criteria
- Provide feedback for improvements

❌ **DON'T:**

- Skip steps without reason
- Ignore quality checks
- Assume inputs from context
- Deviate from structure without documentation
- Use wrong task for the job

### Task Maintenance

✅ **DO:**

- Review quarterly
- Update on tool/process changes
- Track versions properly
- Document breaking changes
- Test after modifications

❌ **DON'T:**

- Let tasks become stale
- Make breaking changes without version bump
- Skip testing after updates
- Ignore user feedback
- Remove backward compatibility carelessly

## Integration Points

### With Commands

Commands provide user-facing interface and invoke tasks for execution:

```
User Request → Command → Task → Execution → Result
```

### With Agents

Agents have capabilities and use tasks for structured workflows:

```
Agent Context → Task Selection → Task Execution → Agent Integration
```

### With Templates

Tasks use templates for consistent output structure:

```
Task Requirements → Template Loading → Content Generation → Output
```

### With Checklists

Tasks use checklists for validation:

```
Task Output → Checklist Validation → Quality Confirmation → Completion
```

### With Knowledge Bases

Tasks reference knowledge bases for patterns and examples:

```
Task Step → Knowledge Base Lookup → Pattern Application → Execution
```

## Common Use Cases

### Use Case 1: Technology Analysis

**Scenario:** Need to understand what technologies a project uses

**Solution:**

1. Run `technology-detection` task
2. Task discovers languages, frameworks, tools
3. Produces structured technology report

### Use Case 2: Create New Command

**Scenario:** Need to automate a repetitive workflow

**Solution:**

1. Run `opencode-command` task
2. Provide command requirements
3. Task generates command file with proper structure

### Use Case 3: Pipeline Setup

**Scenario:** Need CI/CD pipeline for new project

**Solution:**

1. Run `pipeline-architect` task
2. Specify deployment requirements
3. Task generates optimized pipeline configuration

## Task Metadata Reference

### Frontmatter Fields

| Field        | Required | Description             | Example                                    |
| ------------ | -------- | ----------------------- | ------------------------------------------ |
| description  | Yes      | Brief task description  | "Comprehensive technology stack detection" |
| mode         | Yes      | Always "task"           | task                                       |
| temperature  | Yes      | LLM temperature setting | 0.7                                        |
| version      | Yes      | Semantic version        | 1.0.0                                      |
| last_updated | Yes      | Last update date        | 2025-01-15                                 |
| category     | Yes      | Task category           | Analysis                                   |

### Categories

- **Analysis**: Technology, infrastructure, deployment analysis
- **Documentation**: Discovery, generation, maintenance
- **Development**: Resource creation (agents, commands, tasks, etc.)
- **Operations**: CI/CD, deployment, automation
- **Research**: Evaluation, approval, investigation

## Performance Considerations

### Task Loading

Tasks are loaded on-demand:

- Not all tasks loaded at startup
- Loaded when invoked by command/agent
- Cached for session duration

### Task Size

Typical task sizes:

- Small: 100-200 lines (quick analysis/generation)
- Medium: 200-400 lines (standard workflows)
- Large: 400+ lines (comprehensive processes)

Aim for focused, single-purpose tasks. Split large tasks into multiple smaller tasks.

## Troubleshooting

### Issue 1: Task Not Found

**Symptoms:**

- Error: "Task X not found"
- Command fails to execute

**Solution:**

1. Check task file exists in `~/.config/opencode/task/` or `.opencode/task/`
2. Verify filename matches task name exactly (case-sensitive)
3. Ensure `.md` extension present

### Issue 2: Task Execution Fails

**Symptoms:**

- Task starts but doesn't complete
- Missing expected outputs

**Solution:**

1. Verify all required inputs provided
2. Check frontmatter YAML is valid
3. Review execution logs for errors
4. Validate success criteria are achievable

### Issue 3: Task Output Invalid

**Symptoms:**

- Output doesn't match expected format
- Quality checks fail

**Solution:**

1. Review task examples
2. Check template usage is correct
3. Validate against checklist
4. Review quality checks section

## Related Resources

- [OpenCode Command System](../docs/commands.md)
- [OpenCode Agent System](../docs/agents.md)
- [Task Creation Guide](../task/opencode-task.md)
- [Task Template](../template/opencode-task-tmpl.yaml)

---

## Metadata

- **Category**: Meta
- **Tags**: tasks, architecture, workflow, system, meta
- **Difficulty**: Intermediate
- **Target Audience**: Command authors, agent developers, task creators
- **Reading Time**: 15 minutes
