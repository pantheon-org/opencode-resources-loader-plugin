---
description: Task for creating new OpenCode knowledge bases following templates
mode: task
temperature: 0.2
version: 1.0.0
last_updated: 2025-11-11
category: Documentation
type: task
tags:
  - opencode
  - knowledge
  - creating
  - bases
  - documentation
  - reference
  - patterns
title: Opencode Knowledge Base Task
estimated_duration: 5-10 minutes
---

# Create OpenCode Knowledge Base Task

This task guides the creation of new OpenCode knowledge bases following established templates and best practices.

## Purpose

Create well-structured OpenCode knowledge bases that:

- Provide comprehensive reference documentation
- Follow the template structure exactly
- Include 2-4 core concepts with examples
- Document 3-5 common patterns with implementations
- Provide 2-3 complete working examples
- Include best practices (DO/DON'T)
- Offer troubleshooting guidance
- Integrate with other OpenCode resources

## When to Use This Task

Use this task when you need to:

- Document technical knowledge for reuse
- Create reference guides for tools/technologies
- Establish best practices documentation
- Build troubleshooting guides
- Document patterns and anti-patterns
- Create decision frameworks

**Do NOT use this task if:**

- The content is procedural (use a task instead)
- The content is a verification list (use a checklist instead)
- The documentation is project-specific and won't be reused
- Requirements are unclear or constantly changing

## Input Requirements

### Required Information

- **Knowledge base purpose**: What knowledge does this document capture?
- **Knowledge base name**: Descriptive kebab-case name (e.g., docker-best-practices, api-design-patterns)
- **User description**: Brief description of what user wants documented
- **Knowledge base type**: Reference, guide, or concept

### Optional Information

- **Category**: CI/CD, Security, Documentation, Development, etc.
- **Related resources**: Existing checklists, tasks, or templates
- **Target audience**: Developers, operators, architects, etc.
- **Difficulty level**: Beginner, intermediate, advanced
- **Existing examples**: Links to similar documentation

## Task Execution Steps

### Step 1: Requirements Analysis

**Actions:**

1. Parse the user's description to understand documentation purpose
2. Identify the knowledge base type (reference, guide, or concept)
3. Determine scope and depth needed
4. Identify target audience
5. List core concepts to document (2-4)
6. Identify common patterns to include (3-5)
7. Assess related resources to reference

**Tools Used:**

- Analysis of user input
- Knowledge of existing knowledge bases for patterns

**Outputs:**

- Knowledge base purpose statement
- Type classification (reference/guide/concept)
- Scope definition
- Target audience
- Core concepts list
- Common patterns list
- Related resources

---

### Step 2: Template Review

**Actions:**

1. Read `.opencode/template/opencode-knowledge-base-tmpl.yaml`
2. Understand document structure (Overview, Core Concepts, Common Patterns, etc.)
3. Review formatting standards (headings, emphasis, code blocks)
4. Study content principles (clarity, completeness, practical, organization)
5. Review knowledge base types (reference vs guide vs concept)
6. Note size guidelines (2-4 concepts, 3-5 patterns, 2-3 examples)

**Tools Used:**

- Read tool to access template

**Outputs:**

- Understanding of template structure
- Required sections
- Formatting standards
- Content principles
- Size guidelines

---

### Step 3: Example Study

**Actions:**

1. Identify 2-3 similar existing knowledge bases by type
2. Review their structure and approach
3. Note effective pattern documentation
4. Observe example formulation
5. Learn from troubleshooting sections
6. Study best practices presentation

**Tools Used:**

- List/Glob to find knowledge bases in `knowledge-base/` directory
- Read tool to examine existing knowledge bases

**Suggested Examples by Type:**

- **Reference**: `gitlab-ci-examples.md`, `github-actions-templates.md`
- **Guide**: `pipeline-best-practices.md`, `mermaid-diagrams.md`
- **Concept**: `acceptance-criteria.md`, `moscow-prioritization.md`

**Outputs:**

- Structural patterns
- Example formats
- Best practices presentation styles
- Troubleshooting approaches

---

### Step 4: Knowledge Base Design

**Actions:**

1. Design overview section
   - One-line summary
   - 2-3 paragraph explanation
   - Who should use it, when to reference it

2. Plan Core Concepts section (2-4 concepts)
   - Concept name
   - Definition
   - Purpose (why it exists, problems it solves)
   - Example with code

3. Design Common Patterns section (3-5 patterns)
   - Pattern name
   - Problem it solves
   - Solution explanation
   - Implementation with code
   - Benefits list
   - When to use scenarios

4. Create Best Practices section
   - DO subsection (recommended practices)
   - DON'T subsection (anti-patterns)
   - Use ✅ for good practices, ❌ for anti-patterns

5. Plan Examples section (2-3 complete examples)
   - Scenario description
   - Requirements
   - Solution with code and explanation
   - Key takeaways

6. Design Troubleshooting section
   - Common issues
   - Symptoms
   - Causes
   - Solutions with steps
   - Prevention tips

7. Create Quick Reference section
   - Command reference tables
   - Configuration reference
   - Pattern quick list

8. Plan Related Resources section
   - Internal links (checklists, tasks, templates)
   - External documentation

9. Define Metadata section
   - Category
   - Tags
   - Difficulty level
   - Reading time estimate
   - Prerequisites
   - Target audience

**Tools Used:**

- Planning and design

**Outputs:**

- Complete knowledge base design
- All sections planned
- Concepts defined with examples
- Patterns documented with implementations
- Best practices organized
- Examples with scenarios

---

### Step 5: Knowledge Base Creation

**Actions:**

1. Create knowledge base file in `knowledge-base/[kebab-case-name].md`

2. Write overview section:

   ```markdown
   # [Topic Name] Knowledge Base

   > One-line summary

   ## Overview

   [2-3 paragraphs about coverage, audience, when to reference]
   ```

3. Create Core Concepts section (2-4 concepts):

   ````markdown
   ## Core Concepts

   ### Concept 1: [Name]

   **Definition**: Clear definition

   **Purpose**:

   - Why it exists
   - Problems it solves

   **Example**:

   ```yaml
   example:
     property: value
   ```
   ````

   ***

   ```

   ```

4. Write Common Patterns section (3-5 patterns):

   ````markdown
   ## Common Patterns

   ### Pattern 1: [Pattern Name]

   **Problem**: What problem it solves

   **Solution**: How it works

   **Implementation**:

   ```yaml
   pattern:
     implementation: value
   ```
   ````

   **Benefits**:
   - ✅ Benefit 1

   **When to Use**: Scenarios

   ***

   ```

   ```

5. Create Best Practices section:

   ````markdown
   ## Best Practices

   ### DO: Recommended Practices

   #### 1. Practice Name

   **Description**: What

   **Why**: Why important

   **Example**:

   ```yaml
   good_practice:
     property: value
   ```
   ````

   ***

   ### DON'T: Anti-Patterns to Avoid

   #### 1. Anti-Pattern Name

   **Problem**: What's wrong

   **Bad Example**:

   ```yaml
   bad_example:
     anti_pattern: value
   ```

   **Good Alternative**:

   ```yaml
   good_example:
     proper_approach: value
   ```

   ***

   ```

   ```

6. Add Examples section (2-3 examples):

   ````markdown
   ## Examples

   ### Example 1: [Use Case Name]

   **Scenario**: Description

   **Requirements**: List

   **Solution**:

   ```yaml
   solution:
     implementation: value
   ```
   ````

   **Key Takeaways**: List

   ***

   ```

   ```

7. Create optional Advanced Topics section if applicable

8. Add optional Decision Framework section if applicable

9. Write Troubleshooting section:

   ````markdown
   ## Troubleshooting

   ### Issue 1: [Problem Name]

   **Symptoms**: List

   **Causes**: List

   **Solution**:

   ```yaml
   fix:
     step1: value
   ```
   ````

   **Prevention**: How to avoid

   ***

   ```

   ```

10. Create Quick Reference section:

    ```markdown
    ## Quick Reference

    | Pattern   | Use Case | Code      |
    | --------- | -------- | --------- |
    | Pattern 1 | Use case | `example` |

    ---
    ```

11. Add Related Resources section:

    ```markdown
    ## Related Resources

    - [Related Checklist](../checklist/related.md)
    - [Related Task](../task/related.md)
    - External documentation links

    ---
    ```

12. Write Metadata section:

    ```markdown
    ## Metadata

    - **Category**: [Category]
    - **Tags**: [tag1, tag2, tag3]
    - **Difficulty**: [Beginner | Intermediate | Advanced]
    - **Reading Time**: [X minutes]
    - **Prerequisites**: [Required knowledge]
    - **Target Audience**: [Who should read this]
    ```

**Tools Used:**

- Write tool to create knowledge base file

**Outputs:**

- Complete knowledge base file in `knowledge-base/` directory

---

### Step 6: Validation

**Actions:**

1. **Run Validation Tools** (REQUIRED):

   ```
   validate_frontmatter({ type: "knowledge-base", file: "kb-filename" })
   validate_resource_content({ type: "knowledge-base", file: "kb-filename" })
   ```

   - Fix all errors (prevent resource loading)
   - Address warnings (affect quality)
   - Target quality score: 80+/100

2. Check overview is clear and concise (2-3 paragraphs)
3. Verify 2-4 core concepts exist with definitions, purpose, examples
4. Confirm 3-5 common patterns with full implementations
5. Ensure best practices section has DO and DON'T subsections (✅/❌)
6. Validate 2-3 complete examples with scenarios
7. Check troubleshooting section has symptoms/causes/solutions
8. Verify quick reference is useful and concise
9. Confirm related resources section exists
10. Ensure metadata section is complete
11. Check formatting consistency (headings, code blocks, lists)
12. Validate template compliance
13. Verify all code examples are complete and correct

**Tools Used:**

- `validate_frontmatter` - Check metadata compliance
- `validate_resource_content` - Check structure and quality
- Read tool to review created file
- Validation against template

**Outputs:**

- Validation results
- Section count
- Concept count (should be 2-4)
- Pattern count (should be 3-5)
- Example count (should be 2-3)
- List of any issues to fix

---

### Step 7: Integration Documentation

**Actions:**

1. Note which checklists should reference this knowledge base
2. Identify which tasks should reference this knowledge base
3. Determine if related knowledge bases need cross-references
4. Document when to reference this knowledge base
5. Note maintenance triggers

**Tools Used:**

- Planning

**Outputs:**

- Integration notes
- Checklist references
- Task references
- Related knowledge bases
- Maintenance guidance

---

## Task Output Summary

The task generates one primary file:

1. **Knowledge Base File** (`knowledge-base/[name].md`)
   - Title and one-line summary
   - Overview (2-3 paragraphs)
   - Core Concepts (2-4 concepts with definitions, purpose, examples)
   - Common Patterns (3-5 patterns with implementations)
   - Best Practices (DO and DON'T sections)
   - Examples (2-3 complete working examples)
   - Advanced Topics (optional)
   - Decision Framework (optional)
   - Troubleshooting (symptoms/causes/solutions)
   - Quick Reference (tables and quick lookup)
   - Integration Guidelines (optional)
   - Related Resources (internal and external links)
   - Metadata (category, tags, difficulty, audience)

## Success Criteria

- ✅ Knowledge base file created in `knowledge-base/` directory
- ✅ Filename is kebab-case with .md extension
- ✅ Title and one-line summary present
- ✅ Overview section with 2-3 paragraphs
- ✅ 2-4 core concepts with definitions, purpose, and examples
- ✅ 3-5 common patterns with full implementations
- ✅ Best practices section with DO and DON'T subsections
- ✅ 2-3 complete working examples
- ✅ Troubleshooting section with symptoms/causes/solutions
- ✅ Quick reference section
- ✅ Related resources section
- ✅ Metadata section complete
- ✅ Follows template structure
- ✅ All code examples are complete and correct

## Quality Checks

### Completeness Check

- [ ] Overview explains what, who, when
- [ ] 2-4 core concepts present
- [ ] Each concept has definition, purpose, example
- [ ] 3-5 common patterns present
- [ ] Each pattern has problem/solution/implementation/benefits/when-to-use
- [ ] Best practices has DO and DON'T subsections
- [ ] 2-3 examples with scenario/requirements/solution/takeaways
- [ ] Troubleshooting section exists
- [ ] Quick reference section exists
- [ ] Related resources section exists
- [ ] Metadata section complete

### Accuracy Check

- [ ] Knowledge base purpose matches user request
- [ ] Core concepts are clearly defined
- [ ] Patterns solve stated problems
- [ ] Code examples are correct and complete
- [ ] Best practices are accurate
- [ ] Anti-patterns are truly problematic
- [ ] Troubleshooting solutions work
- [ ] References are valid

### Clarity Check

- [ ] Overview is clear and concise
- [ ] Concepts are easy to understand
- [ ] Patterns are well-explained
- [ ] Examples are realistic and followable
- [ ] Code is well-commented
- [ ] Best practices are actionable
- [ ] Troubleshooting is step-by-step

### Structure Check

- [ ] Follows template section order
- [ ] Proper heading hierarchy (H1 → H2 → H3 → H4)
- [ ] Consistent formatting throughout
- [ ] Horizontal rules between major items
- [ ] Code blocks properly formatted with language tags
- [ ] Lists properly formatted
- [ ] Tables properly formatted

### Practical Value Check

- [ ] Concepts are relevant to real-world use
- [ ] Patterns solve actual problems
- [ ] Examples reflect realistic scenarios
- [ ] Best practices are immediately applicable
- [ ] Troubleshooting covers common issues
- [ ] Quick reference is genuinely useful

## Error Handling

### Common Issues and Resolutions

**Issue: Knowledge base purpose unclear**

- Ask user for clarification on what knowledge to document
- Suggest appropriate knowledge base type (reference/guide/concept)
- Review similar knowledge bases for patterns
- Clarify target audience

**Issue: Concepts unclear or insufficient**

- Require 2-4 core concepts minimum
- Each concept needs definition, purpose, example
- Break complex concepts into smaller parts
- Use clear, simple definitions

**Issue: Patterns insufficient or incomplete**

- Require 3-5 patterns minimum
- Each pattern needs problem/solution/implementation/benefits/when-to-use
- Include complete code examples
- Explain why pattern is beneficial

**Issue: Examples not practical**

- Make examples realistic and complete
- Include full context (scenario, requirements, solution, takeaways)
- Show working code, not pseudo-code
- Cover different use cases

**Issue: Best practices vague**

- Make practices specific and actionable
- Provide clear examples for each practice
- Explain why each practice is important
- Show bad examples alongside good ones

**Issue: Missing troubleshooting**

- Document common issues users face
- Include symptoms/causes/solutions format
- Provide step-by-step resolutions
- Add prevention tips

## Examples

### Example 1: Reference Knowledge Base

**Input:**

- Purpose: Document Terraform best practices and common patterns
- Name: terraform-best-practices
- Type: Reference knowledge base
- Category: Infrastructure

**Task Execution:**

1. Analyze: Infrastructure reference documentation
2. Review template: Study reference knowledge base patterns
3. Study examples: Review `gitlab-ci-examples.md` for reference structure
4. Design:
   - Type: Reference guide
   - 3 concepts: Resources, Modules, State management
   - 4 patterns: Remote state, Module composition, Workspace usage, Dynamic blocks
   - 3 examples: Basic infrastructure, Multi-environment setup, Module library
5. Create: Knowledge base with comprehensive Terraform documentation
6. Validate: Check all sections, code examples, patterns
7. Document: Note infrastructure task integration

**Outputs:**

- Knowledge base: `knowledge-base/terraform-best-practices.md`
- Concepts: 3 with definitions and examples
- Patterns: 4 with implementations
- Examples: 3 complete scenarios
- Category: Infrastructure

---

### Example 2: Guide Knowledge Base

**Input:**

- Purpose: Guide developers on writing effective unit tests
- Name: unit-testing-guide
- Type: Guide knowledge base
- Category: Development

**Task Execution:**

1. Analyze: Testing guide documentation
2. Review template: Study guide knowledge base patterns
3. Study examples: Review `pipeline-best-practices.md` for guide structure
4. Design:
   - Type: How-to guide
   - 4 concepts: Test structure, Mocking, Assertions, Coverage
   - 5 patterns: AAA pattern, Test fixtures, Parameterized tests, Integration points, Continuous testing
   - 3 examples: Testing REST API, Testing business logic, Testing edge cases
5. Create: Knowledge base with testing guidance
6. Validate: Check completeness, best practices, examples
7. Document: Note testing command integration

**Outputs:**

- Knowledge base: `knowledge-base/unit-testing-guide.md`
- Concepts: 4 with definitions and examples
- Patterns: 5 with implementations
- Examples: 3 different testing scenarios
- Category: Development

---

### Example 3: Concept Knowledge Base

**Input:**

- Purpose: Explain microservices architecture patterns and when to use them
- Name: microservices-architecture-patterns
- Type: Concept knowledge base
- Category: Architecture

**Task Execution:**

1. Analyze: Architectural concept documentation
2. Review template: Study concept knowledge base patterns
3. Study examples: Review `acceptance-criteria.md` for concept structure
4. Design:
   - Type: Concept explanation
   - 4 concepts: Service decomposition, Communication patterns, Data management, Deployment
   - 5 patterns: API Gateway, Service Mesh, Event-driven, CQRS, Saga
   - 2 examples: E-commerce platform, Media streaming service
   - Decision framework: When to use microservices vs monolith
5. Create: Knowledge base with architectural concepts
6. Validate: Check concepts, decision framework, advanced topics
7. Document: Note architecture documentation integration

**Outputs:**

- Knowledge base: `knowledge-base/microservices-architecture-patterns.md`
- Concepts: 4 with detailed explanations
- Patterns: 5 with architectural implementations
- Examples: 2 comprehensive scenarios
- Decision framework: Included
- Category: Architecture

---

## Knowledge Base Type Guidelines

### Reference Knowledge Base

**Focus**: Quick lookup of commands, configurations, patterns

**Required Sections**:

- Overview
- Core Concepts
- Common Patterns (primary focus)
- Quick Reference (extensive)
- Related Resources
- Metadata

**Optional Sections**:

- Best Practices
- Examples
- Troubleshooting

**Examples**: `gitlab-ci-examples.md`, `github-actions-templates.md`

**Characteristics**:

- Concise explanations
- Many code examples
- Extensive quick reference tables
- Pattern-focused
- Easy scanning

---

### Guide Knowledge Base

**Focus**: How-to explanations with examples and best practices

**Required Sections**:

- Overview
- Core Concepts
- Common Patterns
- Best Practices (primary focus)
- Examples (detailed)
- Troubleshooting (extensive)
- Quick Reference
- Related Resources
- Metadata

**Examples**: `pipeline-best-practices.md`, `mermaid-diagrams.md`

**Characteristics**:

- Detailed explanations
- Step-by-step guidance
- Extensive best practices
- Complete working examples
- Common pitfalls documented

---

### Concept Knowledge Base

**Focus**: Deep explanation of concepts and when/how to use them

**Required Sections**:

- Overview
- Core Concepts (extensive)
- Common Patterns
- Decision Framework (primary focus)
- Advanced Topics (often included)
- Related Resources
- Metadata

**Optional Sections**:

- Best Practices
- Examples
- Quick Reference
- Troubleshooting

**Examples**: `acceptance-criteria.md`, `moscow-prioritization.md`

**Characteristics**:

- Theoretical foundation
- Decision frameworks
- When-to-use guidance
- Trade-off analysis
- Conceptual depth

---

## Content Principles

### Clarity

- Clear definitions
- Action-oriented language
- Define technical terms
- Use consistent terminology
- Simple, direct explanations

### Completeness

- Cover all critical aspects
- Include working examples
- Document edge cases
- Link to related resources
- Provide troubleshooting

### Practical

- Working code examples
- Real-world scenarios
- Troubleshooting guides
- Quick reference sections
- Actionable best practices

### Organization

- Logical progression
- Consistent formatting
- Clear headings
- Balanced depth
- Easy navigation

## Size Guidelines

### Core Concepts

- **Count**: 2-4 concepts
- **Content per concept**: Definition, purpose (2-3 bullets), example (5-15 lines)
- **Total**: ~50-100 lines per concept

### Common Patterns

- **Count**: 3-5 patterns
- **Content per pattern**: Problem, solution, implementation (10-30 lines), benefits (3-5 bullets), when-to-use
- **Total**: ~80-150 lines per pattern

### Examples

- **Count**: 2-3 complete examples
- **Content per example**: Scenario, requirements, solution (20-50 lines), key takeaways
- **Total**: ~100-200 lines per example

### Overall Size

- **Simple KB**: 300-500 lines (reference)
- **Standard KB**: 500-800 lines (guide)
- **Complex KB**: 800-1200 lines (concept with decision frameworks)

**Note**: Split very broad topics into multiple knowledge bases for better focus and usability.

## Template Reference

**Primary Template**: `.opencode/template/opencode-knowledge-base-tmpl.yaml`

**Required Sections**:

1. Title (H1) with one-line summary
2. Overview (2-3 paragraphs)
3. Core Concepts (2-4 concepts)
4. Common Patterns (3-5 patterns)
5. Best Practices (DO/DON'T subsections)
6. Examples (2-3 minimum)
7. Troubleshooting
8. Quick Reference
9. Related Resources
10. Metadata

**Optional Sections**:

- Advanced Topics
- Decision Framework
- Integration Guidelines

**Formatting Standards**:

- Headings: # Title, ## Section, ### Subsection, #### Detail
- Emphasis: **Bold** for key terms, _Italic_ for emphasis, `Code` for inline
- Code blocks: ```language with proper tags
- Lists: Unordered with `-`, ordered with `1.`, nested with 2-space indent
- Tables: Proper markdown table format
- Callouts: ✅ good, ❌ bad, ⚠️ warning, 💡 tip

**Example Knowledge Bases**: Browse `knowledge-base/` directory for patterns

## Best Practices

### Content Creation

- Focus on one topic/domain
- Include working, complete examples
- Provide both good and bad examples
- Document common pitfalls
- Link to related resources
- Use realistic scenarios

### Structure

- Start with overview
- Define concepts before patterns
- Progress from simple to complex
- Include quick reference
- End with related resources
- Use consistent formatting

### Examples

- Use realistic scenarios
- Provide complete, working code
- Explain why, not just what
- Show variations
- Include expected outcomes
- Comment code appropriately

### Code Quality

- Test all code examples
- Use proper syntax highlighting
- Keep examples focused
- Comment complex parts
- Show complete context
- Avoid pseudo-code

## Maintenance

### Review Triggers

- Tool/technology updates
- New patterns discovered
- Best practices evolve
- User feedback received
- Technology changes
- Quarterly reviews

### Update Process

1. Review usage and feedback
2. Check if template has been updated
3. Update knowledge base to match new patterns
4. Update last_updated date in metadata
5. Add version notes if significant changes
6. Test all code examples
7. Validate all references still work
8. Document changes in commits

## References

- Template: `.opencode/template/opencode-knowledge-base-tmpl.yaml`
- Examples: `.opencode/knowledge-base/*.md` (all existing knowledge bases)
