import { useEffect } from 'react'
import './AILoadingPage.css'
import NavigationHeader from './NavigationHeader'

interface AILoadingPageProps {
  onComplete: () => void
}

function AILoadingPage({ onComplete }: AILoadingPageProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onComplete])

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
            Our AI is reviewing your photos and information to generate smart suggestions...
          </p>
        </div>
      </div>
    </>
  )
}

export default AILoadingPage
