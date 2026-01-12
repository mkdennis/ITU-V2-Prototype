import { useState } from 'react'
import './App.css'
import WelcomeModal from './components/WelcomeModal'
import FlowSelectionModal from './components/FlowSelectionModal'
import AIAssistInput from './components/AIAssistInput'
import AILoadingPage from './components/AILoadingPage'
import ItemUploadForm from './components/ItemUploadForm'
import { parseListingWithAI } from './services/aiAssistParser'
import type { AISuggestions } from './types/aiSuggestions'
import type { Vertical } from './types/vertical'

type AppState = 'welcome' | 'flow-selection' | 'ai-assist-input' | 'ai-loading' | 'item-upload'

function App() {
  const [appState, setAppState] = useState<AppState>('welcome')
  const [aiAssistEnabled, setAiAssistEnabled] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestions>({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedVertical, setSelectedVertical] = useState<Vertical>('furniture')

  const handleGetStarted = (vertical: Vertical) => {
    setSelectedVertical(vertical)
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
    console.log('=== AI ASSIST FLOW STARTED ===')
    console.log('Text content length:', textContent.length)
    console.log('Text preview:', textContent.slice(0, 200) + '...')
    console.log('Use prefill description:', usePrefillDescription)

    setAppState('ai-loading')
    setIsProcessing(true)

    try {
      console.log('Calling parseListingWithAI...')
      const startTime = performance.now()

      // Parse the listing text with AI
      const result = await parseListingWithAI(textContent, usePrefillDescription)

      const endTime = performance.now()
      console.log(`Parsing completed in ${(endTime - startTime).toFixed(0)}ms`)
      console.log('=== PARSED SUGGESTIONS ===')
      console.log(JSON.stringify(result.suggestions, null, 2))

      setAiSuggestions(result.suggestions)
    } catch (error) {
      console.error('Failed to parse listing:', error)
      // Continue anyway with empty suggestions
      setAiSuggestions({})
    } finally {
      setIsProcessing(false)
      console.log('=== AI ASSIST FLOW COMPLETE ===')
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
        <ItemUploadForm aiAssistEnabled={aiAssistEnabled} vertical={selectedVertical} />
      )}
    </>
  )
}

export default App
