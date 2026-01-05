import './Dropdown.css'
import chevronDown from '/Chevon Down.svg'

interface DropdownProps {
  label?: string
  placeholder: string
  value?: string
  onChange?: (value: string) => void
  options?: Array<{ value: string; label: string }>
  disabled?: boolean
}

function Dropdown({ label, placeholder, value, onChange, options = [], disabled = false }: DropdownProps) {
  return (
    <div className={`dropdown ${disabled ? 'disabled' : ''}`}>
      {label && <label className="dropdown-label">{label}</label>}
      <div className="dropdown-wrapper">
        <select
          className="dropdown-select"
          value={value || ''}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="dropdown-chevron">
          <img src={chevronDown} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Dropdown

