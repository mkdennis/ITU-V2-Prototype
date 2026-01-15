# Specs Directory

This directory contains all feature specifications and design documents for the ITU-V2-Prototype project.

## Structure

Each feature gets its own folder with the following structure:

```
specs/
├── _templates/          # Templates for new features
├── [feature-name]/
│   ├── CLAUDE.md       # Instructions for Claude Code
│   ├── design.md       # Design specification (source of truth)
│   ├── implementation.md  # Progress tracking
│   ├── decisions.md    # Architecture Decision Records
│   ├── prompts.md      # Reusable prompts for this feature
│   ├── future-work.md  # Deferred ideas
│   └── TESTING.md      # Test results and cookbook outputs
└── README.md           # This file
```

## File Purposes

### CLAUDE.md
Instructions for Claude Code specific to this feature. Includes:
- Project context
- Prerequisites before starting work
- Code patterns to follow
- What not to do

### design.md
The source of truth for the feature. Includes:
- Overview and goals
- Requirements
- Technical approach
- API/Interface design
- Edge cases and constraints
- Success criteria

**No spec, no implementation.**

### implementation.md
Live progress tracking. Includes:
- What's completed
- What's in progress
- What's blocked
- Next steps

This is crucial for session continuity. When context limits hit and we restart, this file tells us where we left off.

### decisions.md
Architecture Decision Records (ADRs). Each decision includes:
- Context: What problem we're solving
- Options: What alternatives we considered
- Decision: What we chose
- Consequences: Trade-offs and implications

This captures the "why" behind choices.

### prompts.md
Reusable prompts for common tasks on this feature:
- Re-sync design with code
- Run tests
- Review and refine
- Common refactoring patterns

Copy-paste productivity.

### future-work.md
Ideas and enhancements deferred to later. Keeps the current work focused while capturing valuable ideas.

### TESTING.md
Test results, cookbook outputs, and validation notes. If it doesn't run and get documented here, it's not done.

## Workflow

1. **Start**: Copy `_templates/` contents to new feature folder
2. **Design**: Fill out design.md completely
3. **Review**: Get design approved
4. **Implement**: Work in small pieces, update implementation.md
5. **Document**: Record decisions, store prompts, note future work
6. **Test**: Run examples, document results in TESTING.md

## Using Symlinks (Optional)

You can keep specs in a separate repo and symlink:

```bash
# Create private specs repo
mkdir ~/private-specs
cd ~/private-specs
git init

# Symlink into project
cd /path/to/ITU-V2-Prototype
ln -s ~/private-specs specs

# Add to .gitignore
echo "specs/" >> .gitignore
```

This keeps your design docs private while making them visible to Claude.

## Quick Start

To create a new feature spec:

```bash
# Create feature folder
mkdir -p specs/my-feature

# Copy templates
cp specs/_templates/* specs/my-feature/

# Start editing design.md
```

Or ask Claude to create the structure for you.
