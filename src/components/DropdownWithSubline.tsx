import './DropdownWithSubline.css'

interface DropdownOption {
  value: string
  label: string
  subline: string
}

interface DropdownWithSublineProps {
  label: string
  value: string
  options: DropdownOption[]
  onChange: (value: string) => void
  placeholder?: string
}

function DropdownWithSubline({ label, value, options, onChange, placeholder }: DropdownWithSublineProps) {
  const selectedOption = options.find(opt => opt.value === value)

  return (
    <div className="dropdown-with-subline-container">
      <label className="dropdown-with-subline-label">{label}</label>
      <div className="dropdown-with-subline-wrapper">
        <select
          className="dropdown-with-subline-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">{placeholder || 'Select an option'}</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {selectedOption && (
          <div className="dropdown-subline-text">{selectedOption.subline}</div>
        )}
      </div>
    </div>
  )
}

export default DropdownWithSubline
