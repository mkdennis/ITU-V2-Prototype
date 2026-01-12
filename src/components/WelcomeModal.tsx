import './WelcomeModal.css'
import Modal from './Modal'
import { useState } from 'react'
import type { Vertical } from '../types/vertical'
import { VERTICALS } from '../types/vertical'

interface WelcomeModalProps {
  isOpen: boolean
  onGetStarted: (vertical: Vertical) => void
}

function WelcomeModal({ isOpen, onGetStarted }: WelcomeModalProps) {
  const [selectedVertical, setSelectedVertical] = useState<Vertical>('furniture')

  const handleGetStarted = () => {
    onGetStarted(selectedVertical)
  }

  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <div className="welcome-modal">
        <div className="modal-header">
          <h2 className="modal-title">Welcome to Item Upload</h2>
          <p className="modal-description">
            We've introduced a new AI-powered way to create your listings faster. Let our AI help you fill out item details based on photos and text you provide.
          </p>
        </div>
        <div className="modal-body">
          <div className="vertical-selection">
            <label className="vertical-label">Select Vertical *</label>
            <select
              className="vertical-dropdown"
              value={selectedVertical}
              onChange={(e) => setSelectedVertical(e.target.value as Vertical)}
            >
              {VERTICALS.map((vertical) => (
                <option key={vertical.value} value={vertical.value}>
                  {vertical.label}
                </option>
              ))}
            </select>
          </div>
          <div className="welcome-banner">
            This prototype is for demo purposes only. Certain functionalities may not work. Final design may look different.
          </div>
        </div>
        <div className="modal-footer">
          <button className="modal-button modal-button-primary" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default WelcomeModal
