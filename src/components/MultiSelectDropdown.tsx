import { useState, useRef, useEffect } from 'react'
import './MultiSelectDropdown.css'
import chevronDown from '/Chevon Down.svg'

interface MultiSelectDropdownProps {
  label?: string
  placeholder?: string
  options: string[]
  value?: string[]
  onChange?: (value: string[]) => void
}

function MultiSelectDropdown({
  label,
  placeholder = 'Select options',
  options = [],
  value = [],
  onChange
}: MultiSelectDropdownProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>(value)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Sync with external value prop
  useEffect(() => {
    setSelectedValues(value)
  }, [value])

  // Filter options based on search term
  const getFilteredOptions = (term: string): string[] => {
    if (!term.trim()) {
      return options
    }
    const lowerSearch = term.toLowerCase()
    return options.filter(option =>
      option.toLowerCase().includes(lowerSearch)
    )
  }

  const filteredOptions = getFilteredOptions(searchTerm)

  // Handle checkbox toggle
  const handleToggle = (option: string) => {
    const newValues = selectedValues.includes(option)
      ? selectedValues.filter(v => v !== option)
      : [...selectedValues, option]

    setSelectedValues(newValues)
    onChange?.(newValues)
  }

  // Handle removing a pill
  const handleRemove = (option: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const newValues = selectedValues.filter(v => v !== option)
    setSelectedValues(newValues)
    onChange?.(newValues)
  }

  // Handle input change for search
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setHighlightedIndex(-1)
    if (!isOpen) {
      setIsOpen(true)
    }
  }

  // Handle input focus
  const handleInputFocus = () => {
    setIsOpen(true)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === 'ArrowDown') {
        e.preventDefault()
        setIsOpen(true)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : -1))
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          handleToggle(filteredOptions[highlightedIndex])
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        setSearchTerm('')
        setHighlightedIndex(-1)
        inputRef.current?.blur()
        break
      case 'Backspace':
        if (searchTerm === '' && selectedValues.length > 0) {
          // Remove last selected item
          const newValues = selectedValues.slice(0, -1)
          setSelectedValues(newValues)
          onChange?.(newValues)
        }
        break
    }
  }

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        setIsOpen(false)
        setSearchTerm('')
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

  // Handle clicking the wrapper to focus input
  const handleWrapperClick = () => {
    inputRef.current?.focus()
  }

  return (
    <div className="multi-select-dropdown" ref={wrapperRef}>
      {label && <label className="multi-select-dropdown-label">{label}</label>}
      <div
        className={`multi-select-dropdown-wrapper ${isOpen ? 'focused' : ''}`}
        onClick={handleWrapperClick}
      >
        <div className="multi-select-dropdown-content">
          {selectedValues.length > 0 && (
            <div className="multi-select-pills">
              {selectedValues.map(val => (
                <span key={val} className="multi-select-pill">
                  {val}
                  <button
                    type="button"
                    className="multi-select-pill-remove"
                    onClick={(e) => handleRemove(val, e)}
                    aria-label={`Remove ${val}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
          <input
            ref={inputRef}
            type="text"
            className="multi-select-dropdown-input"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleKeyDown}
            placeholder={selectedValues.length === 0 ? placeholder : ''}
          />
        </div>
        <div className={`multi-select-dropdown-chevron ${isOpen ? 'open' : ''}`}>
          <img src={chevronDown} alt="" />
        </div>
        {isOpen && (
          <div className="multi-select-dropdown-options" ref={suggestionsRef}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={option}
                  className={`multi-select-dropdown-option ${
                    index === highlightedIndex ? 'highlighted' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleToggle(option)
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <input
                    type="checkbox"
                    className="multi-select-checkbox"
                    checked={selectedValues.includes(option)}
                    onChange={() => {}}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="multi-select-option-label">{option}</span>
                </div>
              ))
            ) : (
              <div className="multi-select-dropdown-no-results">
                No results found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default MultiSelectDropdown
