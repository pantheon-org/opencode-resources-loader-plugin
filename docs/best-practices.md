# Best Practices for Resource Organization

## Directory Structure

### Recommended Layout

```
.opencode/
├── agent/              # Specialized agents
├── checklist/          # Step-by-step processes
├── command/            # Slash commands
├── knowledge-base/     # Reference docs
├── task/               # Task workflows
└── template/           # Reusable templates
```

### Naming Conventions

- Use lowercase with hyphens: `api-documentation.md`
- Be descriptive: `rest-api-security-checklist.md`
- Avoid special characters
- Keep names under 50 characters

## Frontmatter Best Practices

### Always Include

```yaml
---
description: Clear, concise one-liner (< 200 chars)
type: checklist # Must match directory
category: Documentation # Use standard categories
tags: [api, rest, security] # At least 2 specific tags
---
```

### Standard Categories

- **Documentation**: Documentation-related
- **Development**: Development workflows
- **Operations**: Deployment and ops
- **Quality**: Testing and QA
- **Security**: Security practices

### Tag Guidelines

- Use lowercase
- Be specific (not generic)
- Include technology names
- Include acronyms (API, REST, CI/CD)
- Minimum 2, recommended 3-5

## Content Organization

### File Size

- **Ideal**: 5-15k characters
- **Max recommended**: 30k characters
- **Hard limit**: 50k characters

### Structure

```markdown
---
frontmatter here
---

# Clear Title

Brief introduction paragraph (becomes description if not in frontmatter)

## Section 1

Content...

## Section 2

Content...
```

### Related Resources

Link related resources in frontmatter:

```yaml
related_resources:
  - checklist_api_documentation
  - knowledge_base_rest_patterns
```

## Performance Tips

- Keep resources focused and concise
- Split large guides into multiple resources
- Use clear, searchable keywords
- Maintain consistent naming patterns
- Regular cleanup of outdated resources

## Version Control

```yaml
version: 1.0.0
last_updated: 2025-11-19
```

Track versions for change management.

## References

- [Frontmatter Schema](./frontmatter-schema.md)
- [API Documentation](../pages/src/content/docs/api.md)
