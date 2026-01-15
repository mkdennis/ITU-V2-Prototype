# Image Gallery Enhancement - Architecture Decision Records

## ADR-001: Use Native HTML5 Drag-and-Drop

**Date**: 2026-01-13

### Context

We need to implement drag-and-drop reordering for the image gallery. We have several options for implementing this functionality.

### Options Considered

#### Option 1: Native HTML5 Drag-and-Drop API
- Pros:
  - No additional dependencies
  - Browser-native, well-supported
  - Works on mobile with polyfills
  - Zero bundle size impact
- Cons:
  - More verbose API
  - Need to handle mobile touch separately
  - Less polished out-of-the-box animations

#### Option 2: react-beautiful-dnd
- Pros:
  - Popular, well-maintained library
  - Great UX out of the box
  - Handles mobile automatically
  - Smooth animations built-in
- Cons:
  - 50KB+ bundle size impact
  - External dependency to maintain
  - May be overkill for simple reordering
  - Adds complexity

#### Option 3: Custom touch + mouse handlers
- Pros:
  - Full control over behavior
  - Can optimize for our specific use case
- Cons:
  - Most complex to implement
  - Need to handle many edge cases
  - Higher maintenance burden
  - Longer development time

### Decision

Use **native HTML5 Drag-and-Drop API** (Option 1).

Rationale:
- This is a simple reordering use case, not complex kanban-style dragging
- Keeping bundle size small is a priority
- Native API is sufficient for our needs
- We can enhance with CSS for animations
- Touch support can be added incrementally if needed

### Consequences

**Positive:**
- Zero bundle size impact
- No external dependencies
- Simple implementation for simple use case

**Negative:**
- More code to write for drag/drop handlers
- May need additional work for mobile touch (acceptable trade-off)
- Mitigation: We can add react-beautiful-dnd later if native API proves insufficient

**Neutral:**
- Team needs to be familiar with HTML5 DnD API (well-documented)

---

## ADR-002: Non-Destructive Cropping

**Date**: 2026-01-13

### Context

Users want to crop images in the gallery. We need to decide if crops should modify the original file or be applied non-destructively.

### Options Considered

#### Option 1: Non-Destructive (Store Crop Metadata)
- Pros:
  - User can change crop later
  - Original image preserved
  - Can generate different crops for different contexts
- Cons:
  - Need to store crop metadata
  - Need to apply crop on server or at display time
  - More complex implementation

#### Option 2: Destructive (Replace Original)
- Pros:
  - Simpler implementation
  - Smaller storage (only cropped version)
  - What you see is what you get
- Cons:
  - Cannot undo crop
  - User must re-upload if they want original back
  - Poor UX if user makes mistake

### Decision

Use **non-destructive cropping** (Option 1).

Rationale:
- Better UX - users can adjust crops
- More flexible for future use cases (thumbnails, different aspect ratios)
- Storage is cheap, poor UX is expensive
- Aligns with industry best practices (Instagram, etc.)

### Consequences

**Positive:**
- Users can modify crops without re-uploading
- Original images are preserved
- More flexible for future enhancements

**Negative:**
- Need to store CropData alongside images
- Server must apply crops (or we apply client-side before display)
- Mitigation: CropData is small (just coordinates), server can handle

**Neutral:**
- Slightly more complex data model (acceptable complexity)

---

## ADR-003: Predefined Aspect Ratios Only

**Date**: 2026-01-13

### Context

When cropping images, should users be able to freely crop to any aspect ratio, or should we provide predefined options?

### Options Considered

#### Option 1: Predefined Ratios (1:1, 4:3, 16:9, Free)
- Pros:
  - Consistent image ratios across the platform
  - Simpler UI
  - Guides users to optimal choices
  - Easier to design responsive layouts
- Cons:
  - Less flexibility
  - User might want custom ratio

#### Option 2: Free-form Cropping
- Pros:
  - Maximum flexibility
  - User has complete control
- Cons:
  - Can result in awkward aspect ratios
  - Harder to create consistent layouts
  - More complex crop UI

### Decision

Use **predefined aspect ratios** with a "Free" option (Option 1).

Rationale:
- Most users will use standard ratios
- Provides guidance while still allowing flexibility via "Free"
- Maintains platform consistency
- Simpler UI is better UX for most users
- Can always add custom ratios later if data shows demand

### Consequences

**Positive:**
- Consistent aspect ratios across platform
- Simpler, cleaner UI
- Easier to build responsive layouts

**Negative:**
- Some power users might want arbitrary ratios
- Mitigation: "Free" option provides escape hatch

**Neutral:**
- Can add custom ratio picker later if needed
