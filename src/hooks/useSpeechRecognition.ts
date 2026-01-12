import { useState, useEffect, useCallback, useRef } from 'react'
import '../types/speechRecognition.d.ts'

interface UseSpeechRecognitionReturn {
  isSupported: boolean
  isListening: boolean
  transcript: string
  interimTranscript: string
  startListening: () => void
  stopListening: () => Promise<string>
  resetTranscript: () => void
  browserSupportError: string | null
}

export function useSpeechRecognition(): UseSpeechRecognitionReturn {
  const [isSupported, setIsSupported] = useState(true)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [browserSupportError, setBrowserSupportError] = useState<string | null>(null)

  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const transcriptRef = useRef('')
  const interimTranscriptRef = useRef('')
  const isListeningRef = useRef(false)
  const stopResolverRef = useRef<((text: string) => void) | null>(null)

  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognitionAPI) {
      setIsSupported(false)
      setBrowserSupportError('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.')
      return
    }

    const recognition = new SpeechRecognitionAPI()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = ''
      let interimText = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        if (result.isFinal) {
          finalTranscript += result[0].transcript
        } else {
          interimText += result[0].transcript
        }
      }

      if (finalTranscript) {
        const newValue = transcriptRef.current + finalTranscript
        transcriptRef.current = newValue
        setTranscript(newValue)
      }
      interimTranscriptRef.current = interimText
      setInterimTranscript(interimText)
    }

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error)

      if (event.error === 'not-allowed') {
        setBrowserSupportError('Microphone access was denied. Please allow microphone access and try again.')
      } else if (event.error === 'no-speech') {
        // No speech detected - not a critical error
      } else if (event.error === 'audio-capture') {
        setBrowserSupportError('No microphone was found. Please ensure a microphone is connected.')
      } else if (event.error !== 'aborted') {
        setBrowserSupportError(`Speech recognition error: ${event.error}`)
      }

      isListeningRef.current = false
      setIsListening(false)
    }

    recognition.onend = () => {
      isListeningRef.current = false
      setIsListening(false)

      // Resolve the stop promise with final transcript
      if (stopResolverRef.current) {
        const finalText = transcriptRef.current + interimTranscriptRef.current
        stopResolverRef.current(finalText)
        stopResolverRef.current = null
      }
    }

    recognitionRef.current = recognition

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListeningRef.current) {
      transcriptRef.current = ''
      interimTranscriptRef.current = ''
      setTranscript('')
      setInterimTranscript('')
      setBrowserSupportError(null)
      try {
        recognitionRef.current.start()
        isListeningRef.current = true
        setIsListening(true)
      } catch (error) {
        console.error('Failed to start speech recognition:', error)
        setBrowserSupportError('Failed to start speech recognition. Please try again.')
      }
    }
  }, [])

  const stopListening = useCallback((): Promise<string> => {
    return new Promise((resolve) => {
      if (recognitionRef.current && isListeningRef.current) {
        // Store resolver to be called when onend fires
        stopResolverRef.current = resolve
        recognitionRef.current.stop()
      } else {
        // Not listening, resolve with current transcript immediately
        resolve(transcriptRef.current + interimTranscriptRef.current)
      }
    })
  }, [])

  const resetTranscript = useCallback(() => {
    transcriptRef.current = ''
    interimTranscriptRef.current = ''
    setTranscript('')
    setInterimTranscript('')
  }, [])

  return {
    isSupported,
    isListening,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    resetTranscript,
    browserSupportError
  }
}
