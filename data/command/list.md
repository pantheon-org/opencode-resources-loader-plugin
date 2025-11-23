---
description: List OpenCode resources (agents, commands, checklists, tasks, templates, knowledge-bases, sessions)
agent: general
type: command
category: Development
tags:
  - command
  - list
  - resources
  - opencode
version: 1.0.0
last_updated: 2025-11-19
---

# List Resources Command

Unified command to list any type of OpenCode resource with comprehensive documentation.

## Usage

```bash
# With resource type argument
/list <type>

# Examples:
/list agents
/list commands
/list checklists
/list tasks
/list templates
/list knowledge-bases
/list sessions
/list all
```

## Arguments

**$1 - Resource Type** (required)

Valid types (accepts singular or plural):

- `agent` or `agents` - List all available OpenCode agents
- `command` or `commands` - List all available OpenCode slash commands
- `checklist` or `checklists` - List all available OpenCode checklists
- `task` or `tasks` - List all available OpenCode tasks
- `template` or `templates` - List all available OpenCode templates
- `knowledge-base` or `knowledge-bases` - List all available OpenCode knowledge base articles
- `session` or `sessions` - List all session summaries in .sessions directory
- `all` - List all resource types

## Interactive Mode

If the resource type argument is missing, prompt the user:

```
What type of resource would you like to list?

Available types:
- agents: Specialized AI assistants
- commands: Slash commands for workflows
- checklists: Step-by-step validation checklists
- tasks: Reusable task workflows
- templates: Standard template structures
- knowledge-bases: Reference documentation and patterns
- sessions: Session summaries in .sessions directory
- all: List all resource types

Please specify the type:
```

## Processing Logic

1. **Check for $1 argument**
   - If missing, show interactive prompt above
   - Wait for user to specify resource type

2. **Normalize resource type**
   - Accept both singular and plural forms
   - Convert to canonical form for routing

3. **Validate resource type**
   - Check if $1 matches valid types
   - If invalid, show error and list valid types
   - Suggest closest match if typo detected

4. **Load ONLY relevant resources**
   - Load specific listing template for the resource type
   - Load relevant knowledge base if needed
   - Do NOT load all resources upfront (see loading-strategy.md)

5. **Execute appropriate listing**
   - Route to the correct resource listing logic based on $1
   - Follow the specific listing format for that resource type

## Resource Type: agents

When $1 matches "agent" or "agents":

### Resources to Load

**Load ONLY when listing agents:**

- **Knowledge Base**: `agent-configuration-reference.md` (agent metadata and configuration patterns)
- **Template**: Create `agent-listing-format-tmpl.yaml` (format specification - TO BE CREATED)

### Discovery Process

1. **Discover agent files:**

   ```bash
   # Global agents
   ls -1 ~/.config/opencode/agent/*.md 2>/dev/null | xargs -I {} basename {} .md | sort

   # Project agents
   ls -1 .opencode/agent/*.md 2>/dev/null | xargs -I {} basename {} .md | sort
   ```

2. **Extract metadata from each agent:**
   - Read frontmatter: `description`, `mode`, `temperature`, `tools`, `permissions`
   - Identify agent type: primary (mode: primary/all) or subagent (mode: subagent/all)
   - Note any special configuration

3. **Categorize agents** by purpose:
   - Documentation agents
   - Analysis agents
   - Development agents
   - Operations agents
   - Specialized agents

4. **Format output** according to agent listing template

### Expected Output Structure

```markdown
# OpenCode Agents

## Primary Agents

(Invoked by Tab selection)

- **agent-name** - Description
  - Configuration: [key details]

## Subagents

(Invoked with @agent-name)

- **@agent-name** - Description
  - Configuration: [key details]

## Summary

- Total agents: X (Y primary, Z subagents)
- Locations: Global, Project
```

---

## Resource Type: commands

When $1 matches "command" or "commands":

### Resources to Load

**Load ONLY when listing commands:**

- **Template**: `command-listing-format-tmpl.yaml` (format specification)
- **Knowledge Base**: `command-system-architecture.md` (if categorization unclear)
- **Checklist**: `command-discovery-validation.md` (optional, for validation)

### Discovery Process

1. **Discover command files:**

   ```bash
   # Global commands
   ls -1 ~/.config/opencode/command/*.md 2>/dev/null | xargs -I {} basename {} .md | sort

   # Project commands
   ls -1 .opencode/command/*.md 2>/dev/null | xargs -I {} basename {} .md | sort
   ```

2. **Extract metadata from each command:**
   - Read frontmatter: `description`, `agent`, `subtask`, `model`, `temperature`
   - Determine category (Documentation, Development, Git, Analysis, Workflow, Utility, Session)
   - Note special attributes (subtask, custom model)

3. **Format output** according to `command-listing-format-tmpl.yaml`

### Standard Categories

From command-system-architecture.md:

- **Documentation**: Generate or improve documentation
- **Development**: Create or modify code and resources
- **Git**: Git operations and GitHub integration
- **Analysis**: Analyze code, projects, or resources
- **Workflow**: Execute specific workflows
- **Utility**: Helper commands and utilities
- **Session**: Manage OpenCode sessions

### Expected Output Structure

Follow `command-listing-format-tmpl.yaml` exactly:

- Group commands by category
- Include category descriptions and "when to use"
- Format: `- /command-name - Description`
- Add summary statistics

---

## Resource Type: checklists

When $1 matches "checklist" or "checklists":

### Resources to Load

**Load ONLY when listing checklists:**

- **Template**: `checklist-listing-format-tmpl.yaml` (format specification)
- **Knowledge Base**: `checklist-system-architecture.md` (if categorization unclear)
- **Checklist**: `checklist-discovery-validation.md` (optional, for validation)

### Discovery Process

1. **Discover checklist files:**

   ```bash
   # Global checklists
   ls -1 ~/.config/opencode/checklist/*.md 2>/dev/null | xargs -I {} basename {} .md | sort

   # Project checklists
   ls -1 .opencode/checklist/*.md 2>/dev/null | xargs -I {} basename {} .md | sort
   ```

2. **Extract metadata from each checklist:**
   - Read frontmatter: `title`, `description`, `category`, `version`, `tags`
   - Determine category (Documentation, Quality, Development, Operations, Process)
   - Note checklist size and scope

3. **Format output** according to `checklist-listing-format-tmpl.yaml`

### Expected Output Structure

Follow `checklist-listing-format-tmpl.yaml` exactly:

- Group by category with descriptions
- Include "when to use" guidance
- Show checklist tool name (e.g., checklist_api_documentation)
- Add summary statistics

---

## Resource Type: tasks

When $1 matches "task" or "tasks":

### Resources to Load

**Load ONLY when listing tasks:**

- **Template**: `task-listing-format-tmpl.yaml` (format specification)
- **Knowledge Base**: `task-system-architecture.md` (if categorization unclear)
- **Checklist**: `task-discovery-validation.md` (optional, for validation)

### Discovery Process

1. **Discover task files:**

   ```bash
   # Global tasks
   ls -1 ~/.config/opencode/task/*.md 2>/dev/null | xargs -I {} basename {} .md | sort

   # Project tasks
   ls -1 .opencode/task/*.md 2>/dev/null | xargs -I {} basename {} .md | sort
   ```

2. **Extract metadata from each task:**
   - Read frontmatter: `description`, `category`, `version`, `mode`
   - Determine category (Analysis, Documentation, Development, Operations, Research)
   - Note task type (meta-tasks that create resources vs. operational tasks)

3. **Format output** according to `task-listing-format-tmpl.yaml`

### Expected Output Structure

Follow `task-listing-format-tmpl.yaml` exactly:

- Group by category with descriptions
- Include "when to use" guidance
- Show task tool name (e.g., task_technology_detection)
- Add summary statistics

---

## Resource Type: templates

When $1 matches "template" or "templates":

### Resources to Load

**Load ONLY when listing templates:**

- **Template**: `template-listing-format-tmpl.yaml` (format specification)
- **Knowledge Base**: `template-system-architecture.md` (if categorization unclear)
- **Checklist**: `template-discovery-validation.md` (optional, for validation)

### Discovery Process

1. **Discover template files:**

   ```bash
   # Global templates
   ls -1 ~/.config/opencode/template/*.yaml 2>/dev/null | xargs -I {} basename {} | sort

   # Project templates
   ls -1 .opencode/template/*.yaml 2>/dev/null | xargs -I {} basename {} | sort
   ```

2. **Extract metadata from each template:**
   - Read YAML: `template_title`, `template_description`, `template_category`, `template_version`
   - Determine category (OpenCode Resources, Documentation, Workflow, Reference, Domain-Specific)
   - Note template type (meta-templates vs. content templates)

3. **Format output** according to `template-listing-format-tmpl.yaml`

### Expected Output Structure

Follow `template-listing-format-tmpl.yaml` exactly:

- Group by category with descriptions
- Include "when to use" guidance
- Show template tool name (e.g., template_jira_ticket_description)
- Add summary statistics

---

## Resource Type: knowledge-bases

When $1 matches "knowledge-base" or "knowledge-bases":

### Resources to Load

**Load ONLY when listing knowledge bases:**

- **Template**: `knowledge-base-listing-format-tmpl.yaml` (format specification)
- **Knowledge Base**: `knowledge-base-system-architecture.md` (if categorization unclear)
- **Checklist**: `knowledge-base-discovery-validation.md` (optional, for validation)

### Discovery Process

1. **Discover knowledge base files:**

   ```bash
   # Global knowledge bases
   ls -1 ~/.config/opencode/knowledge-base/*.md 2>/dev/null | xargs -I {} basename {} .md | sort

   # Project knowledge bases
   ls -1 .opencode/knowledge-base/*.md 2>/dev/null | xargs -I {} basename {} .md | sort
   ```

2. **Extract metadata from each knowledge base:**
   - Read frontmatter: `title`, `description`, `category`, `version`, `tags`
   - Use fallback: H1 heading or first paragraph if frontmatter missing
   - Determine category (Documentation, CI/CD, Development, Patterns, Domain-Specific, Meta)
   - Extract key topics from content

3. **Format output** according to `knowledge-base-listing-format-tmpl.yaml`

### Expected Output Structure

Follow `knowledge-base-listing-format-tmpl.yaml` exactly:

- Group by category with descriptions
- Include "when to use" guidance
- Show KB tool name (e.g., knowledge_base_mermaid_diagrams)
- Add summary statistics

---

## Resource Type: sessions

When $1 matches "session" or "sessions":

### Resources to Load

**No additional resources needed** - sessions are simple file listings.

### Discovery Process

1. **Check for .sessions directory:**

   ```bash
   pwd  # Show current working directory
   ls -la .sessions 2>/dev/null
   ```

2. **Find session summary files:**

   ```bash
   find .sessions -maxdepth 1 -name "session-summary-*.md" -type f 2>/dev/null | sort -r
   ```

3. **For each session file, extract:**
   - Filename and timestamp (from filename pattern)
   - File size and last modified date (via ls -la)
   - Brief preview (first few lines of content)

### Output Format

```markdown
# Session Summaries

## Available Sessions

For each session file:

- **session-summary-YYYY-MM-DD-HHMMSS.md**
  - Created: [timestamp from filename]
  - Size: [file size]
  - Last modified: [date]
  - Preview: [first few lines]

## Summary

- Total sessions: X
- Location: .sessions/
- Working directory: [pwd]

## Note

If no sessions found:

1. Create `.sessions` directory: `mkdir .sessions`
2. Run `/save-session` to create one for the current session
```

---

## Resource Type: all

When $1 matches "all":

### Resources to Load

**Load listing templates as needed** - load each template only when processing that resource type section.

### Process

1. **Execute listing for each resource type** in order:
   - agents
   - commands
   - checklists
   - tasks
   - templates
   - knowledge-bases
   - sessions

2. **For each type:**
   - Load only its specific listing template
   - Execute discovery process
   - Format output according to template
   - Include section separator

3. **Provide comprehensive summary:**

   ```markdown
   ## Overall Summary

   - Total agents: X
   - Total commands: Y
   - Total checklists: Z
   - Total tasks: A
   - Total templates: B
   - Total knowledge bases: C
   - Total sessions: D
   ```

---

## Error Handling

### Missing $1 Argument

If $1 is not provided:

```
What type of resource would you like to list?

Available types:
- agents: Specialized AI assistants
- commands: Slash commands for workflows
- checklists: Step-by-step validation checklists
- tasks: Reusable task workflows
- templates: Standard template structures
- knowledge-bases: Reference documentation and patterns
- sessions: Session summaries in .sessions directory

Please specify the type:
```

### Invalid Resource Type

If $1 doesn't match valid types:

```
❌ Invalid resource type: "$1"

Valid types (singular or plural):
- agent / agents
- command / commands
- checklist / checklists
- task / tasks
- template / templates
- knowledge-base / knowledge-bases
- session / sessions
- all

Usage: /list <type>

Examples:
- /list commands
- /list agents
- /list all
```

**Typo Detection:** If $1 is close to a valid type, suggest the correction:

```
❌ Invalid resource type: "comands"

Did you mean: commands?

Usage: /list <type>
```

### No Resources Found

If no resources of the specified type exist:

```
No [resource-type] found in:
- Global: ~/.config/opencode/[resource-type]/
- Project: .opencode/[resource-type]/

To create a new [resource-type], use:
/create [resource-type] <description>

Example:
/create command List all Docker containers with status
```

**For sessions specifically:**

```
No sessions found in .sessions/

To create a session summary:
1. Create .sessions directory: mkdir .sessions
2. Run: /save-session
```

## Examples

### List Commands

```bash
/list commands
```

Shows all available slash commands grouped by category with descriptions.

### List Agents

```bash
/list agents
```

Shows all available agents with their modes, invocation methods, and configurations.

### List Sessions

```bash
/list sessions
```

Shows all session summary files in the `.sessions` directory with previews.

### Interactive Mode

```bash
/list
```

Prompts:

```
What type of resource would you like to list?
[shows available types]
```

## Related Resources

### Knowledge Bases

**Load conditionally based on $1:**

- `command-system-architecture.md` - Command system details (load for commands)
- `checklist-system-architecture.md` - Checklist system details (load for checklists)
- `task-system-architecture.md` - Task system details (load for tasks)
- `template-system-architecture.md` - Template system details (load for templates)
- `knowledge-base-system-architecture.md` - Knowledge base system details (load for knowledge-bases)
- `agent-configuration-reference.md` - Agent configuration details (load for agents)
- `loading-strategy.md` - Resource loading efficiency principles (read this!)

### Templates

**Load ONLY the template for the requested resource type:**

- `command-listing-format-tmpl.yaml` - Command list format
- `checklist-listing-format-tmpl.yaml` - Checklist list format
- `task-listing-format-tmpl.yaml` - Task list format
- `template-listing-format-tmpl.yaml` - Template list format
- `knowledge-base-listing-format-tmpl.yaml` - Knowledge base list format
- **TO CREATE**: `agent-listing-format-tmpl.yaml` - Agent list format

### Checklists

**Optional validation resources (load only if validation needed):**

- `command-discovery-validation.md` - Command discovery checklist
- `checklist-discovery-validation.md` - Checklist discovery checklist
- `task-discovery-validation.md` - Task discovery checklist
- `template-discovery-validation.md` - Template discovery checklist
- `knowledge-base-discovery-validation.md` - Knowledge base discovery checklist

### Related Commands

- `/create` - Create new resources (unified creation command)
- `/docs-help` - Documentation system help

## Implementation Details

The command uses:

- **$1** for resource type (accepts singular or plural forms)
- **Lazy loading** - only loads relevant templates/KBs for the requested type
- **Conditional routing** to appropriate listing logic
- **Template-based formatting** for consistent output per resource type
- **Interactive prompts** for missing arguments
- **Typo detection** for user-friendly error messages
- **Comprehensive error handling** for invalid inputs

### Efficiency Principles

Following `loading-strategy.md`:

1. **Reference, Don't Inline**: Command provides file paths, not embedded content
2. **Conditional Loading**: Load templates/KBs only when needed for specific resource type
3. **Lightweight Context**: Use shell commands for discovery, not heavy resource loading
4. **Selective Resources**: Load only what's required for the current operation

### Design Benefits

- ✅ Reduces command redundancy (6+ commands → 1)
- ✅ Provides consistent UX across resource types
- ✅ Maintains flexibility with interactive prompts
- ✅ Follows OpenCode conventions ($1 for positional args)
- ✅ Efficient resource loading (loads only what's needed)
- ✅ Leverages existing templates, checklists, and knowledge bases
- ✅ Accepts both singular and plural forms for user convenience
- ✅ Supports "all" option for comprehensive listing
