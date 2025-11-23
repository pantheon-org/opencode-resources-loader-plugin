---
description: Task for creating new OpenCode slash commands following templates
mode: task
temperature: 0.2
version: 1.0.0
last_updated: 2025-11-11
category: Development
type: task
tags:
  - opencode
  - command
  - creating
  - slash
  - workflow
  - automation
title: Opencode Command Task
estimated_duration: 5-10 minutes
---

# Create OpenCode Command Task

This task guides the creation of new OpenCode slash commands following established templates and best practices.

## Purpose

Create well-structured OpenCode commands that:

- Follow the template structure exactly
- Include appropriate context gathering
- Select the right agent for execution
- Integrate with existing resources (checklists, tasks, knowledge bases)
- Use proper syntax for arguments, shell commands, and file references
- Have clear documentation and examples

## When to Use This Task

Use this task when you need to:

- Create a new slash command for repetitive workflows
- Automate multi-step processes
- Standardize team workflows
- Build context-dependent operations
- Create quick access to specialized workflows

**Do NOT use this task if:**

- You need to create an agent (use create-agent task instead)
- You need a one-off prompt (use inline instructions)
- The workflow is too simple to warrant a command

## Input Requirements

### Required Information

- **Command purpose**: What problem does this command solve?
- **Command name**: Descriptive kebab-case name (e.g., test-analyze, deploy-check)
- **User description**: Brief description of what user wants the command to do

### Optional Information

- **Context needed**: What information should be gathered (git status, test results, file contents)?
- **Agent preference**: Which agent should execute (general, documentalist, etc.)?
- **Subtask flag**: Is this command used by other commands?
- **Related resources**: Existing checklists, tasks, or knowledge bases to reference

## Task Execution Steps

### Step 1: Requirements Analysis

**Actions:**

1. Parse the user's description to understand command purpose
2. Identify the type of command (simple, parameterized, shell integration, etc.)
3. Determine what context needs to be gathered
4. Identify appropriate agent for execution
5. Check if command should be marked as subtask

**Tools Used:**

- Analysis of user input
- Knowledge of existing commands for patterns

**Outputs:**

- Command purpose statement
- Command type classification
- Context requirements list
- Agent selection
- Subtask determination

---

### Step 2: Template Review

**Actions:**

1. Read `.opencode/template/opencode-command-tmpl.yaml`
2. Understand required and optional frontmatter fields
3. Review template syntax (variables, shell commands, file references)
4. Study command types and patterns
5. Note best practices and common patterns

**Tools Used:**

- Read tool to access template

**Outputs:**

- Understanding of template structure
- List of required frontmatter fields
- Available template syntax options

---

### Step 3: Example Study

**Actions:**

1. Identify 2-3 similar existing commands
2. Review their structure and approach
3. Note effective context gathering patterns
4. Observe resource integration methods
5. Learn from their best practices

**Tools Used:**

- Read tool to examine existing commands
- List/Glob to find similar commands

**Suggested Examples:**

- `commit.md` - Shell integration with git
- `document.md` - Context gathering and generation
- `api-docs.md` - Resource references and subtask usage
- `create-ticket.md` - Multi-step workflow
- `feature.md` - Agent selection and prompting

**Outputs:**

- Patterns to follow
- Context gathering examples
- Resource integration approaches

---

### Step 4: Command Design

**Actions:**

1. Design frontmatter configuration
   - Set description (shown in TUI)
   - Choose agent (general or specialized)
   - Mark as subtask if applicable
   - Add model override if needed

2. Design context gathering
   - Identify shell commands needed
   - Plan file references
   - Determine argument usage

3. Write command instructions
   - Clear, specific prompt
   - Reference appropriate resources
   - Define expected outputs

4. Add usage examples and documentation

**Tools Used:**

- Planning and design

**Outputs:**

- Complete command design
- Frontmatter configuration
- Context gathering plan
- Instruction prompt
- Documentation sections

---

### Step 5: Command Creation

**Actions:**

1. Create command file in `command/[kebab-case-name].md`
2. Write frontmatter with all required fields
3. Add context gathering using template syntax:
   - `$ARGUMENTS` or `$1, $2, $3` for parameters
   - `!`command`` for shell command injection
   - `@filename` for file content inclusion
4. Write clear instructions
5. Reference related resources (checklists, tasks, knowledge bases)
6. Add examples if helpful

**Tools Used:**

- Write tool to create command file

**Outputs:**

- Complete command file in `command/` directory

---

### Step 6: Validation

**Actions:**

1. **Run Validation Tools** (REQUIRED):

   ```
   validate_frontmatter({ type: "command", file: "command-filename" })
   validate_resource_content({ type: "command", file: "command-filename" })
   ```

   - Fix all errors (prevent resource loading)
   - Address warnings (affect quality)
   - Target quality score: 80+/100

2. Apply the OpenCode Command Checklist (`.opencode/checklist/opencode-command.md`)
3. Verify all required configuration fields present and compliant
4. Validate against command configuration checklist (829+ items)
5. Check template syntax validation ($ARGUMENTS, !`commands`, @files)
6. Verify agent configuration appropriate
7. Validate model override if used
8. Check template quality and clarity
9. Verify file location and naming
10. Validate resource integration

**Tools Used:**

- `validate_frontmatter` - Check metadata compliance
- `validate_resource_content` - Check structure and quality
- Read tool to review created file
- OpenCode Command Checklist for comprehensive validation
- Validation against template

**Reference Checklist**: `.opencode/checklist/opencode-command.md`

**Key Validation Areas** (from checklist):

- Command Configuration (12 items)
- Command Location and Naming (13 items)
- Template Syntax Validation (30+ items)
- Agent Configuration (12 items)
- Model Override (6 items)
- Template Quality (15 items)
- Command Types and Patterns (70+ items)
- Testing and Validation (20 items)
- Quality Checks (25 items)

**Outputs:**

- Validation results from checklist
- List of any issues to fix
- Quality check results

---

### Step 7: Integration Documentation

**Actions:**

1. Note any related commands that should reference this one
2. Identify if command-resource-mapping needs updates
3. Determine if examples should be added to knowledge base
4. Document testing instructions

**Tools Used:**

- Planning

**Outputs:**

- Integration notes
- Testing instructions
- Documentation updates needed

---

## Task Output Summary

The task generates one primary file:

1. **Command File** (`command/[name].md`)
   - Valid YAML frontmatter with description, agent, subtask flag
   - Well-structured command content with template syntax
   - Context gathering using shell commands and file references
   - Clear instructions for the agent
   - Resource references (checklists, tasks, knowledge bases)
   - Examples and documentation (if applicable)

## Success Criteria

- ✅ Command file created in `command/` directory
- ✅ Filename is kebab-case with .md extension
- ✅ Valid YAML frontmatter with required fields
- ✅ Clear, concise description for TUI
- ✅ Appropriate agent selected
- ✅ Correct template syntax usage
- ✅ Efficient context gathering
- ✅ Resource references included
- ✅ Follows template structure
- ✅ Can be executed successfully

## Quality Checks

**Use the comprehensive OpenCode Command Checklist**: `.opencode/checklist/opencode-command.md`

The checklist includes 829+ validation items organized into:

- **Command Configuration** (12 items): Required/optional fields, descriptions
- **Command Location and Naming** (13 items): Global vs project, file naming
- **Template Syntax Validation** (30+ items): $ARGUMENTS, !`commands`, @files
- **Agent Configuration** (12 items): Agent selection, subtask flag
- **Model Override** (6 items): Model format, appropriateness
- **Template Quality** (15 items): Content, structure, best practices
- **Command Types and Patterns** (70+ items): Analysis, generation, review, testing, documentation, deployment,
  refactoring
- **Built-in Command Awareness** (10 items): Override considerations
- **Command Documentation** (15 items): Description quality, internal/external docs
- **Resource Integration** (12 items): File references, shell commands, agent resources
- **Testing and Validation** (20 items): Functional, syntax, edge case, UX testing
- **Quality Checks** (25 items): Completeness, accuracy, clarity, security, performance
- **Configuration Format Validation** (10 items): JSON and markdown validation

**Quick Validation Summary** (refer to checklist for details):

### Essential Checks

- [ ] Apply complete checklist from `.opencode/checklist/opencode-command.md`
- [ ] Frontmatter valid and complete (template, description)
- [ ] Template syntax correct ($ARGUMENTS, !`commands`, @files)
- [ ] Agent selection appropriate
- [ ] Model override justified (if used)
- [ ] Template clear and actionable
- [ ] File naming correct (kebab-case)
- [ ] Shell commands safe to execute

## Error Handling

### Common Issues and Resolutions

**Issue: Command name unclear**

- Ask user for clarification on command purpose
- Suggest appropriate kebab-case name based on purpose

**Issue: Context requirements unclear**

- Ask what information the command needs to work
- Review similar commands for context gathering patterns

**Issue: Agent selection unclear**

- Default to `general` for standard workflows
- Use specialized agents for domain-specific tasks
- Ask user if uncertain

**Issue: Shell command errors**

- Test commands independently before including
- Add error handling in shell commands
- Keep commands simple and focused

**Issue: Template syntax errors**

- Review template for correct syntax
- Use examples from existing commands
- Validate syntax before creating file

## Examples

### Example 1: Simple Test Command

**Input:**

- Purpose: Run test suite and report results
- Name: test-run

**Task Execution:**

1. Analyze: Simple command with shell integration
2. Review template: Study shell command syntax
3. Study examples: Review `commit.md` for shell patterns
4. Design: Single shell command execution with analysis
5. Create: Command with `!`npm test`` shell integration
6. Validate: Check syntax and structure
7. Document: Add to command directory

**Outputs:**

- Command: `command/test-run.md`
- Frontmatter: `agent: general`, description set
- Content: Shell command execution with result analysis

---

### Example 2: Parameterized Component Creation

**Input:**

- Purpose: Create new React component with tests
- Name: create-component
- Context: Component name from arguments

**Task Execution:**

1. Analyze: Parameterized command using $ARGUMENTS
2. Review template: Study argument variable syntax
3. Study examples: Review parameterized commands
4. Design: Use $ARGUMENTS for component name
5. Create: Command with clear instructions and file generation
6. Validate: Check argument syntax
7. Document: Note usage pattern

**Outputs:**

- Command: `command/create-component.md`
- Uses: `$ARGUMENTS` for component name
- Instructions: Clear component creation steps

---

### Example 3: Complex Analysis Command

**Input:**

- Purpose: Analyze code coverage and suggest improvements
- Name: analyze-coverage
- Context: Test results, coverage reports, file list
- Resources: Code quality checklist

**Task Execution:**

1. Analyze: Complex shell integration with resource references
2. Review template: Study multiple shell commands and file references
3. Study examples: Review `document.md` for comprehensive pattern
4. Design: Multiple context gathering steps, checklist reference
5. Create: Command with multiple `!`command``calls and`@file` references
6. Validate: Check all syntax and references
7. Document: Add integration notes

**Outputs:**

- Command: `command/analyze-coverage.md`
- Multiple shell commands for context
- Checklist reference for validation
- Comprehensive analysis instructions

---

## Task Parameters

### Context Gathering Types

- **Shell commands**: Dynamic information from system
- **File references**: Specific file contents
- **No context**: Simple prompt-only commands

### Agent Selection

- **general**: Standard workflows, analysis, processing
- **documentalist**: Documentation generation
- **atlassian**: JIRA/Confluence operations
- **pipeline-architect**: CI/CD workflows
- **Custom agents**: Domain-specific tasks

### Command Complexity

- **Simple**: Single shell command or simple prompt
- **Standard**: Multiple context sources, basic logic
- **Complex**: Multiple steps, resource integration, validation

## Template Reference

**Primary Template**: `.opencode/template/opencode-command-tmpl.yaml`

**Template Syntax:**

- `$ARGUMENTS` - All command arguments as single string
- `$1, $2, $3` - Individual positional arguments
- `!`command`` - Execute shell command and inject output
- `@filename` - Include file content in prompt

**Example Commands:** Browse `command/` directory for patterns

## Best Practices

### Command Design

- Single, clear purpose per command
- Descriptive kebab-case naming
- Efficient context gathering (avoid unnecessary data)
- Appropriate agent selection
- Clear output expectations

### Template Syntax

- Use `$ARGUMENTS` for simple parameter passing
- Use `$1, $2, $3` for multiple distinct parameters
- Test shell commands independently before including
- Use `@filename` for file content instead of `!`cat filename``
- Keep shell output concise to avoid token waste

### Resource Integration

- Reference checklists for validation steps
- Use tasks for complex sub-workflows
- Link to knowledge bases for patterns and best practices
- Update existing documentation instead of creating new

### Documentation

- Write clear descriptions for TUI autocomplete
- Add usage examples for complex commands
- Document expected outputs
- Include troubleshooting tips for common issues

## Maintenance

### Review Triggers

- Command not working as expected
- Template updates
- New template syntax features
- User feedback on command effectiveness

### Update Process

1. Review command usage and feedback
2. Check if template has been updated
3. Update command to match new patterns
4. Test command after updates
5. Document significant changes

## References

- **Template**: `.opencode/template/opencode-command-tmpl.yaml`
- **Checklist**: `.opencode/checklist/opencode-command.md` (829+ validation items)
- **Official Documentation**: <https://opencode.ai/docs/commands/>
- **Examples**: `.opencode/command/*.md` (all existing commands)
