import { useState, useEffect } from 'react'
import './TextInput.css'

interface TextInputProps {
  label: string
  value?: string
  onChange?: (value: string) => void
  onBlur?: (value: string) => void
  placeholder?: string
  type?: 'text' | 'date'
}

function TextInput({ label, value, onChange, onBlur, placeholder, type = 'text' }: TextInputProps) {
  const [internalValue, setInternalValue] = useState<string>(value || '')

  // Update internal value when prop value changes
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value)
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setInternalValue(inputValue)
    onChange?.(inputValue)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    onBlur?.(inputValue)
  }

  return (
    <div className="text-input">
      <label className="text-input-label">{label}</label>
      <input
        type={type}
        className="text-input-field"
        value={internalValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
      />
    </div>
  )
}

export default TextInput

