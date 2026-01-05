import { useState } from 'react'
import './Textarea.css'

interface TextareaProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  rows?: number
}

function Textarea({ value, onChange, placeholder, rows = 10 }: TextareaProps) {
  const [internalValue, setInternalValue] = useState<string>(value || '')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value
    setInternalValue(inputValue)
    onChange?.(inputValue)
  }

  return (
    <textarea
      className="textarea-field"
      value={internalValue}
      onChange={handleChange}
      placeholder={placeholder}
      rows={rows}
    />
  )
}

export default Textarea

