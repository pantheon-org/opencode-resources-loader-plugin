---
description: Task for creating new OpenCode checklists following templates
mode: task
temperature: 0.2
version: 1.0.0
last_updated: 2025-11-11
category: Development
type: task
tags:
  - opencode
  - checklist
  - creating
  - checklists
  - creation
  - validation
  - quality
title: Opencode Checklist Task
estimated_duration: 5-10 minutes
---

# Create OpenCode Checklist Task

This task guides the creation of new OpenCode checklists following established templates and best practices.

## Purpose

Create well-structured OpenCode checklists that:

- Follow the template structure exactly
- Include 8-12 major sections with verifiable items
- Cover all critical aspects comprehensively
- Use clear, action-oriented language
- Balance completeness with usability
- Integrate with documentation and quality processes

## When to Use This Task

Use this task when you need to:

- Create validation checklists for quality assurance
- Build comprehensive requirement lists
- Standardize processes across teams
- Ensure compliance with standards
- Create audit or review checklists

**Do NOT use this task if:**

- You need a simple list (use knowledge base or documentation instead)
- Requirements are constantly changing (stabilize first)
- The process is too simple to need validation (<10 items)

## Input Requirements

### Required Information

- **Checklist purpose**: What does this checklist validate or ensure?
- **Checklist name**: Descriptive kebab-case name (e.g., api-design-quality, deployment-readiness)
- **User description**: Brief description of what user wants to validate

### Optional Information

- **Target size**: Quick (15-30), Standard (40-80), Comprehensive (100-200), Exhaustive (200+)
- **Context**: Specific domain or process being validated
- **Standards reference**: Related RFCs, documentation, or compliance requirements
- **Existing checklists**: Similar checklists to use as reference

## Task Execution Steps

### Step 1: Requirements Analysis

**Actions:**

1. Parse the user's description to understand validation purpose
2. Identify the scope and boundaries of the checklist
3. Determine appropriate size (quick, standard, comprehensive, exhaustive)
4. Identify key stakeholders and target audience
5. List critical aspects that must be covered
6. Determine if specialized sections are needed

**Tools Used:**

- Analysis of user input
- Knowledge of existing checklists for patterns

**Outputs:**

- Checklist purpose statement
- Scope definition
- Target size (item count and section count)
- Key aspects to cover
- Audience identification

---

### Step 2: Template Review

**Actions:**

1. Read `.opencode/template/opencode-checklist-tmpl.yaml`
2. Understand required frontmatter fields
3. Review section structure patterns
4. Study formatting guidelines (checkboxes, emphasis, emojis)
5. Note size guidelines and checklist types
6. Review best practices

**Tools Used:**

- Read tool to access template

**Outputs:**

- Understanding of template structure
- Required frontmatter fields
- Section organization patterns
- Formatting requirements
- Size guidelines

---

### Step 3: Example Study

**Actions:**

1. Identify 2-3 similar existing checklists
2. Review their organization and structure
3. Note effective item formulation patterns
4. Observe how they handle subsections
5. Learn from their completeness and clarity

**Tools Used:**

- List/Glob to find checklists in `checklist/` directory
- Read tool to examine existing checklists

**Suggested Examples by Type:**

- **Documentation**: `api-documentation.md`, `development-documentation.md`
- **Quality**: `jira-ticket-creation.md`
- **Compliance**: `ai-tool-approval.md`
- **Architecture**: `architecture-documentation.md`
- **Operations**: `deployment-documentation.md`

**Outputs:**

- Organizational patterns
- Item formulation examples
- Subsection strategies
- Completeness benchmarks

---

### Step 4: Checklist Design

**Actions:**

1. Design frontmatter
   - Title
   - Description
   - Version (1.0.0)
   - Last updated date
   - Optional reference to standards
   - Category

2. Plan section structure (8-12 major sections)
   - Overview/Introduction section
   - Prerequisites/Requirements section
   - Core process sections (3-5 sections)
   - Quality standards section
   - Specialized sections (as applicable)
   - Review/Validation section

3. Design items for each section
   - Make items verifiable (yes/no)
   - Use clear, action-oriented language
   - Add context where needed
   - Include sub-items for complex requirements
   - Use bold for key points

4. Plan formatting
   - Section emojis (📋, ✅, 🎯, 📊, 🔍)
   - Checkbox hierarchy
   - Tables for complex categorization
   - Code blocks for technical examples

**Tools Used:**

- Planning and design

**Outputs:**

- Complete checklist design
- Frontmatter configuration
- Section organization plan
- Item list for each section
- Formatting plan

---

### Step 5: Checklist Creation

**Actions:**

1. Create checklist file in `checklist/[kebab-case-name].md`

2. Write frontmatter:

   ```yaml
   ---
   title: Checklist Name
   description: Brief description of what this validates
   version: 1.0.0
   last_updated: YYYY-MM-DD
   reference: Optional reference to standards/RFCs
   category: Documentation | Development | Operations | Quality
   ---
   ```

3. Write introduction (1-2 paragraphs)
   - Purpose and importance
   - When to use
   - How to use

4. Create 8-12 major sections with emojis:
   - Use `## 📋 1. [Section Name]` format
   - Add subsections with `### [Subsection Name]`
   - Create checkbox items: `- [ ] **Key Point**: Explanation`
   - Add nested items: `- [ ] Sub-item` (2-space indent)

5. Add quality standards section: `## 🎯 Quality Standards`

6. Add specialized sections if applicable: `## 📊 Specialized Sections`

7. Add review checklist: `## 🔍 Review Checklist`

8. Add references section

**Tools Used:**

- Write tool to create checklist file

**Outputs:**

- Complete checklist file in `checklist/` directory

---

### Step 6: Validation

**Actions:**

1. **Run Validation Tools** (REQUIRED):

   ```
   validate_frontmatter({ type: "checklist", file: "checklist-filename" })
   validate_resource_content({ type: "checklist", file: "checklist-filename" })
   ```

   - Fix all errors (prevent resource loading)
   - Address warnings (affect quality)
   - Target quality score: 80+/100

2. Verify frontmatter is valid YAML and compliant
3. Check description is clear and concise
4. Confirm 8-12 major sections present
5. Validate items are verifiable (yes/no)
6. Ensure consistent formatting throughout
7. Check emoji usage is appropriate
8. Verify item count matches target size (15-30+ items)
9. Ensure template compliance
10. Check for balanced detail (not too sparse, not overwhelming)

**Tools Used:**

- `validate_frontmatter` - Check metadata compliance
- `validate_resource_content` - Check structure and quality
- Read tool to review created file
- Validation against template

**Outputs:**

- Validation results
- Item count per section
- Total item count
- List of any issues to fix

---

### Step 7: Integration Documentation

**Actions:**

1. Note which commands should reference this checklist
2. Identify which agents should use this checklist
3. Determine if related checklists need cross-references
4. Document usage instructions
5. Note maintenance triggers

**Tools Used:**

- Planning

**Outputs:**

- Integration notes
- Usage instructions
- Related checklists
- Maintenance guidance

---

## Task Output Summary

The task generates one primary file:

1. **Checklist File** (`checklist/[name].md`)
   - Valid YAML frontmatter with metadata
   - Clear introduction explaining purpose and usage
   - 8-12 major sections with emoji icons
   - Verifiable checkbox items (yes/no answers)
   - Subsections for organization
   - Quality standards section
   - Specialized sections (as applicable)
   - Review checklist
   - References section

## Success Criteria

- ✅ Checklist file created in `checklist/` directory
- ✅ Filename is kebab-case with .md extension
- ✅ Valid YAML frontmatter with required fields
- ✅ Clear introduction (1-2 paragraphs)
- ✅ 8-12 major sections with appropriate emojis
- ✅ Items are verifiable (yes/no)
- ✅ Clear, action-oriented language
- ✅ Appropriate size for complexity (20-400 items)
- ✅ Quality standards section included
- ✅ Review checklist included
- ✅ References section with links
- ✅ Follows template structure
- ✅ Balanced completeness and usability

## Quality Checks

### Completeness Check

- [ ] All critical aspects covered
- [ ] Prerequisites clearly stated
- [ ] Core process sections comprehensive
- [ ] Quality standards defined
- [ ] Edge cases addressed
- [ ] Review checklist complete

### Accuracy Check

- [ ] Items are specific and verifiable
- [ ] Technical terms defined
- [ ] References are correct
- [ ] Examples are accurate
- [ ] Standards compliance verified

### Clarity Check

- [ ] Action-oriented language used
- [ ] Ambiguous terms avoided
- [ ] Context provided where needed
- [ ] Consistent formatting throughout
- [ ] Readable and not overwhelming

### Usability Check

- [ ] Appropriate size for purpose
- [ ] Logical organization
- [ ] Self-service friendly
- [ ] Examples included where helpful
- [ ] Links to tools/processes provided

## Error Handling

### Common Issues and Resolutions

**Issue: Checklist purpose unclear**

- Ask user for clarification on validation goals
- Suggest appropriate checklist name based on purpose

**Issue: Scope too broad**

- Break into multiple focused checklists
- Suggest creating separate checklists for different aspects

**Issue: Size unclear**

- Quick (15-30): Daily operations, quick verification
- Standard (40-80): Standard procedures, feature development
- Comprehensive (100-200): Complex evaluations, audits
- Exhaustive (200+): Complete standards compliance

**Issue: Items not verifiable**

- Rewrite vague items to have clear yes/no answers
- Add specific criteria or thresholds
- Provide examples for complex items

**Issue: Too many or too few sections**

- Aim for 8-12 major sections
- Combine related small sections
- Split overly large sections into subsections

**Issue: Inconsistent formatting**

- Review template formatting guidelines
- Ensure emoji usage is consistent
- Check checkbox hierarchy and indentation

## Examples

### Example 1: Code Quality Checklist (Standard)

**Input:**

- Purpose: Validate code quality before merge
- Name: code-quality-review
- Size: Standard (40-80 items)
- Context: Pull request review process

**Task Execution:**

1. Analyze: Standard checklist for PR reviews
2. Review template: Study structure and formatting
3. Study examples: Review quality-focused checklists
4. Design:
   - 9 sections: Overview, Prerequisites, Code Structure, Testing, Documentation, Security, Performance, Error Handling,
     Review
   - ~60 items total
5. Create: Checklist with verifiable items
6. Validate: Check item count and clarity
7. Document: Note PR review integration

**Outputs:**

- Checklist: `checklist/code-quality-review.md`
- Sections: 9 major sections
- Items: ~60 verifiable items
- Integration: Reference in PR review process

---

### Example 2: API Design Checklist (Comprehensive)

**Input:**

- Purpose: Ensure complete API design quality
- Name: api-design-quality
- Size: Comprehensive (100-200 items)
- Context: New API development

**Task Execution:**

1. Analyze: Comprehensive API validation
2. Review template: Study comprehensive checklist patterns
3. Study examples: Review `api-documentation.md` for patterns
4. Design:
   - 12 sections: Overview, Requirements, Design, Endpoints, Authentication, Data Models, Error Handling, Documentation,
     Security, Performance, Testing, Review
   - ~150 items total
5. Create: Comprehensive checklist
6. Validate: Check completeness and balance
7. Document: Note API development workflow integration

**Outputs:**

- Checklist: `checklist/api-design-quality.md`
- Sections: 12 major sections
- Items: ~150 verifiable items
- Integration: Reference in API development commands

---

### Example 3: Deployment Readiness Checklist (Quick)

**Input:**

- Purpose: Quick pre-deployment verification
- Name: deployment-readiness-quick
- Size: Quick (15-30 items)
- Context: Daily deployment checks

**Task Execution:**

1. Analyze: Quick validation before deployment
2. Review template: Study quick checklist patterns
3. Study examples: Review operational checklists
4. Design:
   - 5 sections: Prerequisites, Build, Tests, Configuration, Final Checks
   - ~25 items total
5. Create: Focused quick checklist
6. Validate: Check coverage and brevity
7. Document: Note deployment workflow integration

**Outputs:**

- Checklist: `checklist/deployment-readiness-quick.md`
- Sections: 5 major sections
- Items: ~25 critical items
- Integration: Reference in deployment commands

---

## Task Parameters

### Checklist Size Guidelines

**Quick Reference (15-30 items, 3-5 sections)**

- Use case: Daily operations, quick verification
- Sections: Focus on critical items only
- Detail: Minimal but essential

**Standard Process (40-80 items, 6-10 sections)**

- Use case: Standard procedures, feature development
- Sections: Comprehensive coverage of main aspects
- Detail: Balanced detail for common scenarios

**Comprehensive Assessment (100-200 items, 10-15 sections)**

- Use case: Complex evaluations, audits, major initiatives
- Sections: Deep coverage with specialized sections
- Detail: Thorough coverage including edge cases

**Exhaustive Guide (200+ items, 12-20 sections)**

- Use case: Complete standards compliance, enterprise processes
- Sections: Complete coverage of all aspects
- Detail: Maximum detail with all scenarios covered

### Section Organization Patterns

**Standard Sections:**

1. Overview/Introduction (purpose, scope, usage)
2. Prerequisites/Requirements (what's needed to start)
3. Core Process Sections (3-5 sections, domain-specific)
4. Quality Standards (quality criteria and best practices)
5. Specialized Sections (optional, context-specific)
6. Review/Validation (final checks before completion)

**Section Emojis:**

- 📋 Checklist/requirements sections
- ✅ Completion/validation sections
- 🎯 Quality standards/goals
- 📊 Specialized/conditional sections
- 🔍 Review/inspection sections
- 🚨 Warnings/critical sections
- 🔧 Tools/utilities sections

### Item Formulation Patterns

**Basic item:**

```markdown
- [ ] Item description
```

**Key point with context:**

```markdown
- [ ] **Key Point**: Additional context or explanation
```

**Nested sub-items:**

```markdown
- [ ] Parent requirement
  - [ ] Sub-requirement 1
  - [ ] Sub-requirement 2
```

## Template Reference

**Primary Template**: `.opencode/template/opencode-checklist-tmpl.yaml`

**Required Frontmatter:**

- `title` - Checklist name
- `description` - Brief description
- `version` - Semantic version (1.0.0)
- `last_updated` - ISO date (YYYY-MM-DD)

**Optional Frontmatter:**

- `reference` - Related standards/RFCs
- `category` - Classification

**Example Checklists:** Browse `checklist/` directory for patterns

## Best Practices

### Checklist Design

- Start with clear purpose statement
- Use consistent formatting throughout
- Make each item specific and verifiable
- Group related items logically
- Include context where needed
- Balance completeness with usability

### Item Formulation

- Use action-oriented language
- Avoid ambiguous terms ("consider", "maybe")
- Be specific about what to check
- Define technical terms on first use
- Include examples for complex items
- Link to tools or processes

### Organization

- 8-12 major sections for balance
- 2-5 subsections per major section
- Hierarchical organization (high-level to detailed)
- Progressive detail (basic to complex)
- Logical ordering (sequential or by priority)

### Formatting

- Use emojis in H2 headers only
- Consistent checkbox format
- Proper indentation for nested items (2 spaces)
- Bold for key terms
- Code blocks for technical examples
- Tables for complex categorization

## Maintenance

### Review Triggers

- Process changes
- Tool updates
- Standard revisions
- User feedback
- Incident learnings
- Quarterly reviews

### Update Process

1. Review feedback and usage data
2. Identify gaps or outdated items
3. Update checklist with new requirements
4. Update version number (major changes)
5. Update last_updated date
6. Test with real users
7. Document changes in commits

## References

- Template: `.opencode/template/opencode-checklist-tmpl.yaml`
- Examples: `.opencode/checklist/*.md` (all existing checklists)
- Documentation: `.opencode/docs/template-standard.md`
