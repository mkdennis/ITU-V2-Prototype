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
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
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

