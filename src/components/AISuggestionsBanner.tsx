import './AISuggestionsBanner.css'

interface AISuggestionsBannerProps {
  onApplyAll: () => void
}

function AISuggestionsBanner({ onApplyAll }: AISuggestionsBannerProps) {
  return (
    <div className="ai-suggestions-banner">
      <div className="ai-suggestions-banner-content">
        <div className="ai-suggestions-banner-icon">✨</div>
        <div className="ai-suggestions-banner-text">
          <strong>AI-Powered Suggestions Ready</strong>
          <p>We've analyzed your item and created smart suggestions to help you complete your listing faster and more accurately.</p>
        </div>
      </div>
      <button
        className="ai-suggestions-apply-all-button"
        onClick={onApplyAll}
      >
        Apply All Suggestions
      </button>
    </div>
  )
}

export default AISuggestionsBanner
