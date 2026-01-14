# CLAUDE.md — Image Gallery Enhancement

## Project Context

This feature enhances the item upload form with an improved image gallery component that allows drag-and-drop reordering, image cropping, and better preview functionality.

## Before Starting Work

1. Read specs/example-feature/design.md completely
2. Check specs/example-feature/implementation.md for current status
3. Review specs/example-feature/decisions.md for past choices
4. Look at existing ImageSlot and UploadedImage components for patterns

## Code Patterns

- All image components use the existing ImageSlot pattern
- State for image order is managed at the form level
- Image uploads use the existing upload service
- Drag and drop uses native HTML5 DnD API (no external library)

## Key Files

| What | Where |
|------|-------|
| Image Gallery Component | src/components/ImageGallery.tsx |
| Image Slot Component (existing) | src/components/ImageSlot.tsx |
| Uploaded Image Component (existing) | src/components/UploadedImage.tsx |
| Type definitions | src/types/image.ts |
| Upload service | src/services/upload.ts |

## Don't

- Don't add features not in design.md (no filters, effects, etc.)
- Don't use external drag-and-drop libraries
- Don't break existing ImageSlot API
- Don't add image editing beyond simple crop
- Don't skip accessibility features

## Do

- Do preserve existing upload flow
- Do maintain keyboard navigation
- Do add proper ARIA labels
- Do handle loading and error states
- Do test on mobile browsers

## Testing

- Create examples/cookbooks showing:
  - Basic gallery with 3-5 images
  - Drag and drop reordering
  - Image crop functionality
  - Error handling (failed upload, invalid format)
  - Mobile touch interactions

## Examples

Examples should be created in src/examples/image-gallery/ and documented in TESTING.md
