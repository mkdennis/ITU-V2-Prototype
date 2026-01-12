import { useState } from 'react'
import './App.css'
import WelcomeModal from './components/WelcomeModal'
import FlowSelectionModal from './components/FlowSelectionModal'
import AIAssistInput from './components/AIAssistInput'
import AILoadingPage from './components/AILoadingPage'
import ItemUploadForm from './components/ItemUploadForm'
import { parseListingWithAI } from './services/aiAssistParser'
import type { AISuggestions } from './types/aiSuggestions'

type AppState = 'welcome' | 'flow-selection' | 'ai-assist-input' | 'ai-loading' | 'item-upload'

function App() {
  const [appState, setAppState] = useState<AppState>('welcome')
  const [aiAssistEnabled, setAiAssistEnabled] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestions>({})
  const [isProcessing, setIsProcessing] = useState(false)

  const handleGetStarted = () => {
    setAppState('flow-selection')
  }

  const handleSelectAIAssist = () => {
    setAiAssistEnabled(true)
    setAppState('ai-assist-input')
  }

  const handleSelectStandard = () => {
    setAiAssistEnabled(false)
    setAppState('item-upload')
  }

  const handleAIAssistContinue = async (textContent: string, usePrefillDescription: boolean) => {
    setAppState('ai-loading')
    setIsProcessing(true)

    try {
      // Parse the listing text with AI
      const result = await parseListingWithAI(textContent, usePrefillDescription)
      setAiSuggestions(result.suggestions)
    } catch (error) {
      console.error('Failed to parse listing:', error)
      // Continue anyway with empty suggestions
      setAiSuggestions({})
    } finally {
      setIsProcessing(false)
    }
  }

  const handleLoadingComplete = () => {
    // Only transition when processing is done
    if (!isProcessing) {
      setAppState('item-upload')
    }
  }

  return (
    <>
      <WelcomeModal
        isOpen={appState === 'welcome'}
        onGetStarted={handleGetStarted}
      />
      <FlowSelectionModal
        isOpen={appState === 'flow-selection'}
        onSelectAIAssist={handleSelectAIAssist}
        onSelectStandard={handleSelectStandard}
      />
      {appState === 'ai-assist-input' && (
        <AIAssistInput onContinue={handleAIAssistContinue} />
      )}
      {appState === 'ai-loading' && (
        <AILoadingPage
          onComplete={handleLoadingComplete}
          isProcessing={isProcessing}
        />
      )}
      {appState === 'item-upload' && (
        <ItemUploadForm
          aiAssistEnabled={aiAssistEnabled}
          aiSuggestions={aiSuggestions}
        />
      )}
    </>
  )
}

export default App
