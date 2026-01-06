import { useState } from 'react'
import './RadioButtonGroup.css'

interface RadioOption {
  value: string
  label: string
}

interface RadioButtonGroupProps {
  label: string
  name: string
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
}

function RadioButtonGroup({ label, name, options, value, onChange }: RadioButtonGroupProps) {
  const [internalValue, setInternalValue] = useState<string>(value || '')

  const handleChange = (newValue: string) => {
    setInternalValue(newValue)
    onChange?.(newValue)
  }

  const selectedValue = value !== undefined ? value : internalValue

  return (
    <div className="radio-group">
      <label className="radio-group-label">{label}</label>
      <div className="radio-options">
        {options.map((option) => (
          <label key={option.value} className="radio-option">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={(e) => handleChange(e.target.value)}
              className="radio-input"
            />
            <span className="radio-label">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default RadioButtonGroup

