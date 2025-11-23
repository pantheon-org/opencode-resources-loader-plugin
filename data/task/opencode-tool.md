---
description: Task for creating new custom OpenCode tools following templates
mode: task
temperature: 0.2
version: 1.0.0
last_updated: 2025-11-21
category: Development
type: task
tags:
  - opencode
  - tool
  - creating
  - typescript
  - custom
  - function
title: Opencode Tool Task
estimated_duration: 10-15 minutes
---

# Create OpenCode Tool Task

This task guides the creation of new OpenCode custom tools following established templates and best practices.

## Purpose

Create well-structured OpenCode tools that:

- Follow the template structure exactly
- Use proper TypeScript/Zod schema definitions
- Include clear descriptions for LLM understanding
- Integrate with any language (Python, Shell, etc.)
- Have proper argument validation
- Return meaningful results
- Handle errors gracefully

## When to Use This Task

Use this task when you need to:

- Create a custom function that LLM can invoke
- Integrate external scripts or systems
- Add specialized data processing capabilities
- Provide database query functionality
- Enable API interactions
- Execute system commands with structured input/output

**Do NOT use this task if:**

- You need to create a command (use create-command task instead)
- You need an agent (use create-agent task instead)
- The functionality can be achieved with existing tools
- The operation is too simple to warrant a custom tool

## Input Requirements

### Required Information

- **Tool purpose**: What does this tool do?
- **Tool name**: Descriptive kebab-case name (e.g., database-query, git-status)
- **User description**: Brief description of what user wants the tool to do

### Optional Information

- **Arguments needed**: What parameters does the tool accept?
- **Return type**: What should the tool return?
- **Integration language**: Python, Shell, Rust, etc.?
- **Error handling**: How should errors be handled?

## Task Execution Steps

### Step 1: Requirements Analysis

**Actions:**

1. Parse the user's description to understand tool purpose
2. Identify what parameters the tool needs
3. Determine the return type and format
4. Check if tool needs to integrate with other languages
5. Identify error scenarios and handling approach

**Tools Used:**

- Analysis of user input
- Knowledge of existing tools for patterns

**Outputs:**

- Tool purpose statement
- Parameter list with types
- Return type specification
- Integration requirements
- Error handling strategy

---

### Step 2: Template Review

**Actions:**

1. Read `.opencode/template/opencode-tool-tmpl.yaml`
2. Understand tool structure (import, export, definition)
3. Review Zod schema syntax for arguments
4. Study tool context (sessionID, messageID, agent, abort)
5. Note best practices and common patterns

**Tools Used:**

- Read tool to access template

**Outputs:**

- Understanding of tool structure
- List of available schema types
- Context object properties
- Common patterns to follow

---

### Step 3: Example Study

**Actions:**

1. Identify 2-3 similar existing tools (if any)
2. Review their structure and approach
3. Note effective argument validation patterns
4. Observe shell integration methods
5. Learn from their best practices

**Tools Used:**

- Read tool to examine existing tools
- List/Glob to find similar tools in `tool/` directory

**Suggested Examples (from template):**

Refer to `.opencode/template/opencode-tool-tmpl.yaml` for complete examples:

- Simple tool: No arguments, simple return (see `example_simple`)
- Parameterized tool: Multiple arguments with validation (see `example_parameterized`)
- Shell integration: Bun.$ usage (see `example_shell`)
- Multiple exports: Pattern for related tools (see `example_multiple_tools`)
- Python integration: Cross-language example (see `example_python_integration`)

**Outputs:**

- Patterns to follow
- Argument validation examples
- Shell integration approaches

---

### Step 4: Tool Design

**Actions:**

1. Design tool signature
   - Choose descriptive function name
   - Define all required parameters
   - Define optional parameters with defaults
   - Specify return type

2. Design argument schema
   - Use appropriate Zod types (string, number, boolean, enum, array, object)
   - Add validation rules (min, max, url, email, etc.)
   - Add .describe() for each parameter
   - Make parameters optional where appropriate

3. Design implementation
   - Pure TypeScript function
   - Shell command integration (Bun.$)
   - Python/Rust script integration
   - Database/API integration
   - File system operations

4. Design error handling
   - Try-catch blocks
   - Meaningful error messages
   - Graceful degradation

**Tools Used:**

- Planning and design

**Outputs:**

- Complete tool design
- Argument schema
- Implementation approach
- Error handling strategy

---

### Step 5: Tool Creation

**Actions:**

1. Create tool file in `tool/[kebab-case-name].ts`
2. Add imports: `import { tool } from "@opencode-ai/plugin"`
3. Define tool using `tool()` helper:

   ```typescript
   export default tool({
     description: 'Clear description of what tool does',
     args: {
       param: tool.schema.string().describe('Parameter description'),
     },
     async execute(args, context) {
       // Implementation
       return result;
     },
   });
   ```

4. Add argument validation with Zod schemas
5. Implement execute function
6. Add error handling
7. Test locally if possible

**Tools Used:**

- Write tool to create tool file

**Outputs:**

- Complete tool file in `tool/` directory

---

### Step 6: Validation

**Actions:**

1. **Verify TypeScript Compilation** (REQUIRED):

   ```bash
   cd tool && bun build tool-filename.ts --target=bun
   # OR use TypeScript compiler directly
   npx tsc tool-filename.ts --noEmit
   ```

   - Fix all TypeScript errors
   - Verify imports resolve correctly
   - Target: No compilation errors

2. Verify tool structure
   - Import statement correct
   - Export pattern correct (default or named exports)
   - Description is clear and specific
   - All arguments have .describe()
   - Argument types are appropriate
   - Execute function is async
   - Return type is JSON-serializable

3. Test tool execution
   - Verify TypeScript compiles
   - Test with sample inputs
   - Verify error handling works
   - Check return value format

**Tools Used:**

- TypeScript compiler for syntax validation (`bun build` or `tsc`)
- Bun test framework for unit testing
- Read tool to review created file
- Manual code review for structure compliance

**Key Validation Areas:**

- Tool Structure (import, export, definition)
- Argument Schema (types, validation, descriptions)
- Execute Function (async, error handling, return value)
- Integration (shell commands, external scripts)
- Error Handling (try-catch, meaningful messages)
- Security (input validation, sanitization)

**Outputs:**

- Validation results
- List of any issues to fix
- Quality check results

---

### Step 7: Integration Documentation

**Actions:**

1. Note how tool should be used
2. Document example invocations
3. Identify if tool should be documented in knowledge base
4. Note any commands/agents that might use this tool
5. Document testing instructions

**Tools Used:**

- Planning

**Outputs:**

- Integration notes
- Usage examples
- Testing instructions
- Documentation updates needed

---

## Task Output Summary

The task generates one primary file:

1. **Tool File** (`tool/[name].ts`)
   - Proper TypeScript imports
   - Tool definition using `tool()` helper
   - Clear description for LLM
   - Well-defined argument schema with Zod
   - Async execute function
   - Error handling
   - Meaningful return values

## Success Criteria

- ✅ Tool file created in `tool/` directory
- ✅ Filename is kebab-case with .ts extension
- ✅ Proper imports from @opencode-ai/plugin
- ✅ Clear, descriptive tool description
- ✅ All arguments have Zod schema with .describe()
- ✅ Execute function is async
- ✅ Error handling implemented
- ✅ Returns JSON-serializable values
- ✅ TypeScript compiles without errors
- ✅ Tool can be invoked successfully

## Quality Checks

### Essential Checks

- [ ] TypeScript compiles without errors
- [ ] TypeScript imports correct
- [ ] Tool description clear and specific
- [ ] All arguments have .describe()
- [ ] Argument types appropriate
- [ ] Validation rules make sense
- [ ] Execute function is async
- [ ] Error handling implemented
- [ ] Return values are meaningful
- [ ] Security considerations addressed

### Additional Checks

- [ ] Tool name follows kebab-case convention
- [ ] Tool serves single, clear purpose
- [ ] Arguments are well-validated
- [ ] Shell commands are safe (if used)
- [ ] External scripts work correctly (if used)
- [ ] Performance is reasonable
- [ ] Documentation is clear

## Error Handling

### Common Issues and Resolutions

**Issue: Tool name unclear**

- Ask user for clarification on tool purpose
- Suggest appropriate kebab-case name based on purpose

**Issue: Argument types unclear**

- Ask what data the tool needs
- Review template for appropriate Zod schemas
- Suggest validation rules based on use case

**Issue: Return type unclear**

- Ask what information tool should provide
- Suggest structured JSON for complex data
- Recommend string for simple output

**Issue: Import errors**

- Verify @opencode-ai/plugin is available
- Check import syntax matches template
- Ensure using correct import path

**Issue: Shell command errors**

- Test commands independently before including
- Add error handling with try-catch
- Use Bun.$.throws(false) for non-critical commands

**Issue: TypeScript compilation errors**

- Review types and schemas
- Check async/await usage
- Verify return types are correct

## Examples

### Example 1: Simple Timestamp Tool

**Input:**

- Purpose: Get current timestamp in ISO format
- Name: timestamp
- No arguments needed

**Task Execution:**

1. Analyze: Simple tool with no arguments
2. Review template: Study basic tool structure
3. Study examples: Review similar simple tools
4. Design: No arguments, returns ISO string
5. Create: Tool with Date() call
6. Validate: Check structure and syntax
7. Document: Add usage notes

**Outputs:**

- Tool: `tool/timestamp.ts`
- No arguments
- Returns ISO formatted timestamp string

---

### Example 2: Database Query Tool

**Input:**

- Purpose: Execute SQL queries on project database
- Name: database-query
- Arguments: SQL query string

**Task Execution:**

1. Analyze: Parameterized tool with database integration
2. Review template: Study argument validation
3. Study examples: Review database patterns
4. Design: Single string argument with validation
5. Create: Tool with database connection and query execution
6. Validate: Check SQL injection prevention
7. Document: Add security notes

**Outputs:**

- Tool: `tool/database-query.ts`
- Arguments: query (string with validation)
- Returns: JSON formatted results
- Error handling for invalid queries

---

### Example 3: Python Integration Tool

**Input:**

- Purpose: Add two numbers using Python
- Name: python-add
- Arguments: Two numbers
- Integration: Python script

**Task Execution:**

1. Analyze: Multi-language integration
2. Review template: Study shell integration patterns
3. Study examples: Review Python integration example
4. Design: Two number arguments, Python script call
5. Create: Tool with Bun.$ calling Python script
6. Validate: Test Python script separately
7. Document: Note Python dependency

**Outputs:**

- Tool: `tool/python-add.ts`
- Python script: `tool/add.py`
- Arguments: a, b (numbers)
- Returns: Sum as number
- Uses Bun.$ for shell integration

---

## Task Parameters

### Tool Complexity

- **Simple**: No arguments, single operation
- **Standard**: Multiple arguments, validation
- **Complex**: External integration, error handling

### Integration Types

- **Pure TypeScript**: No external dependencies
- **Shell Integration**: Using Bun.$ for commands
- **Language Integration**: Python, Rust, Go scripts
- **Database/API**: External system integration

## Template Reference

**Primary Template**: `.opencode/template/opencode-tool-tmpl.yaml`

**Schema Types:**

- `tool.schema.string()` - String validation
- `tool.schema.number()` - Number validation
- `tool.schema.boolean()` - Boolean values
- `tool.schema.enum([])` - Constrained values
- `tool.schema.array()` - Array of values
- `tool.schema.object()` - Nested objects

**Example Tools:** Browse `tool/` directory for patterns

## Best Practices

### Tool Design

- Single, clear purpose per tool
- Descriptive kebab-case naming
- Clear descriptions for LLM understanding
- Appropriate argument validation
- Meaningful return values

### Argument Schema

- Use descriptive parameter names
- Always add .describe() to each parameter
- Use appropriate Zod types
- Add validation rules (min, max, url, etc.)
- Make optional parameters truly optional

### Implementation

- Keep execute function focused
- Handle errors gracefully
- Return structured data when possible
- Use async/await consistently
- Support cancellation with context.abort

### Security

- Validate all input parameters
- Sanitize shell command arguments
- Don't expose sensitive data
- Be cautious with file operations
- Prevent SQL injection

## Maintenance

### Review Triggers

- Tool not working as expected
- Template updates
- New Zod features
- User feedback on tool effectiveness

### Update Process

1. Review tool usage and feedback
2. Check if template has been updated
3. Update tool to match new patterns
4. Test tool after updates
5. Document significant changes

## Testing Tools

### Unit Testing Pattern

Create a test file alongside your tool to verify functionality:

**Test File Structure:**

```typescript
// tool/my-tool.test.ts
import { describe, it, expect } from 'bun:test';
import myTool from './my-tool';

const mockContext = {
  sessionID: 'test-session',
  messageID: 'test-message',
  agent: 'general',
  abort: undefined,
};

describe('my-tool', () => {
  it('should execute successfully with valid input', async () => {
    const result = await myTool.execute({ param: 'test-value' }, mockContext);

    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });

  it('should validate arguments correctly', async () => {
    // This will throw a Zod validation error
    await expect(myTool.execute({ param: 123 }, mockContext)).rejects.toThrow();
  });

  it('should handle errors gracefully', async () => {
    const result = await myTool.execute({ param: 'invalid-input' }, mockContext);

    expect(result).toContain('Error');
  });

  it('should respect abort signal', async () => {
    const abortController = new AbortController();
    const contextWithAbort = {
      ...mockContext,
      abort: abortController.signal,
    };

    // Abort immediately
    abortController.abort();

    const result = await myTool.execute({ param: 'test' }, contextWithAbort);

    expect(result).toContain('Cancelled');
  });
});
```

**Running Tests:**

```bash
# Run all tool tests
bun test tool/*.test.ts

# Run specific tool test
bun test tool/my-tool.test.ts

# Run with verbose output
bun test --verbose tool/my-tool.test.ts
```

### Integration Testing

Test the tool within an actual OpenCode session:

1. **Load the tool** - Place tool file in `tool/` directory
2. **Restart OpenCode** - Ensure tool is loaded
3. **Invoke from chat** - Ask LLM to use the tool
4. **Verify behavior** - Check tool executes correctly
5. **Test edge cases** - Try invalid inputs, missing args, etc.

### Testing Checklist

- [ ] Tool compiles without TypeScript errors
- [ ] All arguments validate correctly (Zod schemas)
- [ ] Happy path returns expected output
- [ ] Error cases handled gracefully
- [ ] Abort signal respected (if long-running)
- [ ] No sensitive data in return values
- [ ] Performance is acceptable
- [ ] Tool works in actual OpenCode session

## References

- **Template**: `.opencode/template/opencode-tool-tmpl.yaml`
- **Official Documentation**: <https://opencode.ai/docs/custom-tools/>
- **Plugin API**: <https://opencode.ai/docs/plugins/>
- **Zod Documentation**: <https://zod.dev>
- **Bun Shell**: <https://bun.sh/docs/runtime/shell>
- **Bun Test**: <https://bun.sh/docs/cli/test>
