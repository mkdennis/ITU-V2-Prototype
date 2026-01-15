# Reusable Prompts - ITU-V2-Prototype

This file contains copy-paste prompts for common workflows across the entire project.

---

## Starting a New Feature

```
I want to start a new feature: [feature name].

First, let's create the spec structure:
1. Create specs/[feature-name]/ folder
2. Copy all templates from specs/_templates/
3. Start with a design document

Ask me questions to understand the feature requirements, then draft design.md.
Use Plan Mode for this.
```

---

## Review Existing Feature Design

```
Review the design document for [feature name] at specs/[feature-name]/design.md.

Check for:
- Clarity of requirements
- Missing edge cases
- Technical feasibility given our stack (React 19, TypeScript, Vite)
- Consistency with existing components and patterns
- Missing dependencies
- Accessibility requirements
- Mobile considerations
- Performance implications

Provide specific, actionable feedback.
```

---

## Implement Feature (Small PR)

```
Implement [specific small piece] of [feature name].

Requirements:
1. Read specs/[feature-name]/design.md first
2. Check specs/[feature-name]/implementation.md for context
3. Review relevant ADRs in decisions.md
4. Keep this PR under 10 minutes to review (max 5-7 files, 500 lines)
5. Update implementation.md when done
6. Add decision record if you made important choices

Do NOT implement the whole feature - just this one piece.
```

---

## Sync Design with Implementation

```
Compare the current implementation of [feature name] to its design document at specs/[feature-name]/design.md.

For each component/section:
1. What's implemented and matches the design
2. What's implemented but deviates from design (note why)
3. What's specified but not yet implemented
4. What exists in code but not in design doc

Update specs/[feature-name]/implementation.md with current accurate status.
```

---

## Create Feature Examples

```
Create runnable examples for [feature name].

Based on specs/[feature-name]/design.md, create examples that demonstrate:
- Basic usage (happy path)
- Common variations
- Edge cases from the design doc
- Error handling

Requirements:
- Examples must actually run
- Include clear comments
- Keep examples focused and minimal
- Document results in specs/[feature-name]/TESTING.md
```

---

## Run All Tests

```
Run the full test suite for this project.

Steps:
1. Run yarn lint
2. Run yarn build
3. Run yarn test (if tests exist)
4. Check for TypeScript errors
5. Note any warnings or errors

Report the results and fix any failures.
```

---

## Accessibility Audit

```
Audit [component/feature name] for accessibility.

Check:
- Keyboard navigation (Tab, Enter, Space, Arrow keys, Escape)
- Screen reader support (ARIA labels, roles, live regions)
- Focus management and visibility
- Color contrast (WCAG AA: 4.5:1 for text)
- Touch target sizes (min 44x44px)
- Respect for prefers-reduced-motion
- Form labels and error messages

Test with:
- Keyboard only (no mouse)
- Screen reader (describe behavior)

Document findings and fix critical issues.
```

---

## Performance Check

```
Check the performance of [component/feature].

Measure:
- Initial render time
- Re-render performance
- Bundle size impact (yarn build and check dist/)
- Memory usage
- Any janky interactions

Test with:
- Chrome DevTools Performance tab
- React DevTools Profiler
- Lighthouse

Document results in specs/[feature-name]/TESTING.md if relevant.
Success criteria: No obvious performance issues, smooth 60fps interactions.
```

---

## Prepare Commit

```
Prepare a commit for the current changes.

Steps:
1. Run git status to see all changes
2. Run git diff to review changes
3. Review recent commits (git log -5 --oneline) for message style
4. Stage relevant files with git add
5. Create commit with clear message following repo conventions

DO NOT push yet - just create the commit.
```

---

## Create Pull Request

```
Create a pull request for [feature/fix name].

Steps:
1. Ensure all changes are committed
2. Run git status to verify clean state
3. Push to branch: git push -u origin claude/[description]-[session-id]
4. Create PR using gh pr create with:
   - Clear title describing the change
   - Body with:
     - Summary (2-3 bullet points)
     - Link to design doc (if applicable)
     - Test plan (how to verify)
     - Screenshots (for UI changes)

DO NOT skip the test plan.
```

---

## Fix TypeScript Errors

```
Fix all TypeScript errors in the project.

Steps:
1. Run yarn build to see all errors
2. Fix errors one by one
3. Do NOT use 'any' type unless absolutely necessary (document why if you do)
4. Ensure types are properly defined in src/types/
5. Run yarn build again to verify

Report how many errors were fixed.
```

---

## Code Review Checklist

```
Review the code changes in [file/component].

Check for:
- Type safety (no inappropriate 'any' types)
- Error handling
- Edge cases from design doc
- Consistency with existing code patterns
- Security issues (XSS, injection, etc.)
- Performance implications
- Accessibility
- Mobile responsiveness (for UI)
- Code clarity and comments (only where needed)

Provide specific feedback or approval.
```

---

## Refactor Component

```
Refactor [component name] to [specific goal].

Requirements:
1. Read the existing component first
2. Maintain existing functionality (no behavior changes)
3. Maintain existing prop API (or document breaking changes)
4. Improve [specific aspect: performance/readability/type safety/etc]
5. Keep the change focused and small

If this requires breaking changes, document them clearly.
```

---

## Add Decision Record

```
Add an Architecture Decision Record for [decision name].

Create ADR in specs/[feature-name]/decisions.md following the format:

**Context**: What problem are we solving?
**Options**: What alternatives did we consider? (list pros/cons)
**Decision**: What did we choose and why?
**Consequences**: What are the trade-offs? (positive, negative, mitigation)

Be specific and thorough.
```

---

## Session Handoff

```
Create a handoff summary for the next coding session.

Include:
1. What was accomplished this session
2. Current state of any in-progress features (from implementation.md files)
3. What should be worked on next (in priority order)
4. Any blockers or open questions
5. Links to relevant PRs or commits
6. Important context or gotchas to remember

Format this clearly for easy reading.
```

---

## Emergency: Fix Production Bug

```
URGENT: Fix production bug - [bug description]

Steps:
1. Reproduce the bug locally
2. Identify root cause
3. Create minimal fix (do NOT refactor, do NOT add features)
4. Test the fix thoroughly
5. Create focused PR with:
   - "BUGFIX:" prefix in title
   - Clear description of bug and fix
   - How to verify the fix
   - Why this approach vs alternatives

Speed matters, but don't skip testing.
```

---

## Update Dependencies

```
Update project dependencies safely.

Steps:
1. Run yarn outdated to see what's outdated
2. Check changelogs for major updates
3. Update dev dependencies first
4. Update production dependencies (one at a time if major)
5. Run yarn install
6. Run yarn build and yarn lint
7. Test that dev server works (yarn dev)
8. Document any breaking changes

Do NOT update everything at once if there are major version changes.
```

---

## Create Component from Design

```
Create a new [component name] component based on [design/mockup/description].

Steps:
1. Check if similar components exist (look in src/components/)
2. Follow existing component patterns
3. Define TypeScript interface for props
4. Implement component with proper types
5. Add to src/components/
6. Create simple example usage
7. Ensure accessibility (ARIA labels, keyboard nav)

Keep it simple and focused. Don't over-engineer.
```

---

## Codebase Exploration

```
I need to understand [specific aspect] of the codebase.

Please:
1. Search for relevant files
2. Read and explain the key parts
3. Identify the main patterns being used
4. Note any important constraints or conventions
5. Suggest where to start if I want to modify this

Help me build a mental model of how this works.
```

---

## Generate Design Doc from Existing Code

```
Generate a design document for the existing [feature/component] at [path].

Steps:
1. Read all relevant code
2. Reverse-engineer the requirements and approach
3. Document in specs/[feature-name]/design.md format:
   - Overview
   - Goals (inferred)
   - Technical approach
   - Data models
   - Edge cases (discovered in code)
   - Dependencies

This creates documentation for existing undocumented features.
```

---

## Custom Prompts

Add your own frequently-used prompts below:

### [Your Custom Prompt Title]

```
[Your prompt here]
```
