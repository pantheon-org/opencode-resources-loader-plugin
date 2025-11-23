# Troubleshooting Guide

## Common Issues and Solutions

### Resources Not Appearing

**Symptom**: Resources don't show up after creation

**Solutions**:

1. Check file extension is `.md`
2. Verify directory structure matches expected layout
3. Restart OpenCode to trigger re-discovery
4. Check console for error messages
5. Verify file permissions are readable

### Search Returns No Results

**Symptom**: `resource_search` returns empty results

**Solutions**:

1. Check query is not empty
2. Try broader search terms
3. Use `resource_list` to see all available resources
4. Clear search cache (wait 5 minutes)
5. Check resource has searchable content

### Duplicate Tool Names Warning

**Symptom**: Warning about duplicate tool names in console

**Solutions**:

1. Check for resources with same name in different locations
2. Rename one of the conflicting resources
3. Remember: project-local resources take priority
4. Review discovery priority order

### Tool Not Loading Resource

**Symptom**: Tool returns error or doesn't load content

**Solutions**:

1. Check resource size (must be < 50k characters)
2. Verify markdown file is valid UTF-8
3. Check file permissions
4. Look for console errors
5. Verify frontmatter YAML is valid

### Invalid Frontmatter

**Symptom**: Frontmatter not parsed correctly

**Solutions**:

1. Check YAML syntax with validator
2. Verify `---` markers are present
3. Ensure proper indentation (2 spaces)
4. Quote strings with special characters
5. Validate field types match schema

### Search Performance Issues

**Symptom**: Slow search responses

**Solutions**:

1. Check number of resources (< 1000 recommended)
2. Wait for cache to populate (first query is slower)
3. Reduce resource file sizes
4. Simplify query (avoid very long queries)

### Resource Size Warnings

**Symptom**: Warning about large resource

**Solutions**:

1. Split large resources into smaller files
2. Use `resource_info` to check size before loading
3. Keep resources focused and concise
4. Consider creating summary resources that link to details

## Debugging Tips

### Enable Debug Logging

```bash
DEBUG=true opencode
```

### Check Plugin Load

```typescript
// In OpenCode console
resource_list({ type: 'all', limit: 5 });
```

### Verify Discovery

Check console output on startup for discovery messages.

### Test Search

```typescript
// Test search functionality
resource_search({ query: 'test', max_results: 3 });
```

## Getting Help

- **Issues**: [GitHub Issues](https://github.com/pantheon-org/opencode-resources-loader-plugin/issues)
- **Discussions**: [GitHub Discussions](https://github.com/pantheon-org/opencode-resources-loader-plugin/discussions)
- **Documentation**: [Full Docs](https://pantheon-org.github.io/opencode-resources-loader-plugin/)
