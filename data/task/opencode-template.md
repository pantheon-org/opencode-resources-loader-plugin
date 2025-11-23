---
description: Task for creating new OpenCode templates following template standards
mode: task
temperature: 0.2
version: 1.0.0
last_updated: 2025-11-11
category: Development
type: task
tags:
  - opencode
  - template
  - creating
  - templates
  - structure
  - standards
  - format
title: Opencode Template Task
estimated_duration: 5-10 minutes
---

# Create OpenCode Template Task

This task guides the creation of new OpenCode templates following established template standards and best practices.

## Purpose

Create well-structured OpenCode templates that:

- Define clear structure for specific resource types
- Follow the meta-template structure exactly
- Target 250-300 lines (±10% tolerance)
- Include configuration options and guidelines
- Provide 2-3 complete examples
- Document formatting standards
- Include common patterns and types
- Define integration points
- Provide troubleshooting and anti-patterns

## When to Use This Task

Use this task when you need to:

- Create standard structures for new resource types
- Define configuration formats
- Establish formatting conventions
- Document repeatable patterns
- Create validation standards

**Do NOT use this task if:**

- A suitable template already exists - extend it instead
- The structure is ad-hoc and won't be reused
- Requirements are unclear or constantly changing
- The resource type is too simple to need a template

## Input Requirements

### Required Information

- **Template purpose**: What resource type does this template define?
- **Template name**: Descriptive kebab-case name (e.g., api-endpoint-tmpl, security-policy-tmpl)
- **User description**: Brief description of what user wants the template to structure

### Optional Information

- **Category**: Documentation, Development, Operations, Configuration, etc.
- **Target resource type**: What will be created from this template
- **Related resources**: Existing templates, tasks, or checklists
- **Configuration complexity**: Simple, standard, or complex
- **Usage context**: When and how the template will be used

## Task Execution Steps

### Step 1: Requirements Analysis

**Actions:**

1. Parse the user's description to understand template purpose
2. Identify what resource type the template will structure
3. Determine complexity level (simple, standard, complex)
4. Identify required vs optional components
5. Assess configuration needs
6. Identify common patterns to document
7. Determine types or variants needed

**Tools Used:**

- Analysis of user input
- Knowledge of existing templates for patterns

**Outputs:**

- Template purpose statement
- Resource type classification
- Complexity level
- Component requirements list
- Configuration needs
- Pattern identification
- Types/variants list

---

### Step 2: Meta-Template Review

**Actions:**

1. Read `.opencode/template/opencode-template-tmpl.yaml`
2. Understand template structure (title, description, version, category)
3. Review required sections (structure, options, guidelines, examples)
4. Study optional sections (types, patterns, troubleshooting, anti-patterns)
5. Note size guidelines (250-300 lines, ±10% tolerance)
6. Review formatting standards
7. Understand integration documentation

**Tools Used:**

- Read tool to access meta-template

**Outputs:**

- Understanding of meta-template structure
- Required sections list
- Size target (250-300 lines)
- Formatting standards
- Section organization

---

### Step 3: Example Study

**Actions:**

1. Identify 2-3 similar existing templates
2. Review their structure and approach
3. Note effective component organization
4. Observe option documentation methods
5. Learn from their example formats
6. Study pattern documentation

**Tools Used:**

- List/Glob to find templates in `template/` directory
- Read tool to examine existing templates

**Suggested Examples by Type:**

- **Configuration templates**: `opencode-agent-tmpl.yaml`, `opencode-command-tmpl.yaml`
- **Documentation templates**: `standard-doc-structure-tmpl.yaml`, `jira-ticket-description-tmpl.yaml`
- **Workflow templates**: `opencode-task-tmpl.yaml`, `opencode-checklist-tmpl.yaml`
- **Content templates**: `opencode-knowledge-base-tmpl.yaml`

**Outputs:**

- Structural patterns
- Component organization approaches
- Option documentation styles
- Example formats

---

### Step 4: Template Design

**Actions:**

1. Design metadata section
   - Title (descriptive)
   - Description (one-line purpose)
   - Version (1.0.0)
   - Last updated (current date)
   - Category (classification)
   - Reference (optional documentation link)

2. Write overview comment
   - 2-3 sentences explaining what template defines
   - Who should use it
   - Usage context

3. Plan structure guidelines
   - 3-5 key structural requirements
   - Numbered list format

4. Design structure section
   - Component definitions
   - Required vs optional flags
   - Format specifications
   - Pattern examples
   - Usage notes

5. Define configuration options (if applicable)
   - Option names and descriptions
   - Types (string, boolean, number, array, object)
   - Required vs optional
   - Default values
   - Possible values (if enumerated)
   - Examples

6. Create guidelines section
   - When to use (3-5 use cases)
   - When NOT to use (anti-patterns)
   - Best practices (5-7 practices)

7. Define content principles (if applicable)
   - Clarity principles
   - Completeness principles
   - Actionability principles
   - Organization principles

8. Document formatting standards (if applicable)
   - Markdown elements (headings, emphasis, lists)
   - Code blocks with syntax
   - Tables format

9. Create examples (2-3 minimum)
   - Basic example (minimal required fields)
   - Complete example (all fields)
   - Specific use case example

10. Document common patterns (if applicable)
    - Pattern name and description
    - Use case scenarios
    - Code examples

11. Define types/variants (if applicable)
    - Type distinctions
    - Use cases for each type
    - Characteristics
    - Examples

12. Add size guidelines
    - Target: 250-300 lines
    - Tolerance: ±10%
    - Rationale

13. Document integration points
    - How template integrates with other components
    - Usage in workflows

14. Create usage notes
    - Important notes (3-5 items)
    - Common gotchas
    - Pitfalls to avoid

15. Define maintenance guidance
    - Review frequency
    - Update triggers
    - Version control guidelines

16. Document troubleshooting (if applicable)
    - Common issues
    - Solutions
    - Prevention tips

17. List anti-patterns (if applicable)
    - Pattern descriptions
    - Why they're problematic
    - Correct approaches

18. Add related resources
    - Related templates
    - Documentation links
    - Knowledge bases

19. Include references
    - Internal documentation
    - External resources
    - Standards

**Tools Used:**

- Planning and design

**Outputs:**

- Complete template design
- All sections planned
- Components with specifications
- Examples drafted
- Guidelines defined

---

### Step 5: Template Creation

**Actions:**

1. Create template file in `template/[kebab-case-name]-tmpl.yaml`

2. Write metadata header:

   ```yaml
   # OpenCode [Resource Type] Template
   # Brief description of what this template is for and how it should be used

   title: 'OpenCode [Resource Type] Template'
   description: "Brief description of this template's purpose"
   version: '1.0.0'
   last_updated: 'YYYY-MM-DD'
   category: '[Category]'
   reference: '[Optional: URL or path to related documentation]'
   ```

3. Add overview comment:

   ```yaml
   # Overview:
   # [2-3 sentences explaining what this template defines and who should use it]
   # [Explain the context in which this template is used]
   ```

4. Create structure guidelines comment:

   ```yaml
   # Structure Guidelines:
   # [Numbered list of key structural requirements]
   # 1. [Guideline 1]
   # 2. [Guideline 2]
   # 3. [Guideline 3]
   ```

5. Define structure section:

   ```yaml
   structure:
     # Define the core structure of what this template describes

     component_name:
       description: 'What this component is for'
       format: '[Format or pattern]'
       required: true # or false

     another_component:
       description: 'What this component does'
       pattern: |
         [Multi-line pattern example]
         [Second line of pattern]
       note: 'Additional guidance or context'
   ```

6. Add configuration options (if applicable):

   ```yaml
   # Configuration Options:
   # [If applicable - detailed configuration parameters]

   options:
     option_name:
       description: 'What this option controls'
       type: 'string' # or boolean, number, array, object
       required: false
       default: 'default value'
       values: ['possible', 'values', 'if', 'enumerated']
       example: 'option_name: example value'
   ```

7. Create guidelines section:

   ```yaml
   # Guidelines:
   # [Domain-specific guidance for using this template]

   guidelines:
     when_to_use:
       - 'Use case 1'
       - 'Use case 2'
       - 'Use case 3'

     when_not_to_use:
       - 'Anti-pattern 1'
       - 'Anti-pattern 2'

     best_practices:
       - 'Best practice 1'
       - 'Best practice 2'
       - 'Best practice 3'
   ```

8. Add content principles (if applicable):

   ```yaml
   # Content Principles:
   # [If applicable - principles for content creation]

   content_principles:
     clarity: ['Clear language', 'Specific details', 'Define terms', 'Consistent terminology']
     completeness:
       ['Cover all aspects', 'Include examples', 'Document edge cases', 'Link to resources']
     actionability:
       ['Make it executable', 'Provide examples', 'Include verification steps', 'Link to tools']
     organization:
       ['Logical order', 'Group related items', 'Use consistent formatting', 'Balance depth']
   ```

9. Document formatting standards (if applicable):

   ```yaml
   # Formatting Standards:
   # [If applicable - markdown or other formatting conventions]

   formatting:
     markdown_elements:
       headings:
         - '# [Title] - Main title (use once)'
         - '## [Section] - Major sections'
         - '### [Subsection] - Subsections'

       emphasis:
         - '**[Bold]** for key terms and important points'
         - '_[Italic]_ for emphasis'
         - '`[Code]` for inline code, commands, or technical terms'
   ```

10. Add examples section (2-3 examples):

    ```yaml
    # Example Template:
    # [Complete working example showing how to use this template]

    example_basic: |
      [Simple example with minimal required fields]
      [Show the most common use case]

    example_complete: |
      [Comprehensive example with all fields]
      [Show advanced usage with optional fields]

    example_specific_use_case: |
      [Example for a specific scenario]
      [Demonstrate particular pattern or feature]
    ```

11. Document common patterns (if applicable):

    ```yaml
    # Common Patterns:
    # [If applicable - recurring patterns or approaches]

    common_patterns:
      pattern_name:
        description: 'What this pattern is for'
        use_case: 'When to use this pattern'
        example: |
          [Code or configuration example]
          pattern:
            property: value
    ```

12. Define types/variants (if applicable):

    ```yaml
    # Types/Variants:
    # [If applicable - different types or variants of what this template describes]

    types:
      type_name:
        description: 'What distinguishes this type'
        use_case: 'When to use this type'
        characteristics: ['Characteristic 1', 'Characteristic 2']
        example: 'Example reference or short example'
    ```

13. Add size guidelines:

    ```yaml
    # Size Guidelines:
    # All templates should target 250-300 lines

    recommended_size:
      target: '250-300 lines'
      minimum: '225 lines (250 - 10%)'
      maximum: '330 lines (300 + 10%)'
      tolerance: '±10% allowed'
      note: 'Keep templates focused and comprehensive within this range. Split larger topics into multiple templates.'
    ```

14. Document integration:

    ```yaml
    # Integration:
    # [How this template integrates with other parts of the system]

    integration:
      with_component_a: 'How this integrates with component A'
      with_component_b: 'How this integrates with component B'
      with_component_c: 'How this integrates with component C'
    ```

15. Add usage notes:

    ```yaml
    # Usage Notes:
    # [Important notes about using this template]

    usage_notes:
      - 'Important note 1'
      - 'Important note 2'
      - 'Important note 3'
      - 'Common gotcha or pitfall to avoid'
    ```

16. Create maintenance section:

    ```yaml
    # Maintenance:
    # [Information about maintaining content created from this template]

    maintenance:
      review_frequency: 'When to review (e.g., Quarterly, Annually)'
      update_triggers: ['Trigger 1', 'Trigger 2', 'Trigger 3']
      version_control: ['Version control guideline 1', 'Version control guideline 2']
    ```

17. Add best practices summary:

    ```yaml
    # Best Practices Summary:
    # [Condensed list of key best practices]

    best_practices:
      - 'Key practice 1'
      - 'Key practice 2'
      - 'Key practice 3'
      - 'Key practice 4'
      - 'Key practice 5'
    ```

18. Document troubleshooting (if applicable):

    ```yaml
    # Troubleshooting:
    # [If applicable - common issues and solutions]

    troubleshooting:
      issue_1:
        problem: 'Description of the problem'
        solution: 'How to resolve it'
        prevention: 'How to avoid this issue'
    ```

19. List anti-patterns (if applicable):

    ```yaml
    # Anti-Patterns:
    # [Common mistakes and how to avoid them]

    anti_patterns:
      pattern_name_1:
        description: 'What the anti-pattern looks like'
        why_bad: 'Why this causes problems'
        correct_approach: 'How to do it properly'
        example: 'Example showing the right way'
    ```

20. Add related resources:

    ```yaml
    # Related Resources:
    # [Links to related templates or resources]

    related_resources:
      templates: ['template-name-1.yaml', 'template-name-2.yaml']
      documentation: ['docs/related-doc.md']
      knowledge_bases: ['knowledge-base/related-kb.md']
    ```

21. Include references:

    ```yaml
    # References:
    # [Links to related documentation, standards, or resources]

    references:
      - name: 'Reference Document 1'
        path: 'path/to/document.md'
        purpose: 'What this reference provides'

      - name: 'External Resource'
        url: 'https://example.com'
        purpose: 'What this resource provides'
    ```

**Tools Used:**

- Write tool to create template file

**Outputs:**

- Complete template file in `template/` directory

---

### Step 6: Validation

**Actions:**

1. **Run Validation Tools** (REQUIRED):

   ```
   validate_frontmatter({ type: "template", file: "template-filename" })
   validate_resource_content({ type: "template", file: "template-filename" })
   ```

   - Fix all errors (prevent resource loading)
   - Address warnings (affect quality)
   - Target quality score: 80+/100

2. Verify metadata is complete (title, description, version, date, category)
3. Check overview explains purpose clearly
4. Confirm 3-5 structure guidelines present
5. Validate structure section has component definitions
6. Check options have types and examples (if applicable)
7. Ensure guidelines section has when-to-use and when-not-to-use
8. Verify 2-3 examples are present and complete
9. Check size is within 250-300 lines (±10% tolerance)
10. Confirm integration points are documented
11. Validate usage notes are helpful
12. Check maintenance guidance is present
13. Verify best practices summary exists
14. Ensure proper YAML syntax throughout
15. Validate all sections follow meta-template structure

**Tools Used:**

- `validate_frontmatter` - Check metadata compliance
- `validate_resource_content` - Check structure and quality
- Read tool to review created file
- Line count validation
- YAML syntax validation

**Outputs:**

- Validation results
- Section count
- Line count (should be 225-330)
- Example count (should be 2-3)
- List of any issues to fix

---

### Step 7: Integration Documentation

**Actions:**

1. Note which tasks should reference this template
2. Identify which commands might use this template
3. Determine if related templates need cross-references
4. Document how to use the template
5. Note maintenance triggers

**Tools Used:**

- Planning

**Outputs:**

- Integration notes
- Task references
- Command usage notes
- Related templates
- Maintenance guidance

---

## Task Output Summary

The task generates one primary file:

1. **Template File** (`template/[name]-tmpl.yaml`)
   - Metadata header (title, description, version, date, category)
   - Overview comment (2-3 sentences)
   - Structure guidelines (3-5 numbered items)
   - Structure section with component definitions
   - Configuration options (if applicable)
   - Guidelines (when-to-use, when-not-to-use, best-practices)
   - Content principles (if applicable)
   - Formatting standards (if applicable)
   - Examples (2-3 minimum: basic, complete, specific)
   - Common patterns (if applicable)
   - Types/variants (if applicable)
   - Size guidelines (250-300 lines, ±10%)
   - Integration documentation
   - Usage notes (3-5 items)
   - Maintenance guidance
   - Best practices summary
   - Troubleshooting (if applicable)
   - Anti-patterns (if applicable)
   - Related resources
   - References

## Success Criteria

- ✅ Template file created in `template/` directory
- ✅ Filename is kebab-case ending with -tmpl.yaml
- ✅ Metadata header complete with all fields
- ✅ Overview explains purpose clearly
- ✅ 3-5 structure guidelines present
- ✅ Structure section defines components
- ✅ Guidelines section has when-to-use/when-not-to-use
- ✅ 2-3 complete examples included
- ✅ Size is 250-300 lines (±10% tolerance: 225-330)
- ✅ Integration points documented
- ✅ Usage notes helpful and clear
- ✅ Maintenance guidance present
- ✅ Best practices summary exists
- ✅ Valid YAML syntax throughout
- ✅ Follows meta-template structure

## Quality Checks

### Completeness Check

- [ ] Metadata includes title, description, version, date, category
- [ ] Overview comment present (2-3 sentences)
- [ ] Structure guidelines present (3-5 items)
- [ ] Structure section defines components
- [ ] Guidelines section complete
- [ ] 2-3 examples present (basic, complete, specific)
- [ ] Size guidelines included
- [ ] Integration section present
- [ ] Usage notes included (3-5 items)
- [ ] Maintenance guidance present
- [ ] Best practices summary exists
- [ ] Related resources listed
- [ ] References included

### Accuracy Check

- [ ] Template purpose matches user request
- [ ] Structure components are appropriate
- [ ] Configuration options are correct
- [ ] Examples are valid and complete
- [ ] Guidelines are accurate
- [ ] Best practices are sound
- [ ] References are valid

### Clarity Check

- [ ] Metadata description is clear
- [ ] Overview explains purpose
- [ ] Structure guidelines are specific
- [ ] Component descriptions are clear
- [ ] Examples are easy to follow
- [ ] Usage notes are helpful
- [ ] Comments explain sections

### Structure Check

- [ ] Follows meta-template section order
- [ ] Proper YAML syntax throughout
- [ ] Consistent indentation
- [ ] Comments properly formatted
- [ ] Examples properly indented
- [ ] Lists consistently formatted

### Size Check

- [ ] Total line count: 225-330 lines (250-300 ±10%)
- [ ] Not too sparse (<225 lines)
- [ ] Not too verbose (>330 lines)
- [ ] Appropriate depth for complexity
- [ ] Balanced section sizes

## Error Handling

### Common Issues and Resolutions

**Issue: Template purpose unclear**

- Ask user for clarification on resource type
- Suggest appropriate template name
- Review similar templates for patterns
- Clarify target usage context

**Issue: Size exceeds 330 lines**

- Identify sections that can be condensed
- Move excessive detail to documentation
- Consider splitting into multiple templates
- Remove redundant examples or notes

**Issue: Size below 225 lines**

- Add more examples (minimum 2-3)
- Expand structure guidelines (3-5 items)
- Add configuration options if applicable
- Include troubleshooting section
- Add anti-patterns section
- Expand best practices

**Issue: Examples insufficient**

- Require minimum 2-3 complete examples
- Include basic example (minimal fields)
- Include complete example (all fields)
- Add specific use case example
- Make examples realistic and practical

**Issue: Structure unclear**

- Break down components logically
- Provide clear descriptions
- Include format specifications
- Add pattern examples
- Document required vs optional clearly

**Issue: Guidelines vague**

- Make when-to-use specific (3-5 scenarios)
- Make when-not-to-use clear (2-3 anti-patterns)
- List specific best practices (5-7 items)
- Provide actionable guidance
- Avoid ambiguous language

## Examples

### Example 1: Configuration Template (Simple)

**Input:**

- Purpose: Define structure for database connection configurations
- Name: database-config-tmpl
- Type: Configuration template
- Complexity: Simple

**Task Execution:**

1. Analyze: Configuration structure for database connections
2. Review meta-template: Study configuration template patterns
3. Study examples: Review `opencode-agent-tmpl.yaml` for configuration patterns
4. Design:
   - Category: Configuration
   - Structure: host, port, database, credentials, pool_settings
   - Options: SSL, timeout, retry_policy
   - 3 examples: MySQL, PostgreSQL, MongoDB
5. Create: Template with configuration structure
6. Validate: Check size (270 lines), examples, structure
7. Document: Note usage in deployment tasks

**Outputs:**

- Template: `template/database-config-tmpl.yaml`
- Size: 270 lines (within 250-300 target)
- Examples: 3 database types
- Category: Configuration

---

### Example 2: Documentation Template (Standard)

**Input:**

- Purpose: Define structure for API endpoint documentation
- Name: api-endpoint-tmpl
- Type: Documentation template
- Complexity: Standard

**Task Execution:**

1. Analyze: API endpoint documentation needs
2. Review meta-template: Study documentation template patterns
3. Study examples: Review `standard-doc-structure-tmpl.yaml`
4. Design:
   - Category: Documentation
   - Structure: endpoint, method, parameters, request_body, responses, examples
   - Formatting: Markdown for documentation, code blocks for examples
   - 3 examples: GET endpoint, POST endpoint, complex query endpoint
   - Types: REST, GraphQL, gRPC variants
5. Create: Template with documentation structure
6. Validate: Check size (295 lines), formatting, examples
7. Document: Note usage in API documentation tasks

**Outputs:**

- Template: `template/api-endpoint-tmpl.yaml`
- Size: 295 lines (within 250-300 target)
- Examples: 3 endpoint types
- Types: 3 API variants
- Category: Documentation

---

### Example 3: Workflow Template (Complex)

**Input:**

- Purpose: Define structure for CI/CD pipeline configurations
- Name: cicd-pipeline-tmpl
- Type: Workflow template
- Complexity: Complex

**Task Execution:**

1. Analyze: CI/CD pipeline structure needs
2. Review meta-template: Study workflow template patterns
3. Study examples: Review `opencode-task-tmpl.yaml` for workflow patterns
4. Design:
   - Category: Operations
   - Structure: stages, jobs, triggers, environment, variables, artifacts
   - Options: Caching, parallelization, dependencies
   - Common patterns: Build, test, deploy, rollback
   - Types: GitLab CI, GitHub Actions, Jenkins variants
   - 3 examples: Simple pipeline, multi-stage pipeline, deployment pipeline
   - Troubleshooting: Common pipeline issues
5. Create: Template with comprehensive workflow structure
6. Validate: Check size (318 lines), patterns, troubleshooting
7. Document: Note usage in pipeline architect task

**Outputs:**

- Template: `template/cicd-pipeline-tmpl.yaml`
- Size: 318 lines (within 225-330 tolerance)
- Examples: 3 pipeline scenarios
- Types: 3 CI/CD platforms
- Patterns: 4 common patterns
- Category: Operations

---

## Template Size Guidelines

### Target Range

- **Target**: 250-300 lines
- **Minimum**: 225 lines (250 - 10%)
- **Maximum**: 330 lines (300 + 10%)
- **Tolerance**: ±10% allowed

### Size Distribution

**Simple Template (225-260 lines)**:

- Metadata + overview: ~15 lines
- Structure guidelines: ~10 lines
- Structure section: ~40 lines
- Guidelines: ~30 lines
- 2 examples: ~60 lines
- Size guidelines: ~10 lines
- Integration: ~15 lines
- Usage notes: ~15 lines
- Maintenance: ~15 lines
- Best practices: ~10 lines
- Related resources: ~15 lines

**Standard Template (260-300 lines)**:

- Add configuration options: ~30 lines
- Add 3rd example: ~30 lines
- Add common patterns: ~20 lines
- Expand guidelines: ~10 lines

**Complex Template (300-330 lines)**:

- Add content principles: ~15 lines
- Add formatting standards: ~20 lines
- Add types/variants: ~20 lines
- Add troubleshooting: ~25 lines
- Add anti-patterns: ~20 lines

### When to Split Templates

**Split if:**

- Exceeds 330 lines consistently
- Covers multiple distinct resource types
- Has 5+ types/variants
- Serves multiple unrelated use cases
- Difficult to navigate or use

**Keep together if:**

- Closely related components
- Single resource type with variants
- Shared configuration patterns
- Common integration points

## Template Type Patterns

### Configuration Templates

**Focus**: Define configuration structure and options

**Required Sections**:

- Metadata and overview
- Structure with component definitions
- Configuration options (extensive)
- Guidelines (when-to-use, best-practices)
- Examples (2-3 different configs)
- Usage notes
- Related resources

**Optional Sections**:

- Common patterns
- Types/variants
- Troubleshooting

**Examples**: `opencode-agent-tmpl.yaml`, `opencode-command-tmpl.yaml`

---

### Documentation Templates

**Focus**: Structure for documentation content

**Required Sections**:

- Metadata and overview
- Structure guidelines (detailed)
- Content principles
- Formatting standards (extensive)
- Examples (2-3 documentation samples)
- Best practices
- Related resources

**Optional Sections**:

- Types/variants
- Common patterns

**Examples**: `standard-doc-structure-tmpl.yaml`, `jira-ticket-description-tmpl.yaml`

---

### Workflow Templates

**Focus**: Process and workflow structures

**Required Sections**:

- Metadata and overview
- Structure (stages/steps)
- Configuration options
- Guidelines
- Common patterns (extensive)
- Examples (2-3 workflows)
- Integration
- Best practices

**Optional Sections**:

- Types/variants
- Troubleshooting
- Anti-patterns

**Examples**: `opencode-task-tmpl.yaml`, `opencode-checklist-tmpl.yaml`

---

## Content Principles

### Clarity

- Use clear, unambiguous language
- Define technical terms
- Provide specific details
- Use consistent terminology
- Avoid jargon unless necessary

### Completeness

- Cover all critical components
- Include working examples
- Document edge cases
- Link to related resources
- Provide comprehensive guidelines

### Actionability

- Make guidelines executable
- Provide concrete examples
- Include verification steps
- Link to tools and resources
- Enable immediate use

### Organization

- Follow logical section order
- Group related components
- Use consistent formatting
- Balance depth appropriately
- Make navigation easy

## Template Reference

**Meta-Template**: `.opencode/template/opencode-template-tmpl.yaml`

**Required Sections**:

1. Metadata (title, description, version, date, category)
2. Overview comment (2-3 sentences)
3. Structure guidelines (3-5 items)
4. Structure section
5. Guidelines (when-to-use, when-not-to-use, best-practices)
6. Examples (2-3 minimum)
7. Size guidelines
8. Integration
9. Usage notes
10. Maintenance
11. Best practices summary
12. Related resources
13. References

**Optional Sections**:

- Configuration options
- Content principles
- Formatting standards
- Common patterns
- Types/variants
- Troubleshooting
- Anti-patterns

**Size Target**: 250-300 lines (±10% tolerance: 225-330)

**Example Templates**: Browse `template/` directory for patterns

## Best Practices

### Template Design

- Focus on single resource type
- Target 250-300 lines
- Provide clear structure
- Include comprehensive examples
- Document integration points
- Make immediately usable

### Structure Definition

- Define components clearly
- Specify required vs optional
- Provide format specifications
- Include pattern examples
- Document relationships

### Examples

- Include 2-3 minimum (meta-template requirement)
- Show different use cases
- Provide complete, working examples
- Explain key aspects
- Cover common scenarios
- Include edge cases

### Documentation

- Write clear descriptions
- Explain the "why" not just "what"
- Link to related resources
- Provide actionable guidance
- Include troubleshooting
- Document anti-patterns

### Size Management

- Target 250-300 lines
- Allow ±10% tolerance (225-330)
- Condense excessive detail
- Split if consistently over 330
- Expand if consistently under 225
- Balance depth and breadth

## Maintenance

### Review Triggers

- Resource type changes
- Structure updates needed
- New patterns discovered
- Usage feedback received
- Integration changes
- Quarterly reviews

### Update Process

1. Review template usage and feedback
2. Check if meta-template has been updated
3. Update template to match new patterns
4. Update version number (major changes)
5. Update last_updated date
6. Validate size is within 225-330 lines
7. Test examples are still valid
8. Update related resources
9. Document changes in commits

## References

- Meta-Template: `.opencode/template/opencode-template-tmpl.yaml`
- Examples: `.opencode/template/*.yaml` (all existing templates)
