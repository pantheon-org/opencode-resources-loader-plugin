---
title: OpenCode Tool Performance Guidelines
description: Comprehensive performance guidelines for OpenCode custom tools including timeouts, async patterns, and optimization strategies
type: knowledge-base
category: Development
version: 1.0.0
tags:
  - tool
  - performance
  - async
  - optimization
  - timeout
  - best-practices
last_updated: 2025-11-21
---

# OpenCode Tool Performance Guidelines

Comprehensive guide to building high-performance OpenCode custom tools with optimal execution time, resource usage, and async patterns.

## Overview

Performance matters in custom tools because:

- Tools run during LLM conversations (user is waiting)
- Poor performance breaks conversation flow
- Resource leaks affect system stability
- Timeouts cause frustrating failures

**Performance Goals:**

- **Fast**: < 5 seconds for typical operations
- **Reliable**: Consistent execution time
- **Efficient**: Minimal resource usage
- **Responsive**: Supports cancellation

---

## Execution Time Guidelines

### Response Time Targets

| Operation Type     | Target  | Acceptable | Needs Optimization |
| ------------------ | ------- | ---------- | ------------------ |
| Simple computation | < 100ms | < 500ms    | > 1s               |
| Database query     | < 500ms | < 2s       | > 5s               |
| File operation     | < 200ms | < 1s       | > 3s               |
| API call           | < 1s    | < 5s       | > 10s              |
| Shell command      | < 500ms | < 3s       | > 10s              |
| Complex analysis   | < 5s    | < 15s      | > 30s              |

### Measuring Performance

**Pattern: Add timing to tools**

```typescript
export default tool({
  description: 'Process data with timing',
  args: {
    data: tool.schema.string().describe('Data to process'),
  },
  async execute(args) {
    const startTime = Date.now();

    try {
      const result = await processData(args.data);
      const duration = Date.now() - startTime;

      return `${result}\n\n(Completed in ${duration}ms)`;
    } catch (error) {
      const duration = Date.now() - startTime;
      return `Error after ${duration}ms: ${error.message}`;
    }
  },
});
```

**Why**: Timing helps identify slow operations and track performance over time.

---

## Timeout Patterns

### 1. Default Timeouts ✅

**Pattern**: Set reasonable timeouts for all external operations.

```typescript
export default tool({
  description: 'Fetch API with timeout',
  args: {
    url: tool.schema.string().url().describe('API endpoint'),
    timeout: tool.schema.number().min(100).max(30000).default(10000),
  },
  async execute(args) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), args.timeout);

    try {
      const response = await fetch(args.url, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return await response.text();
    } catch (error) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        return `Request timed out after ${args.timeout}ms`;
      }
      return `Error: ${error.message}`;
    }
  },
});
```

**Recommended Timeouts:**

- Database queries: 5-10 seconds
- API calls: 10-15 seconds
- File operations: 3-5 seconds
- Shell commands: 10-30 seconds

---

### 2. Progressive Timeouts ✅

**Pattern**: Increase timeout for complex operations.

```typescript
export default tool({
  description: 'Process with adaptive timeout',
  args: {
    items: tool.schema.array(tool.schema.string()),
  },
  async execute(args) {
    // Base timeout: 1s per item, minimum 5s, maximum 60s
    const timeout = Math.min(Math.max(args.items.length * 1000, 5000), 60000);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const results = await processItems(args.items, controller.signal);
      clearTimeout(timeoutId);
      return JSON.stringify(results);
    } catch (error) {
      clearTimeout(timeoutId);
      return error.name === 'AbortError'
        ? `Processing timed out after ${timeout}ms`
        : `Error: ${error.message}`;
    }
  },
});
```

---

### 3. Timeout with Partial Results ✅

**Pattern**: Return partial results on timeout.

```typescript
export default tool({
  description: 'Process with partial results',
  args: {
    items: tool.schema.array(tool.schema.string()),
  },
  async execute(args, context) {
    const results = [];
    const startTime = Date.now();
    const timeout = 30000; // 30 seconds

    for (const item of args.items) {
      // Check timeout
      if (Date.now() - startTime > timeout) {
        return `Timeout: Processed ${results.length}/${args.items.length} items\n${JSON.stringify(results)}`;
      }

      // Check abort signal
      if (context.abort?.aborted) {
        return `Cancelled: Processed ${results.length}/${args.items.length} items\n${JSON.stringify(results)}`;
      }

      results.push(await processItem(item));
    }

    return JSON.stringify(results);
  },
});
```

---

## Async/Await Patterns

### 4. Proper Async Usage ✅

**Good: Sequential when order matters**

```typescript
async execute(args) {
  const user = await fetchUser(args.userId)      // Wait
  const orders = await fetchOrders(user.id)      // Wait (needs user.id)
  const details = await enrichOrders(orders)     // Wait (needs orders)
  return JSON.stringify(details)
}
```

**Good: Parallel when independent**

```typescript
async execute(args) {
  // All can happen simultaneously
  const [user, settings, preferences] = await Promise.all([
    fetchUser(args.userId),
    fetchSettings(args.userId),
    fetchPreferences(args.userId),
  ])

  return JSON.stringify({ user, settings, preferences })
}
```

**Anti-Pattern** ❌:

```typescript
async execute(args) {
  // Unnecessarily sequential
  const user = await fetchUser(args.userId)
  const settings = await fetchSettings(args.userId)      // Could be parallel
  const preferences = await fetchPreferences(args.userId) // Could be parallel
  return JSON.stringify({ user, settings, preferences })
}
```

---

### 5. Promise.all for Parallel Operations ✅

**Pattern**: Use Promise.all for independent async operations.

```typescript
export default tool({
  description: 'Check multiple services',
  args: {
    services: tool.schema.array(tool.schema.string()),
  },
  async execute(args) {
    const checks = args.services.map(async (service) => {
      try {
        const response = await fetch(`http://${service}/health`);
        return { service, status: response.ok ? 'healthy' : 'unhealthy' };
      } catch (error) {
        return { service, status: 'unreachable', error: error.message };
      }
    });

    const results = await Promise.all(checks);
    return JSON.stringify(results, null, 2);
  },
});
```

**Performance Gain**: 10 services checked in ~1 second instead of ~10 seconds.

---

### 6. Promise.allSettled for Fault Tolerance ✅

**Pattern**: Continue even if some operations fail.

```typescript
export default tool({
  description: 'Fetch from multiple sources',
  args: {
    urls: tool.schema.array(tool.schema.string().url()),
  },
  async execute(args) {
    const fetches = args.urls.map(async (url) => {
      const response = await fetch(url, { timeout: 5000 });
      return { url, data: await response.json() };
    });

    const results = await Promise.allSettled(fetches);

    const successful = results.filter((r) => r.status === 'fulfilled').map((r) => r.value);

    const failed = results
      .filter((r) => r.status === 'rejected')
      .map((r, i) => ({ url: args.urls[i], error: r.reason.message }));

    return JSON.stringify(
      {
        successful: successful.length,
        failed: failed.length,
        data: successful,
        errors: failed,
      },
      null,
      2,
    );
  },
});
```

**Why**: One failure doesn't block other operations. Partial success is valuable.

---

### 7. Async Iteration Pattern ✅

**Pattern**: Process large datasets without loading all into memory.

```typescript
export default tool({
  description: 'Process large dataset',
  args: {
    batchSize: tool.schema.number().min(1).max(1000).default(100),
  },
  async execute(args, context) {
    const results = [];
    let processed = 0;

    for await (const batch of fetchDataInBatches(args.batchSize)) {
      if (context.abort?.aborted) {
        return `Cancelled after processing ${processed} items`;
      }

      const batchResults = await processBatch(batch);
      results.push(...batchResults);
      processed += batch.length;
    }

    return JSON.stringify({ processed, results });
  },
});
```

**Why**: Memory-efficient for large datasets. Supports cancellation.

---

## Resource Management

### 8. Connection Pooling ✅

**Pattern**: Reuse connections instead of creating new ones.

```typescript
// Shared connection pool
const dbPool = new ConnectionPool({
  max: 10,
  min: 2,
  idleTimeoutMillis: 30000,
});

export default tool({
  description: 'Query with connection pooling',
  args: {
    query: tool.schema.string().describe('SQL query'),
  },
  async execute(args) {
    const connection = await dbPool.acquire();

    try {
      const results = await connection.query(args.query);
      return JSON.stringify(results);
    } finally {
      await dbPool.release(connection);
    }
  },
});
```

**Performance Gain**: Eliminates connection setup overhead (~100-500ms per query).

---

### 9. Resource Cleanup Pattern ✅

**Pattern**: Always clean up resources, even on error.

```typescript
export default tool({
  description: 'Process file with cleanup',
  args: {
    path: tool.schema.string().describe('File path'),
  },
  async execute(args) {
    const file = Bun.file(args.path);
    let tempFile: string | null = null;

    try {
      // Create temporary file
      tempFile = `/tmp/processing-${Date.now()}.tmp`;
      await Bun.write(tempFile, await file.text());

      // Process
      const result = await processFile(tempFile);

      return result;
    } finally {
      // Always cleanup
      if (tempFile) {
        try {
          await Bun.$`rm ${tempFile}`.quiet();
        } catch {
          // Ignore cleanup errors
        }
      }
    }
  },
});
```

---

## Caching Strategies

### 10. Time-Based Caching ✅

**Pattern**: Cache results with TTL (time-to-live).

```typescript
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<any>>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCached<T>(key: string, ttl = CACHE_TTL): T | null {
  const entry = cache.get(key);
  if (!entry) return null;

  if (Date.now() - entry.timestamp > ttl) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

export default tool({
  description: 'Fetch with caching',
  args: {
    url: tool.schema.string().url(),
  },
  async execute(args) {
    const cacheKey = `fetch:${args.url}`;

    // Check cache
    const cached = getCached<string>(cacheKey);
    if (cached) {
      return `${cached}\n\n(cached)`;
    }

    // Fetch
    const response = await fetch(args.url);
    const data = await response.text();

    // Cache
    setCache(cacheKey, data);

    return data;
  },
});
```

---

### 11. LRU Cache Pattern ✅

**Pattern**: Limit cache size with Least Recently Used eviction.

```typescript
class LRUCache<K, V> {
  private cache: Map<K, V>;
  private maxSize: number;

  constructor(maxSize: number) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }

  get(key: K): V | undefined {
    const value = this.cache.get(key);
    if (value !== undefined) {
      // Move to end (most recently used)
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }

  set(key: K, value: V): void {
    // Remove if exists
    this.cache.delete(key);

    // Add to end
    this.cache.set(key, value);

    // Evict oldest if over limit
    if (this.cache.size > this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
  }
}

const queryCache = new LRUCache<string, any>(100);

export default tool({
  description: 'Database query with LRU cache',
  args: {
    query: tool.schema.string(),
  },
  async execute(args) {
    const cached = queryCache.get(args.query);
    if (cached) {
      return `${JSON.stringify(cached)}\n(cached)`;
    }

    const results = await db.query(args.query);
    queryCache.set(args.query, results);

    return JSON.stringify(results);
  },
});
```

---

## Optimization Patterns

### 12. Lazy Loading ✅

**Pattern**: Load data only when needed.

```typescript
export default tool({
  description: 'Get user with optional details',
  args: {
    userId: tool.schema.number(),
    includeOrders: tool.schema.boolean().default(false),
    includeActivity: tool.schema.boolean().default(false),
  },
  async execute(args) {
    // Always load user
    const user = await fetchUser(args.userId);

    const result: any = { user };

    // Conditionally load expensive data
    if (args.includeOrders) {
      result.orders = await fetchOrders(args.userId);
    }

    if (args.includeActivity) {
      result.activity = await fetchActivity(args.userId);
    }

    return JSON.stringify(result, null, 2);
  },
});
```

**Performance Gain**: Only fetch what's needed. Saves time and bandwidth.

---

### 13. Pagination Pattern ✅

**Pattern**: Return data in manageable chunks.

```typescript
export default tool({
  description: 'List items with pagination',
  args: {
    page: tool.schema.number().min(1).default(1),
    pageSize: tool.schema.number().min(1).max(100).default(20),
  },
  async execute(args) {
    const offset = (args.page - 1) * args.pageSize;

    const [items, total] = await Promise.all([
      db.query('SELECT * FROM items LIMIT ? OFFSET ?', [args.pageSize, offset]),
      db.query('SELECT COUNT(*) as count FROM items'),
    ]);

    return JSON.stringify(
      {
        items,
        pagination: {
          page: args.page,
          pageSize: args.pageSize,
          total: total[0].count,
          pages: Math.ceil(total[0].count / args.pageSize),
        },
      },
      null,
      2,
    );
  },
});
```

---

### 14. Debouncing Pattern ✅

**Pattern**: Prevent rapid repeated operations.

```typescript
const debounceTimers = new Map<string, NodeJS.Timeout>();

function debounce(key: string, fn: () => Promise<any>, delay: number): Promise<any> {
  return new Promise((resolve) => {
    const existing = debounceTimers.get(key);
    if (existing) {
      clearTimeout(existing);
    }

    const timer = setTimeout(async () => {
      debounceTimers.delete(key);
      resolve(await fn());
    }, delay);

    debounceTimers.set(key, timer);
  });
}

export default tool({
  description: 'Save with debounce',
  args: {
    data: tool.schema.string(),
  },
  async execute(args) {
    return await debounce(
      'save',
      async () => {
        await writeFile('data.json', args.data);
        return 'Saved successfully';
      },
      1000,
    );
  },
});
```

---

## Abort Signal Integration

### 15. Abort Signal Pattern ✅

**Pattern**: Support cancellation in long-running operations.

```typescript
export default tool({
  description: 'Long operation with cancellation',
  args: {
    items: tool.schema.array(tool.schema.string()),
  },
  async execute(args, context) {
    const results = [];

    for (const item of args.items) {
      // Check for cancellation
      if (context.abort?.aborted) {
        return `Cancelled: Processed ${results.length}/${args.items.length} items`;
      }

      // Process item
      const result = await processItem(item);
      results.push(result);

      // Optional: Progress reporting
      if (results.length % 10 === 0) {
        console.log(`Progress: ${results.length}/${args.items.length}`);
      }
    }

    return JSON.stringify(results);
  },
});
```

---

### 16. Propagate Abort to Child Operations ✅

**Pattern**: Pass abort signal to nested operations.

```typescript
async function fetchWithAbort(url: string, signal?: AbortSignal): Promise<string> {
  const response = await fetch(url, { signal });
  return await response.text();
}

export default tool({
  description: 'Fetch multiple with abort',
  args: {
    urls: tool.schema.array(tool.schema.string().url()),
  },
  async execute(args, context) {
    const results = [];

    for (const url of args.urls) {
      try {
        const data = await fetchWithAbort(url, context.abort);
        results.push({ url, data });
      } catch (error) {
        if (error.name === 'AbortError') {
          return `Cancelled after ${results.length} fetches`;
        }
        results.push({ url, error: error.message });
      }
    }

    return JSON.stringify(results);
  },
});
```

---

## Performance Anti-Patterns

### ❌ Anti-Pattern 1: No Timeouts

```typescript
// BAD: Can hang forever
async execute(args) {
  const response = await fetch(args.url) // No timeout
  return await response.text()
}
```

**Fix**: Always set timeouts for external operations.

---

### ❌ Anti-Pattern 2: Sequential When Parallel Possible

```typescript
// BAD: 3 seconds when could be 1 second
async execute(args) {
  const a = await fetchA() // 1s
  const b = await fetchB() // 1s
  const c = await fetchC() // 1s
  return { a, b, c }
}
```

**Fix**: Use `Promise.all([fetchA(), fetchB(), fetchC()])`.

---

### ❌ Anti-Pattern 3: Loading All Data

```typescript
// BAD: Loads entire table into memory
async execute(args) {
  const allRecords = await db.query('SELECT * FROM users')
  return JSON.stringify(allRecords)
}
```

**Fix**: Use pagination or filtering.

---

### ❌ Anti-Pattern 4: No Caching

```typescript
// BAD: Re-fetches same data repeatedly
async execute(args) {
  const config = await fetchConfig() // Fetched every time
  return processWithConfig(args.data, config)
}
```

**Fix**: Cache stable data with appropriate TTL.

---

### ❌ Anti-Pattern 5: No Resource Cleanup

```typescript
// BAD: Connection never closed
async execute(args) {
  const db = new Database('db.sqlite')
  return await db.query(args.query)
  // db never closed!
}
```

**Fix**: Use try/finally or connection pooling.

---

## Performance Monitoring

### 17. Built-in Performance Tracking ✅

```typescript
export default tool({
  description: 'Tool with performance metrics',
  args: {
    data: tool.schema.string(),
  },
  async execute(args) {
    const metrics = {
      startTime: Date.now(),
      memoryStart: process.memoryUsage().heapUsed,
    };

    try {
      const result = await processData(args.data);

      metrics.duration = Date.now() - metrics.startTime;
      metrics.memoryEnd = process.memoryUsage().heapUsed;
      metrics.memoryDelta = metrics.memoryEnd - metrics.memoryStart;

      return `${result}\n\nMetrics:\n${JSON.stringify(metrics, null, 2)}`;
    } catch (error) {
      metrics.duration = Date.now() - metrics.startTime;
      return `Error after ${metrics.duration}ms: ${error.message}`;
    }
  },
});
```

---

## Performance Testing

### Load Testing Pattern

```typescript
// tool/performance-test.ts
import { tool } from '@opencode-ai/plugin';
import myTool from './my-tool';

export default tool({
  description: 'Performance test for my-tool',
  args: {
    iterations: tool.schema.number().min(1).max(1000).default(100),
  },
  async execute(args) {
    const times: number[] = [];

    for (let i = 0; i < args.iterations; i++) {
      const start = Date.now();
      await myTool.execute({ test: 'data' }, mockContext);
      times.push(Date.now() - start);
    }

    const avg = times.reduce((a, b) => a + b) / times.length;
    const min = Math.min(...times);
    const max = Math.max(...times);

    return `Performance Test (${args.iterations} iterations):
Average: ${avg.toFixed(2)}ms
Min: ${min}ms
Max: ${max}ms`;
  },
});
```

---

## Summary: Performance Checklist

**Essential:**

- ✅ Set timeouts on all external operations
- ✅ Use async/await correctly
- ✅ Parallelize independent operations
- ✅ Support abort signals
- ✅ Clean up resources

**Recommended:**

- ✅ Cache stable data
- ✅ Use pagination for large datasets
- ✅ Monitor execution time
- ✅ Lazy load optional data
- ✅ Pool connections

**Advanced:**

- ✅ Implement LRU caching
- ✅ Use debouncing for repeated operations
- ✅ Stream large responses
- ✅ Implement progressive timeouts
- ✅ Add performance metrics

## Related Resources

- **Task**: `.opencode/task/opencode-tool.md`
- **Template**: `.opencode/template/opencode-tool-tmpl.yaml`
- **Patterns**: `.opencode/knowledge-base/tool-patterns-best-practices.md`
- **Checklist**: `.opencode/checklist/opencode-tool.md`
- **Bun Docs**: <https://bun.sh/docs>
