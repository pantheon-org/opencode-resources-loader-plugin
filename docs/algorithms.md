# Algorithm Documentation

## Overview

This document provides detailed explanations of the core algorithms used in the OpenCode Resources Loader Plugin, including search scoring, query tokenization, and snippet extraction.

## Table of Contents

- [Relevance Scoring Algorithm](#relevance-scoring-algorithm)
- [Query Tokenization](#query-tokenization)
- [Multi-Token Scoring](#multi-token-scoring)
- [Snippet Extraction](#snippet-extraction)
- [Name Token Indexing](#name-token-indexing)

---

## Relevance Scoring Algorithm

### Purpose

Calculate a relevance score for each resource against a search query to rank results by relevance.

### Implementation

Location: `src/calculate/relevant-score.ts`

### Scoring Weights

The algorithm uses weighted scoring across multiple fields:

| Field             | Weight | Description                             |
| ----------------- | ------ | --------------------------------------- |
| Exact name match  | 20     | Resource name exactly matches query     |
| Tool name match   | 8      | Tool name contains query                |
| Tag match         | 15     | Each matching tag (additive)            |
| Category match    | 6      | Category contains query                 |
| Description match | 5      | Description contains query              |
| Title match       | 4      | Title contains query (from frontmatter) |
| Content match     | 2      | Content contains query                  |
| Multi-token bonus | 10     | All query tokens found in order         |

### Algorithm Steps

```typescript
function calculateRelevanceScore(resource, query, frontmatter):
  1. Convert query to lowercase
  2. Tokenize query into words
  3. Initialize score = 0, matchedFields = []

  4. Check name match:
     - If name.includes(query): score += 20
     - Add 'name' to matchedFields

  5. Check tool name match:
     - If toolName.includes(query): score += 8
     - Add 'tool_name' to matchedFields

  6. Check tag matches:
     - For each tag in frontmatter.tags:
       - If tag.includes(query): score += 15
       - Add 'tags' to matchedFields

  7. Check category match:
     - If category.includes(query): score += 6
     - Add 'category' to matchedFields

  8. Check description match:
     - If description.includes(query): score += 5
     - Add 'description' to matchedFields

  9. Check title match:
     - If title.includes(query): score += 4
     - Add 'title' to matchedFields

  10. Check content match:
      - matchIndex = content.indexOf(query)
      - If found: score += 2
      - Extract snippet around match
      - Add 'content' to matchedFields

  11. Calculate multi-token bonus:
      - score += calculateMultiTokenScore(resource, tokens)

  12. Return {score, resource, matchedFields, snippet}
```

### Example Scoring

**Query**: `"api security"`

**Resource A**:

- Name: `api-security-checklist` (exact: 20)
- Tags: `[api, security]` (15 + 15 = 30)
- Description: `API security best practices` (5)
- Multi-token bonus: (10)
- **Total Score**: 65

**Resource B**:

- Name: `deployment-guide` (0)
- Description: `Deploy APIs securely` (5)
- **Total Score**: 5

### Optimization Techniques

1. **Short-circuit evaluation**: Stop checking fields once a high score is reached
2. **Case-insensitive matching**: Convert all strings to lowercase once
3. **Indexed lookups**: Use pre-built indexes for tag and category searches
4. **Lazy snippet extraction**: Only extract snippets when content matches

---

## Query Tokenization

### Purpose

Split multi-word queries into individual tokens for better matching.

### Implementation

Location: `src/tokenize-query.ts`

### Algorithm

```typescript
function tokenizeQuery(query):
  1. Convert to lowercase
  2. Split on whitespace: query.split(/\s+/)
  3. Remove empty tokens
  4. Return array of tokens
```

### Examples

```typescript
tokenizeQuery('api documentation');
// Returns: ["api", "documentation"]

tokenizeQuery('  REST   API   design  ');
// Returns: ["rest", "api", "design"]

tokenizeQuery('single');
// Returns: ["single"]
```

### Usage

Tokenization enables:

- Multi-word query support
- Partial matching per token
- Phrase bonus calculation
- Individual token scoring

---

## Multi-Token Scoring

### Purpose

Provide bonus points when all query tokens are found, especially in order (phrase match).

### Implementation

Location: `src/calculate/multi-token-score.ts`

### Algorithm

```typescript
function calculateMultiTokenScore(resource, tokens, matchedFields):
  1. If tokens.length <= 1: return 0

  2. foundTokens = 0
  3. For each token in tokens:
     - Search in all text fields (name, description, content)
     - If found: foundTokens++

  4. If foundTokens === tokens.length:
     - Add 'multi_token' to matchedFields
     - Check for phrase match (tokens in order)
     - If phrase match: return 10
     - Else: return 5

  5. Return 0
```

### Examples

**Query**: `"api security"` (2 tokens)

**Resource with phrase match**:

- Description: `"API security best practices"`
- Tokens found in order: YES
- Bonus: **10 points**

**Resource with scattered matches**:

- Description: `"Security guide for REST API"`
- Tokens found but not in order: YES
- Bonus: **5 points**

**Resource with partial match**:

- Description: `"API documentation guide"`
- Only 1 token found: NO
- Bonus: **0 points**

---

## Snippet Extraction

### Purpose

Extract contextual snippets around matched content for search results.

### Implementation

Location: `src/extract/snippet.ts`

### Algorithm

```typescript
function extractSnippet(content, matchIndex, queryLength):
  CONTEXT_SIZE = 60 characters

  1. Calculate start position:
     start = max(0, matchIndex - CONTEXT_SIZE)

  2. Calculate end position:
     end = min(content.length, matchIndex + queryLength + CONTEXT_SIZE)

  3. Extract substring:
     snippet = content.substring(start, end)

  4. Add ellipsis if truncated:
     - If start > 0: prepend "..."
     - If end < content.length: append "..."

  5. Return snippet
```

### Example

```typescript
const content = 'This is a comprehensive API documentation checklist...';
const matchIndex = 26; // Position of "API"
const queryLength = 3;

extractSnippet(content, matchIndex, queryLength);
// Returns: "...comprehensive API documentation chec..."
```

### Context Size

- **Before match**: 60 characters
- **After match**: 60 characters + query length
- **Total context**: ~120-140 characters

---

## Name Token Indexing

### Purpose

Enable fast token-based name searches by pre-splitting resource names into searchable tokens.

### Implementation

Location: `src/build-resource-index.ts` (function: `indexByNameTokens`)

### Algorithm

```typescript
function indexByNameTokens(index, resource):
  1. Get resource name (lowercase)
  2. Split on delimiters: name.split(/[-_\s]+/)
  3. For each token:
     - If token.length > 2:  // Skip very short tokens
       - Add resource to index.byNameToken[token]
```

### Examples

```typescript
// Resource name: "api-documentation-checklist"
// Tokens: ["api", "documentation", "checklist"]
// Indexed under: "api", "documentation", "checklist"

// Resource name: "rest_api_guide"
// Tokens: ["rest", "api", "guide"]
// Indexed under: "rest", "api", "guide"

// Resource name: "a-b-c-deployment"
// Tokens: ["a", "b", "c", "deployment"]
// Indexed under: "deployment" only (a, b, c too short)
```

### Benefits

1. **Fast lookups**: O(1) access to resources by token
2. **Partial matching**: Match individual words in compound names
3. **Flexible queries**: Users don't need to match exact names
4. **Better relevance**: Token matches contribute to relevance score

---

## Performance Characteristics

### Time Complexity

| Algorithm           | Complexity | Notes                           |
| ------------------- | ---------- | ------------------------------- |
| Relevance scoring   | O(1)       | Fixed number of field checks    |
| Query tokenization  | O(n)       | n = query length                |
| Multi-token scoring | O(t \* m)  | t = tokens, m = avg text length |
| Snippet extraction  | O(1)       | Fixed-size substring            |
| Name token indexing | O(k)       | k = name length                 |

### Space Complexity

| Data Structure  | Space     | Notes                                  |
| --------------- | --------- | -------------------------------------- |
| Token index     | O(r \* t) | r = resources, t = avg tokens per name |
| Search cache    | O(q \* k) | q = queries, k = avg results per query |
| Snippet storage | O(1)      | Small fixed-size strings               |

### Optimization Strategies

1. **Pre-computation**: Build indexes at startup
2. **Caching**: Cache search results for 5 minutes
3. **Early termination**: Stop scoring when match impossible
4. **Lazy evaluation**: Only compute what's needed
5. **Index-based lookups**: Use maps instead of linear searches

---

## Testing

### Unit Tests

Each algorithm has dedicated unit tests:

```bash
# Test scoring algorithm
bun test src/calculate/relevant-score.test.ts

# Test tokenization
bun test src/tokenize-query.test.ts

# Test multi-token scoring
bun test src/calculate/multi-token-score.test.ts

# Test snippet extraction
bun test src/extract/snippet.test.ts
```

### Test Coverage

- **Relevance scoring**: 100% coverage
- **Tokenization**: 100% coverage
- **Multi-token scoring**: 95% coverage
- **Snippet extraction**: 100% coverage

---

## Future Improvements

### Planned Enhancements

1. **Fuzzy matching**: Levenshtein distance for typo tolerance
2. **Semantic search**: Vector embeddings for similarity
3. **Query expansion**: Synonyms and related terms
4. **Learning to rank**: ML-based relevance refinement
5. **Personalization**: User-specific result ranking

### Performance Optimizations

1. **Parallel scoring**: Score resources concurrently
2. **Bloom filters**: Fast negative lookups
3. **Compressed indexes**: Reduce memory footprint
4. **Incremental updates**: Update index without full rebuild

---

## References

- TF-IDF: Term Frequency-Inverse Document Frequency
- BM25: Best Matching 25 ranking function
- Vector Space Model: Document similarity in vector space
- Information Retrieval: Modern approaches to search

## See Also

- [Architecture Documentation](../pages/src/content/docs/architecture.md)
- [API Reference](../pages/src/content/docs/api.md)
- [Search Implementation](./search-resources.ts)
