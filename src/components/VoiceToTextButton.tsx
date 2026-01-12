import { useState } from 'react'
import './VoiceToTextButton.css'
import VoiceRecordingModal from './VoiceRecordingModal'

interface VoiceToTextButtonProps {
  onTranscriptionComplete: (text: string) => void
  disabled?: boolean
}

function VoiceToTextButton({ onTranscriptionComplete, disabled = false }: VoiceToTextButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    if (!disabled) {
      setIsModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleTranscriptionComplete = (cleanedText: string) => {
    onTranscriptionComplete(cleanedText)
    setIsModalOpen(false)
  }

  return (
    <>
      <button
        type="button"
        className={`voice-to-text-button ${disabled ? 'disabled' : ''}`}
        onClick={handleOpenModal}
        disabled={disabled}
      >
        <svg
          className="voice-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 1C10.34 1 9 2.34 9 4V12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12V4C15 2.34 13.66 1 12 1Z"
            fill="currentColor"
          />
          <path
            d="M17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12H5C5 15.53 7.61 18.43 11 18.92V22H13V18.92C16.39 18.43 19 15.53 19 12H17Z"
            fill="currentColor"
          />
        </svg>
        Use Voice to Text
      </button>

      <VoiceRecordingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onTranscriptionComplete={handleTranscriptionComplete}
      />
    </>
  )
}

export default VoiceToTextButton
