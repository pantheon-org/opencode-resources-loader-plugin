# Contributing to OpenCode Resources Loader Plugin

Thank you for your interest in contributing to the OpenCode Resources Loader Plugin! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Contribution Guidelines](#contribution-guidelines)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Community](#community)

## Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please be respectful and constructive in all interactions.

### Our Standards

- **Be respectful**: Treat everyone with respect and consideration
- **Be collaborative**: Work together and help each other
- **Be inclusive**: Welcome newcomers and diverse perspectives
- **Be constructive**: Provide helpful feedback and criticism

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- Bun >= 1.0.0 (recommended)
- Git
- OpenCode for testing

### Development Setup

1. **Fork the repository** on GitHub

2. **Clone your fork**:

   ```bash
   git clone https://github.com/YOUR_USERNAME/opencode-resources-loader-plugin.git
   cd opencode-resources-loader-plugin
   ```

3. **Add upstream remote**:

   ```bash
   git remote add upstream https://github.com/pantheon-org/opencode-resources-loader-plugin.git
   ```

4. **Install dependencies**:

   ```bash
   bun install
   ```

5. **Verify setup**:
   ```bash
   bun test
   bun run type-check
   bun run lint
   ```

## How to Contribute

### Reporting Bugs

Before creating a bug report:

1. **Check existing issues** to avoid duplicates
2. **Gather information**: Version, OS, steps to reproduce
3. **Create detailed issue**: Include code samples, error messages, expected vs actual behavior

**Bug Report Template**:

```markdown
**Describe the bug**
A clear description of the bug.

**To Reproduce**
Steps to reproduce:

1. ...
2. ...

**Expected behavior**
What you expected to happen.

**Actual behavior**
What actually happened.

**Environment**

- OS: [e.g., macOS 14.0]
- Node version: [e.g., 20.0.0]
- Bun version: [e.g., 1.0.0]
- Plugin version: [e.g., 1.1.1]

**Additional context**
Any other relevant information.
```

### Suggesting Features

Before suggesting a feature:

1. **Check existing issues** and discussions
2. **Describe use case**: Explain why this feature is needed
3. **Propose solution**: Suggest how it could work

**Feature Request Template**:

```markdown
**Problem Statement**
Describe the problem this feature would solve.

**Proposed Solution**
Describe your proposed solution.

**Alternatives Considered**
Describe alternative solutions you've considered.

**Additional Context**
Any other relevant information.
```

### Contributing Code

1. **Pick an issue** or create one for your contribution
2. **Create a branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**:
   - Write code following our [coding standards](#coding-standards)
   - Add tests for new features
   - Update documentation

4. **Test your changes**:

   ```bash
   bun test
   bun run type-check
   bun run lint
   ```

5. **Commit your changes**:

   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

6. **Push to your fork**:

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a pull request** on GitHub

## Contribution Guidelines

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types**:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build/tooling changes
- `perf`: Performance improvements

**Examples**:

```bash
feat(search): add multi-token query support
fix(cache): correct TTL expiration logic
docs: update API documentation
test(discovery): add tests for nested resources
refactor: simplify scoring algorithm
perf(index): optimize resource indexing
```

### Branch Naming

Use descriptive branch names:

- `feature/add-semantic-search`
- `fix/cache-expiration-bug`
- `docs/improve-readme`
- `refactor/simplify-parser`

### Code Review

All contributions require code review:

- **Be patient**: Reviews may take time
- **Be responsive**: Address feedback promptly
- **Be open**: Consider alternative approaches
- **Be collaborative**: Work with reviewers

## Pull Request Process

### Before Submitting

- [ ] All tests pass (`bun test`)
- [ ] Type checking passes (`bun run type-check`)
- [ ] Linting passes (`bun run lint`)
- [ ] Code is formatted (`bun run format`)
- [ ] Documentation is updated
- [ ] CHANGELOG.md is updated (for significant changes)

### PR Template

```markdown
## Description

Brief description of the changes.

## Motivation

Why are these changes needed?

## Changes Made

- Change 1
- Change 2
- Change 3

## Testing

How were these changes tested?

## Related Issues

Closes #123
Related to #456

## Checklist

- [ ] Tests pass
- [ ] Type checking passes
- [ ] Linting passes
- [ ] Documentation updated
- [ ] CHANGELOG updated (if applicable)
```

### After Submitting

1. **CI checks**: Wait for automated checks to complete
2. **Review**: Respond to reviewer feedback
3. **Update**: Make requested changes
4. **Approval**: Wait for maintainer approval
5. **Merge**: Maintainer will merge your PR

## Coding Standards

### TypeScript

- Use TypeScript for all code
- Enable strict mode
- Provide type annotations for public APIs
- Avoid `any` type (use `unknown` if needed)

### Code Style

- Use Prettier for formatting (configured in `.prettierrc`)
- Follow ESLint rules (configured in `eslint.config.cjs`)
- Maximum line length: 100 characters
- Use meaningful variable names
- Add comments for complex logic

### Best Practices

```typescript
// Good: Type-safe, clear naming
interface SearchOptions {
  query: string;
  type?: ResourceType;
  maxResults?: number;
}

function searchResources(index: ResourceIndex, options: SearchOptions): SearchResult[] {
  // Implementation...
}

// Avoid: Unclear types, poor naming
function search(idx: any, q: string, t?: string, m?: number): any[] {
  // Implementation...
}
```

### File Organization

```typescript
// 1. Imports (external first, then internal)
import { z } from 'zod';
import { ResourceType } from './types';

// 2. Type definitions
interface SearchOptions {
  // ...
}

// 3. Constants
const CACHE_TTL = 5 * 60 * 1000;

// 4. Functions
export function searchResources(...) {
  // ...
}
```

## Testing Guidelines

### Test Structure

```typescript
import { describe, test, expect } from 'bun:test';

describe('searchResources', () => {
  test('should return results for valid query', () => {
    // Arrange
    const index = buildTestIndex();
    const query = 'api documentation';

    // Act
    const results = searchResources(index, query);

    // Assert
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].score).toBeGreaterThan(0);
  });
});
```

### Test Coverage

- **Unit tests**: Test individual functions
- **Integration tests**: Test complete workflows
- **Edge cases**: Empty inputs, large files, invalid data
- **Target**: >= 80% code coverage

### Running Tests

```bash
# All tests
bun test

# With coverage
bun run test:coverage

# Watch mode
bun test --watch

# Specific file
bun test src/search-resources.test.ts
```

## Documentation

### Code Documentation

- Add JSDoc comments for public APIs
- Document complex algorithms
- Include examples in comments

```typescript
/**
 * Search resources by keyword with relevance scoring
 *
 * @param index - Resource index to search
 * @param query - Search query (case-insensitive)
 * @param type - Optional resource type filter
 * @param maxResults - Maximum results to return (default: 10)
 * @returns Array of search results sorted by relevance
 *
 * @example
 * const results = searchResources(index, 'api documentation', 'checklist');
 */
export function searchResources(
  index: ResourceIndex,
  query: string,
  type?: ResourceType,
  maxResults: number = 10,
): SearchResult[] {
  // Implementation...
}
```

### Documentation Updates

When adding features:

- Update relevant markdown files in `src/`
- Update documentation site in `pages/src/content/docs/`
- Add examples to README.md
- Update API reference

### Documentation Site

The project uses Astro for documentation:

```bash
cd pages
bun install
bun run dev     # Start dev server
bun run build   # Build for production
```

## Community

### Getting Help

- **Issues**: [GitHub Issues](https://github.com/pantheon-org/opencode-resources-loader-plugin/issues)
- **Discussions**: [GitHub Discussions](https://github.com/pantheon-org/opencode-resources-loader-plugin/discussions)
- **Documentation**: [GitHub Pages](https://pantheon-org.github.io/opencode-resources-loader-plugin/)

### Communication

- Be respectful and professional
- Stay on topic
- Help others when possible
- Share knowledge and learnings

## Recognition

Contributors are recognized in:

- GitHub contributors page
- Release notes
- Project documentation

Thank you for contributing to OpenCode Resources Loader Plugin!
