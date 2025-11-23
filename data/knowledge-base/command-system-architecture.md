---
title: OpenCode Command System Architecture
description: Comprehensive guide to the OpenCode command system including structure, categories, usage patterns, and integration
type: knowledge-base
category: meta
version: 1.0.0
tags:
  - commands
  - architecture
  - meta
  - slash-commands
  - system
related_resources:
  - ../command/list-commands.md
  - ../template/opencode-command-tmpl.yaml
  - ../task/opencode-command.md
last_updated: 2025-11-19
---

# OpenCode Command System Architecture

> Complete reference for understanding and working with the OpenCode command system

## Overview

The OpenCode command system provides user-facing slash commands that execute complex workflows through agents and tasks.
Commands are the primary interface for users to interact with OpenCode, offering a simple `/command` syntax that
triggers sophisticated multi-step operations. They serve as orchestrators that coordinate agents, tasks, templates,
checklists, and knowledge bases to accomplish user goals.

**Key Characteristics:**

- Slash command syntax (`/command-name`)
- Markdown format with YAML frontmatter
- Agent execution delegation
- Task orchestration
- Hierarchical organization (global and project-specific)

## Command Purpose

Commands solve several critical problems:

### 1. User Interface Simplicity

Provide simple, memorable syntax for complex operations without requiring users to understand implementation details.

### 2. Workflow Automation

Automate repetitive multi-step workflows that would otherwise require multiple manual steps.

### 3. Consistency

Ensure common operations are performed the same way every time with established patterns.

### 4. Discoverability

Make capabilities discoverable through autocomplete and listing, reducing learning curve.

### 5. Customization

Allow project-specific commands that override global commands for tailored workflows.

## Command Structure

All commands follow a consistent markdown structure:

### Frontmatter (YAML Metadata)

```yaml
---
description: Brief description of what the command does
agent: agent-name # Agent that executes the command
subtask: false # Whether this is a subtask (not shown to users)
model: model-name # Optional model override
temperature: 0.7 # Optional temperature override
---
```

### Command Body

The markdown body contains:

1. **Command title** (H1 heading)
2. **Purpose statement** - What the command accomplishes
3. **Instructions** - Detailed execution steps for the agent
4. **Context** - Additional information the agent needs
5. **Resource references** - Templates, checklists, knowledge bases to use
6. **Examples** - Optional examples of expected output

### Frontmatter Fields

| Field       | Required | Description                  | Example                       |
| ----------- | -------- | ---------------------------- | ----------------------------- |
| description | Yes      | Brief command description    | "Generates API documentation" |
| agent       | Yes      | Agent that executes command  | general                       |
| subtask     | No       | Hide from user-facing lists  | false                         |
| model       | No       | Override default model       | claude-3-5-sonnet-20241022    |
| temperature | No       | Override default temperature | 0.7                           |

## Command Categories

Commands are organized into logical categories:

### Documentation Commands

**Purpose:** Generate or improve documentation

**Examples:**

- `/api-docs` - API documentation generation
- `/arch-docs` - Architecture documentation with diagrams
- `/dev-docs` - Development setup documentation
- `/deploy-docs` - Deployment documentation
- `/pipeline-docs` - CI/CD pipeline documentation
- `/onboard-docs` - Onboarding documentation

**When to use:** Creating or updating project documentation

**Characteristics:**

- Use specialized agents (documentalist)
- Reference documentation templates
- Apply quality checklists
- Generate comprehensive output

### Development Commands

**Purpose:** Create or modify code and resources

**Examples:**

- `/create-command` - Create new slash command
- `/create-agent` - Create new agent
- `/feature` - Implement new feature

**When to use:** Building or extending functionality

**Characteristics:**

- Reference creation templates
- Use meta-tasks (opencode-\*)
- Validate against checklists
- Follow naming conventions

### Git Workflow Commands

**Purpose:** Git operations and GitHub integration

**Examples:**

- `/commit` - Create conventional commit
- `/gh-flow` - GitHub workflow automation

**When to use:** Version control operations

**Characteristics:**

- Git command execution
- Commit message formatting
- PR creation and management
- Branch operations

### Analysis Commands

**Purpose:** Analyze code, projects, or resources

**Examples:**

- `/research` - Deep research and analysis
- `/document` - Analyze and document codebase

**When to use:** Understanding or investigating systems

**Characteristics:**

- Read-only operations
- Use analysis tasks
- Generate reports
- Provide insights

### Workflow Commands

**Purpose:** Execute specific workflows

**Examples:**

- `/create-ticket` - Create JIRA ticket
- `/review-tool` - AI tool approval review

**When to use:** Standardized processes

**Characteristics:**

- Multi-step workflows
- Template-driven
- Checklist validation
- Produce structured output

### Utility Commands

**Purpose:** Helper commands and utilities

**Examples:**

- `/list-commands` - List available commands
- `/list-tasks` - List available tasks
- `/list-templates` - List available templates
- `/list-knowledge-bases` - List available KBs
- `/list-checklists` - List available checklists
- `/docs-help` - Documentation assistance

**When to use:** Discovery and help

**Characteristics:**

- Self-documenting
- Resource listing
- Help and guidance
- System information

### Session Management Commands

**Purpose:** Manage OpenCode sessions

**Examples:**

- `/save-session` - Save current session
- `/resume-session` - Resume saved session
- `/list-sessions` - List saved sessions
- `/update-session` - Update session metadata

**When to use:** Session persistence

**Characteristics:**

- Session state management
- Metadata handling
- File operations
- Context preservation

## Command Invocation

### User Invocation

Users invoke commands in the TUI:

```
/command-name
/command-name "argument"
/command-name --option value
```

**Autocomplete:**

- Type `/` to see available commands
- Start typing command name for filtered list
- Tab to complete

### Command Execution Flow

```
1. User types /command in TUI
2. OpenCode parses command and arguments
3. Loads command markdown file
4. Reads frontmatter to identify agent
5. Passes command body to agent
6. Agent executes instructions
7. Agent may load tasks, templates, checklists, KBs
8. Agent returns results to user
```

## Command Discovery

### File System Organization

**Global Commands:**

```
~/.config/opencode/command/*.md
```

**Project Commands:**

```
.opencode/command/*.md
```

**Override Behavior:** Project commands override global commands with the same name.

**Naming Convention:**

- Filename: `command-name.md`
- Invocation: `/command-name`
- Use kebab-case (hyphens)

### Discovery Methods

**Shell Commands:**

```bash
# List global commands
ls -1 ~/.config/opencode/command/*.md | xargs -I {} basename {} .md | sort

# List project commands
ls -1 .opencode/command/*.md | xargs -I {} basename {} .md | sort
```

**Frontmatter Reading:**

```bash
# Extract description from command
head -20 command-file.md | grep '^description:' | cut -d: -f2-
```

## Command Lifecycle

### 1. Creation

- Use `/create-command` or `opencode-command` task
- Follow `opencode-command-tmpl.yaml` structure
- Define clear description and purpose
- Specify agent
- Include execution instructions

### 2. Usage

- Invoked by users via TUI
- Agent executes instructions
- May orchestrate tasks
- Returns results

### 3. Validation

- Review against template
- Test execution
- Verify agent assignment
- Check resource references

### 4. Maintenance

- Update on workflow changes
- Incorporate user feedback
- Keep resource references current
- Test after modifications

## Command Design Patterns

### Pattern 1: Simple Command

**Purpose:** Single-purpose, straightforward operation

**Characteristics:**

- Clear, focused goal
- Minimal instructions
- Direct agent execution

**Example:**

```yaml
---
description: List available commands
agent: general
---
# List Available OpenCode Commands

Please provide a list of all OpenCode slash commands.

[Discovery instructions...]
```

### Pattern 2: Resource Creation Command

**Purpose:** Create new OpenCode resources

**Characteristics:**

- References creation task
- Uses templates
- Applies checklists
- Validates output

**Example:**

```yaml
---
description: Create a new OpenCode slash command
agent: general
---
# Create New Slash Command

Execute the opencode-command task to create a new command.

[Task invocation...]
```

### Pattern 3: Documentation Command

**Purpose:** Generate comprehensive documentation

**Characteristics:**

- Uses documentalist agent
- References multiple templates
- Applies quality checklists
- Generates structured output

**Example:**

```yaml
---
description: Generates API documentation
agent: documentalist
---
# Generate API Documentation

Execute documentation-discovery task, then generate API docs.

[Documentation instructions...]
```

### Pattern 4: Workflow Command

**Purpose:** Multi-step workflow execution

**Characteristics:**

- Coordinates multiple tasks
- Uses workflow templates
- Structured output format
- Validation steps

**Example:**

```yaml
---
description: Create JIRA ticket with proper structure
agent: general
---
# Create JIRA Ticket

Follow jira-ticket-description template to create ticket.

[Workflow instructions...]
```

### Pattern 5: Subtask Command

**Purpose:** Internal command used by other commands

**Characteristics:**

- `subtask: true` in frontmatter
- Not shown in user-facing lists
- Called by other commands
- Reusable functionality

**Example:**

```yaml
---
description: Internal documentation helper
agent: documentalist
subtask: true
---
# Documentation Helper

[Internal instructions...]
```

## Best Practices

### Command Creation

✅ **DO:**

- Use clear, descriptive names
- Write concise descriptions
- Specify appropriate agent
- Include execution instructions
- Reference relevant resources
- Provide examples when helpful

❌ **DON'T:**

- Create overlapping commands
- Use vague descriptions
- Skip agent specification
- Write overly complex commands
- Ignore existing templates
- Forget to test

### Command Usage

✅ **DO:**

- Use autocomplete for discovery
- Read command description
- Understand command purpose
- Provide required arguments
- Review output

❌ **DON'T:**

- Guess command names
- Use wrong command for task
- Skip reading output
- Ignore errors
- Expect commands to read minds

### Command Maintenance

✅ **DO:**

- Review quarterly
- Update on workflow changes
- Test after modifications
- Document breaking changes
- Keep descriptions current

❌ **DON'T:**

- Let commands become stale
- Change behavior without updating description
- Skip testing
- Ignore user feedback
- Break existing workflows

## Integration Points

### With Agents

Commands delegate execution to agents:

```
User → /command → Agent → Execution → Result
```

**Example:** `/api-docs` → documentalist agent

### With Tasks

Commands invoke tasks for complex workflows:

```
Command → Task → Multi-step Execution → Output
```

**Example:** `/create-command` → `opencode-command` task

### With Templates

Commands reference templates for structure:

```
Command → Load Template → Apply Structure → Generate Output
```

**Example:** `/create-ticket` → `jira-ticket-description-tmpl.yaml`

### With Checklists

Commands use checklists for validation:

```
Command → Execute → Output → Checklist Validation → Complete
```

**Example:** `/api-docs` → `api-documentation.md` checklist

### With Knowledge Bases

Commands reference KBs for patterns:

```
Command → Load KB → Apply Patterns → Execute
```

**Example:** `/arch-docs` → `mermaid-diagrams` KB

## Common Use Cases

### Use Case 1: Generate Documentation

**Scenario:** Need API documentation

**Solution:**

1. Run `/api-docs`
2. Command loads documentalist agent
3. Agent uses documentation templates
4. Agent applies quality checklists
5. Produces comprehensive API docs

### Use Case 2: Create New Resource

**Scenario:** Need custom command

**Solution:**

1. Run `/create-command`
2. Provide command details
3. Task generates command file
4. Validates against template
5. Command ready to use

### Use Case 3: Commit Changes

**Scenario:** Need to commit code changes

**Solution:**

1. Run `/commit`
2. Command analyzes changes
3. Generates conventional commit message
4. Creates commit

## Command Metadata Reference

### Special Attributes

**subtask:**

- When `true`, command hidden from user-facing lists
- Used for internal commands called by other commands
- Still discoverable via direct invocation

**model:**

- Override default model for this command
- Useful for commands needing specific capabilities
- Example: `claude-3-5-sonnet-20241022`

**temperature:**

- Override default temperature
- Lower for deterministic output
- Higher for creative output

## Troubleshooting

### Issue 1: Command Not Found

**Symptoms:**

- Error: "Command X not found"
- Command doesn't appear in autocomplete

**Solution:**

1. Check command file exists in `~/.config/opencode/command/` or `.opencode/command/`
2. Verify filename matches exactly (kebab-case, `.md` extension)
3. Ensure frontmatter is valid YAML
4. Restart OpenCode if needed

### Issue 2: Command Fails to Execute

**Symptoms:**

- Command starts but doesn't complete
- Error during execution

**Solution:**

1. Check agent specification is valid
2. Verify resource references are correct
3. Review command instructions for clarity
4. Check agent has necessary capabilities

### Issue 3: Wrong Output Format

**Symptoms:**

- Output doesn't match expectations
- Missing expected sections

**Solution:**

1. Review command instructions
2. Check template references
3. Verify checklist items
4. Update command instructions

## Related Resources

- [OpenCode Command Template](../template/opencode-command-tmpl.yaml)
- [Command Creation Task](../task/opencode-command.md)
- [Task System Architecture](./task-system-architecture.md)
- [Agent Documentation](../docs/agents.md)

---

## Metadata

- **Category**: Meta
- **Tags**: commands, architecture, slash-commands, system, meta
- **Difficulty**: Intermediate
- **Target Audience**: Command authors, users, developers
- **Reading Time**: 12 minutes
