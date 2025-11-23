---
title: Agent Configuration Reference
description: Complete reference for OpenCode agent configuration options, types, and patterns from official documentation
type: knowledge-base
category: configuration
version: 1.0.0
difficulty: intermediate
tags:
  - agent
  - configuration
  - reference
  - modes
  - tools
  - permissions
  - patterns
related_resources:
  - .opencode/template/opencode-agent-tmpl.yaml
  - .opencode/checklist/opencode-agent.md
  - .opencode/command/create-agent.md
last_updated: 2025-11-19
---

# Agent Configuration Reference

> Complete reference for OpenCode agent configuration options, types, and best practices

## Overview

This knowledge base provides comprehensive reference material for configuring OpenCode agents based on the official
documentation at <https://opencode.ai/docs/agents/>. Agents are specialized AI assistants that can be configured for
specific tasks and workflows with custom prompts, models, and tool access.

**When to use this reference:**

- Creating new agents with specific configuration needs
- Understanding agent types and modes
- Configuring permissions and tool access
- Setting up provider-specific options
- Troubleshooting agent behavior

**Key concepts covered:**

- Agent types (primary vs subagent)
- Configuration options (all fields)
- Built-in agents
- Mode selection
- Tool and permission configuration
- Provider-specific options

---

## Core Concepts

### Concept 1: Agent Types

**Definition**: OpenCode has two fundamental agent types that determine how agents are invoked and used.

**Types**:

1. **Primary Agents**
   - Main assistants you interact with directly
   - Switchable using Tab key or `switch_agent` keybind
   - Handle main conversation
   - Access all configured tools
   - Examples: Build, Plan

2. **Subagents**
   - Specialized assistants for specific tasks
   - Invoked by @ mention or automatically by primary agents
   - Focused on particular domains
   - Can create child sessions
   - Example: General

**Purpose**:

- Primary agents provide the main interface for development work
- Subagents offer specialized expertise when needed
- Separation enables focused tool access and behavior

**Navigation**:

- **Ctrl+Right** (or `session_child_cycle`): Cycle forward through parent → child sessions
- **Ctrl+Left** (or `session_child_cycle_reverse`): Cycle backward through sessions

---

### Concept 2: Mode Configuration

**Definition**: The `mode` field controls how an agent can be used within OpenCode.

**Values**:

- `"primary"`: Agent is Tab-switchable and handles main conversation
- `"subagent"`: Agent is @-invokable and called for specialized tasks
- `"all"`: Agent can function as both primary and subagent (default if not specified)

**Purpose**: Mode determines agent discoverability and invocation patterns.

**Example**:

```yaml
---
description: Reviews code for best practices
mode: subagent # Only invokable with @agent-name
---
```

**Decision Guide**:

- Need Tab-switchable main agent? → `primary`
- Need specialized @-invokable expert? → `subagent`
- Need both capabilities? → `all`

---

### Concept 3: Configuration Hierarchy

**Definition**: Agent-specific configuration overrides global configuration.

**Hierarchy (highest to lowest priority)**:

1. Agent-specific config (in `agent` object or markdown frontmatter)
2. Global config (in `opencode.json` or global config)
3. OpenCode defaults

**Purpose**: Allows global defaults with per-agent customization.

**Example**:

```json
{
  "tools": {
    "write": true,
    "bash": true
  },
  "agent": {
    "plan": {
      "tools": {
        "write": false, // Overrides global
        "bash": false // Overrides global
      }
    }
  }
}
```

---

### Concept 4: Built-in Agents

**Definition**: OpenCode includes three built-in agents with predefined behavior.

**Built-in Agents**:

1. **Build** (Primary)
   - All tools enabled by default
   - Standard agent for development work
   - Full file operations and system commands

2. **Plan** (Primary)
   - Restricted permissions (all set to `ask`)
   - Designed for analysis and planning
   - Prevents unintended changes

3. **General** (Subagent)
   - General-purpose research agent
   - Code search capabilities
   - Multi-step task execution

**Purpose**: Provide ready-to-use agents for common workflows.

---

## Configuration Options

### Required Options

#### description

**Type**: `string`  
**Required**: Yes  
**Purpose**: Brief description of what the agent does and when to use it

```yaml
---
description: Reviews code for best practices and potential issues
---
```

**Usage**:

- Used for agent discovery
- Helps primary agents select appropriate subagents
- Shown in agent listings

---

### Optional Options

#### mode

**Type**: `"primary" | "subagent" | "all"`  
**Default**: `"all"`  
**Purpose**: Control how the agent can be invoked

```yaml
---
mode: subagent
---
```

**Details**: See "Core Concept 2: Mode Configuration" above.

---

#### temperature

**Type**: `number` (0.0 - 1.0)  
**Default**: Model-specific (typically 0, or 0.55 for Qwen models)  
**Purpose**: Control randomness and creativity of responses

```yaml
---
temperature: 0.1
---
```

**Ranges**:

- **0.0-0.2**: Very focused and deterministic (code analysis, planning)
- **0.3-0.5**: Balanced responses (general development)
- **0.6-1.0**: Creative and varied (brainstorming, exploration)

**Example**:

```json
{
  "agent": {
    "analyze": {
      "temperature": 0.1,
      "prompt": "{file:./prompts/analysis.txt}"
    },
    "build": {
      "temperature": 0.3
    },
    "brainstorm": {
      "temperature": 0.7
    }
  }
}
```

---

#### model

**Type**: `string` (format: `provider/model-name`)  
**Purpose**: Override default model for this agent

```yaml
---
model: anthropic/claude-haiku-4-20250514
---
```

**Usage**:

- Use faster models for planning
- Use more capable models for implementation
- Use specialized models for specific tasks

**Example**:

```json
{
  "agent": {
    "plan": {
      "model": "anthropic/claude-haiku-4-20250514"
    },
    "build": {
      "model": "anthropic/claude-sonnet-4-20250514"
    }
  }
}
```

**Tip**: Run `opencode models` to see available models.

---

#### tools

**Type**: `object` with tool names as keys, booleans as values  
**Purpose**: Enable or disable specific tools for this agent

```yaml
---
tools:
  write: false
  edit: false
  bash: false
---
```

**Wildcard Support**:

```json
{
  "agent": {
    "readonly": {
      "tools": {
        "mymcp_*": false, // Disable all tools from MCP server
        "write": false,
        "edit": false
      }
    }
  }
}
```

**Common Patterns**:

- Read-only: `write: false`, `edit: false`, `bash: false`
- Documentation: `write: true`, `edit: true`, `bash: false`
- Full development: All tools enabled

**Note**: Agent-specific config overrides global config.

---

#### permission

**Type**: `object` with permission rules  
**Values**: `"ask"` | `"allow"` | `"deny"`  
**Supported Tools**: `edit`, `bash`, `webfetch`  
**Purpose**: Control what actions require user approval

```yaml
---
permission:
  edit: ask
  bash:
    'git status': allow
    'git *': ask
    '*': ask
  webfetch: deny
---
```

**Permission Values**:

- `"ask"`: Prompt for approval before running
- `"allow"`: Allow all operations without approval
- `"deny"`: Disable the tool entirely

**Bash Permissions with Patterns**:

```json
{
  "agent": {
    "build": {
      "permission": {
        "bash": {
          "git status": "allow", // Specific command
          "git push": "ask", // Specific command
          "git *": "ask", // Glob pattern
          "*": "ask" // Wildcard for all other commands
        }
      }
    }
  }
}
```

**Hierarchy**: Specific rules override wildcard `*` patterns.

---

#### prompt

**Type**: `string` (file path format: `{file:./path/to/prompt.txt}`)  
**Purpose**: Specify custom system prompt file

```json
{
  "agent": {
    "review": {
      "prompt": "{file:./prompts/code-review.txt}"
    }
  }
}
```

**For Markdown Agents**: The content after frontmatter IS the prompt.

```markdown
---
description: Code reviewer
mode: subagent
---

You are a code reviewer. Focus on quality, security, and maintainability.
```

**Path Resolution**: Relative to config file location (works for both global and project-specific).

---

#### disable

**Type**: `boolean`  
**Default**: `false`  
**Purpose**: Disable the agent

```json
{
  "agent": {
    "review": {
      "disable": true
    }
  }
}
```

---

#### Additional Provider-Specific Options

**Type**: Any additional fields  
**Purpose**: Pass through directly to provider as model options

**Example (OpenAI reasoning models)**:

```json
{
  "agent": {
    "deep-thinker": {
      "description": "High reasoning effort for complex problems",
      "model": "openai/gpt-5",
      "reasoningEffort": "high",
      "textVerbosity": "low"
    }
  }
}
```

**Note**: Options are model and provider-specific. Check provider documentation for available parameters.

---

## Common Patterns

### Pattern 1: Read-Only Analysis Agent

**Problem**: Need to analyze code without risk of accidental modifications.

**Solution**: Disable all modification tools.

**Implementation**:

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
You are a code analyst. Review code for quality, security, and best practices without making any modifications.
```

**Benefits**:

- ✅ Safe for planning and review
- ✅ No unintended file changes
- ✅ Deterministic analysis with low temperature

**When to Use**:

- Planning agents
- Security auditors
- Code reviewers
- Architecture analyzers

---

### Pattern 2: Documentation Writer

**Problem**: Need agent that can create/edit docs but shouldn't run system commands.

**Solution**: Enable write/edit, disable bash, require permission for edits.

**Implementation**:

```yaml
---
description: Creates and maintains documentation
mode: subagent
temperature: 0.4
tools:
  write: true
  edit: true
  bash: false
permission:
  edit: ask
---
You are a technical writer. Create clear, comprehensive documentation with proper structure, examples, and formatting.
```

**Benefits**:

- ✅ Can create and update documentation
- ✅ No access to system commands
- ✅ User approves all edits
- ✅ Balanced temperature for clear writing

**When to Use**:

- API documentation
- User guides
- README files
- Technical specifications

---

### Pattern 3: Full Development Agent

**Problem**: Need unrestricted development capability with safety checks on dangerous operations.

**Solution**: Enable all tools, require permission for dangerous commands.

**Implementation**:

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
    'kubectl apply': ask
    '*': allow
  edit: ask
---
You are a full-stack developer. Implement features, fix bugs, and handle all development tasks with appropriate caution.
```

**Benefits**:

- ✅ Full development capabilities
- ✅ Safety checks on destructive operations
- ✅ User controls deployments and pushes
- ✅ Balanced temperature for development

**When to Use**:

- Feature implementation
- Bug fixes
- Refactoring
- General development work

---

### Pattern 4: Security Auditor

**Problem**: Need to run security scanning tools but prevent any code modifications.

**Solution**: Read-only with limited bash access for security tools.

**Implementation**:

```yaml
---
description: Performs security audits and identifies vulnerabilities
mode: subagent
temperature: 0.1
tools:
  write: false
  edit: false
  bash: true
permission:
  bash:
    "npm audit": allow
    "git diff": allow
    "git log*": allow
    "*": ask
---

You are a security expert. Focus on identifying potential security issues.

Look for:
- Input validation vulnerabilities
- Authentication and authorization flaws
- Data exposure risks
- Dependency vulnerabilities
- Configuration security issues
```

**Benefits**:

- ✅ Can run security scanning tools
- ✅ No code modification capability
- ✅ Deterministic analysis
- ✅ Safe command permissions

**When to Use**:

- Security audits
- Vulnerability scanning
- Compliance checks
- Code security reviews

---

## Configuration Formats

### Format 1: JSON Configuration

**Location**: `opencode.json` config file

**Structure**:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "agent": {
    "agent-name": {
      "description": "Agent description",
      "mode": "primary",
      "model": "anthropic/claude-sonnet-4-20250514",
      "temperature": 0.3,
      "prompt": "{file:./prompts/agent.txt}",
      "tools": {
        "write": true,
        "edit": true
      },
      "permission": {
        "edit": "ask",
        "bash": {
          "git push": "ask",
          "*": "allow"
        }
      }
    }
  }
}
```

**Benefits**:

- ✅ Centralized configuration
- ✅ Can configure multiple agents
- ✅ Schema validation support
- ✅ Easy version control

**When to Use**:

- Managing multiple agents
- Project-specific configurations
- Team-shared configurations

---

### Format 2: Markdown Files

**Location**:

- Global: `~/.config/opencode/agent/`
- Project: `.opencode/agent/`

**Structure**:

```markdown
---
description: Reviews code for quality and best practices
mode: subagent
model: anthropic/claude-sonnet-4-20250514
temperature: 0.1
tools:
  write: false
  edit: false
  bash: false
---

You are in code review mode. Focus on:

- Code quality and best practices
- Potential bugs and edge cases
- Performance implications
- Security considerations

Provide constructive feedback without making direct changes.
```

**Benefits**:

- ✅ Agent name from filename
- ✅ Prompt inline with configuration
- ✅ Easy to read and edit
- ✅ Version control friendly

**When to Use**:

- Single-purpose agents
- Agents with detailed prompts
- Personal agents
- Quick agent creation

**Naming**: Filename becomes agent name (e.g., `review.md` → `review` agent)

---

## Best Practices

### DO: Recommended Practices

#### 1. Use Descriptive Names and Descriptions

**Why**: Helps with agent discovery and selection.

**Example**:

```yaml
---
description: Performs security audits and identifies vulnerabilities in code
mode: subagent
---
```

✅ Clear purpose  
✅ Specific domain  
✅ Easy to understand

---

#### 2. Set Appropriate Temperature

**Why**: Temperature affects output consistency and creativity.

**Example**:

```json
{
  "agent": {
    "security": {
      "temperature": 0.1 // Deterministic for security analysis
    },
    "docs": {
      "temperature": 0.4 // Balanced for documentation
    },
    "brainstorm": {
      "temperature": 0.7 // Creative for ideation
    }
  }
}
```

✅ Task-appropriate values  
✅ Consistent results when needed  
✅ Creative when useful

---

#### 3. Restrict Tools by Purpose

**Why**: Prevents unintended actions and keeps agents focused.

**Example**:

```yaml
---
description: Code reviewer
tools:
  write: false # Read-only
  edit: false # No modifications
  bash: false # No commands
---
```

✅ Security through least privilege  
✅ Clear boundaries  
✅ Focused behavior

---

#### 4. Use Permissions for Safety

**Why**: Provides user control over destructive operations.

**Example**:

```yaml
---
permission:
  bash:
    'git status': allow # Safe command
    'git push': ask # Requires approval
    'rm -rf *': deny # Blocked entirely
    '*': ask # Default to ask
---
```

✅ User maintains control  
✅ Safe commands allowed  
✅ Dangerous commands blocked or require approval

---

#### 5. Override Global Config Strategically

**Why**: Allows agent-specific behavior while maintaining global defaults.

**Example**:

```json
{
  "tools": {
    "write": true, // Global default
    "bash": true
  },
  "agent": {
    "review": {
      "tools": {
        "write": false // Override for this agent only
      }
    }
  }
}
```

✅ Minimal configuration duplication  
✅ Clear overrides  
✅ Maintainable

---

### DON'T: Anti-Patterns to Avoid

#### 1. Overly Permissive Agents

**Problem**: Giving all tools to specialized agents reduces focus and increases risk.

**Bad Example**:

```yaml
---
description: Documentation writer
tools:
  write: true
  edit: true
  bash: true # ❌ Not needed for docs
permission:
  bash: allow # ❌ Too permissive
---
```

**Good Alternative**:

```yaml
---
description: Documentation writer
tools:
  write: true
  edit: true
  bash: false # ✅ Not needed
permission:
  edit: ask # ✅ User control
---
```

---

#### 2. Vague Agent Descriptions

**Problem**: Generic descriptions make agent selection difficult.

**Bad Example**:

```yaml
---
description: Helper agent # ❌ Too vague
---
```

**Good Alternative**:

```yaml
---
description: Reviews code for security vulnerabilities and suggests fixes # ✅ Specific
---
```

---

#### 3. Wrong Mode Selection

**Problem**: Using primary mode for specialized tasks clutters agent list.

**Bad Example**:

```yaml
---
description: Analyzes security vulnerabilities
mode: primary # ❌ Should be subagent
---
```

**Good Alternative**:

```yaml
---
description: Analyzes security vulnerabilities
mode: subagent # ✅ Specialized task
---
```

---

#### 4. Ignoring Temperature Impact

**Problem**: Using wrong temperature for task type.

**Bad Example**:

```yaml
---
description: Code analyzer
temperature: 0.9 # ❌ Too high for analysis
---
```

**Good Alternative**:

```yaml
---
description: Code analyzer
temperature: 0.1 # ✅ Deterministic
---
```

---

## Quick Reference

### Configuration Options Summary

| Option           | Type    | Required | Default        | Purpose                         |
| ---------------- | ------- | -------- | -------------- | ------------------------------- |
| `description`    | string  | ✅ Yes   | -              | Agent purpose and when to use   |
| `mode`           | string  | No       | `"all"`        | `primary`, `subagent`, or `all` |
| `temperature`    | number  | No       | Model default  | Randomness (0.0-1.0)            |
| `model`          | string  | No       | Global default | Override model                  |
| `tools`          | object  | No       | Global config  | Enable/disable tools            |
| `permission`     | object  | No       | Global config  | Control approvals               |
| `prompt`         | string  | No       | -              | Custom prompt file path         |
| `disable`        | boolean | No       | `false`        | Disable agent                   |
| `*` (additional) | any     | No       | -              | Provider-specific options       |

---

### Temperature Ranges

| Range   | Behavior               | Use Cases                                |
| ------- | ---------------------- | ---------------------------------------- |
| 0.0-0.2 | Deterministic, focused | Code analysis, planning, security        |
| 0.3-0.5 | Balanced               | General development, documentation       |
| 0.6-1.0 | Creative, varied       | Brainstorming, exploration, architecture |

---

### Permission Values

| Value     | Behavior             | When to Use          |
| --------- | -------------------- | -------------------- |
| `"ask"`   | Prompt before action | Default for safety   |
| `"allow"` | Auto-approve         | Safe operations      |
| `"deny"`  | Block entirely       | Dangerous operations |

---

### Built-in Agents

| Agent   | Mode     | Purpose                  | Tools            |
| ------- | -------- | ------------------------ | ---------------- |
| Build   | primary  | Full development         | All enabled      |
| Plan    | primary  | Analysis without changes | All set to `ask` |
| General | subagent | Research and search      | Default tools    |

---

## Troubleshooting

### Issue 1: Agent Not Appearing in List

**Symptoms**:

- Agent defined but not visible
- Cannot invoke agent with @ mention
- Tab doesn't cycle to agent

**Causes**:

- Missing `description` field (required)
- Invalid YAML frontmatter syntax
- File not in correct location
- Agent is disabled

**Solution**:

```yaml
---
description: 'Reviews code for best practices' # ✅ Required field
mode: subagent
# disable: true  # ❌ Remove or set to false
---
```

**Prevention**:

- Always include `description`
- Validate YAML syntax
- Check file location
- Verify agent is not disabled

---

### Issue 2: Tools Not Working as Expected

**Symptoms**:

- Agent cannot access expected tools
- Commands fail with permission errors
- Wrong tools are enabled/disabled

**Causes**:

- Global config overriding agent config (incorrect - should be opposite)
- Wildcard patterns catching tools unintentionally
- Tool configuration inheritance issues

**Solution**:

```json
{
  "tools": {
    "write": true // Global default
  },
  "agent": {
    "review": {
      "tools": {
        "write": false // ✅ Agent override takes precedence
      }
    }
  }
}
```

**Prevention**:

- Remember: Agent config overrides global config
- Test tool access after configuration
- Use specific overrides instead of wildcards when possible

---

### Issue 3: Permission Prompts Not Appearing

**Symptoms**:

- Actions execute without prompts
- Expected "ask" permissions auto-approve
- Cannot control dangerous operations

**Causes**:

- Permission set to `"allow"` instead of `"ask"`
- Global permission overriding agent permission (incorrect)
- Permission not configured for the tool

**Solution**:

```yaml
---
permission:
  edit: ask # ✅ Prompt for edits
  bash:
    'git push': ask # ✅ Prompt for dangerous commands
    '*': ask # ✅ Prompt for other commands
---
```

**Prevention**:

- Use `"ask"` as default
- Explicitly configure permissions for destructive operations
- Test permission behavior before production use

---

### Issue 4: Wrong Agent Behavior

**Symptoms**:

- Agent too creative or too rigid
- Responses don't match specialization
- Agent attempting actions outside its purpose

**Causes**:

- Temperature too high/low for task
- Vague or missing system prompt
- Tools too permissive
- Wrong mode selected

**Solution**:

```yaml
---
description: 'Code security analyzer'
mode: subagent
temperature: 0.1 # ✅ Deterministic for analysis
tools:
  write: false # ✅ Read-only
  edit: false
  bash: false
---
You are a security analyst. Focus exclusively on identifying vulnerabilities. Do not suggest fixes or make changes -
only analyze and report.
```

**Prevention**:

- Set temperature based on task type
- Write specific, focused system prompts
- Restrict tools to agent's purpose
- Choose appropriate mode

---

## Related Resources

### Internal Resources

- **Template**: `.opencode/template/opencode-agent-tmpl.yaml` - Agent template structure
- **Checklist**: `.opencode/checklist/opencode-agent.md` - Agent validation checklist
- **Command**: `.opencode/command/create-agent.md` - Agent creation command
- **Task**: `.opencode/task/opencode-agent.md` - Agent creation workflow

### External Resources

- **Official Docs**: <https://opencode.ai/docs/agents/> - Complete agent documentation
- **Tools Docs**: <https://opencode.ai/docs/tools/> - Available tools reference
- **Permissions Docs**: <https://opencode.ai/docs/permissions/> - Permission system details
- **Models Docs**: <https://opencode.ai/docs/models/> - Available models and providers

### Related Knowledge Bases

- Tool Configuration Patterns (if exists)
- Permission Best Practices (if exists)
- Model Selection Guide (if exists)

---

## Metadata

- **Category**: Configuration Reference
- **Tags**: agent, configuration, reference, modes, tools, permissions, patterns
- **Difficulty**: Intermediate
- **Target Audience**: OpenCode users creating or configuring agents
- **Reading Time**: ~20 minutes
- **Last Updated**: 2025-11-19
- **Version**: 1.0.0
- **Source**: <https://opencode.ai/docs/agents/> (official documentation)
- **Prerequisites**: Basic understanding of OpenCode configuration and JSON/YAML
