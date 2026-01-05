import './AISuggestion.css'

interface AISuggestionProps {
  suggestion: string
  onApply: () => void
}

function AISuggestion({ suggestion, onApply }: AISuggestionProps) {
  return (
    <div className="ai-suggestion">
      <span className="ai-suggestion-icon">✨</span>
      <span className="ai-suggestion-text">AI suggests: </span>
      <button className="ai-suggestion-link" onClick={onApply}>
        {suggestion}
      </button>
    </div>
  )
}

export default AISuggestion
