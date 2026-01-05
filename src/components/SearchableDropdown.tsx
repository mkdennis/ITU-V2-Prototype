import { useState, useRef, useEffect } from 'react'
import './SearchableDropdown.css'
import chevronDown from '/Chevon Down.svg'

interface OptionObject {
  value: string
  label: string
}

type OptionType = string | OptionObject

interface SearchableDropdownProps {
  label?: string
  placeholder: string
  value?: string
  onChange?: (value: string) => void
  options: OptionType[]
  disabled?: boolean
}

function SearchableDropdown({
  label,
  placeholder,
  value,
  onChange,
  options = [],
  disabled = false
}: SearchableDropdownProps) {
  // Helper to get label from option
  const getLabel = (option: OptionType): string => {
    return typeof option === 'string' ? option : option.label
  }

  // Helper to get value from option
  const getValue = (option: OptionType): string => {
    return typeof option === 'string' ? option : option.value
  }

  // Helper to find label by value
  const findLabelByValue = (val: string): string => {
    const option = options.find(opt => getValue(opt) === val)
    return option ? getLabel(option) : val
  }

  const [inputValue, setInputValue] = useState<string>(value ? findLabelByValue(value) : '')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Update input value when prop value changes
  useEffect(() => {
    if (value !== undefined) {
      setInputValue(findLabelByValue(value))
      setIsSearching(false)
    }
  }, [value, options])

  // Filter options based on search term
  const getFilteredOptions = (searchTerm: string): OptionType[] => {
    if (!searchTerm.trim()) {
      return options
    }

    const lowerSearch = searchTerm.toLowerCase()
    return options.filter(option =>
      getLabel(option).toLowerCase().includes(lowerSearch)
    )
  }

  const filteredSuggestions = isSearching ? getFilteredOptions(inputValue) : options

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setInputValue(newValue)
    setIsSearching(true)
    setIsOpen(true)
    setHighlightedIndex(-1)
  }

  // Handle input focus
  const handleInputFocus = () => {
    if (value && !isSearching) {
      // If there's a selected value, allow editing by clearing and starting search
      setInputValue('')
      setIsSearching(true)
      setIsOpen(true)
    } else {
      setIsOpen(true)
      if (!isSearching) {
        setIsSearching(true)
      }
    }
  }

  // Handle suggestion selection
  const handleSelect = (option: OptionType) => {
    const selectedLabel = getLabel(option)
    const selectedValue = getValue(option)
    setInputValue(selectedLabel)
    setIsOpen(false)
    setIsSearching(false)
    setHighlightedIndex(-1)
    onChange?.(selectedValue)
    // Ensure input shows the selected value
    if (inputRef.current) {
      inputRef.current.value = selectedLabel
    }
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredSuggestions.length === 0) {
      if (e.key === 'Enter' && !isSearching && value) {
        // If there's a selected value and user presses Enter, allow editing
        setIsSearching(true)
        setInputValue('')
        setIsOpen(true)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setHighlightedIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : -1))
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && highlightedIndex < filteredSuggestions.length) {
          handleSelect(filteredSuggestions[highlightedIndex])
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        if (value) {
          setInputValue(findLabelByValue(value))
          setIsSearching(false)
        } else {
          setInputValue('')
        }
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
        if (value !== undefined) {
          setInputValue(findLabelByValue(value))
          setIsSearching(false)
        } else {
          if (!isSearching && inputValue) {
            // Keep the selected value
          } else if (isSearching && !inputValue) {
            setInputValue('')
          }
          setIsSearching(false)
        }
        setHighlightedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [value, isSearching, inputValue, options])

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
  const displayValue = isSearching ? inputValue : (value !== undefined ? findLabelByValue(value) : inputValue)
  const showPlaceholder = !displayValue && !isOpen

  return (
    <div className={`searchable-dropdown ${disabled ? 'disabled' : ''}`} ref={wrapperRef}>
      {label && <label className="searchable-dropdown-label">{label}</label>}
      <div className="searchable-dropdown-wrapper">
        <input
          ref={inputRef}
          type="text"
          className="searchable-dropdown-input"
          value={displayValue}
          onChange={handleInputChange}
          onFocus={disabled ? undefined : handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={showPlaceholder ? placeholder : ''}
          readOnly={!isSearching && !!value}
          disabled={disabled}
        />
        <div className={`searchable-dropdown-chevron ${isOpen ? 'open' : ''}`}>
          <img src={chevronDown} alt="" />
        </div>
        {isOpen && !disabled && (
          <div className="searchable-dropdown-suggestions" ref={suggestionsRef}>
            {filteredSuggestions.length > 0 ? (
              filteredSuggestions.map((suggestion, index) => (
                <div
                  key={getValue(suggestion)}
                  className={`searchable-dropdown-suggestion ${
                    index === highlightedIndex ? 'highlighted' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleSelect(suggestion)
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  {getLabel(suggestion)}
                </div>
              ))
            ) : (
              <div className="searchable-dropdown-no-results">
                No results found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchableDropdown


