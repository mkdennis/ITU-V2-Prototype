import { useState } from 'react'
import './TextInput.css'

interface TextInputProps {
  label: string
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  type?: 'text' | 'date'
}

function TextInput({ label, value, onChange, placeholder, type = 'text' }: TextInputProps) {
  const [internalValue, setInternalValue] = useState<string>(value || '')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setInternalValue(inputValue)
    onChange?.(inputValue)
  }

  return (
    <div className="text-input">
      <label className="text-input-label">{label}</label>
      <input
        type={type}
        className="text-input-field"
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  )
}

export default TextInput

