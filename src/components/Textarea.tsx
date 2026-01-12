import './Textarea.css'

interface TextareaProps {
  label?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  rows?: number
  disabled?: boolean
}

function Textarea({ label, value = '', onChange, placeholder, rows = 10, disabled = false }: TextareaProps) {
  return (
    <div className="textarea-container">
      {label && <label className="textarea-label">{label}</label>}
      <textarea
        className="textarea-field"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
      />
    </div>
  )
}

export default Textarea

