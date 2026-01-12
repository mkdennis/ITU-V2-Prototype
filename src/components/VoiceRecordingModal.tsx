import { useState, useEffect, useCallback, useRef } from 'react'
import './VoiceRecordingModal.css'
import Modal from './Modal'
import AudioWaveform from './AudioWaveform'
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
  const [audioAnalyser, setAudioAnalyser] = useState<AnalyserNode | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)

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

  // Cleanup audio resources
  const cleanupAudio = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop())
      mediaStreamRef.current = null
    }
    if (audioContextRef.current) {
      audioContextRef.current.close()
      audioContextRef.current = null
    }
    setAudioAnalyser(null)
  }, [])

  // Handle starting recording
  const handleStartRecording = useCallback(async () => {
    setError(null)
    setRecordingState('recording')

    // Setup audio context for waveform visualization
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaStreamRef.current = stream
      const audioContext = new AudioContext()
      audioContextRef.current = audioContext
      const source = audioContext.createMediaStreamSource(stream)
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 256
      source.connect(analyser)
      setAudioAnalyser(analyser)
    } catch (err) {
      console.error('Microphone access error:', err)
      // Continue anyway - waveform just won't show
    }

    startListening()
  }, [startListening])

  // Handle stopping recording
  const handleStopRecording = useCallback(async () => {
    setRecordingState('processing')
    cleanupAudio()

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
  }, [stopListening, cleanupAudio, onTranscriptionComplete, resetTranscript])

  // Handle modal close with cleanup
  const handleClose = useCallback(() => {
    if (isListening) {
      stopListening()
    }
    cleanupAudio()
    resetTranscript()
    setRecordingState('idle')
    setError(null)
    onClose()
  }, [isListening, stopListening, cleanupAudio, resetTranscript, onClose])

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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupAudio()
    }
  }, [cleanupAudio])

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
                <AudioWaveform
                  analyser={audioAnalyser}
                  isActive={recordingState === 'recording'}
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
