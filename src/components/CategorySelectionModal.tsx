import { useState } from 'react'
import './CategorySelectionModal.css'
import Modal from './Modal'
import type { VerticalCategory } from '../types/aiSuggestions'

interface CategorySelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onSelect: (category: string) => void
  categories: VerticalCategory[]
}

function CategorySelectionModal({ isOpen, onClose, onSelect, categories }: CategorySelectionModalProps) {
  const [selectedL2, setSelectedL2] = useState<string>('')
  const [selectedL3, setSelectedL3] = useState<string>('')

  // Get L3 categories for selected L2
  const l3Categories = selectedL2
    ? categories.find(c => c.l2 === selectedL2)?.l3 || []
    : []

  const handleL2Click = (l2: string) => {
    setSelectedL2(l2)
    setSelectedL3('')
  }

  const handleL3Click = (l3: string) => {
    setSelectedL3(l3)
  }

  const handleSave = () => {
    if (selectedL3) {
      onSelect(`${selectedL2} > ${selectedL3}`)
    } else if (selectedL2) {
      onSelect(selectedL2)
    }
    onClose()
    // Reset selection
    setSelectedL2('')
    setSelectedL3('')
  }

  const handleClose = () => {
    onClose()
    // Reset selection
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
          Category: {selectedL2}{selectedL3 && ` > ${selectedL3}`}
        </div>
        <div className="category-columns category-columns-two">
          <div className="category-column">
            {categories.map((cat) => (
              <div
                key={cat.l2}
                className={`category-item ${selectedL2 === cat.l2 ? 'selected' : ''}`}
                onClick={() => handleL2Click(cat.l2)}
              >
                <span className="category-text">
                  {cat.l2}
                  {cat.l3 && cat.l3.length > 0 && (
                    <span className="category-count">({cat.l3.length})</span>
                  )}
                </span>
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
            disabled={!selectedL2}
          >
            SAVE
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default CategorySelectionModal
