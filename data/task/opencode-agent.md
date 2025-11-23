---
description: Task for creating new OpenCode agents following templates
mode: task
temperature: 0.2
version: 1.0.0
last_updated: 2025-11-11
category: Development
type: task
tags:
  - opencode
  - agent
  - creating
  - agents
  - creation
  - template
  - configuration
title: Opencode Agent Task
estimated_duration: 5-10 minutes
---

# Create OpenCode Agent Task

This task guides the creation of new OpenCode agents following established templates and best practices.

## Purpose

Create well-structured OpenCode agents that:

- Follow the template structure exactly
- Have appropriate mode, temperature, and tool configuration
- Include comprehensive system prompts
- Reference related resources (commands, checklists, tasks, knowledge bases)
- Integrate seamlessly with the OpenCode ecosystem

## When to Use This Task

Use this task when you need to:

- Create specialized AI assistants for specific domains
- Build workflow-specific agents with custom behavior
- Restrict tool access for security or focus
- Configure agents with different models or temperatures
- Create @ mentionable subagents for primary agents to invoke

**Do NOT use this task if:**

- You need to create a command (use opencode-command task instead)
- You need a one-off prompt (use inline instructions)
- The default agents are sufficient for your needs

## Input Requirements

### Required Information

- **Agent purpose**: What domain or task does this agent specialize in?
- **Agent name**: Descriptive kebab-case name (e.g., security-auditor, api-docs-writer)
- **User description**: Brief description of what user wants the agent to do

### Optional Information

- **Mode preference**: primary, subagent, or all
- **Temperature preference**: 0.1-0.3 (deterministic), 0.4-0.6 (balanced), 0.7+ (creative)
- **Tool requirements**: Which tools are needed (write, edit, read, bash, webfetch)?
- **Permission requirements**: Fine-grained control over specific operations
- **Related resources**: Existing commands, checklists, tasks, or knowledge bases

## Task Execution Steps

### Step 1: Requirements Analysis

**Actions:**

1. Parse the user's description to understand agent purpose and domain
2. Identify the type of agent needed (analysis, generation, integration, etc.)
3. Determine appropriate mode (primary, subagent, or all)
4. Assess required temperature based on task type
5. Identify necessary tools and permissions (detailed selection happens in Step 4.5)
6. Consider related resources that should be referenced

**Tools Used:**

- Analysis of user input
- Knowledge of existing agents for patterns

**Outputs:**

- Agent purpose statement
- Domain classification
- Mode recommendation
- Temperature recommendation
- Initial tool requirements assessment (refined in Step 4.5)
- Permission requirements list
- Related resources list

**Note:** Detailed tool selection with interactive workflow happens in **Step 4.5: Interactive Tool Selection**

---

### Step 2: Template Review

**Actions:**

1. Read `.opencode/template/opencode-agent-tmpl.yaml`
2. Understand required and optional frontmatter fields
3. Review agent configuration options (mode, temperature, tools, permissions)
4. Study system prompt guidelines
5. Note best practices and common patterns

**Tools Used:**

- Read tool to access template

**Outputs:**

- Understanding of template structure
- List of required frontmatter fields
- Configuration options available
- System prompt guidelines

---

### Step 3: Example Study

**Actions:**

1. Identify 2-3 similar existing agents
2. Review their configuration and structure
3. Note effective system prompt patterns
4. Observe resource integration methods
5. Learn from their tool and permission configurations

**Tools Used:**

- List/Glob to find agents in `agent/` directory
- Read tool to examine existing agents

**Suggested Examples by Type:**

- **Documentation**: `documentalist.md`
- **Integration**: `atlassian.md`, `ai-tool-reviewer.md`
- **CI/CD**: `pipeline-architect.md`, `jenkins.md`
- **Analysis**: `php-logging-quality-agent.md`
- **Prompt enhancement**: `prompt-enhancer-expert.md`

**Outputs:**

- Patterns to follow
- System prompt examples
- Resource integration approaches
- Tool configuration patterns

---

### Step 4: Agent Design

**Actions:**

1. Design frontmatter configuration
   - Set description (clear, one-line purpose)
   - Choose mode (subagent for specialized, all for versatile, primary for main)
   - Select temperature (0.1-0.3 analytical, 0.4-0.6 balanced, 0.7+ creative)
   - Configure tools (enable only what's needed)
   - Set permissions (fine-grained control if needed)
   - Add model override if specific model required

2. Design system prompt
   - Define clear role and purpose
   - Specify core responsibilities
   - List resource references (commands, checklists, tasks, knowledge bases)
   - Define capabilities and key use cases
   - Describe workflow or approach
   - Add integration points
   - Include best practices and guidelines
   - Add examples if applicable

3. Identify resource references
   - Related commands the agent uses
   - Checklists for validation
   - Tasks for analysis or generation
   - Knowledge bases for patterns
   - Templates for structure

**Tools Used:**

- Planning and design

**Outputs:**

- Complete agent design
- Frontmatter configuration
- System prompt content
- Resource references list

---

### Step 4.5: Interactive Tool Selection

**Actions:**

1. Enumerate all available tools using the `/list-mcp` command or `.opencode/task/list-mcp-tools.md` task

2. Present tool inventory to user:
   - Built-in tools (11 tools)
   - MCP server tools (grouped by server)
   - Custom tools (if configured)
   - Plugin tools (if loaded)

3. Analyze agent requirements to recommend tool configuration:
   - **Read-only agents**: Only read, grep, glob, list
   - **Documentation agents**: read, write, edit, grep, webfetch (no bash)
   - **Analysis agents**: read, grep, glob, bash (no write/edit)
   - **Development agents**: read, write, edit, bash, grep, glob
   - **Security agents**: read, grep, bash (limited permissions), no write/edit

4. Interactive tool selection workflow:

   **Option A: Use Preset Pattern** (Recommended for common agent types)

   ```
   Based on your agent purpose, I recommend one of these preset patterns:

   1. Read-Only Analyst
      - Tools: read, grep, glob, list, todoread
      - MCP: All disabled
      - Use for: Planning, review, analysis agents

   2. Documentation Writer
      - Tools: read, write, edit, grep, glob, webfetch
      - MCP: Selectively enabled (e.g., aws-documentation_*)
      - Use for: Documentation generation agents

   3. Development Agent
      - Tools: read, write, edit, bash, grep, glob
      - MCP: Selectively enabled based on domain
      - Use for: Code generation, refactoring agents

   4. Security Auditor
      - Tools: read, grep, glob, bash (limited)
      - MCP: Security-related only
      - Use for: Security analysis agents

   5. Full Access Agent
      - Tools: All enabled
      - MCP: All enabled
      - Use for: General-purpose primary agents

   Which preset would you like to use? (or choose "Custom" for granular selection)
   ```

   **Option B: Granular Selection** (For specialized agents)

   ```
   Let's configure tools for your agent:

   Built-in Tools:
   ☑ read - Read file contents [RECOMMENDED]
   ☑ grep - Search file contents [RECOMMENDED]
   ☑ glob - Find files by pattern [RECOMMENDED]
   ☑ list - List directory contents [RECOMMENDED]
   ☐ write - Create/overwrite files
   ☐ edit - Modify existing files
   ☐ bash - Execute shell commands
   ☐ patch - Apply patches
   ☐ webfetch - Fetch web content
   ☑ todoread - Read todo lists [RECOMMENDED]
   ☐ todowrite - Manage todo lists

   MCP Server: aws-cdk (15 tools)
   ☐ Enable all aws-cdk_* tools
   ☐ Select specific tools
   ☐ Disable all

   MCP Server: aws-cloudwatch (12 tools)
   ☐ Enable all aws-cloudwatch_* tools
   ☐ Select specific tools
   ☐ Disable all

   [Continue for each MCP server...]

   Would you like to enable any custom tools or plugins?
   ```

5. Generate tools configuration based on selection:

   **Preset Pattern Example:**

   ```yaml
   tools:
     write: false
     edit: false
     bash: false
     patch: false
     webfetch: false
     todowrite: false
     # read, grep, glob, list, todoread remain enabled (default true)
     # Disable all MCP servers
     aws-cdk_*: false
     aws-cloudwatch_*: false
     playwright_*: false
   ```

   **Granular Selection Example:**

   ```yaml
   tools:
     # File operations
     read: true
     write: true
     edit: true
     bash: false

     # Search
     grep: true
     glob: true
     list: true

     # Network
     webfetch: true

     # Task management
     todoread: true
     todowrite: false

     # MCP servers
     aws-documentation_*: true # Enable AWS docs tools
     aws-cdk_*: false # Disable CDK tools
     playwright_*: false # Disable browser automation
   ```

6. Configure permissions for enabled tools (if needed):

   ```yaml
   permission:
     edit: ask # Prompt before editing
     bash:
       'git status': allow
       'git diff': allow
       'git log*': allow
       '*': ask # Prompt for other commands
     webfetch: allow
   ```

7. Document tool selection rationale:
   - Why certain tools were enabled
   - Why others were disabled
   - Security considerations
   - Workflow requirements

**Tools Used:**

- `/list-mcp` command or `task/list-mcp-tools.md` task
- Interactive prompting
- Pattern matching for recommendations

**Outputs:**

- Complete tools configuration for frontmatter
- Permission configuration (if needed)
- Tool selection rationale
- MCP server wildcard patterns
- Recommended preset or granular configuration

**Decision Tree:**

```
Agent Purpose Analysis
├─ Read-only analysis? → Preset: Read-Only Analyst
├─ Documentation? → Preset: Documentation Writer
├─ Security audit? → Preset: Security Auditor
├─ Code development? → Preset: Development Agent
├─ General purpose? → Preset: Full Access Agent
└─ Specialized/unique? → Granular Selection
```

---

### Step 5: Agent Creation

**Actions:**

1. Create agent file in `agent/[kebab-case-name].md`
2. Write frontmatter with all required fields:

   ```yaml
   ---
   description: Clear one-line description
   mode: subagent | all | primary
   temperature: 0.0-1.0
   tools:
     write: true/false
     edit: true/false
     read: true/false
     bash: true/false
     webfetch: true/false
   permission: # Optional
     tool_name: ask | allow | deny
   ---
   ```

3. Write comprehensive system prompt:
   - Title and overview (H1)
   - Core responsibilities section
   - Resource references section
   - Capabilities and key use cases
   - Workflow or approach section
   - Integration points
   - Available commands (if applicable)
   - Best practices and guidelines
   - Examples (if applicable)

**Tools Used:**

- Write tool to create agent file

**Outputs:**

- Complete agent file in `agent/` directory

---

### Step 6: Validation

**Actions:**

1. **Run Validation Tools** (REQUIRED):

   ```
   validate_frontmatter({ type: "agent", file: "agent-filename" })
   validate_resource_content({ type: "agent", file: "agent-filename" })
   ```

   - Fix all errors (prevent resource loading)
   - Address warnings (affect quality)
   - Target quality score: 80+/100

2. Apply the OpenCode Agent Checklist (`.opencode/checklist/opencode-agent.md`)
3. Verify all required frontmatter fields present and compliant
4. Validate against agent configuration checklist (625+ items)
5. Check agent type validation (primary/subagent/all)
6. Verify tool configuration follows patterns
7. Validate permission settings
8. Check system prompt quality
9. Verify file organization (location, naming)
10. Validate resource integration

**Tools Used:**

- `validate_frontmatter` - Check metadata compliance
- `validate_resource_content` - Check structure and quality
- Read tool to review created file
- OpenCode Agent Checklist for comprehensive validation
- Validation against template

**Reference Checklist**: `.opencode/checklist/opencode-agent.md`

**Key Validation Areas** (from checklist):

- Agent Configuration (48 items)
- Agent Types (15 items)
- Tool Configuration (30 items)
- Permission Configuration (38 items)
- System Prompt Quality (15 items)
- Resource Integration (20 items)
- Quality Checks (25 items)

**Outputs:**

- Validation results from checklist
- List of any issues to fix
- Quality check results

---

### Step 7: Integration Documentation

**Actions:**

1. Note which commands should invoke this agent
2. Identify which tasks the agent should execute
3. List checklists the agent should reference
4. List knowledge bases relevant to agent domain
5. Document testing instructions

**Tools Used:**

- Planning

**Outputs:**

- Integration notes
- Resource references documentation
- Testing instructions

---

## Task Output Summary

The task generates two primary outputs:

1. **Agent File** (`agent/[name].md`)
   - Valid YAML frontmatter with configuration
   - **Tool configuration** (from Step 4.5: Interactive Tool Selection)
     - Built-in tools (enabled/disabled)
     - MCP server wildcards
     - Custom tool settings
     - Permission configurations
   - Comprehensive system prompt
   - Resource references section
   - Core responsibilities
   - Capabilities and use cases
   - Workflow/approach documentation
   - Integration points
   - Examples (if applicable)

2. **Integration Documentation**
   - Commands that invoke agent
   - Tasks agent should execute
   - Checklists agent references
   - Knowledge bases for agent domain
   - **Tool selection rationale** (why certain tools were enabled/disabled)
   - Usage notes and examples

## Success Criteria

- ✅ Agent file created in `agent/` directory
- ✅ Filename is kebab-case with .md extension
- ✅ Valid YAML frontmatter with required fields
- ✅ Clear, one-line description
- ✅ Appropriate mode for use case
- ✅ Temperature matches task type
- ✅ **Tool configuration complete (from Step 4.5)**
  - ✅ Built-in tools appropriately enabled/disabled
  - ✅ MCP server wildcards configured
  - ✅ Permission settings defined (if needed)
  - ✅ Tool selection follows security best practices
  - ✅ Tool rationale documented
- ✅ Comprehensive system prompt
- ✅ Resource references section included
- ✅ Follows template structure
- ✅ Agent-resource-mapping.md updated
- ✅ Can be invoked successfully (@ mention for subagent)

## Quality Checks

**Use the comprehensive OpenCode Agent Checklist**: `.opencode/checklist/opencode-agent.md`

The checklist includes 625+ validation items organized into:

- **Agent Configuration** (48 items): Required frontmatter, model config, temperature settings
- **Agent Types** (15 items): Primary, subagent, all-mode validation
- **Tool Configuration** (30 items): Tool access control, common patterns
- **Permission Configuration** (38 items): Edit, bash, webfetch permissions
- **System Prompt Quality** (15 items): Content, structure, best practices
- **Agent File Organization** (12 items): Location, naming, format
- **Agent Documentation** (8 items): Internal and external docs
- **Resource Integration** (20 items): Commands, checklists, tasks, knowledge bases
- **Built-in Agent Validation** (18 items): Build, plan, general agents
- **Agent Behavior Validation** (10 items): Invocation, session navigation
- **Use Case Validation** (36 items): Analysis, development, creative, documentation, security, review
- **Testing and Validation** (16 items): Functional, configuration, integration, UX
- **Quality Checks** (25 items): Completeness, accuracy, clarity, security, consistency

**Quick Validation Summary** (refer to checklist for details):

### Essential Checks

- [ ] Apply complete checklist from `.opencode/checklist/opencode-agent.md`
- [ ] Frontmatter valid and complete (description, mode)
- [ ] Temperature appropriate for use case (0.0-0.2 analysis, 0.3-0.5 balanced, 0.6-1.0 creative)
- [ ] Tools minimal and justified
- [ ] Permissions secure (ask/allow/deny correctly set)
- [ ] System prompt comprehensive
- [ ] Resource references validated
- [ ] File naming correct (kebab-case)

## Error Handling

### Common Issues and Resolutions

**Issue: Agent purpose unclear**

- Ask user for clarification on domain and specialization
- Suggest appropriate agent name based on purpose

**Issue: Mode selection unclear**

- Use `subagent` for specialized, focused tasks
- Use `all` for versatile agents that could be primary or subagent
- Use `primary` only if explicitly needed as main conversation agent
- Ask user if uncertain

**Issue: Temperature unclear**

- Default to 0.2 for balanced technical tasks
- Use 0.1-0.3 for deterministic analysis
- Use 0.4-0.6 for general development
- Use 0.7+ for creative/brainstorming tasks

**Issue: Tool requirements unclear**

- Start minimal (read, grep, glob for analysis)
- Add write/edit if agent creates/modifies files
- Add bash if system commands needed
- Add webfetch if external documentation needed
- Ask user about specific needs if uncertain

**Issue: Resource references unclear**

- Check if similar agents exist for patterns
- Identify relevant checklists for validation
- Find applicable tasks for analysis
- Locate knowledge bases for best practices
- Ask user about specific workflows

## Examples

### Example 1: Security Audit Agent

**Input:**

- Purpose: Review code for security vulnerabilities
- Name: security-auditor
- Domain: Security, code analysis

**Task Execution:**

1. Analyze: Specialized security analysis agent
2. Review template: Study configuration options
3. Study examples: Review analysis-focused agents
4. Design:
   - Mode: subagent (specialized)
   - Temperature: 0.1 (deterministic analysis)
     4.5. **Interactive Tool Selection**:
   - Executed `/list-mcp` to enumerate available tools
   - Recommended "Security Auditor" preset pattern
   - User selected preset with modifications:
     - Built-in: read, grep, glob, bash (limited)
     - MCP: All disabled except security-specific tools
     - Permissions: bash commands require approval except safe git commands
   - Generated tools configuration:

     ```yaml
     tools:
       write: false
       edit: false
       bash: true
       aws-cdk_*: false
       playwright_*: false
     permission:
       bash:
         'git status': allow
         'git diff': allow
         '*': ask
     ```

5. Create: Agent with security-focused system prompt
6. Validate: Check configuration and structure
7. Document: Add to agent-resource-mapping.md

**Outputs:**

- Agent: `agent/security-auditor.md`
- Configuration: subagent, temp 0.1, read-only tools
- System prompt: Security review focus, vulnerability detection
- Resources: Security checklists, scanning tools

---

### Example 2: API Documentation Agent

**Input:**

- Purpose: Generate API documentation from OpenAPI specs
- Name: api-docs-writer
- Domain: Documentation, API analysis

**Task Execution:**

1. Analyze: Documentation generation agent
2. Review template: Study tool and temperature settings
3. Study examples: Review `documentalist.md` for patterns
4. Design:
   - Mode: subagent (specialized docs)
   - Temperature: 0.3 (slightly creative for docs)
   - Tools: write, edit, read, grep (for generation)
   - No bash/webfetch (focused on files)
5. Create: Agent with API documentation focus
6. Validate: Check tool permissions and structure
7. Document: Add to agent-resource-mapping.md

**Outputs:**

- Agent: `agent/api-docs-writer.md`
- Configuration: subagent, temp 0.3, write/edit enabled
- System prompt: API documentation specialization
- Resources: API documentation checklist, templates

---

### Example 3: DevOps Automation Agent

**Input:**

- Purpose: CI/CD pipelines, infrastructure as code, deployments
- Name: devops-assistant
- Domain: DevOps, automation, infrastructure

**Task Execution:**

1. Analyze: Versatile DevOps agent
2. Review template: Study mode and tool options
3. Study examples: Review `pipeline-architect.md` and `jenkins.md`
4. Design:
   - Mode: all (can be primary or subagent)
   - Temperature: 0.2 (technical but flexible)
   - Tools: write, edit, read, bash (full toolset)
   - Permissions: bash git push = ask (safety)
5. Create: Agent with DevOps workflows
6. Validate: Check permissions and safety
7. Document: Add to agent-resource-mapping.md

**Outputs:**

- Agent: `agent/devops-assistant.md`
- Configuration: all mode, temp 0.2, full tools with permissions
- System prompt: DevOps workflows, safety considerations
- Resources: Pipeline knowledge bases, deployment tasks

---

## Task Parameters

### Mode Selection Guidelines

**See checklist** `.opencode/checklist/opencode-agent.md` for detailed validation.

- **subagent**: Specialized tasks, invoked by @ mention (most common)
- **all**: Can function as both primary and subagent (versatile)
- **primary**: Main conversation agent, Tab key switchable (use sparingly)

### Temperature Guidelines

**See checklist for temperature validation by use case** (36 items).

- **0.0-0.2**: Highly deterministic (security, analysis, data processing)
- **0.3-0.5**: Balanced (documentation, development, refactoring)
- **0.6-1.0**: Creative (brainstorming, content generation, exploration)

### Tool Configuration Patterns

**See checklist** `.opencode/checklist/opencode-agent.md` (section: Tool Configuration, 30 items) for comprehensive
patterns and validation.

Common patterns:

- **Read-only analyst**: read, grep, glob only
- **Documentation writer**: write, edit, read (no bash)
- **DevOps agent**: write, edit, read, bash (with permissions)
- **Research agent**: read, webfetch, grep

## Template Reference

**Primary Template**: `.opencode/template/opencode-agent-tmpl.yaml`

**Required Frontmatter Fields:**

- `description` - Clear one-line description
- `mode` - primary | subagent | all

**Optional Frontmatter Fields:**

- `model` - Override default model
- `temperature` - Control randomness (0.0-1.0)
- `tools` - Enable/disable specific tools
- `permission` - Fine-grained control
- `disable` - Disable the agent

**Example Agents:** Browse `agent/` directory for patterns

## Best Practices

### Agent Design

- Single, clear purpose
- Appropriate mode for use case
- Minimal tool access (security)
- Temperature matches task type
- Clear, focused system prompts
- Comprehensive resource references

### Tool Configuration

- Enable only necessary tools
- Use read-only for analysis agents
- Use write/edit for generation agents
- Use bash carefully (consider permissions)
- Use webfetch only if external docs needed

### System Prompt

- Clear role definition
- Specific focus areas
- Behavioral constraints
- Resource references section
- Core responsibilities
- Integration points
- Examples for complex agents

### Resource Integration

- Link to relevant commands
- Reference appropriate checklists
- Use existing knowledge bases
- Leverage existing tasks
- Update agent-resource-mapping.md

## Maintenance

### Review Triggers

- Agent not working as expected
- Template updates
- New tool capabilities
- User feedback on agent effectiveness
- Security requirements change

### Update Process

1. Review agent usage and feedback
2. Check if template has been updated
3. Update agent to match new patterns
4. Test agent after updates
5. Update agent-resource-mapping.md
6. Document significant changes

## References

- **Template**: `.opencode/template/opencode-agent-tmpl.yaml`
- **Checklist**: `.opencode/checklist/opencode-agent.md` (625+ validation items)
- **Tool Discovery Task**: `.opencode/task/list-mcp-tools.md` (used in Step 4.5)
- **List MCP Command**: `.opencode/command/list-mcp.md` (tool enumeration)
- **Tools Reference**: `.opencode/knowledge-base/opencode-tools-reference.md`
- **Agent Config Reference**: `.opencode/knowledge-base/agent-configuration-reference.md`
- **Official Documentation**: <https://opencode.ai/docs/agents/>
- **Examples**: `.opencode/agent/*.md` (all existing agents)
