import { useState, useRef, useEffect } from 'react'
import './SearchableCategoryDropdown.css'
import chevronDown from '/Chevon Down.svg'
import type { VerticalCategory } from '../types/aiSuggestions'

interface SearchableCategoryDropdownProps {
  label?: string
  placeholder: string
  value?: string
  onChange?: (value: string) => void
  categories: VerticalCategory[]
}

function SearchableCategoryDropdown({
  label,
  placeholder,
  value,
  onChange,
  categories = []
}: SearchableCategoryDropdownProps) {
  const [inputValue, setInputValue] = useState<string>(value || '')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1)
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Update input value when prop value changes
  useEffect(() => {
    if (value !== undefined) {
      setInputValue(value)
      setIsSearching(false)
    }
  }, [value])

  // Recent categories to show when field is empty
  const recentCategories = [
    'Seating > Dining Room Chairs',
    'Seating > Stools',
    'Tables > Vanities'
  ]

  // Filter categories based on search term
  const getFilteredCategories = (searchTerm: string): string[] => {
    if (!searchTerm.trim()) {
      return []
    }

    const lowerSearch = searchTerm.toLowerCase()
    const results: string[] = []

    categories.forEach(category => {
      // Check if L2 matches
      if (category.l2.toLowerCase().includes(lowerSearch)) {
        results.push(category.l2)
      }
      // Check if any L3 matches
      if (category.l3) {
        category.l3.forEach(l3 => {
          if (l3.toLowerCase().includes(lowerSearch)) {
            results.push(`${category.l2} > ${l3}`)
          }
        })
      }
    })

    return results
  }

  // Determine what to show: recent categories or filtered suggestions
  const showRecentCategories = isOpen && isSearching && inputValue.trim() === ''
  const filteredSuggestions = isSearching && inputValue.trim() !== '' ? getFilteredCategories(inputValue) : []
  const displaySuggestions = showRecentCategories ? recentCategories : filteredSuggestions

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
  const handleSelect = (selectedValue: string) => {
    setInputValue(selectedValue)
    setIsOpen(false)
    setIsSearching(false)
    setHighlightedIndex(-1)
    onChange?.(selectedValue)
    // Ensure input shows the selected value
    if (inputRef.current) {
      inputRef.current.value = selectedValue
    }
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || displaySuggestions.length === 0) {
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
          prev < displaySuggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : -1))
        break
      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && highlightedIndex < displaySuggestions.length) {
          handleSelect(displaySuggestions[highlightedIndex])
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        if (value) {
          setInputValue(value)
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
      // Check if click is outside and not on a suggestion
      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        setIsOpen(false)
        if (value !== undefined) {
          // Controlled mode - use prop value
          setInputValue(value)
          setIsSearching(false)
        } else {
          // Uncontrolled mode - keep current inputValue if it was selected, otherwise clear
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
  }, [value, isSearching, inputValue])

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
  const displayValue = isSearching ? inputValue : (value !== undefined ? value : inputValue)
  const showPlaceholder = !displayValue && !isOpen

  return (
    <div className="searchable-category-dropdown" ref={wrapperRef}>
      {label && <label className="searchable-category-dropdown-label">{label}</label>}
      <div className="searchable-category-dropdown-wrapper">
        <input
          ref={inputRef}
          type="text"
          className="searchable-category-dropdown-input"
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={showPlaceholder ? placeholder : ''}
          readOnly={!isSearching && !!value}
        />
        <div className={`searchable-category-dropdown-chevron ${isOpen ? 'open' : ''}`}>
          <img src={chevronDown} alt="" />
        </div>
        {isOpen && (
          <div className="searchable-category-dropdown-suggestions" ref={suggestionsRef}>
            {showRecentCategories && (
              <div className="searchable-category-dropdown-subheader">Recent Categories</div>
            )}
            {displaySuggestions.length > 0 ? (
              displaySuggestions.map((suggestion, index) => (
                <div
                  key={suggestion}
                  className={`searchable-category-dropdown-suggestion ${
                    index === highlightedIndex ? 'highlighted' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleSelect(suggestion)
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  {suggestion}
                </div>
              ))
            ) : (
              !showRecentCategories && (
                <div className="searchable-category-dropdown-no-results">
                  No results found
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchableCategoryDropdown
