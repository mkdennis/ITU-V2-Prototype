import { useState, useRef, useEffect } from 'react'
import './StandardDropdown.css'
import chevronDown from '/Chevon Down.svg'

interface DropdownOption {
  value: string
  label: string
  subline?: string
}

interface StandardDropdownProps {
  label?: string
  placeholder: string
  value?: string
  onChange?: (value: string) => void
  options: DropdownOption[]
  disabled?: boolean
}

function StandardDropdown({
  label,
  placeholder,
  value,
  onChange,
  options = [],
  disabled = false
}: StandardDropdownProps) {
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
    if (!disabled) {
      setIsOpen(!isOpen)
    }
  }

  // Handle suggestion selection
  const handleSelect = (optionValue: string) => {
    setInternalValue(optionValue)
    setIsOpen(false)
    setHighlightedIndex(-1)
    onChange?.(optionValue)
    // Ensure input shows the selected value
    if (inputRef.current) {
      const selectedOption = options.find(opt => opt.value === optionValue)
      inputRef.current.value = selectedOption?.label || optionValue
    }
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return

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
          prev < options.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : -1))
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && highlightedIndex < options.length) {
          handleSelect(options[highlightedIndex].value)
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
  const selectedOption = options.find(opt => opt.value === displayValue)
  const displayText = selectedOption?.label || displayValue
  const showPlaceholder = !displayValue && !isOpen

  return (
    <div className={`standard-dropdown ${disabled ? 'disabled' : ''}`} ref={wrapperRef}>
      {label && <label className="standard-dropdown-label">{label}</label>}
      <div className="standard-dropdown-wrapper">
        <input
          ref={inputRef}
          type="text"
          className="standard-dropdown-input"
          value={displayText}
          onClick={handleInputClick}
          onKeyDown={handleKeyDown}
          placeholder={showPlaceholder ? placeholder : ''}
          readOnly
          disabled={disabled}
        />
        <div className={`standard-dropdown-chevron ${isOpen ? 'open' : ''}`}>
          <img src={chevronDown} alt="" />
        </div>
        {isOpen && (
          <div className="standard-dropdown-suggestions" ref={suggestionsRef}>
            {options.map((option, index) => (
              <div
                key={option.value}
                className={`standard-dropdown-suggestion ${
                  index === highlightedIndex ? 'highlighted' : ''
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleSelect(option.value)
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                <div className="standard-dropdown-label-text">{option.label}</div>
                {option.subline && (
                  <div className="standard-dropdown-subline">{option.subline}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default StandardDropdown
