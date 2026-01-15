# Image Gallery Enhancement - Reusable Prompts

This file contains copy-paste prompts for common tasks on this feature.

---

## Initial Setup

```
I want to implement the Image Gallery Enhancement feature. First:
1. Read specs/example-feature/design.md
2. Read specs/example-feature/implementation.md
3. Read specs/example-feature/decisions.md
4. Create a plan for the next piece of work

Use Plan Mode for this.
```

---

## Design Review

```
Review the design document at specs/example-feature/design.md.

Check for:
- Unclear requirements
- Missing edge cases
- Technical feasibility issues
- Inconsistencies with existing components
- Missing dependencies
- Accessibility considerations

Provide specific feedback.
```

---

## Sync Design with Code

```
Review the current implementation and compare it to specs/example-feature/design.md.

Identify:
- What's implemented correctly
- What deviates from the design
- What's missing
- What needs refactoring
- Any new edge cases discovered

Update implementation.md with current status.
```

---

## Implement Drag-and-Drop

```
Implement the drag-and-drop reordering functionality for ImageGallery.

Requirements:
- Use native HTML5 Drag-and-Drop API (per ADR-001)
- Highlight drop zones during drag
- Handle edge case: dragging outside gallery
- Add proper event handlers
- Ensure it works with keyboard navigation
- Update implementation.md when done
```

---

## Implement Crop Modal

```
Create the ImageCropper modal component.

Requirements:
- Non-destructive cropping (per ADR-002)
- Predefined aspect ratios: 1:1, 4:3, 16:9, Free (per ADR-003)
- Show live preview of crop
- Return CropData on save
- Handle mobile viewport sizes
- Add to existing Modal component pattern
```

---

## Write Examples

```
Create runnable examples for the Image Gallery.

Create examples for:
1. Basic gallery with 5 images
2. Drag-and-drop reordering demo
3. Crop functionality demo
4. Error handling (failed upload, invalid format)
5. Mobile touch interaction

Requirements:
- Examples must run successfully
- Include comments explaining what's demonstrated
- Document results in TESTING.md
```

---

## Test Drag-and-Drop

```
Test the drag-and-drop functionality thoroughly.

Test cases:
1. Drag image to new position
2. Drag image outside gallery (should cancel)
3. Keyboard reordering (arrow keys + space)
4. Touch drag on mobile
5. Drag the primary image
6. Rapid consecutive drags

Document results in specs/example-feature/TESTING.md
```

---

## Accessibility Audit

```
Audit the Image Gallery for accessibility issues.

Check:
- Keyboard navigation (tab, arrow keys, enter, space, escape)
- Screen reader announcements (ARIA labels, live regions)
- Focus management (especially in crop modal)
- Color contrast for drag indicators
- Touch target sizes (min 44x44px)
- Respect prefers-reduced-motion

Fix any issues found and document in TESTING.md
```

---

## Performance Test

```
Test Image Gallery performance with maximum images.

Steps:
1. Upload 10 images (max allowed)
2. Measure render time
3. Test drag-and-drop performance
4. Check memory usage
5. Test on slower devices/browsers

Success criteria:
- Gallery renders in < 500ms with 10 images
- Drag operations feel smooth (60fps)
- No memory leaks after multiple uploads

Document results in TESTING.md
```

---

## Prepare for PR

```
Prepare a PR for the Image Gallery feature.

Steps:
1. Review all changes
2. Ensure tests pass
3. Ensure examples run
4. Run accessibility audit
5. Run performance tests
6. Update implementation.md
7. Create commit with clear message
8. Create PR with:
   - Clear description
   - Link to specs/example-feature/design.md
   - Screenshots of gallery in action
   - Review checklist
   - Notes on ADRs that affected implementation
```

---

## Integrate with Main Form

```
Integrate the ImageGallery component into ItemUploadForm.

Steps:
1. Review existing upload flow in ItemUploadForm
2. Replace or enhance existing image upload section
3. Ensure data flows correctly to/from form state
4. Test form submission with gallery images
5. Test form validation
6. Test form reset/cancel

Don't break existing upload functionality.
Update implementation.md when done.
```

---

## Session Handoff

```
Create a handoff summary for the next session.

Include:
1. What was accomplished this session (from implementation.md)
2. Current status of each component
3. What's next in priority order
4. Any blockers or decisions needed
5. Links to relevant PRs/commits
6. Any important context or gotchas discovered
```
