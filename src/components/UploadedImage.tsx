import { useState } from 'react'
import './UploadedImage.css'

interface UploadedImageProps {
  src: string
  alt?: string
  onDelete: () => void
  draggable?: boolean
  onDragStart?: (e: React.DragEvent) => void
  onDragOver?: (e: React.DragEvent) => void
  onDrop?: (e: React.DragEvent) => void
  isPrimary?: boolean
}

function UploadedImage({
  src,
  alt = 'Uploaded image',
  onDelete,
  draggable = false,
  onDragStart,
  onDragOver,
  onDrop,
  isPrimary = false
}: UploadedImageProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`uploaded-image-container ${isPrimary ? 'primary' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <img src={src} alt={alt} className="uploaded-image" />
      {isHovered && (
        <button
          className="delete-icon-button"
          onClick={onDelete}
          aria-label="Delete image"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  )
}

export default UploadedImage
