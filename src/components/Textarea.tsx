import { useState } from 'react'
import './Textarea.css'

interface TextareaProps {
  label?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  rows?: number
  disabled?: boolean
}

function Textarea({ label, value, onChange, placeholder, rows = 10, disabled = false }: TextareaProps) {
  const [internalValue, setInternalValue] = useState<string>(value || '')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value
    setInternalValue(inputValue)
    if (onChange) {
      onChange(e)
    }
  }

  return (
    <div className="textarea-container">
      {label && <label className="textarea-label">{label}</label>}
      <textarea
        className="textarea-field"
        value={internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
      />
    </div>
  )
}

export default Textarea

