# CLAUDE.md — ITU-V2-Prototype

## Project Overview

This is a React/TypeScript prototype for an improved item upload form - a long-form interface for listing items. Built with Vite, React 19, and TypeScript.

## Code Locations

| What | Where |
|------|-------|
| UI Components | src/components/ |
| Custom Hooks | src/hooks/ |
| Type Definitions | src/types/ |
| Services | src/services/ |
| Form Options & Data | src/data/ |
| Utility Functions | src/utils/ |
| Assets | src/assets/ |
| Global Styles | src/index.css |
| Main App | src/App.tsx |
| Entry Point | src/main.tsx |

## Design Documents

**The specs/ folder contains all design documents and feature specifications.**

Before implementing ANY feature:
1. Check if a design doc exists in specs/
2. Read the design doc completely
3. Check implementation.md for current status
4. Review decisions.md for context on past choices

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript 5.9
- **Build Tool**: Vite 7
- **Package Manager**: yarn
- **Linting**: ESLint 9

## Development Workflow

### Spec-First Development

**No spec, no implementation.** Period.

Every feature must have a design document before a single line of code is written. The design doc is the source of truth.

### The Most Important Rule

**Every PR must be reviewable in under 10 minutes.**

This means:
- Max 5-7 files changed (excluding tests)
- Max 500 lines changed
- One focused change per PR
- Clear review checklist in PR description

If your change is bigger, **split it into multiple PRs**.

### Session Workflow

1. **Planning Phase**
   - Use Plan Mode (Shift + Tab) for complex features
   - Front-load all context: architecture, constraints, edge cases
   - 5 minutes of planning saves hours of rework

2. **Implementation Phase**
   - Work on one small piece at a time
   - Update implementation.md as you go
   - Write code, tests, and examples together

3. **Validation Phase**
   - Run all tests
   - Verify examples work
   - Update TESTING.md with results

4. **Documentation Phase**
   - Update implementation.md with what's complete
   - Add decision records to decisions.md if needed
   - Update future-work.md with deferred items

## Code Patterns

### Component Structure

Components should follow this structure:
```typescript
// 1. Imports
// 2. Types/Interfaces
// 3. Component definition
// 4. Export
```

### Type Safety

- Always define proper TypeScript types
- No `any` types unless absolutely necessary and documented why
- Use interfaces for component props
- Define types in src/types/ for shared types

### Component Naming

- PascalCase for component files and names
- One component per file
- File name matches component name

## Testing Requirements

### Examples Required

Every feature needs runnable examples. No exceptions.

If the example doesn't run, the implementation isn't done. Clean code without working examples is incomplete code.

### Test Documentation

Store test results in TESTING.md within the feature's specs folder.

## Don't

- **Don't implement features without a design doc**
- **Don't skip the planning phase for complex features**
- **Don't create PRs larger than 10 minutes to review**
- **Don't add features not specified in the design doc**
- **Don't use `any` without documentation**
- **Don't create examples that don't run**
- **Don't over-engineer solutions**
- **Don't add "nice to have" features - ship what's specified**

## Do

- **Do read design docs completely before starting**
- **Do update implementation.md as you work**
- **Do write decision records for important choices**
- **Do break large changes into multiple PRs**
- **Do ensure all examples run successfully**
- **Do keep solutions simple and focused**
- **Do ask clarifying questions if the spec is unclear**

## Context Management

- One conversation per feature
- Context degrades at 30% - clear and restart when needed
- External memory lives in specs/ files
- implementation.md is your session continuity tool

## Feature-Level Instructions

Many features have their own CLAUDE.md in specs/[feature-name]/CLAUDE.md with feature-specific patterns and constraints. Always check for these.

## Common Commands

```bash
# Development
yarn dev              # Start dev server
yarn build            # Build for production
yarn preview          # Preview production build
yarn lint             # Run ESLint

# Git workflow
git status            # Check current status
git add .             # Stage all changes
git commit -m "msg"   # Commit with message
git push -u origin [branch]  # Push to remote
```

## Repository Standards

### Commit Messages

Follow the existing style in the repo:
- Be concise and descriptive
- Focus on "why" not "what"
- Reference issue numbers when applicable

### Branch Naming

Branches should follow: `claude/[description]-[session-id]`

### PR Requirements

Every PR must include:
- Clear description of changes
- Review checklist
- Link to design doc (if applicable)
- Screenshots/examples for UI changes

## Context7 MCP Integration

This project uses Context7 MCP server for up-to-date documentation. It's already configured - use it by adding "use context7" to prompts when you need current docs for:
- React 19 APIs
- TypeScript patterns
- Vite configuration

## Getting Help

- Check specs/ first
- Check CLAUDE.md files (root and feature-level)
- Review recent commits for patterns
- Check LEARNING_SUMMARY.md for project learnings
