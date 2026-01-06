import { useState } from 'react'
import './CategorySelectionModal.css'
import Modal from './Modal'

interface Category {
  l1: string
  l2: string
  l3?: string[]
}

interface CategorySelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (category: string) => void
  categories: Category[]
}

function CategorySelectionModal({ isOpen, onClose, onSelect, categories }: CategorySelectionModalProps) {
  const [selectedL1, setSelectedL1] = useState<string>('')
  const [selectedL2, setSelectedL2] = useState<string>('')
  const [selectedL3, setSelectedL3] = useState<string>('')

  // Get unique L1 categories
  const l1Categories = Array.from(new Set(categories.map(c => c.l1)))

  // Get L2 categories for selected L1
  const l2Categories = selectedL1
    ? categories.filter(c => c.l1 === selectedL1)
    : []

  // Get L3 categories for selected L2
  const l3Categories = selectedL2
    ? categories.find(c => c.l1 === selectedL1 && c.l2 === selectedL2)?.l3 || []
    : []

  const handleL1Click = (l1: string) => {
    setSelectedL1(l1)
    setSelectedL2('')
    setSelectedL3('')
  }

  const handleL2Click = (l2: string) => {
    setSelectedL2(l2)
    setSelectedL3('')
  }

  const handleL3Click = (l3: string) => {
    setSelectedL3(l3)
  }

  const handleSave = () => {
    if (selectedL3) {
      onSelect(`${selectedL1} > ${selectedL2} > ${selectedL3}`)
    } else if (selectedL2) {
      onSelect(`${selectedL1} > ${selectedL2}`)
    } else if (selectedL1) {
      onSelect(selectedL1)
    }
    onClose()
    // Reset selection
    setSelectedL1('')
    setSelectedL2('')
    setSelectedL3('')
  }

  const handleClose = () => {
    onClose()
    // Reset selection
    setSelectedL1('')
    setSelectedL2('')
    setSelectedL3('')
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="category-selection-modal">
        <div className="modal-header category-modal-header">
          <h2 className="modal-title">Select Category</h2>
          <button className="modal-close-button" onClick={handleClose}>
            ✕
          </button>
        </div>
        <div className="category-breadcrumb">
          Category: {selectedL1 && `${selectedL1} > `}{selectedL2 && `${selectedL2} > `}{selectedL3}
        </div>
        <div className="category-columns">
          <div className="category-column">
            {l1Categories.map((l1) => (
              <div
                key={l1}
                className={`category-item ${selectedL1 === l1 ? 'selected' : ''}`}
                onClick={() => handleL1Click(l1)}
              >
                <span>{l1}</span>
                {categories.filter(c => c.l1 === l1).length > 0 && (
                  <span className="category-count">
                    ({categories.filter(c => c.l1 === l1).length})
                  </span>
                )}
                {selectedL1 === l1 && <span className="category-arrow">&gt;</span>}
              </div>
            ))}
          </div>
          <div className="category-column">
            {l2Categories.map((cat) => (
              <div
                key={cat.l2}
                className={`category-item ${selectedL2 === cat.l2 ? 'selected' : ''}`}
                onClick={() => handleL2Click(cat.l2)}
              >
                <span>{cat.l2}</span>
                {cat.l3 && cat.l3.length > 0 && (
                  <span className="category-count">({cat.l3.length})</span>
                )}
                {selectedL2 === cat.l2 && cat.l3 && cat.l3.length > 0 && (
                  <span className="category-arrow">&gt;</span>
                )}
              </div>
            ))}
          </div>
          <div className="category-column">
            {l3Categories.map((l3) => (
              <div
                key={l3}
                className={`category-item ${selectedL3 === l3 ? 'selected' : ''}`}
                onClick={() => handleL3Click(l3)}
              >
                <span>{l3}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="modal-button modal-button-primary category-save-button"
            onClick={handleSave}
            disabled={!selectedL1}
          >
            SAVE
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default CategorySelectionModal
