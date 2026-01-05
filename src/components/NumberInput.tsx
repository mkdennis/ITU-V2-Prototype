import { useState } from 'react'
import './NumberInput.css'

interface NumberInputProps {
  label: string
  suffix?: string
  prefix?: string
  value?: number
  onChange?: (value: number) => void
  placeholder?: string
}

function NumberInput({ label, suffix, prefix, value, onChange, placeholder }: NumberInputProps) {
  const [internalValue, setInternalValue] = useState<string>(value?.toString() || '')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setInternalValue(inputValue)
    
    if (onChange) {
      if (inputValue === '') {
        onChange(undefined as any)
      } else {
        const numValue = parseFloat(inputValue)
        if (!isNaN(numValue)) {
          onChange(numValue)
        }
      }
    }
  }

  return (
    <div className="number-input">
      <label className="number-input-label">{label}</label>
      <div className="number-input-wrapper">
        {prefix && <span className="number-input-prefix">{prefix}</span>}
        <input
          type="number"
          className={`number-input-field ${prefix ? 'has-prefix' : ''}`}
          value={internalValue}
          onChange={handleChange}
          placeholder={placeholder}
        />
        {suffix && <span className="number-input-suffix">{suffix}</span>}
      </div>
    </div>
  )
}

export default NumberInput

