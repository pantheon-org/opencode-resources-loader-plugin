# Migration Guide

## Migrating from Other Resource Loading Approaches

### From Manual Tool Creation

**Before** (manual tool in plugin):

```typescript
tool({
  description: 'API Documentation Checklist',
  execute: async () => {
    // Load and return content
  },
});
```

**After** (resource file):

```markdown
## <!-- .opencode/checklist/api-documentation.md -->

description: API Documentation Checklist
type: checklist

---

# API Documentation Checklist

Content here...
```

### From Project Documentation Plugin

The Resources Loader Plugin complements the Project Documentation plugin:

- **Project Documentation**: Dynamic loading with parameters
- **Resources Loader**: Direct tool access to known resources

Both can coexist and serve different use cases.

### From Custom Skills

**Before** (custom skill):

```markdown
<!-- skill-api-docs.md -->

# API Documentation

Content...
```

**After** (resource):

```markdown
## <!-- .opencode/knowledge-base/api-docs.md -->

description: API Documentation reference
type: knowledge-base
tags: [api, documentation]

---

# API Documentation

Content...
```

## Adding Frontmatter to Existing Resources

Use the migration script:

```bash
# Dry run
bun run scripts/migrate-frontmatter.ts --dry-run

# Migrate all
bun run scripts/migrate-frontmatter.ts

# Specific type
bun run scripts/migrate-frontmatter.ts --type=checklist
```

Or manually add:

```yaml
---
description: Your resource description
type: checklist
category: Documentation
tags: [relevant, tags]
---
```

## Conversion Checklist

- [ ] Move files to appropriate type directories
- [ ] Add frontmatter with required fields
- [ ] Update tool names in documentation
- [ ] Test discovery with `resource_list`
- [ ] Verify search with `resource_search`
- [ ] Update any automation/scripts
- [ ] Remove old custom tools (if applicable)
- [ ] Restart OpenCode

## Priority Handling

Resources discovered from:

1. `.opencode/` (highest - project-local)
2. `~/.config/opencode/` (medium - global config)
3. `~/.opencode/` (lowest - global home)

Place project-specific resources in `.opencode/` for priority.

## References

- [Frontmatter Schema](./frontmatter-schema.md)
- [Best Practices](./best-practices.md)
- [API Documentation](../pages/src/content/docs/api.md)
