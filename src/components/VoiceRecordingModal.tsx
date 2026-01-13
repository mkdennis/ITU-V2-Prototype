import { useState, useEffect, useCallback } from 'react'
import './VoiceRecordingModal.css'
import Modal from './Modal'
import LiveWaveform from './LiveWaveform'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import { cleanupTranscribedText } from '../services/voiceTextCleanup'

interface VoiceRecordingModalProps {
  isOpen: boolean
  onClose: () => void
  onTranscriptionComplete: (text: string) => void
}

type RecordingState = 'idle' | 'recording' | 'processing' | 'error'

function VoiceRecordingModal({
  isOpen,
  onClose,
  onTranscriptionComplete
}: VoiceRecordingModalProps) {
  const [recordingState, setRecordingState] = useState<RecordingState>('idle')
  const [error, setError] = useState<string | null>(null)

  const {
    isSupported,
    isListening,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportError
  } = useSpeechRecognition()

  // Handle starting recording
  const handleStartRecording = useCallback(() => {
    setError(null)
    setRecordingState('recording')
    startListening()
  }, [startListening])

  // Handle stopping recording
  const handleStopRecording = useCallback(async () => {
    setRecordingState('processing')

    // Wait for speech recognition to fully stop and get final transcript
    const textToClean = await stopListening()

    if (!textToClean.trim()) {
      setError('No speech was detected. Please try again.')
      setRecordingState('error')
      return
    }

    try {
      const cleanedText = await cleanupTranscribedText(textToClean)
      onTranscriptionComplete(cleanedText)
      setRecordingState('idle')
      resetTranscript()
    } catch (err) {
      console.error('Failed to process transcription:', err)
      setError('Failed to process transcription. Please try again.')
      setRecordingState('error')
    }
  }, [stopListening, onTranscriptionComplete, resetTranscript])

  // Handle modal close with cleanup
  const handleClose = useCallback(() => {
    if (isListening) {
      stopListening()
    }
    resetTranscript()
    setRecordingState('idle')
    setError(null)
    onClose()
  }, [isListening, stopListening, resetTranscript, onClose])

  // Handle retry from error state
  const handleRetry = useCallback(() => {
    setError(null)
    setRecordingState('idle')
    resetTranscript()
  }, [resetTranscript])

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setRecordingState('idle')
      setError(null)
      resetTranscript()
    }
  }, [isOpen, resetTranscript])

  const displayTranscript = transcript + interimTranscript
  const showError = browserSupportError || error

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="voice-recording-modal">
        <div className="modal-header">
          <h2 className="modal-title">Voice to Text</h2>
          <p className="modal-description">
            {recordingState === 'idle' && !showError && 'Press the button below to start speaking.'}
            {recordingState === 'recording' && 'Listening... Speak clearly into your microphone.'}
            {recordingState === 'processing' && 'Processing your speech with AI...'}
            {recordingState === 'error' && 'Something went wrong.'}
            {recordingState === 'idle' && showError && 'Unable to use voice recording.'}
          </p>
        </div>

        <div className="modal-body">
          {!isSupported && (
            <div className="voice-error-banner">
              {browserSupportError || 'Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.'}
            </div>
          )}

          {isSupported && showError && recordingState !== 'recording' && (
            <div className="voice-error-banner">
              {showError}
            </div>
          )}

          {isSupported && (
            <>
              <div className="waveform-container">
                <LiveWaveform
                  active={recordingState === 'recording'}
                  processing={recordingState === 'processing'}
                  mode="static"
                  barWidth={5}
                  barGap={1}
                  barRadius={1.5}
                  barHeight={4}
                  barColor="#3b82f6"
                  fadeEdges={true}
                  fadeWidth={24}
                  height={96}
                  sensitivity={1}
                  smoothingTimeConstant={0.8}
                  fftSize={256}
                  historySize={60}
                  updateRate={30}
                />
              </div>

              {displayTranscript && (
                <div className="transcript-preview">
                  <label className="transcript-label">Preview:</label>
                  <p className="transcript-text">{displayTranscript}</p>
                </div>
              )}
            </>
          )}
        </div>

        <div className="modal-footer">
          <button
            className="modal-button modal-button-secondary"
            onClick={handleClose}
          >
            Cancel
          </button>

          {recordingState === 'idle' && isSupported && !showError && (
            <button
              className="modal-button modal-button-primary"
              onClick={handleStartRecording}
            >
              Start Recording
            </button>
          )}

          {recordingState === 'recording' && (
            <button
              className="modal-button modal-button-primary stop-button"
              onClick={handleStopRecording}
            >
              Stop & Process
            </button>
          )}

          {recordingState === 'processing' && (
            <button
              className="modal-button modal-button-primary"
              disabled
            >
              Processing...
            </button>
          )}

          {recordingState === 'error' && (
            <button
              className="modal-button modal-button-primary"
              onClick={handleRetry}
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default VoiceRecordingModal
