---
title: OpenCode Command Checklist
description: Comprehensive quality assurance checklist for creating and validating OpenCode commands.
type: checklist
category: meta
version: 1.0.0
tags:
  - checklist
  - meta
  - opencode
  - command
last_updated: 2025-11-19
---

# OpenCode Command Checklist

Comprehensive quality assurance checklist for creating and validating OpenCode commands.

**Purpose**: Ensure commands are properly configured, follow best practices, and integrate correctly with the OpenCode
system.

**When to use**: Creating new commands, reviewing existing commands, or validating command configurations.

**Reference**: <https://opencode.ai/docs/commands/>

---

## Command Configuration

### Required Configuration

- ✅ **template** field present (the prompt sent to LLM)
- ✅ Template contains clear instructions
- ✅ Template is specific and actionable
- ✅ Template uses special syntax correctly ($ARGUMENTS, !`commands`, @files)
- ✅ **description** field present (shown in TUI)
- ✅ Description is clear and concise
- ✅ Description explains what command does

### Optional Configuration

- ✅ **agent** field specifies which agent executes command (if not default)
- ✅ Agent specified exists and is accessible
- ✅ **subtask** flag set appropriately (true for subagent invocation)
- ✅ **model** override set if specific model required
- ✅ Model format follows pattern: `provider/model-name`
- ✅ Model is available and accessible

---

## Command Location and Naming

### File Location

#### Global Commands

- ✅ Located in `~/.config/opencode/command/`
- ✅ Accessible across all projects
- ✅ Appropriate for general-purpose commands

#### Project-Specific Commands

- ✅ Located in `.opencode/command/`
- ✅ Only available in specific project
- ✅ Appropriate for project-specific workflows

### File Naming

- ✅ Filename is kebab-case (e.g., `run-tests.md`)
- ✅ Filename is descriptive of command purpose
- ✅ Filename becomes command name (e.g., `run-tests.md` → `/run-tests`)
- ✅ Extension is `.md` for markdown commands
- ✅ Command name doesn't conflict with built-in commands (unless intentional override)

### File Format

- ✅ Valid YAML frontmatter between `---` delimiters
- ✅ Markdown content (template) after frontmatter
- ✅ Proper indentation in YAML
- ✅ No syntax errors in frontmatter
- ✅ Template content is properly formatted

---

## Template Syntax Validation

### Arguments Handling

#### $ARGUMENTS Usage

- ✅ `$ARGUMENTS` placeholder used correctly (captures all arguments)
- ✅ Arguments usage documented in description
- ✅ Example usage clear to users
- ✅ Template explains what arguments are expected

#### Positional Arguments

- ✅ `$1, $2, $3...` used for specific arguments
- ✅ Positional argument numbers match expected count
- ✅ Template clearly indicates which argument is which
- ✅ Missing arguments handled gracefully
- ✅ Arguments documented in command description

**Example:**

```markdown
Create a file named $1 in the directory $2 with the following content: $3
```

### Shell Output Integration

#### !`command` Syntax

- ✅ Shell commands use correct syntax: !`command`
- ✅ Shell commands are safe and appropriate
- ✅ Shell commands run in project root directory
- ✅ Shell command output will be useful in prompt
- ✅ Shell commands won't expose sensitive information
- ✅ Shell commands have reasonable execution time
- ✅ Error handling considered for command failures

**Common Patterns:**

```markdown
!`npm test` # Test results !`git log -10` # Recent commits !`git status` # Git status !`ls -la` # Directory listing
```

**Security Checks:**

- ✅ No destructive commands (rm, delete, etc.)
- ✅ No commands that modify state without permission
- ✅ No commands that could expose secrets
- ✅ Commands are read-only or safe for execution

### File References

#### @filename Syntax

- ✅ File references use correct syntax: @path/to/file
- ✅ Referenced files typically exist in project
- ✅ File paths are relative to project root
- ✅ File references are necessary for command purpose
- ✅ Large files referenced only when needed
- ✅ File reference purpose clear in template

**Example:**

```markdown
Review the component in @src/components/Button.tsx
```

### Combined Syntax

- ✅ Multiple syntax types work together correctly
- ✅ Arguments, shell output, and file references don't conflict
- ✅ Template remains clear with multiple syntax types

**Example:**

```markdown
Review file @$1 and compare with git diff: !`git diff $1`
```

---

## Agent Configuration

### Agent Selection

- ✅ Agent field set appropriately for command purpose
- ✅ Agent has required tools for command execution
- ✅ Agent temperature suitable for command task
- ✅ Agent permissions allow command operations

### Agent Types

#### Default Agent

- ✅ No agent specified (uses current agent)
- ✅ Appropriate for general commands
- ✅ User can choose agent when running

#### Specific Agent

- ✅ Agent specified matches command purpose
- ✅ `agent: build` for development tasks
- ✅ `agent: plan` for analysis tasks
- ✅ Custom agents for specialized commands

#### Subagent Configuration

- ✅ `subtask: true` set if command should create child session
- ✅ Subagent invocation appropriate for command
- ✅ Prevents polluting primary context
- ✅ Forces agent to act as subagent even if mode is primary

---

## Model Override

### Model Configuration

- ✅ Model override only used when necessary
- ✅ Model format correct: `provider/model-name`
- ✅ Model appropriate for command purpose
- ✅ Model more capable for complex commands
- ✅ Model faster for simple commands

**Common Patterns:**

```yaml
model: anthropic/claude-3-5-sonnet-20241022    # Powerful model
model: anthropic/claude-3-5-haiku-20241022     # Fast model
model: openai/gpt-4o                           # OpenAI option
```

---

## Template Quality

### Template Content

- ✅ Template provides clear instructions
- ✅ Template is specific and actionable
- ✅ Template context is sufficient for task
- ✅ Template explains what to do
- ✅ Template explains what to focus on
- ✅ Template provides constraints or guidelines
- ✅ Template includes success criteria (if applicable)

### Template Structure

- ✅ Instructions are logically organized
- ✅ Multiple steps are clearly separated
- ✅ Context provided before requests
- ✅ Expected output format specified (if needed)
- ✅ Edge cases mentioned (if applicable)

### Template Best Practices

- ✅ Template is concise but complete
- ✅ Avoids unnecessary verbosity
- ✅ Uses clear, unambiguous language
- ✅ Focuses on "what to do" not implementation
- ✅ Provides examples when helpful
- ✅ Considers different use cases

**Good Template Example:**

```markdown
Run the full test suite with coverage report. Focus on:

- Failed tests and their root causes
- Coverage gaps in critical paths
- Suggestions for improving test quality

Provide actionable recommendations.
```

**Poor Template Example:**

```markdown
Run tests.
```

---

## Command Types and Patterns

### Analysis Commands

**Purpose**: Analyze code, tests, coverage, or project state

- ✅ Template includes context gathering (!`commands`)
- ✅ Template specifies what to analyze
- ✅ Template requests specific insights
- ✅ Agent appropriate for analysis (plan or build)
- ✅ Model appropriate for complexity

**Example:**

```markdown
---
description: Analyze test coverage
agent: plan
---

Current test results: !`npm test -- --coverage`

Analyze coverage and suggest:

1. Critical paths lacking tests
2. Edge cases to add
3. Opportunities for refactoring
```

### Generation Commands

**Purpose**: Create files, components, or documentation

- ✅ Template specifies what to generate
- ✅ Template includes requirements or constraints
- ✅ Template may include examples or patterns
- ✅ Arguments used for names/paths ($1, $2, etc.)
- ✅ Agent has write permissions
- ✅ Template clear about structure expected

**Example:**

```markdown
---
description: Create React component
agent: build
---

Create a React component named $1 with:

- TypeScript support
- Proper prop types
- Basic styling structure
- Unit test template

Follow project conventions.
```

### Review Commands

**Purpose**: Review code, changes, or pull requests

- ✅ Template gathers relevant context
- ✅ Template specifies review criteria
- ✅ Template uses git commands for diffs
- ✅ Template may reference specific files
- ✅ Agent appropriate (plan for read-only)
- ✅ Focus areas clearly defined

**Example:**

```markdown
---
description: Review recent changes
agent: plan
---

Recent changes: !`git diff HEAD~1`

Review for:

- Code quality and best practices
- Potential bugs or edge cases
- Performance implications
- Security considerations
```

### Testing Commands

**Purpose**: Run tests, analyze results, suggest improvements

- ✅ Template runs appropriate test commands
- ✅ Template captures test output
- ✅ Template specifies what to focus on
- ✅ Template requests actionable suggestions
- ✅ Shell commands appropriate for testing

**Example:**

```markdown
---
description: Run tests with coverage
---

Test results: !`npm test -- --coverage --verbose`

Focus on:

1. Failing tests - root cause analysis
2. Coverage gaps in new features
3. Suggestions for test improvements
```

### Documentation Commands

**Purpose**: Generate or update documentation

- ✅ Template specifies documentation type
- ✅ Template includes relevant code context
- ✅ Template defines structure or format
- ✅ Template may reference files (@files)
- ✅ Agent has write permissions
- ✅ Documentation standards referenced

**Example:**

```markdown
---
description: Generate API documentation
---

Review API endpoints in @src/api/routes.ts

Generate documentation with:

- Endpoint descriptions
- Request/response schemas
- Example usage
- Error codes

Follow project docs style.
```

### Deployment Commands

**Purpose**: Prepare for or execute deployments

- ✅ Template gathers deployment context
- ✅ Template includes validation steps
- ✅ Template specifies deployment target
- ✅ Safety checks included
- ✅ Shell commands appropriate and safe
- ✅ Permissions appropriate for operations

**Example:**

```markdown
---
description: Prepare for deployment
agent: build
subtask: true
---

Pre-deployment checklist:

1. Run tests: !`npm test`
2. Check git status: !`git status`
3. Verify version: !`npm version`

Validate all checks pass and suggest next steps.
```

### Refactoring Commands

**Purpose**: Refactor code, improve structure

- ✅ Template identifies refactoring target
- ✅ Template specifies goals or constraints
- ✅ Template may include current code (@files)
- ✅ Template explains refactoring rationale
- ✅ Agent has write/edit permissions
- ✅ Template mentions testing after refactoring

**Example:**

```markdown
---
description: Refactor component
---

Refactor component in @$1 to:

- Extract reusable logic
- Improve type safety
- Reduce complexity
- Maintain existing behavior

Keep existing tests passing.
```

---

## Built-in Command Awareness

### Built-in Commands

OpenCode includes built-in commands:

- ✅ `/init` - Initialize project
- ✅ `/undo` - Undo last change
- ✅ `/redo` - Redo change
- ✅ `/share` - Share session
- ✅ `/help` - Show help

### Override Considerations

- ✅ Aware custom commands override built-ins
- ✅ Override intentional if same name used
- ✅ Override documented if built-in overridden
- ✅ Alternative name used if override not intended
- ✅ Override justified by improved functionality

---

## Command Documentation

### Description Quality

- ✅ Description is concise (one line)
- ✅ Description explains command purpose
- ✅ Description mentions key features (if applicable)
- ✅ Description indicates if arguments required
- ✅ Description shown in TUI is helpful

**Good Description Examples:**

```yaml
description: Run tests with coverage report
description: Create React component with TypeScript
description: Review recent git changes for quality
description: Analyze test coverage and suggest improvements
```

**Poor Description Examples:**

```yaml
description: Test
description: Do stuff
description: Command
```

### Internal Documentation

- ✅ Template includes comments if complex
- ✅ Argument usage is clear
- ✅ Expected output format documented (if specific)
- ✅ Special syntax usage explained (if complex)

### External Documentation

- ✅ Command listed in project README (if project-specific)
- ✅ Command usage examples provided (if complex)
- ✅ Command requirements documented (if any)
- ✅ Related commands cross-referenced

---

## Resource Integration

### File References

- ✅ Referenced files appropriate for command
- ✅ File paths relative to project root
- ✅ File references documented in template
- ✅ Large files only referenced when necessary
- ✅ File existence validated (common files)

### Shell Commands

- ✅ Shell commands appropriate for purpose
- ✅ Shell commands safe to execute
- ✅ Shell command output useful in prompt
- ✅ Shell commands documented in template
- ✅ Error cases considered

### Agent Resources

- ✅ Agent has access to needed checklists
- ✅ Agent can reference knowledge bases
- ✅ Agent can invoke tasks if needed
- ✅ Agent has appropriate tools enabled

---

## Testing and Validation

### Functional Testing

- ✅ Command loads without errors
- ✅ Command appears in command list (/)
- ✅ Command executes successfully
- ✅ Arguments are processed correctly
- ✅ Shell commands execute as expected
- ✅ File references resolve correctly
- ✅ Agent receives correct prompt
- ✅ Output matches expectations

### Syntax Testing

- ✅ Frontmatter parses without errors
- ✅ $ARGUMENTS placeholder works
- ✅ Positional arguments ($1, $2) work
- ✅ Shell syntax (!`command`) works
- ✅ File reference syntax (@file) works
- ✅ Combined syntax works together

### Edge Case Testing

- ✅ Command works without arguments (if applicable)
- ✅ Command works with missing optional arguments
- ✅ Command handles shell command failures
- ✅ Command handles missing files gracefully
- ✅ Command works in different project states

### User Experience Testing

- ✅ Command name is intuitive
- ✅ Description is helpful
- ✅ Arguments are clear
- ✅ Output is useful
- ✅ Error messages are clear (if applicable)

---

## Quality Checks

### Completeness Check

- ✅ Template field present and populated
- ✅ Description field present and clear
- ✅ Agent specified if not default
- ✅ Model override if needed
- ✅ Subtask flag set if appropriate
- ✅ All syntax used correctly

### Accuracy Check

- ✅ Command purpose matches implementation
- ✅ Template achieves stated goal
- ✅ Agent appropriate for command
- ✅ Model appropriate for complexity
- ✅ Shell commands are correct
- ✅ File references are accurate

### Clarity Check

- ✅ Description is clear
- ✅ Template is unambiguous
- ✅ Arguments are documented
- ✅ Instructions are specific
- ✅ Expected outcome is clear

### Security Check

- ✅ Shell commands are safe
- ✅ No destructive operations without confirmation
- ✅ No commands exposing secrets
- ✅ File references don't expose sensitive data
- ✅ Arguments properly validated/sanitized

### Performance Check

- ✅ Shell commands have reasonable execution time
- ✅ File references appropriate size
- ✅ Model selection appropriate for complexity
- ✅ Template not unnecessarily verbose
- ✅ No redundant operations

---

## Common Command Patterns

### Test Command Pattern

```yaml
---
description: Run tests with coverage
agent: build
---

Test results:
!`npm test -- --coverage`

Analyze results and suggest:
1. Fixes for failing tests
2. Coverage improvements
3. Test quality enhancements
```

### Review Command Pattern

```yaml
---
description: Review recent changes
agent: plan
---

Recent changes:
!`git diff HEAD~5`

Review for:
- Code quality
- Potential bugs
- Performance issues
- Security concerns
```

### Generate Command Pattern

```yaml
---
description: Create React component
agent: build
---

Create React component named $1 with:
- TypeScript support
- Prop types
- Basic structure
- Unit test file

Follow project conventions.
```

### Analysis Command Pattern

```yaml
---
description: Analyze codebase structure
agent: plan
subtask: true
---

Project structure:
!`tree -L 3`

Analyze and suggest:
1. Organization improvements
2. Potential refactorings
3. Architecture concerns
```

### Documentation Command Pattern

```yaml
---
description: Generate API docs
agent: build
---

API routes in @src/api/routes.ts

Generate documentation with:
- Endpoint descriptions
- Request/response schemas
- Example requests
- Error codes
```

---

## Configuration Format Validation

### JSON Configuration

- ✅ Valid JSON syntax
- ✅ Properly nested under `command` key
- ✅ Command name is valid identifier
- ✅ All required fields present
- ✅ Proper string escaping in template

**Example:**

```json
{
  "command": {
    "test": {
      "template": "Run tests\n!`npm test`",
      "description": "Run test suite",
      "agent": "build"
    }
  }
}
```

### Markdown Configuration

- ✅ Valid YAML frontmatter
- ✅ Frontmatter delimiters correct (---)
- ✅ Proper indentation
- ✅ Template after frontmatter
- ✅ Newlines handled correctly

**Example:**

```markdown
---
description: Run tests
agent: build
---

Run the test suite: !`npm test`
```

---

## Best Practices Summary

### Command Design

- Focus on single, clear purpose
- Use descriptive names
- Provide helpful descriptions
- Make templates actionable
- Consider argument needs
- Choose appropriate agent
- Set subtask flag when needed

### Template Creation

- Write clear, specific instructions
- Use shell commands to gather context
- Reference files when needed
- Structure prompts logically
- Explain what to focus on
- Provide constraints or guidelines
- Request specific output format

### Security

- Only safe shell commands
- Read-only operations by default
- Validate arguments implicitly
- No sensitive data exposure
- Appropriate agent permissions
- Use plan agent for read-only

### Performance

- Minimal shell commands
- Reasonable command execution time
- Appropriate model selection
- Concise templates
- Reference files only when needed

### Maintenance

- Test commands regularly
- Update for template changes
- Document complex commands
- Version control command files
- Review and refactor periodically

---

## Maintenance

### Review Triggers

- Command not working as expected
- Template needs updating
- New features require commands
- User feedback on command
- Project structure changes
- Testing framework changes

### Update Process

1. Review command usage patterns
2. Update template or configuration
3. Test command thoroughly
4. Update documentation if needed
5. Validate syntax and structure
6. Check integration with agents

---

## Related Resources

- **Template**: `.opencode/template/opencode-command-tmpl.yaml`
- **Task**: `.opencode/task/opencode-command.md`
- **Command**: `/create-command`
- **Official Documentation**: <https://opencode.ai/docs/commands/>
- **Agent Documentation**: <https://opencode.ai/docs/agents/>
- **Tools Documentation**: <https://opencode.ai/docs/tools/>

---

## Metadata

- **Category**: Configuration Quality
- **Target**: OpenCode command developers and maintainers
- **Difficulty**: Beginner to Intermediate
- **Last Updated**: 2025-11-11
- **Version**: 1.0.0
