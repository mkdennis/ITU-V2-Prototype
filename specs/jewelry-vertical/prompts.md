# [Feature Name] - Reusable Prompts

This file contains copy-paste prompts for common tasks on this feature.

---

## Initial Setup

```
I want to implement [feature name]. First:
1. Read specs/[feature-name]/design.md
2. Read specs/[feature-name]/implementation.md
3. Read specs/[feature-name]/decisions.md
4. Create a plan for the next piece of work

Use Plan Mode for this.
```

---

## Design Review

```
Review the design document at specs/[feature-name]/design.md.

Check for:
- Unclear requirements
- Missing edge cases
- Technical feasibility issues
- Inconsistencies
- Missing dependencies

Provide specific feedback.
```

---

## Sync Design with Code

```
Review the current implementation and compare it to specs/[feature-name]/design.md.

Identify:
- What's implemented correctly
- What deviates from the design
- What's missing
- What needs refactoring

Update implementation.md with current status.
```

---

## Implement Next Piece

```
Based on specs/[feature-name]/implementation.md, implement the next piece of work.

Remember:
- Keep the PR under 10 minutes to review
- Write tests and examples
- Update implementation.md when done
- Document any decisions in decisions.md
```

---

## Write Examples

```
Create runnable examples for [specific functionality].

Requirements:
- Examples must run successfully
- Cover common use cases
- Cover edge cases
- Include comments explaining what's being demonstrated
- Document results in TESTING.md
```

---

## Run Tests

```
Run all tests for [feature name].

Then:
1. Fix any failures
2. Document results in specs/[feature-name]/TESTING.md
3. Update implementation.md with testing status
```

---

## Review and Refine

```
Review the implementation of [specific component/function].

Check for:
- Code quality
- Type safety
- Error handling
- Edge cases
- Performance
- Accessibility (for UI components)
- Consistency with existing patterns

Suggest improvements or refactorings.
```

---

## Prepare for PR

```
Prepare a PR for [feature name].

Steps:
1. Review all changes
2. Ensure tests pass
3. Ensure examples run
4. Update implementation.md
5. Create commit with clear message
6. Create PR with:
   - Clear description
   - Link to design doc
   - Review checklist
   - Screenshots (if UI changes)
```

---

## Session Handoff

```
Create a handoff summary for the next session.

Include:
1. What was accomplished this session
2. Current state from implementation.md
3. What's next
4. Any blockers or important context
5. Links to relevant PRs/commits
```

---

## Add Custom Prompts Below

[Add prompts specific to this feature]
