import { useState } from 'react'
import './AIAssistInput.css'
import NavigationHeader from './NavigationHeader'
import ImageUpload from './ImageUpload'
import Textarea from './Textarea'

interface AIAssistInputProps {
  onContinue: () => void
}

function AIAssistInput({ onContinue }: AIAssistInputProps) {
  const [textContent, setTextContent] = useState<string>('')

  const isTextFilled = textContent.trim().length > 0

  return (
    <>
      <NavigationHeader hideTabs title="1stDibs Item Upload Prototype" />
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
            <h5 className="ai-assist-section-title">Item Photos (Optional)</h5>
            <p className="ai-assist-section-description">
              Upload photos of your item. These will help our AI identify details about the piece.
            </p>
            <ImageUpload
              uploadText="Upload Images or Drag Images Here"
              requirements="All images must be at least 768x768 px, less than 16MB, JPEGs only"
            />
          </div>

          <div className="ai-assist-section">
            <h5 className="ai-assist-section-title">Item Information *</h5>
            <p className="ai-assist-section-description">
              Paste any text you have about your item - descriptions, auction listings, provenance information, etc.
            </p>
            <Textarea
              value={textContent}
              onChange={setTextContent}
              placeholder="Paste item information here..."
              rows={12}
            />
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
