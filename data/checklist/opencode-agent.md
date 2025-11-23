---
title: OpenCode Agent Checklist
description: Comprehensive quality assurance checklist for creating and validating OpenCode agents.
type: checklist
category: meta
version: 1.0.0
tags:
  - checklist
  - meta
  - opencode
  - agent
last_updated: 2025-11-19
---

# OpenCode Agent Checklist

Comprehensive quality assurance checklist for creating and validating OpenCode agents.

**Purpose**: Ensure agents are properly configured, follow best practices, and integrate correctly with the OpenCode
system.

**When to use**: Creating new agents, reviewing existing agents, or validating agent configurations.

**Reference**: <https://opencode.ai/docs/agents/>

---

## Agent Configuration

### Required Frontmatter

- ✅ **description** field present (required for agent discovery)
- ✅ Description is clear and explains what agent does
- ✅ Description explains when to use the agent
- ✅ **mode** field set appropriately (`primary`, `subagent`, or `all`)
- ✅ Mode matches intended usage pattern

### Model Configuration

- ✅ **model** field specifies provider/model if overriding default
- ✅ Model format follows pattern: `provider/model-name`
- ✅ Model is appropriate for agent's purpose
- ✅ Model is available and accessible (verify with `opencode models`)

### Temperature Settings

- ✅ **temperature** set appropriately for agent type
- ✅ Temperature range is 0.0-1.0
- ✅ Temperature matches agent purpose:
  - `0.0-0.2`: Code analysis, planning, security audits (deterministic)
  - `0.3-0.5`: General development, balanced tasks
  - `0.6-1.0`: Brainstorming, creative tasks, exploration

### Optional Configuration

- ✅ **prompt** references external file if using custom system prompt
- ✅ Prompt file path is relative to config location
- ✅ Prompt file exists and is accessible
- ✅ **disable** flag set correctly (if agent should be disabled)
- ✅ Additional provider-specific options documented (e.g., `reasoningEffort` for OpenAI)

---

## Agent Types

### Primary Agents

**Mode**: `primary`

- ✅ Agent designed for main conversation handling
- ✅ Can be cycled through with Tab key
- ✅ Has appropriate tool access for primary use
- ✅ System prompt supports general interaction
- ✅ Temperature appropriate for direct user interaction

### Subagents

**Mode**: `subagent`

- ✅ Agent designed for specialized tasks
- ✅ Can be invoked with @ mention
- ✅ Can be invoked automatically by primary agents
- ✅ Description clearly explains specialization
- ✅ Tool access restricted to specific purpose
- ✅ System prompt focused on specialized task

### All-Mode Agents

**Mode**: `all`

- ✅ Agent can function as both primary and subagent
- ✅ System prompt supports both use cases
- ✅ Tool configuration appropriate for dual role
- ✅ Description explains both usage patterns

---

## Tool Configuration

### Tool Access Control

- ✅ **tools** section defines enabled/disabled tools
- ✅ Tool settings override global defaults appropriately
- ✅ Tool access matches agent purpose and security requirements
- ✅ Wildcard patterns used correctly (e.g., `mymcp_*: false`)

### Common Tool Patterns

#### Read-Only Agents

- ✅ `write: false`
- ✅ `edit: false`
- ✅ `bash: false` or restricted to safe commands
- ✅ Appropriate for planning, analysis, review agents

#### Development Agents

- ✅ `write: true`
- ✅ `edit: true`
- ✅ `bash: true`
- ✅ Appropriate for build, implementation agents

#### Documentation Agents

- ✅ `write: true` (for docs)
- ✅ `edit: true` (for updates)
- ✅ `bash: false` (no system commands needed)

#### Security Audit Agents

- ✅ `write: false` (no modifications)
- ✅ `edit: false` (no changes)
- ✅ `bash: true` but restricted (for scanning tools)

---

## Permission Configuration

### Permission Levels

- ✅ Permissions set appropriately: `ask`, `allow`, or `deny`
- ✅ Permission settings match agent security requirements
- ✅ Global permissions overridden per-agent when needed

### Edit Permissions

- ✅ **edit** permission set correctly
- ✅ `ask`: Prompts before file edits (recommended for most agents)
- ✅ `allow`: Auto-approves edits (use carefully)
- ✅ `deny`: Prevents all edits (read-only agents)

### Bash Permissions

- ✅ **bash** permission configured appropriately
- ✅ Global bash permission if all commands treated same
- ✅ Specific command permissions for granular control
- ✅ Glob patterns used for command groups (e.g., `git *: ask`)
- ✅ Wildcard `*` rule with specific overrides if needed
- ✅ Safe commands allowed (e.g., `git status: allow`)
- ✅ Dangerous commands restricted (e.g., `git push: ask`, `rm -rf *: deny`)

### WebFetch Permissions

- ✅ **webfetch** permission set if agent needs web access
- ✅ `ask`: Prompts before fetching URLs
- ✅ `allow`: Auto-approves web requests
- ✅ `deny`: Prevents web access

### Permission Examples

**Plan Agent** (read-only)

- ✅ `edit: ask` (prompt before changes)
- ✅ `bash: ask` (prompt before commands)

**Build Agent** (full access)

- ✅ `edit: ask` (prompt for safety)
- ✅ `bash: { "git push": "ask", "*": "allow" }` (ask before push)

**Security Agent** (restricted)

- ✅ `edit: deny` (no modifications)
- ✅ `bash: { "git diff": "allow", "git log*": "allow", "*": "ask" }`

---

## System Prompt Quality

### Prompt Content

- ✅ System prompt clearly defines agent role
- ✅ Prompt explains agent capabilities and limitations
- ✅ Prompt includes specific focus areas
- ✅ Prompt provides guidance on response format
- ✅ Prompt addresses when to use vs not use agent
- ✅ Prompt references relevant resources (checklists, templates, etc.)

### Prompt Structure

- ✅ Clear role definition at start
- ✅ Specific instructions for agent behavior
- ✅ Examples of expected output (if applicable)
- ✅ Guidelines for edge cases
- ✅ Resource references section (if applicable)

### Prompt Best Practices

- ✅ Language is clear and unambiguous
- ✅ Instructions are actionable
- ✅ Tone appropriate for agent type
- ✅ Avoids contradictory instructions
- ✅ Focuses on "why" not just "what"

---

## Agent File Organization

### File Location

#### Global Agents

- ✅ Located in `~/.config/opencode/agent/`
- ✅ Accessible across all projects
- ✅ Appropriate for general-purpose agents

#### Project-Specific Agents

- ✅ Located in `.opencode/agent/`
- ✅ Only available in specific project
- ✅ Appropriate for project-specific workflows

### File Naming

- ✅ Filename is kebab-case (e.g., `code-reviewer.md`)
- ✅ Filename is descriptive of agent purpose
- ✅ Filename becomes agent identifier
- ✅ Extension is `.md` for markdown agents

### File Format

- ✅ Valid YAML frontmatter between `---` delimiters
- ✅ Markdown content after frontmatter
- ✅ Proper indentation in YAML
- ✅ No syntax errors in frontmatter

---

## Agent Documentation

### Internal Documentation

- ✅ System prompt explains agent capabilities
- ✅ Comments in config explain non-obvious settings
- ✅ Resource references documented in agent file

### External Documentation

- ✅ Agent follows official documentation at `https://opencode.ai/docs/agents/`
- ✅ Related commands reference agent
- ✅ Related tasks reference agent
- ✅ Usage examples provided

---

## Resource Integration

### Commands

- ✅ Related commands exist and reference agent
- ✅ Commands properly invoke agent with `agent:` field
- ✅ Command descriptions match agent capabilities

### Checklists

- ✅ Relevant checklists referenced in agent prompt
- ✅ Agent knows when to use specific checklists
- ✅ Checklist references validated (files exist)

### Tasks

- ✅ Related tasks referenced in agent prompt
- ✅ Agent knows when to invoke specific tasks
- ✅ Task references validated (files exist)

### Knowledge Base

- ✅ Relevant knowledge bases referenced
- ✅ Agent knows when to consult knowledge bases
- ✅ Knowledge base references validated (files exist)

### Templates

- ✅ Related templates referenced
- ✅ Agent knows which templates to use
- ✅ Template references validated (files exist)

---

## Built-in Agent Validation

### Build Agent (Primary)

- ✅ Mode set to `primary`
- ✅ All tools enabled by default
- ✅ Default agent for development work
- ✅ Full file operation access
- ✅ System command access
- ✅ Appropriate temperature for development

### Plan Agent (Primary)

- ✅ Mode set to `primary`
- ✅ Restricted permissions by default
- ✅ `edit: ask` (prompts before changes)
- ✅ `bash: ask` (prompts before commands)
- ✅ Analysis and planning focused
- ✅ No unintended modifications
- ✅ Lower temperature for deterministic analysis

### General Agent (Subagent)

- ✅ Mode set to `subagent`
- ✅ General-purpose research capabilities
- ✅ Code search abilities
- ✅ Multi-step task execution
- ✅ Can be invoked with `@general`
- ✅ Appropriate for keyword/file searches

---

## Agent Behavior Validation

### Invocation Methods

#### Primary Agents

- ✅ Can cycle through with Tab key
- ✅ Can switch with configured `switch_agent` keybind
- ✅ Handles main conversation
- ✅ Has access to configured tools

#### Subagents

- ✅ Can invoke with `@agentname` mention
- ✅ Can be invoked automatically by primary agents
- ✅ Creates child sessions when invoked
- ✅ Navigation works with Ctrl+Left/Right

### Session Navigation

- ✅ Child sessions created correctly
- ✅ Ctrl+Right cycles forward through sessions
- ✅ Ctrl+Left cycles backward through sessions
- ✅ Can navigate parent → child → parent

---

## Use Case Validation

### Code Analysis Agents

- ✅ Temperature: 0.0-0.2 (deterministic)
- ✅ Read-only tool access
- ✅ Prompt focuses on analysis
- ✅ No file modifications
- ✅ Appropriate for planning/review

### Development Agents

- ✅ Temperature: 0.3-0.5 (balanced)
- ✅ Full tool access (write, edit, bash)
- ✅ Prompt supports implementation
- ✅ Can modify files and run commands
- ✅ Appropriate for building features

### Creative/Brainstorming Agents

- ✅ Temperature: 0.6-1.0 (creative)
- ✅ Tool access appropriate for task
- ✅ Prompt encourages exploration
- ✅ Appropriate for ideation/design

### Documentation Agents

- ✅ Temperature: 0.3-0.5 (balanced)
- ✅ Write and edit enabled
- ✅ Bash disabled (no system commands)
- ✅ Prompt focuses on clarity
- ✅ References documentation standards

### Security Audit Agents

- ✅ Temperature: 0.1-0.2 (deterministic)
- ✅ Read-only access
- ✅ Limited bash (scan tools only)
- ✅ Prompt focuses on vulnerabilities
- ✅ Comprehensive security checklist

### Review Agents

- ✅ Temperature: 0.1-0.3 (focused)
- ✅ Read-only access
- ✅ Prompt provides constructive feedback
- ✅ No direct modifications
- ✅ Focuses on quality/best practices

---

## Testing and Validation

### Functional Testing

- ✅ Agent loads without errors
- ✅ Agent appears in agent list
- ✅ Agent can be invoked correctly
- ✅ Tools work as configured
- ✅ Permissions enforce correctly
- ✅ Model responds appropriately

### Configuration Testing

- ✅ Frontmatter parses without errors
- ✅ All file references resolve correctly
- ✅ Tool wildcards work as expected
- ✅ Permission overrides function correctly
- ✅ Temperature affects behavior as expected

### Integration Testing

- ✅ Agent integrates with commands
- ✅ Agent can invoke tasks
- ✅ Agent references checklists correctly
- ✅ Agent uses templates appropriately
- ✅ Agent consults knowledge bases

### User Experience Testing

- ✅ Agent description is discoverable
- ✅ Agent behavior matches description
- ✅ Agent provides helpful responses
- ✅ Agent respects configured limitations
- ✅ Error messages are clear

---

## Quality Checks

### Completeness Check

- ✅ All required frontmatter present
- ✅ Description explains purpose clearly
- ✅ Mode set appropriately
- ✅ Tool configuration complete
- ✅ Permission settings defined
- ✅ System prompt comprehensive

### Accuracy Check

- ✅ Agent purpose matches implementation
- ✅ Tool access matches stated capabilities
- ✅ Temperature appropriate for use case
- ✅ Permissions align with security requirements
- ✅ Resource references are valid

### Clarity Check

- ✅ Description is clear and concise
- ✅ System prompt is unambiguous
- ✅ Configuration is easy to understand
- ✅ Usage examples are provided
- ✅ Agent role is well-defined

### Security Check

- ✅ Permissions are not overly permissive
- ✅ Dangerous commands require approval
- ✅ Write access justified by use case
- ✅ Bash access restricted appropriately
- ✅ Read-only agents cannot modify files

### Consistency Check

- ✅ Configuration style consistent with other agents
- ✅ Naming conventions followed
- ✅ File location appropriate (global vs project)
- ✅ Temperature follows guidelines
- ✅ Prompt structure matches standards

---

## Common Agent Patterns

### Read-Only Analysis Agent

```yaml
---
description: Analyzes code without making changes
mode: subagent
temperature: 0.1
tools:
  write: false
  edit: false
  bash: false
---
```

### Full Development Agent

```yaml
---
description: Complete development with all tools
mode: primary
temperature: 0.3
tools:
  write: true
  edit: true
  bash: true
permission:
  bash:
    'git push': ask
    '*': allow
---
```

### Documentation Agent

```yaml
---
description: Creates and maintains documentation
mode: subagent
temperature: 0.4
tools:
  write: true
  edit: true
  bash: false
---
```

### Security Audit Agent

```yaml
---
description: Security analysis and vulnerability detection
mode: subagent
temperature: 0.1
tools:
  write: false
  edit: false
  bash: true
permission:
  bash:
    'npm audit': allow
    'git diff': allow
    '*': ask
---
```

### Review Agent

```yaml
---
description: Code review with constructive feedback
mode: subagent
temperature: 0.2
tools:
  write: false
  edit: false
permission:
  bash:
    'git diff': allow
    'git log*': allow
    '*': deny
---
```

---

## Best Practices Summary

### Configuration

- Always include description (required)
- Set mode explicitly (primary/subagent/all)
- Configure temperature for use case
- Override tools based on agent purpose
- Set permissions defensively

### Security

- Use `ask` for destructive operations
- Restrict bash access by default
- Deny write/edit for read-only agents
- Use glob patterns for command groups
- Test permission settings thoroughly

### Organization

- Use global config for cross-project agents
- Use project config for specific workflows
- Follow kebab-case naming
- Group related agents logically
- Document integration points

### Quality

- Write clear, focused descriptions
- Create comprehensive system prompts
- Provide usage examples
- Reference relevant resources
- Test agent behavior thoroughly

---

## Maintenance

### Review Triggers

- Agent not behaving as expected
- New tool requirements identified
- Permission needs change
- Model updates available
- Resource references change
- Quarterly agent review

### Update Process

1. Review agent usage patterns
2. Update configuration as needed
3. Test changes thoroughly
4. Update documentation
5. Validate resource references
6. Check integration points

---

## Related Resources

### Internal Resources

- Knowledge Base: `.opencode/knowledge-base/agent-configuration-reference.md` - Complete configuration reference
- Template: `.opencode/template/opencode-agent-tmpl.yaml` - Agent structure template
- Task: `.opencode/task/opencode-agent.md` - Agent creation workflow
- Command: `/create-agent` - Interactive agent creation

### External Resources

- Documentation: `https://opencode.ai/docs/agents/` - Official agent documentation
- Permissions: `https://opencode.ai/docs/permissions/` - Permission system details
- Tools: `https://opencode.ai/docs/tools/` - Available tools reference

---

## Metadata

- **Category**: Configuration Quality
- **Target**: OpenCode agent developers and maintainers
- **Difficulty**: Intermediate
- **Last Updated**: 2025-11-11
- **Version**: 1.0.0
