import { useEffect, useState } from 'react'
import './AILoadingPage.css'
import NavigationHeader from './NavigationHeader'

interface AILoadingPageProps {
  onComplete: () => void
  isProcessing?: boolean
}

function AILoadingPage({ onComplete, isProcessing = false }: AILoadingPageProps) {
  const [minTimePassed, setMinTimePassed] = useState(false)

  // Ensure minimum display time for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimePassed(true)
    }, 2000) // Minimum 2 seconds display

    return () => clearTimeout(timer)
  }, [])

  // Transition when both min time passed and processing complete
  useEffect(() => {
    if (minTimePassed && !isProcessing) {
      onComplete()
    }
  }, [minTimePassed, isProcessing, onComplete])

  return (
    <>
      <NavigationHeader />
      <div className="loading-page">
        <div className="loading-container">
          <div className="loading-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
          </div>
          <h3 className="loading-title">Analyzing Your Item</h3>
          <p className="loading-description">
            Our AI is reviewing your information to generate smart suggestions...
          </p>
        </div>
      </div>
    </>
  )
}

export default AILoadingPage
