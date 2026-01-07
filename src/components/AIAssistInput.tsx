import { useState } from 'react'
import './AIAssistInput.css'
import NavigationHeader from './NavigationHeader'
import ImageUpload from './ImageUpload'
import UploadedImage from './UploadedImage'
import Textarea from './Textarea'

interface AIAssistInputProps {
  onContinue: () => void
}

function AIAssistInput({ onContinue }: AIAssistInputProps) {
  const [textContent, setTextContent] = useState<string>('')
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [draggedImageIndex, setDraggedImageIndex] = useState<number | null>(null)
  const [selectedTextOption, setSelectedTextOption] = useState<'description' | 'open-text' | null>(null)

  const isTextFilled = textContent.trim().length > 0

  // Handle image upload
  const handleImagesUpload = (files: FileList) => {
    const fileArray = Array.from(files)
    const remainingSlots = 4 - uploadedImages.length
    const filesToUpload = fileArray.slice(0, remainingSlots)

    if (filesToUpload.length === 0) return

    Promise.all(
      filesToUpload.map((file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            resolve(reader.result as string)
          }
          reader.readAsDataURL(file)
        })
      })
    ).then((newImages) => {
      setUploadedImages((prev) => [...prev, ...newImages])
    })
  }

  // Handle image delete
  const handleImageDelete = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  // Handle drag start for image reordering
  const handleImageDragStart = (index: number) => {
    setDraggedImageIndex(index)
  }

  // Handle drag over for image reordering
  const handleImageDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  // Handle drop for image reordering
  const handleImageDrop = (index: number) => {
    if (draggedImageIndex === null) return

    const newImages = [...uploadedImages]
    const draggedImage = newImages[draggedImageIndex]
    newImages.splice(draggedImageIndex, 1)
    newImages.splice(index, 0, draggedImage)

    setUploadedImages(newImages)
    setDraggedImageIndex(null)
  }

  return (
    <>
      <NavigationHeader hideTabs title="Create New Listing" />
      <div className="app">
        <div className="form-section ai-assist-container">
          <div className="ai-assist-banner">
            This prototype is for demo purposes only. Certain functionalities may not work. Final design may look different.
          </div>
          <div className="ai-assist-header">
            <h3>AI Assist Upload</h3>
            <p className="ai-assist-description">
              Upload photos and paste any text about your item. Our AI will analyze the content and suggest details for your listing.
            </p>
          </div>

          <div className="ai-assist-section">
            <h5 className="ai-assist-section-title">Item Information *</h5>
            <p className="ai-assist-section-description">
              Select how you'd like to provide information about your item.
            </p>

            {selectedTextOption === null ? (
              <div className="text-option-cards">
                <div className="text-option-card" onClick={() => setSelectedTextOption('description')}>
                  <h3 className="text-option-card-title">Use Description</h3>
                  <p className="text-option-card-description">
                    Description will be prefilled in Item Upload
                  </p>
                </div>
                <div className="text-option-card" onClick={() => setSelectedTextOption('open-text')}>
                  <h3 className="text-option-card-title">Open Text</h3>
                  <p className="text-option-card-description">
                    Copy and paste any information about item (item dimensions, category, etc). Does not need to be structured.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {selectedTextOption === 'description' && (
                  <p className="text-helper-text">
                    We will prefill your description with this text.
                  </p>
                )}
                <Textarea
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder={selectedTextOption === 'description'
                    ? "Paste your item description here..."
                    : "Paste item information here..."}
                  rows={8}
                />
                <button
                  className="back-to-selection-button"
                  onClick={() => {
                    setSelectedTextOption(null)
                    setTextContent('')
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 12L6 8L10 4" stroke="#436B93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Back to Selection
                </button>
              </>
            )}
          </div>

          <div className="ai-assist-section">
            <h5 className="ai-assist-section-title">Item Photos (Optional)</h5>
            <p className="ai-assist-section-description">
              Upload photos of your item. These will help our AI identify details about the piece.
            </p>
            <ImageUpload
              uploadText="Upload Images or Drag Images Here (Up to 4)"
              requirements="All images must be at least 768x768 px, less than 16MB, JPEGs only"
              onFilesSelected={handleImagesUpload}
              multiple={true}
              disabled={uploadedImages.length >= 4}
            />
            {uploadedImages.length > 0 && (
              <div className="image-slots-grid">
                {uploadedImages.map((image, index) => (
                  <UploadedImage
                    key={`ai-uploaded-${index}`}
                    src={image}
                    alt={`AI assist image ${index + 1}`}
                    onDelete={() => handleImageDelete(index)}
                    draggable={true}
                    onDragStart={() => handleImageDragStart(index)}
                    onDragOver={handleImageDragOver}
                    onDrop={() => handleImageDrop(index)}
                  />
                ))}
              </div>
            )}
          </div>

          <button
            className={`continue-button ${isTextFilled ? '' : 'disabled'}`}
            onClick={onContinue}
            disabled={!isTextFilled}
          >
            Generate Listing
          </button>
        </div>
      </div>
    </>
  )
}

export default AIAssistInput
