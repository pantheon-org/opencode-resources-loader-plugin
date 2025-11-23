---
description: Comprehensive quality assurance checklist for creating and validating OpenCode custom tools
type: checklist
category: Quality
tags:
  - tool
  - validation
  - typescript
  - quality
  - opencode
  - zod
version: 1.0.0
last_updated: 2025-11-21
title: OpenCode Tool Validation Checklist
estimated_duration: 10-15 minutes
---

# OpenCode Tool Validation Checklist

Comprehensive checklist for creating, validating, and maintaining high-quality OpenCode custom tools.

## Overview

This checklist ensures custom tools follow OpenCode conventions, TypeScript best practices, and provide reliable LLM integration.

**When to use:**

- Creating new custom tools
- Reviewing existing tools
- Validating tool quality
- Troubleshooting tool issues

---

## 1. Tool File Structure (15 items)

### File Location and Naming

- [ ] Tool file placed in correct directory (`~/.config/opencode/tool/` or `.opencode/tool/`)
- [ ] Filename uses kebab-case convention (e.g., `database-query.ts`)
- [ ] Filename is descriptive and reflects tool purpose
- [ ] File extension is `.ts` (TypeScript)
- [ ] Tool name does not conflict with built-in tools
- [ ] Tool name is not too generic (avoid: `tool.ts`, `utils.ts`, `helper.ts`)
- [ ] Tool name is concise but clear (3-4 words max)

### Import Statements

- [ ] Imports from `@opencode-ai/plugin` are present
- [ ] Import statement uses correct syntax: `import { tool } from "@opencode-ai/plugin"`
- [ ] No unnecessary imports included
- [ ] All imports resolve correctly
- [ ] Import order is logical (external, then internal)

### Export Pattern

- [ ] Tool uses either default export OR named exports (not both)
- [ ] Default export creates tool with filename as name
- [ ] Named exports create tools with `filename_exportname` pattern
- [ ] Export pattern is appropriate for tool complexity

---

## 2. Tool Definition (25 items)

### Tool Wrapper

- [ ] Uses `tool()` helper function from `@opencode-ai/plugin`
- [ ] Tool definition is an object with required fields
- [ ] Tool definition follows template structure
- [ ] No syntax errors in tool definition

### Description Field

- [ ] Description field is present and non-empty
- [ ] Description is a clear, concise string (not a comment)
- [ ] Description explains WHAT the tool does (not HOW)
- [ ] Description is written for LLM understanding
- [ ] Description mentions key parameters
- [ ] Description indicates return value type
- [ ] Description is under 120 characters
- [ ] Description uses active voice ("Query database", not "Queries database")
- [ ] Description is specific (avoid: "Does something useful")
- [ ] Description matches actual tool behavior

### Args Field

- [ ] Args field is present (even if empty object `{}`)
- [ ] Args is an object with parameter definitions
- [ ] Each parameter uses `tool.schema.*` type
- [ ] Parameter names are descriptive
- [ ] Parameter names use camelCase
- [ ] Required parameters come before optional ones
- [ ] Optional parameters have `.optional()` modifier
- [ ] Optional parameters with defaults use `.default(value)`

### Execute Function

- [ ] Execute function is present
- [ ] Execute function is declared as `async`
- [ ] Execute function signature is correct: `async execute(args, context)`
- [ ] Execute function has implementation (not empty)
- [ ] Execute function returns a value
- [ ] Return value is JSON-serializable (string, number, object, array, boolean, null)
- [ ] Return type is consistent across all code paths

---

## 3. Argument Schema Validation (40 items)

### General Schema Validation

- [ ] All arguments have Zod schema definitions
- [ ] All arguments have `.describe()` method called
- [ ] Descriptions are clear and specific
- [ ] Descriptions explain parameter purpose
- [ ] Descriptions indicate expected format/values
- [ ] Schema types match actual usage in execute function
- [ ] No type mismatches (e.g., treating string as number)

### String Arguments

- [ ] String arguments use `tool.schema.string()`
- [ ] URL strings use `.url()` validator
- [ ] Email strings use `.email()` validator
- [ ] Strings with length requirements use `.min()` and/or `.max()`
- [ ] Strings with pattern requirements use `.regex()` if needed
- [ ] Empty strings handled appropriately (use `.min(1)` if required)

### Number Arguments

- [ ] Number arguments use `tool.schema.number()`
- [ ] Integers use `.int()` modifier
- [ ] Positive numbers use `.positive()` modifier
- [ ] Numbers with range use `.min()` and `.max()`
- [ ] Number precision appropriate for use case
- [ ] Zero handling is explicit (use `.nonnegative()` if zero allowed)

### Boolean Arguments

- [ ] Boolean arguments use `tool.schema.boolean()`
- [ ] Boolean defaults are appropriate
- [ ] Boolean semantics are clear (e.g., `verbose`, `force`, `dryRun`)

### Enum Arguments

- [ ] Enum arguments use `tool.schema.enum([values])`
- [ ] Enum values are comprehensive (cover all cases)
- [ ] Enum values are clearly named
- [ ] Enum values are documented in description
- [ ] Enum defaults make sense

### Array Arguments

- [ ] Array arguments use `tool.schema.array()`
- [ ] Array item type is specified
- [ ] Array with size constraints use `.min()` and `.max()`
- [ ] Empty arrays are handled appropriately
- [ ] Array validation includes item validation

### Object Arguments

- [ ] Object arguments use `tool.schema.object()`
- [ ] Object structure is fully defined
- [ ] Nested objects are validated
- [ ] Required object fields are specified
- [ ] Optional object fields use `.optional()`

### Optional Arguments

- [ ] Optional arguments use `.optional()` modifier
- [ ] Optional arguments have sensible defaults (or use `.default()`)
- [ ] Optional arguments don't break tool if omitted
- [ ] Optional arguments documented as optional in description

---

## 4. Tool Context Usage (15 items)

### Context Access

- [ ] Context parameter is available in execute function
- [ ] Context properties accessed correctly (`.` notation)
- [ ] Context is not modified (read-only usage)

### Session Information

- [ ] `context.sessionID` used when session tracking needed
- [ ] `context.messageID` used when message tracking needed
- [ ] `context.agent` used when agent-specific behavior needed
- [ ] Session/message IDs logged if debugging enabled

### Abort Signal

- [ ] `context.abort` checked for long-running operations
- [ ] Abort signal checked in loops
- [ ] Abort handling returns appropriate message
- [ ] Graceful shutdown on abort
- [ ] No resource leaks when aborting

### Context Best Practices

- [ ] Context only accessed when needed (don't use just because it's there)
- [ ] Context usage documented in comments if non-obvious
- [ ] Context properties not destructured unnecessarily
- [ ] Context usage tested (abort scenarios, session tracking)

---

## 5. Implementation Quality (50 items)

### Function Logic

- [ ] Execute function has clear, focused purpose
- [ ] Logic flow is easy to follow
- [ ] No overly complex nested conditions
- [ ] No duplicate code
- [ ] Functions are reasonably sized (< 100 lines ideal)
- [ ] Side effects are minimized and controlled
- [ ] Function does one thing well (Single Responsibility)

### Error Handling

- [ ] Try-catch blocks present for risky operations
- [ ] Errors return meaningful messages (not generic "Error occurred")
- [ ] Error messages include context (what failed, why)
- [ ] Errors don't expose sensitive information
- [ ] Errors don't include stack traces in production
- [ ] Non-critical errors handled gracefully (don't stop execution)
- [ ] Critical errors throw or return error indication
- [ ] Error types are specific (ValidationError, DatabaseError, etc.)

### Async/Await Usage

- [ ] All async operations use `await`
- [ ] No missing `await` on promises
- [ ] No unnecessary `await` (e.g., on non-promises)
- [ ] Async operations happen in correct order
- [ ] Parallel operations use `Promise.all()` when appropriate
- [ ] No blocking operations in async functions

### Shell Integration (Bun.$)

- [ ] Shell commands use `Bun.$` template literals
- [ ] Command arguments are properly escaped/quoted
- [ ] Command output handled appropriately (`.text()`, `.json()`, etc.)
- [ ] Shell errors handled with `.throws(false)` when appropriate
- [ ] Commands tested independently before integration
- [ ] Shell commands don't expose security vulnerabilities
- [ ] Working directory assumptions documented
- [ ] Shell command failures return meaningful errors

### External Script Integration

- [ ] External script path is correct (relative to project root)
- [ ] External script exists and is executable
- [ ] Script arguments passed correctly
- [ ] Script output parsed correctly
- [ ] Script errors handled gracefully
- [ ] Script dependencies documented
- [ ] Script language/runtime documented (Python, Rust, etc.)

### Database Integration

- [ ] Database connections opened and closed properly
- [ ] No connection leaks
- [ ] SQL queries parameterized (prevent injection)
- [ ] Query results formatted appropriately
- [ ] Database errors handled gracefully
- [ ] Transactions used when appropriate
- [ ] Database availability checked before queries

### API Integration

- [ ] API endpoints are correct
- [ ] HTTP methods appropriate (GET, POST, PUT, DELETE)
- [ ] Request headers set correctly
- [ ] Request body formatted correctly (JSON, form data, etc.)
- [ ] Response status codes checked
- [ ] API errors handled (4xx, 5xx responses)
- [ ] Timeouts set for API calls
- [ ] Rate limiting considered

### File Operations

- [ ] File paths validated before operations
- [ ] File existence checked when appropriate
- [ ] File permissions considered
- [ ] File operations don't traverse outside allowed directories
- [ ] Large files handled efficiently (streaming vs loading)
- [ ] File handles closed properly
- [ ] Temporary files cleaned up

---

## 6. Return Values (20 items)

### Return Type

- [ ] Return type is JSON-serializable
- [ ] Return type is consistent across all code paths
- [ ] Null/undefined handled explicitly
- [ ] Return value matches description in tool definition

### Return Value Quality

- [ ] Returns meaningful data (not just "success" or "done")
- [ ] Returns structured data when appropriate (JSON objects)
- [ ] Returns string for simple results
- [ ] Returns formatted output (pretty-printed JSON, tables, etc.)
- [ ] Return value size is reasonable (< 10KB ideal, avoid huge dumps)
- [ ] Return value doesn't include sensitive data
- [ ] Return value is human-readable
- [ ] Return value includes relevant context

### Error Returns

- [ ] Errors return descriptive messages (not empty strings)
- [ ] Error messages indicate what went wrong
- [ ] Error messages suggest remediation when possible
- [ ] Error returns distinguishable from success returns
- [ ] Error format is consistent

### Success Returns

- [ ] Success returns include requested data
- [ ] Success returns are concise but complete
- [ ] Success returns formatted for LLM understanding
- [ ] Success returns include units/labels when needed
- [ ] Success returns indicate completion clearly

---

## 7. Security (30 items)

### Input Validation

- [ ] All inputs validated with Zod schemas
- [ ] No direct use of unvalidated input
- [ ] Input length limits enforced
- [ ] Input character restrictions enforced (when needed)
- [ ] Input sanitized for special characters
- [ ] No eval() or similar dynamic code execution
- [ ] No deserialization of untrusted data without validation

### Shell Command Security

- [ ] Shell arguments properly escaped
- [ ] No shell injection vulnerabilities
- [ ] Command whitelist used (when appropriate)
- [ ] User input never directly concatenated into commands
- [ ] Shell commands run with minimal privileges
- [ ] Shell command output sanitized before returning

### SQL Injection Prevention

- [ ] Parameterized queries used (no string concatenation)
- [ ] ORM used correctly if applicable
- [ ] SQL keywords in user input escaped/validated
- [ ] Database queries logged for audit
- [ ] Query complexity limited (prevent DoS)

### File System Security

- [ ] Path traversal prevented (no `../` attacks)
- [ ] File access restricted to allowed directories
- [ ] Symlink attacks prevented
- [ ] File permissions checked before operations
- [ ] No world-writable files created
- [ ] Temporary files created securely

### Data Exposure

- [ ] No API keys in return values
- [ ] No passwords in return values
- [ ] No tokens in return values
- [ ] No sensitive file contents exposed
- [ ] No internal system details exposed
- [ ] Logs don't contain sensitive data
- [ ] Error messages don't reveal sensitive info

---

## 8. Performance (25 items)

### Execution Speed

- [ ] Tool execution completes in reasonable time (< 5s ideal)
- [ ] Long-running operations show progress or use async patterns
- [ ] Timeout handling implemented for external calls
- [ ] No infinite loops possible
- [ ] No recursive calls without base case

### Resource Usage

- [ ] Memory usage reasonable (< 100MB ideal)
- [ ] No memory leaks
- [ ] Large data sets handled efficiently (streaming, pagination)
- [ ] File handles released promptly
- [ ] Database connections pooled/reused when appropriate
- [ ] Network connections closed properly

### Caching

- [ ] Cacheable results cached (when appropriate)
- [ ] Cache invalidation handled correctly
- [ ] Cache size limited
- [ ] Cache doesn't grow unbounded
- [ ] Stale cache entries removed

### Optimization

- [ ] No unnecessary computations
- [ ] Expensive operations minimized
- [ ] Parallel operations used when possible
- [ ] Database queries optimized (indexes, joins)
- [ ] API calls batched when possible
- [ ] Results reused (avoid redundant work)

### Scalability

- [ ] Tool scales with input size
- [ ] No hardcoded limits too low
- [ ] Handles edge cases (empty input, huge input)
- [ ] Graceful degradation under load
- [ ] Resource cleanup on failure

---

## 9. TypeScript Quality (30 items)

### Type Safety

- [ ] TypeScript compiles without errors
- [ ] No `any` types used
- [ ] Proper type annotations on functions
- [ ] Proper type annotations on variables
- [ ] Type inference used appropriately
- [ ] Generic types used when appropriate
- [ ] Union types used correctly
- [ ] Intersection types used correctly

### Type Definitions

- [ ] Custom types defined when needed
- [ ] Interface vs type used appropriately
- [ ] Types exported when needed by other modules
- [ ] Types imported from correct sources
- [ ] No circular type dependencies

### Null Safety

- [ ] Null/undefined handled explicitly
- [ ] Optional chaining used (`?.`)
- [ ] Nullish coalescing used (`??`)
- [ ] No null pointer exceptions possible
- [ ] Null checks before access

### Enum Usage

- [ ] Enums used for fixed sets of values
- [ ] String enums preferred over numeric
- [ ] Enum values are descriptive
- [ ] Const enums used when appropriate

### Function Signatures

- [ ] Parameter types explicit
- [ ] Return types explicit
- [ ] Optional parameters marked with `?`
- [ ] Default parameters typed correctly
- [ ] Rest parameters typed correctly
- [ ] Overloads used when appropriate

### Code Quality

- [ ] No unused variables
- [ ] No unused imports
- [ ] No unreachable code
- [ ] No commented-out code (remove or document)
- [ ] Consistent code style (formatting)

---

## 10. Testing (35 items)

### Unit Test Presence

- [ ] Unit test file exists (`tool-name.test.ts`)
- [ ] Test file co-located with tool file
- [ ] Tests import tool correctly
- [ ] Tests use Bun test framework

### Test Coverage

- [ ] Happy path tested
- [ ] Error cases tested
- [ ] Edge cases tested (empty input, max input, etc.)
- [ ] Boundary conditions tested
- [ ] All code paths tested (branches, loops)
- [ ] Invalid arguments tested (Zod validation)
- [ ] Optional arguments tested (present and absent)

### Test Quality

- [ ] Tests are independent (no shared state)
- [ ] Tests use descriptive names
- [ ] Tests follow AAA pattern (Arrange, Act, Assert)
- [ ] Tests use appropriate assertions
- [ ] Tests don't test implementation details
- [ ] Tests are maintainable
- [ ] Tests run quickly (< 1s per test)

### Mock Context

- [ ] Mock context provided for tests
- [ ] Mock context has all required fields
- [ ] Mock context realistic (not just empty objects)
- [ ] Abort signal tested with mock AbortController

### Integration Tests

- [ ] Tool tested in actual OpenCode session (manual)
- [ ] Tool behavior verified with LLM invocation
- [ ] Edge cases tested in real environment
- [ ] Performance tested with realistic data
- [ ] Error handling tested in real environment

### Test Commands

- [ ] Can run: `bun test tool-name.test.ts`
- [ ] Can run: `bun test tool/*.test.ts` (all tools)
- [ ] Tests pass consistently
- [ ] No flaky tests (random failures)
- [ ] Test output is clear

### Continuous Testing

- [ ] Tests run in CI/CD (if applicable)
- [ ] Tests run before deployment
- [ ] Test failures block deployment
- [ ] Test coverage tracked
- [ ] Regression tests added for bugs

---

## 11. Documentation (25 items)

### Inline Documentation

- [ ] Tool purpose explained in description field
- [ ] Complex logic has comments
- [ ] Comments explain WHY, not WHAT
- [ ] No outdated comments
- [ ] No commented-out code without explanation
- [ ] Magic numbers explained
- [ ] Algorithms documented (if non-obvious)

### Parameter Documentation

- [ ] All parameters have `.describe()` calls
- [ ] Descriptions explain parameter purpose
- [ ] Descriptions indicate expected format
- [ ] Descriptions mention constraints (min, max, etc.)
- [ ] Descriptions explain units (seconds, meters, etc.)
- [ ] Optional parameters marked as optional

### Usage Examples

- [ ] Examples provided for common use cases (if complex)
- [ ] Examples show actual invocations
- [ ] Examples show expected outputs
- [ ] Examples cover edge cases

### External Documentation

- [ ] Tool listed in project README (if applicable)
- [ ] Tool documented in knowledge base (if applicable)
- [ ] Related commands/agents reference tool
- [ ] API documentation generated (if part of package)

### Change Documentation

- [ ] Version number updated when tool changes
- [ ] Changelog maintained (if applicable)
- [ ] Breaking changes documented
- [ ] Migration guide provided (if breaking changes)
- [ ] Dependencies documented

---

## 12. Integration (20 items)

### OpenCode Integration

- [ ] Tool loads correctly in OpenCode
- [ ] Tool name appears in available tools
- [ ] Tool description shows in tool list
- [ ] Tool can be invoked by LLM
- [ ] Tool returns results to LLM correctly

### Command Integration

- [ ] Commands can reference/use tool
- [ ] Tool complements existing commands
- [ ] No tool/command naming conflicts
- [ ] Tool doesn't duplicate command functionality

### Agent Integration

- [ ] Agents can access tool (permissions)
- [ ] Tool appropriate for agent use cases
- [ ] Tool doesn't require agent-unavailable resources
- [ ] Tool integrates with agent workflows

### Project Integration

- [ ] Tool works in project context
- [ ] Tool uses project-specific configurations
- [ ] Tool accesses project resources correctly
- [ ] Tool respects project conventions

### External Integration

- [ ] Tool integrates with external systems correctly
- [ ] API keys/credentials handled securely
- [ ] External dependencies documented
- [ ] External service availability handled
- [ ] Fallback behavior if external service down

---

## 13. Maintenance (15 items)

### Code Maintainability

- [ ] Code is readable
- [ ] Code follows project style guide
- [ ] Consistent naming conventions
- [ ] DRY principle followed (Don't Repeat Yourself)
- [ ] Functions are reasonably sized
- [ ] Complexity is manageable

### Dependency Management

- [ ] Dependencies are up-to-date
- [ ] No unnecessary dependencies
- [ ] Dependency versions pinned (if critical)
- [ ] Dependencies are well-maintained
- [ ] Security vulnerabilities checked

### Version Control

- [ ] Tool in version control
- [ ] Meaningful commit messages
- [ ] Changes reviewed (if team project)
- [ ] No sensitive data committed

### Monitoring

- [ ] Tool errors logged appropriately
- [ ] Tool usage tracked (if applicable)
- [ ] Performance monitored (if critical)

---

## 14. Best Practices (20 items)

### Tool Design Principles

- [ ] Single Responsibility Principle followed
- [ ] Tool does one thing well
- [ ] Tool name describes its purpose
- [ ] Tool interface is intuitive
- [ ] Tool is composable (works well with others)

### Code Quality

- [ ] No code smells
- [ ] No anti-patterns
- [ ] SOLID principles followed
- [ ] Separation of concerns maintained
- [ ] Business logic separated from I/O

### Error Handling Philosophy

- [ ] Fail fast for programming errors
- [ ] Fail gracefully for user errors
- [ ] Errors provide actionable feedback
- [ ] Errors logged at appropriate level
- [ ] Critical errors escalated

### Security Mindset

- [ ] Principle of least privilege applied
- [ ] Defense in depth strategy used
- [ ] Security reviewed regularly
- [ ] Threat model considered
- [ ] No security through obscurity

### Performance Philosophy

- [ ] Premature optimization avoided
- [ ] Performance measured before optimizing
- [ ] Optimizations documented
- [ ] Trade-offs understood (speed vs readability)
- [ ] Performance regression tests added

---

## Summary Statistics

**Total Validation Items**: 380+

**Critical Items** (must pass):

- TypeScript compilation (no errors)
- Zod schema validation (all args)
- Security checks (no vulnerabilities)
- Basic functionality (tool executes)

**Recommended Items** (should pass):

- Test coverage (80%+)
- Documentation completeness
- Performance benchmarks
- Code quality metrics

## Usage

### For New Tools

1. Create tool following template
2. Run through checklist sections 1-7 (core quality)
3. Write tests and validate section 10
4. Review security (section 7)
5. Document (section 11)
6. Test integration (section 12)

### For Existing Tools

1. Run TypeScript compilation (section 9)
2. Review security (section 7) - **CRITICAL**
3. Check for test coverage (section 10)
4. Review performance (section 8)
5. Update documentation (section 11)

### For Code Review

Focus on:

- Security (section 7) - 30 items
- Error Handling (section 5) - 8 items
- Input Validation (section 3) - 40 items
- Return Values (section 6) - 20 items

## References

- **Task**: `.opencode/task/opencode-tool.md`
- **Template**: `.opencode/template/opencode-tool-tmpl.yaml`
- **Official Docs**: <https://opencode.ai/docs/custom-tools/>
- **Zod**: <https://zod.dev>
- **Bun Test**: <https://bun.sh/docs/cli/test>
