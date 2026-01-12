import { useState } from 'react'
import './APIToggle.css'

export type AIMode = 'claude' | 'regex'

interface APIToggleProps {
  mode: AIMode
  onModeChange: (mode: AIMode) => void
}

function APIToggle({ mode, onModeChange }: APIToggleProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={`api-toggle-container ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="api-toggle-trigger">
        <span className="api-toggle-icon">AI</span>
      </div>
      <div className="api-toggle-content">
        <span className="api-toggle-label">AI Mode:</span>
        <div className="api-toggle-switch">
          <button
            className={`api-toggle-option ${mode === 'claude' ? 'active' : ''}`}
            onClick={() => onModeChange('claude')}
          >
            Claude API
          </button>
          <button
            className={`api-toggle-option ${mode === 'regex' ? 'active' : ''}`}
            onClick={() => onModeChange('regex')}
          >
            Regex Backup
          </button>
        </div>
      </div>
    </div>
  )
}

export default APIToggle
