import { useState, useRef, useEffect } from 'react'
import './ConditionDropdown.css'
import chevronDown from '/Chevon Down.svg'

interface Condition {
  name: string
  description: string
}

interface ConditionDropdownProps {
  label?: string
  placeholder: string
  value?: string
  onChange?: (value: string) => void
  conditions: Condition[]
  showSublineInField?: boolean
}

function ConditionDropdown({
  label,
  placeholder,
  value,
  onChange,
  conditions = [],
  showSublineInField = false
}: ConditionDropdownProps) {
  const [internalValue, setInternalValue] = useState<string>(value || '')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Update internal value when prop value changes
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value)
    }
  }, [value])

  // Handle input click/focus
  const handleInputClick = () => {
    setIsOpen(!isOpen)
  }

  // Handle suggestion selection
  const handleSelect = (conditionName: string) => {
    setInternalValue(conditionName)
    setIsOpen(false)
    setHighlightedIndex(-1)
    onChange?.(conditionName)
    // Ensure input shows the selected value
    if (inputRef.current) {
      inputRef.current.value = conditionName
    }
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault()
        setIsOpen(true)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev < conditions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : -1))
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && highlightedIndex < conditions.length) {
          handleSelect(conditions[highlightedIndex].name)
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        setHighlightedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        setIsOpen(false)
        setHighlightedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && suggestionsRef.current) {
      const highlightedElement = suggestionsRef.current.children[highlightedIndex] as HTMLElement
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth'
        })
      }
    }
  }, [highlightedIndex])

  // Use value prop if provided (controlled), otherwise use internal state (uncontrolled)
  const displayValue = value !== undefined ? value : internalValue
  const showPlaceholder = !displayValue && !isOpen

  // Get the full display text including subline if enabled
  const getDisplayText = () => {
    if (!displayValue) return ''
    if (!showSublineInField) return displayValue

    const selectedCondition = conditions.find(c => c.name === displayValue)
    if (selectedCondition) {
      return `${selectedCondition.name} - ${selectedCondition.description}`
    }
    return displayValue
  }

  return (
    <div className="condition-dropdown" ref={wrapperRef}>
      {label && <label className="condition-dropdown-label">{label}</label>}
      <div className="condition-dropdown-wrapper">
        <input
          ref={inputRef}
          type="text"
          className="condition-dropdown-input"
          value={getDisplayText()}
          onClick={handleInputClick}
          onKeyDown={handleKeyDown}
          placeholder={showPlaceholder ? placeholder : ''}
          readOnly
        />
        <div className={`condition-dropdown-chevron ${isOpen ? 'open' : ''}`}>
          <img src={chevronDown} alt="" />
        </div>
        {isOpen && (
          <div className="condition-dropdown-suggestions" ref={suggestionsRef}>
            {conditions.map((condition, index) => (
              <div
                key={condition.name}
                className={`condition-dropdown-suggestion ${
                  index === highlightedIndex ? 'highlighted' : ''
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleSelect(condition.name)
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                <div className="condition-dropdown-name">{condition.name}</div>
                <div className="condition-dropdown-description">{condition.description}</div>
                {condition.name === 'Excellent' && (
                  <div className="condition-dropdown-note">
                    Most Vintage & Antique items do not qualify for Excellent condition. We strongly suggest you thoroughly examine the condition of this item to ensure it follows the condition definition guidelines provided by 1stDibs.
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ConditionDropdown

