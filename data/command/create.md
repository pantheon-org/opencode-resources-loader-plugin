---
description: Create any OpenCode resource (agent, command, checklist, etc.)
agent: opencode
type: command
category: Development
tags:
  - builder
  - create
  - opencode
  - resource
version: 1.0.0
last_updated: 2025-11-19
---

# Create Resource Command

Unified command to create any type of OpenCode resource following established templates and best practices.

## Usage

```bash
# With both arguments
/create <type> <description>

# Examples:
/create agent Security audit agent for reviewing code vulnerabilities
/create command Run tests with coverage and analyze failures
/create checklist API documentation requirements
/create knowledge-base Jenkins pipeline patterns and examples
/create task Deployment strategy for production environments
/create template Standard documentation structure
```

## Arguments

**$1 - Resource Type** (required) Valid types: `agent`, `command`, `checklist`, `knowledge-base`, `task`, `template`, `tool`

**$2... - Description** (required) Description of the resource to create. All remaining arguments are combined into the
description.

## Interactive Mode

If arguments are missing, the command will prompt you interactively:

1. **Missing type**: "What type of resource would you like to create?
   (agent/command/checklist/knowledge-base/task/template/tool)"
2. **Missing description**: "Please describe the [type] you want to create:"

## Resource Types

### agent

Create a specialized AI assistant with:

- Custom tools and permissions
- Configured temperature
- Mode settings (primary/subagent/all)
- System prompt for behavior

**Example:**

```bash
/create agent Security audit agent that reviews code for vulnerabilities
```

### command

Create a slash command with:

- Context gathering (shell commands)
- File references
- Template variables
- Agent selection

**Example:**

```bash
/create command Run tests with coverage and identify missing test cases
```

### checklist

Create a step-by-step validation checklist with:

- Required sections
- Verification steps
- Best practices
- References

**Example:**

```bash
/create checklist API documentation requirements with REST and GraphQL support
```

### knowledge-base

Create reference documentation with:

- Patterns and examples
- Best practices
- Integration guides
- Related resources

**Example:**

```bash
/create knowledge-base Jenkins pipeline patterns for CI/CD workflows
```

### task

Create a reusable task workflow with:

- Step-by-step process
- Tool usage
- Expected outputs
- Success criteria

**Example:**

```bash
/create task Deployment strategy for production environments
```

### template

Create a reusable template structure with:

- Standard format
- Template variables
- Guidelines
- Examples

**Example:**

```bash
/create template Standard documentation structure with sections and examples
```

### tool

Create a custom tool that LLM can invoke with:

- TypeScript/JavaScript definition
- Zod schema for argument validation
- Execute function with context access
- Integration with any language (Python, Shell, etc.)

**Example:**

```bash
/create tool Database query tool that executes SQL queries with result formatting
```

## Processing Logic

The command will:

1. **Parse Arguments**
   - Extract type from $1
   - Combine remaining arguments ($2, $3, ...) as description
2. **Validate Type**
   - Check if type is valid
   - If invalid, list valid types and prompt for correct type
3. **Check Description**
   - If missing, prompt: "Please describe the [type] you want to create:"
4. **Execute Creation Task**
   - Load `.opencode/task/opencode-{type}.md`
   - Pass description to the task
   - Follow the 7-step workflow
5. **Validate Quality**
   - Run `validate_frontmatter` to check metadata compliance
   - Run `validate_resource_content` to check structure and quality
   - Address any errors or warnings
6. **Deliver**
   - Create file in appropriate directory
   - Report success with file location and validation scores
   - Provide recommendations if quality is below 70/100

## Instructions

### Step 1: Parse and Validate Arguments

Extract the resource type and description from arguments:

- Type: $1 (first argument)
- Description: $2 onwards (all remaining arguments combined)

Valid types: agent, command, checklist, knowledge-base, task, template, tool

### Step 2: Handle Missing Arguments

**If type ($1) is missing:**

```
What type of resource would you like to create?

Available types:
- agent: Specialized AI assistant
- command: Slash command for workflows
- checklist: Step-by-step validation checklist
- knowledge-base: Reference documentation and patterns
- task: Reusable task workflow
- template: Standard template structure
- tool: Custom tool for LLM invocation

Please specify the type:
```

**If description (arguments after $1) is missing:**

```
Please describe the [type] you want to create.

For example:
- agent: "Security audit agent that reviews code for vulnerabilities"
- command: "Run tests with coverage and analyze failures"
- checklist: "API documentation requirements"

Your description:
```

### Step 3: Validate Resource Type

Check if $1 matches a valid resource type. If not:

```
Invalid resource type: "$1"

Valid types are:
- agent
- command
- checklist
- knowledge-base
- task
- template
- tool

Please use: /create <type> <description>
```

### Step 4: Execute Creation Task

Load and execute the appropriate creation task:

- `agent` → `.opencode/task/opencode-agent.md`
- `command` → `.opencode/task/opencode-command.md`
- `checklist` → `.opencode/task/opencode-checklist.md`
- `knowledge-base` → `.opencode/task/opencode-knowledge-base.md`
- `task` → `.opencode/task/opencode-task.md`
- `template` → `.opencode/task/opencode-template.md`
- `tool` → `.opencode/task/opencode-tool.md`

Pass the description as the task input.

### Step 5: Follow Creation Workflow

Each creation task follows a 7-step workflow:

1. **Requirements Analysis** - Understand needs and domain
2. **Template Review** - Read template for structure
3. **Example Study** - Review similar resources for patterns
4. **Design** - Design complete structure and content
5. **Creation** - Write the complete file
6. **Validation** - Ensure template compliance
7. **Integration** - Document integration points

### Step 6: Validate Resource Quality

**IMPORTANT**: After creating the resource, run **both validation tools**:

#### 1. Validate Frontmatter

```
validate_frontmatter({ type: "[resource-type]", file: "[filename-without-md]" })
```

Checks:

- Required fields (description, type, category, tags)
- Category standardization
- Tag quality (minimum 3-5 specific tags)
- Description completeness (under 120 chars, not truncated)
- Optional recommended fields (title, version, last_updated, estimated_duration)

#### 2. Validate Content Structure

```
validate_resource_content({ type: "[resource-type]", file: "[filename-without-md]" })
```

Checks:

- Required sections (Purpose, Examples, etc.)
- Content quality and completeness
- Code examples and best practices
- Integration with other resources
- Type-specific requirements (checklist items, agent tools documentation, etc.)

**Example workflow:**

```
validate_frontmatter({ type: "task", file: "deployment-strategy" })
validate_resource_content({ type: "task", file: "deployment-strategy" })
```

**Address all errors** (prevent resource from working properly) and **fix warnings** (affect quality and discoverability).

### Step 7: Report Success

After successful creation and validation, report:

```
✅ Created [type]: [name]

File location: [path]
Resource tool: [tool_name]

Validation Results:
├─ Frontmatter: [✓ Passed | ⚠ Has warnings | ✗ Has errors]
└─ Content: [Score]/100 [🟢 Excellent | 🟡 Good | 🟠 Needs Improvement | 🔴 Poor]

Next steps:
[Type-specific next steps]
```

## Type-Specific Next Steps

### Agent

- Test invocation (@agent-name for subagents, Tab for primary)
- Verify tool access and permissions
- Refine system prompt based on behavior

### Command

- Test execution: /command-name
- Verify context gathering works
- Check argument handling

### Checklist

- Load with: checklist\_[name]
- Review completeness
- Test with actual use case

### Knowledge-Base

- Load with: knowledge*base*[name]
- Verify related_resources links
- Check categorization

### Task

- Test execution with: task\_[name]
- Verify step outputs
- Check success criteria

### Template

- Load with: template\_[name]
- Test variable substitution
- Verify output format

### Tool

- Test invocation: Use the tool name directly
- Verify argument validation (Zod schema)
- Test with different inputs
- Check return value format

## Related Resources

### Creation Tasks (Used by this command)

- `.opencode/task/opencode-agent.md`
- `.opencode/task/opencode-command.md`
- `.opencode/task/opencode-checklist.md`
- `.opencode/task/opencode-knowledge-base.md`
- `.opencode/task/opencode-task.md`
- `.opencode/task/opencode-template.md`
- `.opencode/task/opencode-tool.md`

### Templates (Referenced by tasks)

- `.opencode/template/opencode-agent-tmpl.yaml`
- `.opencode/template/opencode-command-tmpl.yaml`
- `.opencode/template/opencode-checklist-tmpl.yaml`
- `.opencode/template/opencode-knowledge-base-tmpl.yaml`
- `.opencode/template/opencode-task-tmpl.yaml`
- `.opencode/template/opencode-template-tmpl.yaml`
- `.opencode/template/opencode-tool-tmpl.yaml`

### Knowledge Base

- `.opencode/knowledge-base/agent-configuration-reference.md`
- `.opencode/knowledge-base/command-system-architecture.md`

## Examples

### Create Security Agent

```bash
/create agent Security audit agent focused on code vulnerabilities and configuration validation
```

**What happens:**

1. Type extracted: "agent"
2. Description: "Security audit agent focused on code vulnerabilities and configuration validation"
3. Executes: `.opencode/task/opencode-agent.md`
4. Creates: `agent/security-auditor.md`
5. Reports: File location and usage (@security-auditor)

### Create Test Command

```bash
/create command Run full test suite with coverage report and analyze failures
```

**What happens:**

1. Type extracted: "command"
2. Description: "Run full test suite with coverage report and analyze failures"
3. Executes: `.opencode/task/opencode-command.md`
4. Creates: `command/test-analyze.md`
5. Reports: File location and usage (/test-analyze)

### Create API Checklist

```bash
/create checklist Comprehensive API documentation requirements with REST and GraphQL support
```

**What happens:**

1. Type extracted: "checklist"
2. Description: "Comprehensive API documentation requirements with REST and GraphQL support"
3. Executes: `.opencode/task/opencode-checklist.md`
4. Creates: `checklist/api-documentation-comprehensive.md`
5. Reports: File location and tool name

### Missing Type Example

```bash
/create Documentation for CI/CD pipelines
```

**Response:**

```
I notice you didn't specify a resource type.

What type of resource would you like to create?

Available types:
- agent: Specialized AI assistant
- command: Slash command for workflows
- checklist: Step-by-step validation checklist
- knowledge-base: Reference documentation and patterns
- task: Reusable task workflow
- template: Standard template structure

Based on "Documentation for CI/CD pipelines", I'd suggest:
- knowledge-base (for reference documentation)
- checklist (for validation steps)

Which would you prefer?
```

### Missing Description Example

```bash
/create agent
```

**Response:**

```
Please describe the agent you want to create.

For example:
- "Security audit agent that reviews code for vulnerabilities"
- "API documentation agent specialized in OpenAPI specs"
- "Code review agent focused on best practices"

Your description:
```

## Error Handling

### Invalid Type

```
❌ Invalid resource type: "agents"

Valid types are: agent, command, checklist, knowledge-base, task, template

Did you mean: agent?

Usage: /create <type> <description>
```

### Task File Not Found

```
❌ Creation task not found: .opencode/task/opencode-[type].md

This might indicate:
- Missing task file in your configuration
- Incorrect resource type
- Repository setup issue

Please check your .opencode/task/ directory.
```

### Creation Failed

```
❌ Failed to create [type]: [reason]

Details: [error message]

Please review:
- Template structure
- Required fields
- File permissions
```

## Implementation Details

The command uses:

- **$1** for resource type extraction
- **$2, $3, ...** combined for description (using $ARGUMENTS would work too)
- **Conditional logic** for validation
- **Task delegation** to type-specific creation tasks
- **Interactive prompts** for missing information

This design:

- ✅ Reduces command redundancy (6 commands → 1)
- ✅ Provides consistent UX across resource types
- ✅ Maintains flexibility with interactive prompts
- ✅ Leverages existing task infrastructure
- ✅ Follows OpenCode conventions ($1, $2, $3 for positional args)
