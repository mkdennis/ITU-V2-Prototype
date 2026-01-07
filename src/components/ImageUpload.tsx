import { useRef, useState } from 'react'
import './ImageUpload.css'

interface ImageUploadProps {
  uploadText: string
  requirements?: string
  processingNote?: string
  disabled?: boolean
  onFilesSelected?: (files: FileList) => void
  multiple?: boolean
}

function ImageUpload({
  uploadText,
  requirements,
  processingNote,
  disabled = false,
  onFilesSelected,
  multiple = false
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && onFilesSelected) {
      onFilesSelected(e.target.files)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (!disabled && e.dataTransfer.files && e.dataTransfer.files.length > 0 && onFilesSelected) {
      onFilesSelected(e.dataTransfer.files)
    }
  }

  return (
    <div
      className={`image-upload-area ${disabled ? 'disabled' : ''} ${isDragging ? 'dragging' : ''}`}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg"
        multiple={multiple}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <div className="upload-icon">
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_4078_447)">
            <path d="M14.3999 2.06401V16.44H15.4799V1.99201L21.0719 7.05601L21.7919 6.25201L14.9279 0.0360107L8.54395 6.26401L9.29995 7.04401L14.3999 2.06401Z" fill="#436B93"/>
            <path d="M17.7602 11.28V12.36H26.8802V26.244L17.8442 19.224L11.2802 24.648L9.56419 23.148L3.24019 27.84V12.36H12.2402V11.28H2.16019V28.632L2.14819 28.644L2.16019 28.668V30H27.9602V11.28H17.7602ZM26.8802 28.92H3.58819L9.51619 24.528L11.2682 26.052L17.8682 20.592L26.8802 27.6V28.92Z" fill="#436B93"/>
            <path d="M5.30396 17.316C5.30396 18.876 6.56395 20.136 8.12395 20.136C9.68395 20.136 10.944 18.876 10.944 17.316C10.944 15.756 9.68395 14.496 8.12395 14.496C6.56395 14.496 5.30396 15.768 5.30396 17.316ZM9.86395 17.316C9.86395 18.276 9.08395 19.056 8.12395 19.056C7.16395 19.056 6.38395 18.276 6.38395 17.316C6.38395 16.356 7.16395 15.576 8.12395 15.576C9.08395 15.576 9.86395 16.356 9.86395 17.316Z" fill="#436B93"/>
          </g>
          <defs>
            <clipPath id="clip0_4078_447">
              <rect width="30" height="30" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </div>
      <p className="upload-text">{uploadText}</p>
      {requirements && (
        <p className="image-requirements">{requirements}</p>
      )}
      {processingNote && (
        <p className="processing-note">{processingNote}</p>
      )}
    </div>
  )
}

export default ImageUpload

