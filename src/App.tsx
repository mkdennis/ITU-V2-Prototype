import { useState } from 'react'
import './App.css'
import WelcomeModal from './components/WelcomeModal'
import FlowSelectionModal from './components/FlowSelectionModal'
import AIAssistInput from './components/AIAssistInput'
import AILoadingPage from './components/AILoadingPage'
import ItemUploadForm from './components/ItemUploadForm'

type AppState = 'welcome' | 'flow-selection' | 'ai-assist-input' | 'ai-loading' | 'item-upload'

function App() {
  const [appState, setAppState] = useState<AppState>('welcome')
  const [aiAssistEnabled, setAiAssistEnabled] = useState(false)

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

  const handleAIAssistContinue = () => {
    setAppState('ai-loading')
  }

  const handleLoadingComplete = () => {
    setAppState('item-upload')
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
        <AILoadingPage onComplete={handleLoadingComplete} />
      )}
      {appState === 'item-upload' && (
        <ItemUploadForm aiAssistEnabled={aiAssistEnabled} />
      )}
    </>
  )
}

export default App
