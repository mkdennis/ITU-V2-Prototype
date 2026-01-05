import './ImageSlot.css'

interface ImageSlotProps {
  label?: string
  icon?: string
  isEmpty?: boolean
  onClick?: () => void
}

function ImageSlot({ label, icon, isEmpty = true, onClick }: ImageSlotProps) {
  return (
    <div className={`image-slot ${isEmpty ? 'empty' : ''}`} onClick={onClick}>
      {isEmpty ? (
        <>
          {icon ? (
            <div className="slot-icon">{icon}</div>
          ) : (
            <div className="slot-plus">+</div>
          )}
          {label && <span className="slot-label">{label}</span>}
        </>
      ) : (
        <div className="slot-image">Image</div>
      )}
    </div>
  )
}

export default ImageSlot

