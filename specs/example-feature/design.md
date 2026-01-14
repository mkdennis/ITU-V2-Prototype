# Image Gallery Enhancement - Design Document

## Overview

Enhance the item upload form with an improved image gallery that supports drag-and-drop reordering and basic image cropping. This improves the user experience when uploading multiple product images.

## Goals

- Allow users to reorder images via drag-and-drop
- Provide simple crop functionality for uploaded images
- Improve mobile upload experience
- Maintain existing upload flow and API

## Non-Goals

- Advanced image editing (filters, effects, adjustments)
- Third-party cloud storage integration (use existing service)
- Bulk upload from external sources
- Automatic image optimization (may be future work)

## Requirements

### Functional Requirements

1. Users can upload up to 10 images per item
2. Users can reorder images by dragging and dropping
3. Users can crop images to standard aspect ratios (1:1, 4:3, 16:9)
4. First image is designated as primary (shown in listings)
5. Users can delete images
6. Images are previewed immediately after upload

### Non-Functional Requirements

- **Performance**: Gallery should handle 10 images without lag
- **Accessibility**: Full keyboard navigation and screen reader support
- **Browser Support**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Mobile**: Touch-friendly drag-and-drop on iOS and Android

## Technical Approach

### Architecture

```
ItemUploadForm
├── ImageGallery (new)
│   ├── ImageSlot (existing, enhanced)
│   │   └── UploadedImage (existing)
│   └── ImageCropper (new)
└── [other form sections]
```

### Components

#### ImageGallery

- **Purpose**: Container for all uploaded images with reordering
- **Props**:
  - `images: UploadedImage[]`
  - `onReorder: (images: UploadedImage[]) => void`
  - `onDelete: (imageId: string) => void`
  - `onCrop: (imageId: string, cropData: CropData) => void`
  - `maxImages?: number` (default: 10)
- **State**:
  - `draggedImageId: string | null`
  - `dropTargetId: string | null`
- **Interactions**: Manages drag-and-drop logic, delegates to ImageSlot for individual images

#### ImageSlot (Enhanced)

- **Purpose**: Individual image slot with upload, preview, and drag handle
- **New Props**:
  - `draggable?: boolean`
  - `onDragStart?: () => void`
  - `onDragEnd?: () => void`
  - `onCropClick?: () => void`
- **State**: Existing state plus crop mode flag
- **Interactions**: Handles individual image interactions, notifies parent of drag events

#### ImageCropper

- **Purpose**: Modal component for cropping images
- **Props**:
  - `image: UploadedImage`
  - `aspectRatios: AspectRatio[]`
  - `onSave: (cropData: CropData) => void`
  - `onCancel: () => void`
- **State**:
  - `selectedAspectRatio: AspectRatio`
  - `cropArea: CropArea`
- **Interactions**: Shows modal with crop controls, returns crop data on save

### Data Model

```typescript
interface UploadedImage {
  id: string
  url: string
  file: File
  order: number
  isPrimary: boolean
  cropData?: CropData
}

interface CropData {
  x: number
  y: number
  width: number
  height: number
  aspectRatio: AspectRatio
}

type AspectRatio = '1:1' | '4:3' | '16:9' | 'free'

interface CropArea {
  x: number
  y: number
  width: number
  height: number
}
```

### API / Interfaces

```typescript
// ImageGallery component
export function ImageGallery({
  images,
  onReorder,
  onDelete,
  onCrop,
  maxImages = 10
}: ImageGalleryProps): JSX.Element

// Crop utility
export function applyCrop(
  image: HTMLImageElement,
  cropData: CropData
): Promise<Blob>
```

## Edge Cases

1. **User drags image outside gallery**: Cancel drag operation, return image to original position
2. **Image upload fails**: Show error message, allow retry, don't add to gallery
3. **Invalid image format**: Validate before upload, show clear error message
4. **Mobile drag on small screens**: Ensure touch targets are at least 44x44px
5. **Cropping very large images**: Scale down for preview, apply crop to original
6. **User deletes primary image**: Automatically promote next image to primary

## Constraints

- Must work with existing upload service API
- Cannot exceed 10 images per item (business rule)
- Crop must preserve original image (non-destructive)
- Total image payload should not exceed 20MB

## Dependencies

- None - use native HTML5 APIs for drag-and-drop
- Canvas API for crop preview
- Existing upload service

## Migration / Rollout Strategy

This is a new feature with no migration needed. Existing uploads continue to work. New gallery is opt-in via feature flag initially.

## Success Criteria

- [ ] Users can upload and reorder images without bugs
- [ ] Drag-and-drop works on desktop and mobile
- [ ] Crop functionality produces correct output
- [ ] Gallery handles 10 images without performance issues
- [ ] All interactions are accessible via keyboard
- [ ] No regressions to existing upload flow

## Open Questions

- [x] Should we support custom aspect ratios? **Decision: No, use predefined ratios**
- [x] What happens to cropped images on form cancel? **Decision: Discard all unsaved changes**
- [ ] Should we show file size warnings?

## References

- Figma designs: [link would go here]
- Existing upload flow: src/components/ItemUploadForm.tsx:145
- Upload service: src/services/upload.ts
