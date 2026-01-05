import { useState } from 'react'
import './CollapsibleSection.css'
import chevronDown from '/Chevon Down.svg'

interface CollapsibleSectionProps {
  label: string
  children: React.ReactNode
}

function CollapsibleSection({ label, children }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="collapsible-section">
      <button 
        className="collapsible-section-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="collapsible-section-label link-button">{label}</span>
        <img 
          src={chevronDown} 
          alt="" 
          className={`collapsible-section-chevron ${isOpen ? 'open' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="collapsible-section-content">
          {children}
        </div>
      )}
    </div>
  )
}

export default CollapsibleSection

