---
description: Task for creating new OpenCode tasks following templates
mode: task
temperature: 0.2
version: 1.0.0
last_updated: 2025-11-11
category: Development
type: task
tags:
  - opencode
  - creating
  - tasks
  - task
  - workflow
  - automation
  - execution
title: Opencode Task Task
estimated_duration: 5-10 minutes
---

# Create OpenCode Task Task

This task guides the creation of new OpenCode tasks following established templates and best practices.

## Purpose

Create well-structured OpenCode tasks that:

- Follow the template structure exactly
- Include 3-7 sequential execution steps
- Have clear success criteria and quality checks
- Include 2-3 comprehensive examples
- Document inputs, outputs, and error handling
- Integrate with other OpenCode resources

## When to Use This Task

Use this task when you need to:

- Create reusable workflow definitions
- Standardize multi-step processes
- Build analysis or generation workflows
- Define repeatable procedures with validation
- Create autonomous task execution definitions

**Do NOT use this task if:**

- The workflow is simple (<3 steps) - use a command instead
- Requirements are constantly changing - stabilize first
- The process is ad-hoc and won't be reused

## Input Requirements

### Required Information

- **Task purpose**: What does this task accomplish?
- **Task name**: Descriptive kebab-case name (e.g., security-audit, code-review-workflow)
- **User description**: Brief description of what user wants the task to do

### Optional Information

- **Temperature preference**: 0.0-0.3 (deterministic), 0.4-0.6 (balanced), 0.7+ (creative)
- **Task type**: Analysis, generation, evaluation, or workflow
- **Related resources**: Existing checklists, templates, or knowledge bases
- **Target complexity**: Simple (3-5 steps), standard (4-7 steps), complex (6-9 steps)

## Task Execution Steps

### Step 1: Requirements Analysis

**Actions:**

1. Parse the user's description to understand task purpose
2. Identify the task type (analysis, generation, evaluation, workflow)
3. Determine complexity level (simple, standard, complex)
4. Identify required and optional inputs
5. Define expected outputs and success criteria
6. Assess appropriate temperature setting

**Tools Used:**

- Analysis of user input
- Knowledge of existing tasks for patterns

**Outputs:**

- Task purpose statement
- Task type classification
- Complexity level
- Input requirements list
- Output specifications
- Temperature recommendation

---

### Step 2: Template Review

**Actions:**

1. Read `.opencode/template/opencode-task-tmpl.yaml`
2. Understand required frontmatter fields (description, mode)
3. Review optional frontmatter fields (temperature, version, category)
4. Study main document sections structure
5. Review task type patterns (workflow vs shell analysis)
6. Note formatting guidelines and content principles

**Tools Used:**

- Read tool to access template

**Outputs:**

- Understanding of template structure
- Required frontmatter fields
- Document section requirements
- Formatting standards
- Content principles

---

### Step 3: Example Study

**Actions:**

1. Identify 2-3 similar existing tasks
2. Review their structure and approach
3. Note effective step formulation patterns
4. Observe input/output documentation methods
5. Learn from their examples and error handling

**Tools Used:**

- List/Glob to find tasks in `task/` directory
- Read tool to examine existing tasks

**Suggested Examples by Type:**

- **Analysis tasks**: `technology-detection.md`, `infrastructure-analysis.md`
- **Generation tasks**: `opencode-agent.md`, `opencode-command.md`
- **Evaluation tasks**: `ai-tool-approval-research.md`
- **Workflow tasks**: `deployment-strategy.md`, `pipeline-architect.md`

**Outputs:**

- Structural patterns
- Step formulation examples
- Documentation approaches
- Example formats

---

### Step 4: Task Design

**Actions:**

1. Design frontmatter
   - Description (clear, one-line, required)
   - Mode (always "task")
   - Temperature (based on task type)
   - Version (1.0.0)
   - Last updated (current date)
   - Category (Analysis, Documentation, Development, Operations)

2. Write overview paragraph
   - One paragraph explaining what task accomplishes

3. Design Purpose section
   - Task goals and objectives
   - Target users
   - Value proposition

4. Plan "When to Use This Task" section
   - Use cases (when to use)
   - Anti-patterns (when NOT to use)

5. Define Input Requirements
   - Required information (what's mandatory)
   - Optional information (what's helpful)

6. Design execution steps (3-7 steps)
   - Step name
   - Actions (what to do)
   - Tools Used (which OpenCode tools)
   - Outputs (what's produced)

7. Specify outputs
   - Primary artifacts generated
   - Format and location

8. Define success criteria
   - Measurable completion indicators

9. Create quality checks
   - Completeness check
   - Accuracy check
   - Clarity check

10. Plan examples (2-3 minimum)
    - Different use case scenarios
    - Input → Execution → Output format

11. Add references
    - Templates used
    - Related tasks
    - Documentation links

**Tools Used:**

- Planning and design

**Outputs:**

- Complete task design
- Frontmatter configuration
- All section content planned
- Step breakdown with actions/tools/outputs

---

### Step 5: Task Creation

**Actions:**

1. Create task file in `task/[kebab-case-name].md`

2. Write frontmatter:

   ```yaml
   ---
   description: Brief one-line description
   mode: task
   temperature: 0.0-1.0
   version: 1.0.0
   last_updated: YYYY-MM-DD
   category: Analysis | Documentation | Development | Operations
   ---
   ```

3. Write one-paragraph overview

4. Create Purpose section with goals and objectives

5. Write "When to Use This Task" section with use cases and anti-patterns

6. Document Input Requirements
   - Required Information subsection
   - Optional Information subsection

7. Create Task Execution Steps (3-7 steps)

   ```markdown
   ### Step N: [Step Name]

   **Actions:**

   1. Action item

   **Tools Used:**

   - Tool for purpose

   **Outputs:**

   - Output description

   ---
   ```

8. Write Task Output Summary describing primary artifacts

9. Define Success Criteria with ✅ checkboxes

10. Create Quality Checks section
    - Completeness Check with [ ] items
    - Accuracy Check with [ ] items
    - Clarity Check with [ ] items

11. Add Error Handling section (optional) with common issues and resolutions

12. Create Examples section (2-3 examples)

    ```markdown
    ### Example N: [Use Case Name]

    **Input:**

    - Parameter: Value

    **Task Execution:**

    1. What happened

    **Outputs:**

    - Output: Description

    ---
    ```

13. Add Task Parameters section (optional) if configurable

14. Add Maintenance section (optional) with review triggers

15. Write References section with links to templates, tasks, docs

**Tools Used:**

- Write tool to create task file

**Outputs:**

- Complete task file in `task/` directory

---

### Step 6: Validation

**Actions:**

1. **Run Validation Tools** (REQUIRED):

   ```
   validate_frontmatter({ type: "task", file: "task-filename" })
   validate_resource_content({ type: "task", file: "task-filename" })
   ```

   - Fix all errors (prevent resource loading)
   - Address warnings (affect quality)
   - Target quality score: 80+/100

2. Verify frontmatter is valid YAML and compliant
3. Check description is clear and one-line (under 120 chars)
4. Confirm mode is "task"
5. Validate temperature is appropriate (0.0-0.3 for most tasks)
6. Ensure version and date are present
7. Check 3-7 execution steps exist
8. Verify each step has Actions/Tools/Outputs
9. Confirm 2-3 examples are present
10. Ensure success criteria are measurable
11. Check quality checks are comprehensive
12. Verify template compliance
13. Validate all section headers match template

**Tools Used:**

- `validate_frontmatter` - Check metadata compliance
- `validate_resource_content` - Check structure and quality
- Read tool to review created file
- Validation against template

**Outputs:**

- Validation results
- Section count
- Step count
- Example count
- List of any issues to fix

---

### Step 7: Integration Documentation

**Actions:**

1. Note which commands should invoke this task
2. Identify which agents should use this task
3. Determine if related tasks need cross-references
4. Document usage instructions
5. Note maintenance triggers

**Tools Used:**

- Planning

**Outputs:**

- Integration notes
- Command usage instructions
- Related tasks
- Maintenance guidance

---

## Task Output Summary

The task generates one primary file:

1. **Task File** (`task/[name].md`)
   - Valid YAML frontmatter with metadata
   - One paragraph overview
   - Purpose section with goals
   - When to Use section with use cases and anti-patterns
   - Input Requirements with required and optional info
   - 3-7 sequential execution steps with Actions/Tools/Outputs
   - Task Output Summary describing artifacts
   - Success Criteria with ✅ items
   - Quality Checks with [ ] items
   - Error Handling (optional)
   - 2-3 comprehensive examples
   - Task Parameters (optional)
   - Maintenance (optional)
   - References section

## Success Criteria

- ✅ Task file created in `task/` directory
- ✅ Filename is kebab-case with .md extension
- ✅ Valid YAML frontmatter with required fields
- ✅ Description is clear and one-line
- ✅ Mode is set to "task"
- ✅ Temperature is appropriate for task type
- ✅ One paragraph overview exists
- ✅ 3-7 execution steps with Actions/Tools/Outputs
- ✅ Success criteria are measurable
- ✅ Quality checks are comprehensive
- ✅ 2-3 examples included
- ✅ References section with links
- ✅ Follows template structure

## Quality Checks

### Completeness Check

- [ ] Frontmatter includes description, mode, temperature
- [ ] Version and last_updated present
- [ ] Purpose section comprehensive
- [ ] When to Use section includes anti-patterns
- [ ] Input Requirements clearly defined
- [ ] 3-7 execution steps present
- [ ] Each step has Actions/Tools/Outputs
- [ ] Task Output Summary describes artifacts
- [ ] Success criteria defined
- [ ] Quality checks included
- [ ] 2-3 examples present
- [ ] References section exists

### Accuracy Check

- [ ] Task purpose matches user request
- [ ] Temperature suits task type
- [ ] Steps are sequential and logical
- [ ] Tools are appropriate for actions
- [ ] Outputs match stated goals
- [ ] Examples are realistic and complete
- [ ] References are valid

### Clarity Check

- [ ] Description is clear and concise
- [ ] Steps are actionable
- [ ] Actions are specific
- [ ] Outputs are well-defined
- [ ] Examples are easy to follow
- [ ] Success criteria are measurable

### Structure Check

- [ ] Follows template section order
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Consistent formatting throughout
- [ ] Horizontal rules between steps
- [ ] Code blocks for examples where helpful

## Error Handling

### Common Issues and Resolutions

**Issue: Task purpose unclear**

- Ask user for clarification on objectives
- Suggest appropriate task name based on purpose
- Review similar tasks for patterns

**Issue: Steps unclear or incomplete**

- Break down workflow into 3-7 sequential steps
- Ensure each step has clear Actions/Tools/Outputs
- Review example tasks for step formulation

**Issue: Temperature unclear**

- Default to 0.3 for balanced tasks
- Use 0.0-0.2 for deterministic analysis
- Use 0.4-0.6 for general purpose
- Use 0.7+ for creative content generation

**Issue: Examples insufficient**

- Require minimum 2-3 complete examples
- Each example needs Input/Execution/Outputs
- Show different use case scenarios
- Make examples realistic and followable

**Issue: Success criteria vague**

- Make criteria measurable (✅ format)
- Use specific, verifiable statements
- Avoid ambiguous language
- Tie to task outputs

## Examples

### Example 1: Analysis Task (Simple)

**Input:**

- Purpose: Analyze project dependencies for security issues
- Name: dependency-security-scan
- Type: Analysis task
- Complexity: Simple (3-5 steps)

**Task Execution:**

1. Analyze: Simple security analysis workflow
2. Review template: Study analysis task patterns
3. Study examples: Review `technology-detection.md`
4. Design:
   - Temperature: 0.2 (deterministic)
   - 4 steps: Discover dependencies, Scan for vulnerabilities, Analyze results, Report findings
   - 2 examples: Node.js project, Python project
5. Create: Task with clear analysis steps
6. Validate: Check structure and examples
7. Document: Note integration with security commands

**Outputs:**

- Task: `task/dependency-security-scan.md`
- Steps: 4 sequential steps
- Temperature: 0.2
- Examples: 2 complete scenarios

---

### Example 2: Generation Task (Standard)

**Input:**

- Purpose: Generate API documentation from code analysis
- Name: api-doc-generation
- Type: Generation task
- Complexity: Standard (4-7 steps)

**Task Execution:**

1. Analyze: Documentation generation workflow
2. Review template: Study generation task patterns
3. Study examples: Review `opencode-command.md` for generation patterns
4. Design:
   - Temperature: 0.3 (slightly creative for docs)
   - 6 steps: Analyze codebase, Extract API endpoints, Document schemas, Generate examples, Validate completeness,
     Format output
   - 3 examples: REST API, GraphQL API, gRPC API
5. Create: Task with generation workflow
6. Validate: Check all steps and outputs
7. Document: Note documentation command integration

**Outputs:**

- Task: `task/api-doc-generation.md`
- Steps: 6 sequential steps
- Temperature: 0.3
- Examples: 3 different API types

---

### Example 3: Workflow Task (Complex)

**Input:**

- Purpose: Complete security audit workflow with reporting
- Name: comprehensive-security-audit
- Type: Workflow task
- Complexity: Complex (6-9 steps)

**Task Execution:**

1. Analyze: Multi-stage security audit process
2. Review template: Study complex workflow patterns
3. Study examples: Review `ai-tool-approval-research.md` for multi-stage workflows
4. Design:
   - Temperature: 0.2 (deterministic analysis)
   - 8 steps: Planning, Dependency scan, Code analysis, Configuration review, Access control audit, Data flow analysis,
     Report generation, Recommendations
   - 3 examples: Web application, API service, Infrastructure audit
5. Create: Task with comprehensive workflow
6. Validate: Check all steps, quality checks, examples
7. Document: Note security command integration

**Outputs:**

- Task: `task/comprehensive-security-audit.md`
- Steps: 8 sequential steps
- Temperature: 0.2
- Examples: 3 different audit contexts

---

## Task Parameters

### Task Type Patterns

**Analysis Tasks** (`Input → Analysis → Output Summary`)

- Temperature: 0.0-0.3 (deterministic)
- Steps: Data gathering, Analysis, Pattern detection, Summary
- Examples: technology-detection, infrastructure-analysis

**Generation Tasks** (`Gather Info → Process → Generate → Validate`)

- Temperature: 0.3-0.5 (balanced)
- Steps: Requirements, Template selection, Generation, Validation
- Examples: opencode-agent, opencode-command

**Evaluation Tasks** (`Criteria → Assess → Score → Recommend`)

- Temperature: 0.2-0.4 (analytical)
- Steps: Criteria definition, Assessment, Scoring, Recommendations
- Examples: ai-tool-approval-research

**Workflow Tasks** (`Setup → Execute → Review → Document`)

- Temperature: 0.2-0.4 (balanced)
- Steps: Setup, Multiple execution phases, Review, Documentation
- Examples: deployment-strategy, pipeline-architect

### Temperature Guidelines

- **0.0-0.2**: Highly deterministic
  - Use for: Security audits, compliance checks, data analysis
- **0.3-0.5**: Balanced
  - Use for: Documentation generation, code review, general workflows
- **0.6-1.0**: Creative
  - Use for: Brainstorming, content generation, exploration

**Recommendation**: Use 0.0-0.3 for most tasks to ensure consistency

### Complexity Guidelines

**Simple (3-5 steps, 6-8 sections, 2 examples)**

- Single-purpose tasks
- Straightforward workflows
- Minimal complexity

**Standard (4-7 steps, 8-10 sections, 2-3 examples)**

- Standard workflows
- Moderate complexity
- Common use cases

**Complex (6-9 steps, 10-12 sections, 3-4 examples)**

- Multi-stage processes
- High complexity
- Specialized workflows

## Template Reference

**Primary Template**: `.opencode/template/opencode-task-tmpl.yaml`

**Required Frontmatter:**

- `description` - Brief one-line description (REQUIRED for task discovery)
- `mode` - Always "task"

**Optional Frontmatter:**

- `temperature` - 0.0-1.0 (default: 0.7)
- `version` - Semantic version
- `last_updated` - ISO date (YYYY-MM-DD)
- `category` - Classification

**Required Sections:**

1. Title (H1)
2. Overview paragraph
3. Purpose
4. When to Use This Task
5. Input Requirements
6. Task Execution Steps (3-7 steps)
7. Task Output Summary
8. Success Criteria
9. Quality Checks
10. Examples (2-3 minimum)
11. References

**Optional Sections:**

- Error Handling
- Task Parameters
- Maintenance

**Example Tasks:** Browse `task/` directory for patterns

## Best Practices

### Task Design

- Focus on single primary objective
- Make tasks composable and reusable
- Minimize dependencies on other tasks
- Provide clear success criteria
- Include comprehensive error handling

### Step Formulation

- Make steps sequential and logical
- Specify tools clearly for each step
- Document intermediate outputs
- Include verification steps
- Handle edge cases

### Documentation

- Write clear descriptions (required for discovery)
- Include comprehensive examples
- Document all inputs and outputs
- Explain the "why" not just "what"
- Link to related resources

### Examples

- Include 2-3 minimum (template requirement)
- Show different use case scenarios
- Use Input/Execution/Outputs format
- Make examples realistic and followable
- Cover edge cases in examples

## Maintenance

### Review Triggers

- Process changes requiring updates
- Tool updates affecting execution
- New use cases discovered
- Feedback from task execution
- Integration updates
- Quarterly reviews

### Update Process

1. Review task usage and feedback
2. Check if template has been updated
3. Update task to match new patterns
4. Update version number (major changes)
5. Update last_updated date
6. Test task execution after updates
7. Document changes in commits

## References

- Template: `.opencode/template/opencode-task-tmpl.yaml`
- Examples: `.opencode/task/*.md` (all existing tasks)
