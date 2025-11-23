---
title: OpenCode Tool Patterns and Best Practices
description: Comprehensive guide to common patterns, anti-patterns, and best practices for creating OpenCode custom tools
type: knowledge-base
category: Development
version: 1.0.0
tags:
  - tool
  - patterns
  - best-practices
  - typescript
  - zod
  - examples
last_updated: 2025-11-21
---

# OpenCode Tool Patterns and Best Practices

Comprehensive guide to building high-quality OpenCode custom tools with proven patterns and avoiding common pitfalls.

## Overview

This knowledge base provides battle-tested patterns for building tools that are:

- Reliable and maintainable
- Secure and performant
- Well-integrated with OpenCode
- Easy to test and debug

---

## Tool Design Patterns

### 1. Single Responsibility Pattern ✅

**Pattern**: Each tool should do one thing well.

**Good Example:**

```typescript
// tools/git-status.ts
export default tool({
  description: 'Get current git status',
  args: {},
  async execute() {
    const result = await Bun.$`git status --porcelain`;
    return result.text();
  },
});
```

**Anti-Pattern** ❌:

```typescript
// DON'T: Tool does too many unrelated things
export default tool({
  description: 'Git operations and package management',
  args: {
    operation: tool.schema.enum(['git-status', 'npm-install', 'yarn-add']),
  },
  async execute(args) {
    if (args.operation === 'git-status') {
      /* ... */
    }
    if (args.operation === 'npm-install') {
      /* ... */
    }
    if (args.operation === 'yarn-add') {
      /* ... */
    }
  },
});
```

**Why**: Single-purpose tools are easier to understand, test, and maintain. Split into multiple tools instead.

---

### 2. Named Exports for Related Operations ✅

**Pattern**: Use named exports when tools are closely related.

**Good Example:**

```typescript
// tools/math.ts
export const add = tool({
  description: 'Add two numbers',
  args: {
    a: tool.schema.number().describe('First number'),
    b: tool.schema.number().describe('Second number'),
  },
  async execute(args) {
    return args.a + args.b;
  },
});

export const multiply = tool({
  description: 'Multiply two numbers',
  args: {
    a: tool.schema.number().describe('First number'),
    b: tool.schema.number().describe('Second number'),
  },
  async execute(args) {
    return args.a * args.b;
  },
});

// Creates: math_add and math_multiply
```

**When to use**:

- Operations belong to same domain (math, string, date)
- Operations share similar argument patterns
- Tools would be confusing as separate files

**When NOT to use**:

- Operations are unrelated
- Individual tools would be clearer

---

### 3. Graceful Error Handling Pattern ✅

**Pattern**: Return error messages instead of throwing.

**Good Example:**

```typescript
export default tool({
  description: 'Query database',
  args: {
    query: tool.schema.string().describe('SQL query'),
  },
  async execute(args) {
    try {
      const db = new Database('project.db');
      const results = db.query(args.query).all();
      return JSON.stringify(results, null, 2);
    } catch (error) {
      return `Database error: ${error.message}\nPlease check your query syntax.`;
    }
  },
});
```

**Anti-Pattern** ❌:

```typescript
async execute(args) {
  const db = new Database('project.db')
  const results = db.query(args.query).all() // Throws, kills LLM context
  return JSON.stringify(results)
}
```

**Why**: Throwing errors breaks LLM conversation flow. Return error messages so LLM can understand and retry.

---

### 4. Progressive Validation Pattern ✅

**Pattern**: Validate early, validate often.

**Good Example:**

```typescript
export default tool({
  description: 'Process file',
  args: {
    path: tool.schema.string().min(1).describe('File path'),
  },
  async execute(args) {
    // Zod validates path is non-empty string

    // Additional runtime validation
    if (!args.path.startsWith('/')) {
      return 'Error: Path must be absolute';
    }

    const file = Bun.file(args.path);
    if (!(await file.exists())) {
      return `Error: File not found: ${args.path}`;
    }

    // Process file...
    return await file.text();
  },
});
```

**Why**: Catch errors early with clear messages. Zod handles type validation, runtime checks handle business logic.

---

## Argument Schema Patterns

### 5. Required vs Optional Arguments ✅

**Pattern**: Make arguments optional only when there's a sensible default.

**Good Example:**

```typescript
args: {
  url: tool.schema.string().url().describe("API endpoint"),
  method: tool.schema.enum(['GET', 'POST', 'PUT']).default('GET'),
  timeout: tool.schema.number().min(0).default(5000),
}
```

**Anti-Pattern** ❌:

```typescript
args: {
  url: tool.schema.string().optional(), // NO! URL is required
  method: tool.schema.string().optional(), // NO! No default behavior
}
```

**Why**: Required arguments prevent ambiguity. Optional arguments need clear defaults.

---

### 6. Enum for Constrained Values ✅

**Pattern**: Use enums when there's a fixed set of valid values.

**Good Example:**

```typescript
args: {
  logLevel: tool.schema.enum(['debug', 'info', 'warn', 'error']).describe("Log level"),
  format: tool.schema.enum(['json', 'text', 'table']).default('text'),
}
```

**Anti-Pattern** ❌:

```typescript
args: {
  logLevel: tool.schema.string(), // Allows invalid values like "foo"
}
```

**Why**: Enums provide type safety and clear documentation of valid values.

---

### 7. Rich Descriptions Pattern ✅

**Pattern**: Descriptions should guide the LLM on how to use the argument.

**Good Example:**

```typescript
args: {
  query: tool.schema.string()
    .min(1)
    .describe("SQL SELECT query to execute. Example: 'SELECT * FROM users LIMIT 10'"),

  timeout: tool.schema.number()
    .min(100)
    .max(30000)
    .default(5000)
    .describe("Query timeout in milliseconds (100-30000, default: 5000)"),
}
```

**Anti-Pattern** ❌:

```typescript
args: {
  query: tool.schema.string().describe("Query"), // Too vague
  timeout: tool.schema.number().describe("Timeout"), // Missing units and range
}
```

**Why**: LLMs need context to choose correct values. Include examples, ranges, units, and constraints.

---

## Shell Integration Patterns

### 8. Safe Command Execution ✅

**Pattern**: Sanitize inputs and handle errors.

**Good Example:**

```typescript
export default tool({
  description: 'Search files by pattern',
  args: {
    pattern: tool.schema.string().describe('Search pattern'),
  },
  async execute(args) {
    try {
      // Escape special characters
      const safePattern = args.pattern.replace(/[;&|`$]/g, '\\$&');

      const result = await Bun.$`grep -r ${safePattern} .`.throws(false);

      if (result.exitCode !== 0) {
        return `No matches found for pattern: ${args.pattern}`;
      }

      return result.text();
    } catch (error) {
      return `Search error: ${error.message}`;
    }
  },
});
```

**Anti-Pattern** ❌:

```typescript
async execute(args) {
  // DANGEROUS: Direct command injection possible
  const result = await Bun.$`grep -r ${args.pattern} .`
  return result.text()
}
```

**Why**: User input in shell commands is a security vulnerability. Always sanitize.

---

### 9. Command Failure Handling ✅

**Pattern**: Use `.throws(false)` and check exit codes.

**Good Example:**

```typescript
const result = await Bun.$`git status`.throws(false);

if (result.exitCode !== 0) {
  return `Git error: ${result.stderr.toString()}\nIs this a git repository?`;
}

return result.stdout.toString();
```

**Anti-Pattern** ❌:

```typescript
const result = await Bun.$`git status`; // Throws on non-zero exit
return result.text();
```

**Why**: Commands fail. Throwing breaks LLM flow. Handle errors gracefully.

---

## Return Value Patterns

### 10. Structured Returns ✅

**Pattern**: Return JSON for complex data, formatted strings for simple data.

**Good Example:**

```typescript
// Complex data: Return JSON
async execute(args) {
  const results = await queryDatabase(args.query)
  return JSON.stringify(results, null, 2) // Pretty-printed
}

// Simple data: Return formatted string
async execute(args) {
  const status = await getGitStatus()
  return `Git Status:\n${status.files.join('\n')}`
}
```

**Anti-Pattern** ❌:

```typescript
// Hard to parse
return `status: ok, count: 5, items: item1,item2,item3`;

// Too verbose
return JSON.stringify(largeObjectWithMBOfData);
```

**Why**: LLMs parse JSON easily. Keep responses concise and structured.

---

### 11. Meaningful Success Messages ✅

**Pattern**: Return actual data, not just "success".

**Good Example:**

```typescript
async execute(args) {
  await writeFile(args.path, args.content)
  return `Successfully wrote ${args.content.length} bytes to ${args.path}`
}
```

**Anti-Pattern** ❌:

```typescript
async execute(args) {
  await writeFile(args.path, args.content)
  return "Success" // Useless
}
```

**Why**: LLMs need context about what happened. Provide useful information.

---

## Context Usage Patterns

### 12. Session Tracking Pattern ✅

**Pattern**: Use context for debugging and logging, not business logic.

**Good Example:**

```typescript
async execute(args, context) {
  console.log(`[${context.sessionID}] Processing request from ${context.agent}`)

  const result = await processData(args.data)

  return result
}
```

**Anti-Pattern** ❌:

```typescript
async execute(args, context) {
  // DON'T: Business logic shouldn't depend on session ID
  if (context.sessionID === 'special-session') {
    return specialBehavior()
  }
  return normalBehavior()
}
```

**Why**: Context is for observability, not business logic. Keep tools deterministic.

---

### 13. Abort Signal Pattern ✅

**Pattern**: Check abort signal in long-running operations.

**Good Example:**

```typescript
async execute(args, context) {
  const items = await fetchLargeDataset()
  const results = []

  for (const item of items) {
    if (context.abort?.aborted) {
      return `Processing cancelled. Completed ${results.length}/${items.length} items.`
    }

    results.push(await processItem(item))
  }

  return JSON.stringify(results)
}
```

**Why**: Long operations should be cancellable. Check `context.abort` periodically.

---

## External Integration Patterns

### 14. Python Integration Pattern ✅

**Pattern**: Create companion script, call via Bun.$.

**Python Script** (tool/scripts/process.py):

```python
import sys
import json

input_data = json.loads(sys.argv[1])
result = {"processed": input_data["value"] * 2}
print(json.dumps(result))
```

**Tool** (tool/python-processor.ts):

```typescript
export default tool({
  description: 'Process data using Python',
  args: {
    value: tool.schema.number().describe('Value to process'),
  },
  async execute(args) {
    try {
      const input = JSON.stringify({ value: args.value });
      const result = await Bun.$`python3 tool/scripts/process.py ${input}`.text();
      return result.trim();
    } catch (error) {
      return `Python error: ${error.message}\nIs Python 3 installed?`;
    }
  },
});
```

**Why**: Separates script from tool definition. Easy to test independently.

---

### 15. API Integration Pattern ✅

**Pattern**: Handle all HTTP states gracefully.

**Good Example:**

```typescript
export default tool({
  description: 'Fetch data from API',
  args: {
    endpoint: tool.schema.string().url().describe('API endpoint URL'),
  },
  async execute(args) {
    try {
      const response = await fetch(args.endpoint, {
        timeout: 10000,
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        return `API error: ${response.status} ${response.statusText}`;
      }

      const data = await response.json();
      return JSON.stringify(data, null, 2);
    } catch (error) {
      if (error.name === 'TimeoutError') {
        return 'API request timed out after 10 seconds';
      }
      return `Network error: ${error.message}`;
    }
  },
});
```

**Why**: APIs fail in many ways. Handle timeouts, errors, and non-200 responses.

---

### 16. Database Connection Pattern ✅

**Pattern**: Open connection, handle errors, close properly.

**Good Example:**

```typescript
async execute(args) {
  let db: Database | null = null

  try {
    db = new Database('project.db')
    const results = db.query(args.query).all()
    return JSON.stringify(results, null, 2)
  } catch (error) {
    return `Database error: ${error.message}`
  } finally {
    db?.close()
  }
}
```

**Anti-Pattern** ❌:

```typescript
async execute(args) {
  const db = new Database('project.db') // Never closed
  return JSON.stringify(db.query(args.query).all())
}
```

**Why**: Database connections are resources. Always close them.

---

## Performance Patterns

### 17. Lazy Loading Pattern ✅

**Pattern**: Load data only when needed.

**Good Example:**

```typescript
export default tool({
  description: 'Get user details',
  args: {
    userId: tool.schema.number().describe('User ID'),
    includeOrders: tool.schema.boolean().default(false),
  },
  async execute(args) {
    const user = await db.query('SELECT * FROM users WHERE id = ?', args.userId);

    if (!args.includeOrders) {
      return JSON.stringify(user);
    }

    // Only fetch orders if requested
    const orders = await db.query('SELECT * FROM orders WHERE user_id = ?', args.userId);
    return JSON.stringify({ ...user, orders });
  },
});
```

**Why**: Don't fetch data that won't be used. Let caller control detail level.

---

### 18. Caching Pattern ✅

**Pattern**: Cache expensive computations.

**Good Example:**

```typescript
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export default tool({
  description: 'Get project statistics (cached)',
  args: {},
  async execute() {
    const cacheKey = 'project-stats';
    const cached = cache.get(cacheKey);

    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return `${JSON.stringify(cached.data, null, 2)}\n(cached)`;
    }

    const stats = await computeExpensiveStats();
    cache.set(cacheKey, { data: stats, timestamp: Date.now() });

    return JSON.stringify(stats, null, 2);
  },
});
```

**Why**: Expensive operations should be cached. Include cache indicators in response.

---

## Testing Patterns

### 19. Mock Context Pattern ✅

**Pattern**: Create reusable mock context for tests.

**Good Example:**

```typescript
// test-utils.ts
export const createMockContext = (overrides = {}) => ({
  sessionID: 'test-session',
  messageID: 'test-message',
  agent: 'general',
  abort: undefined,
  ...overrides,
});

// my-tool.test.ts
import { createMockContext } from './test-utils';

it('should work', async () => {
  const result = await myTool.execute({ param: 'test' }, createMockContext());
  expect(result).toBeDefined();
});
```

**Why**: Consistent test contexts reduce boilerplate and errors.

---

### 20. Test Coverage Pattern ✅

**Pattern**: Test happy path, errors, and edge cases.

**Good Example:**

```typescript
describe('divide', () => {
  it('should divide positive numbers', async () => {
    const result = await divide.execute({ a: 10, b: 2 }, mockContext);
    expect(result).toBe('5');
  });

  it('should handle negative numbers', async () => {
    const result = await divide.execute({ a: -10, b: 2 }, mockContext);
    expect(result).toBe('-5');
  });

  it('should handle division by zero', async () => {
    const result = await divide.execute({ a: 10, b: 0 }, mockContext);
    expect(result).toContain('Error');
  });

  it('should validate arguments', async () => {
    await expect(divide.execute({ a: 'not a number', b: 2 }, mockContext)).rejects.toThrow();
  });
});
```

**Why**: Comprehensive tests catch bugs early. Cover all code paths.

---

## Anti-Patterns to Avoid

### ❌ Anti-Pattern 1: God Tools

**Bad:**

```typescript
export default tool({
  description: 'Do everything related to files and git',
  args: {
    action: tool.schema.enum(['read', 'write', 'delete', 'commit', 'push']),
    // ... many more args
  },
  async execute(args) {
    switch (
      args.action
      // Hundreds of lines...
    ) {
    }
  },
});
```

**Fix**: Split into multiple focused tools.

---

### ❌ Anti-Pattern 2: Silent Failures

**Bad:**

```typescript
async execute(args) {
  try {
    return await riskyOperation()
  } catch {
    return "" // Silent failure
  }
}
```

**Fix**: Return error messages explaining what went wrong.

---

### ❌ Anti-Pattern 3: Magical Defaults

**Bad:**

```typescript
args: {
  timeout: tool.schema.number().default(42), // Why 42?
  retries: tool.schema.number().default(7), // Why 7?
}
```

**Fix**: Use sensible, documented defaults.

---

### ❌ Anti-Pattern 4: Inconsistent Return Types

**Bad:**

```typescript
async execute(args) {
  if (args.format === 'json') {
    return { status: 'ok' } // Object
  }
  return 'ok' // String
}
```

**Fix**: Always return strings. Serialize objects to JSON.

---

### ❌ Anti-Pattern 5: Stateful Tools

**Bad:**

```typescript
let counter = 0; // Global state

export default tool({
  description: 'Count invocations',
  args: {},
  async execute() {
    counter++;
    return `Called ${counter} times`;
  },
});
```

**Fix**: Tools should be stateless. Use context or external storage.

---

## Tool Composition Patterns

### 21. Helper Function Pattern ✅

**Pattern**: Extract reusable logic to functions.

**Good Example:**

```typescript
// Shared helper
function formatOutput(data: any, format: 'json' | 'table'): string {
  if (format === 'json') {
    return JSON.stringify(data, null, 2);
  }
  // Table formatting logic...
}

export const listUsers = tool({
  description: 'List users',
  args: {
    format: tool.schema.enum(['json', 'table']).default('table'),
  },
  async execute(args) {
    const users = await db.query('SELECT * FROM users').all();
    return formatOutput(users, args.format);
  },
});

export const listOrders = tool({
  description: 'List orders',
  args: {
    format: tool.schema.enum(['json', 'table']).default('table'),
  },
  async execute(args) {
    const orders = await db.query('SELECT * FROM orders').all();
    return formatOutput(orders, args.format);
  },
});
```

**Why**: DRY principle. Shared logic in functions, not duplicated in tools.

---

## Summary: Tool Quality Checklist

**Essential Patterns:**

- ✅ Single responsibility
- ✅ Graceful error handling
- ✅ Progressive validation
- ✅ Rich descriptions
- ✅ Structured returns
- ✅ Safe shell execution
- ✅ Resource cleanup

**Avoid:**

- ❌ God tools (too many responsibilities)
- ❌ Silent failures
- ❌ Inconsistent return types
- ❌ Security vulnerabilities
- ❌ Stateful tools

## Related Resources

- **Task**: `.opencode/task/opencode-tool.md`
- **Template**: `.opencode/template/opencode-tool-tmpl.yaml`
- **Checklist**: `.opencode/checklist/opencode-tool.md`
- **Testing Template**: `.opencode/template/tool-test-tmpl.yaml`
- **Official Docs**: <https://opencode.ai/docs/custom-tools/>
