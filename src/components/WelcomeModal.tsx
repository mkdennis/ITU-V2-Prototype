import './WelcomeModal.css'
import Modal from './Modal'

interface WelcomeModalProps {
  isOpen: boolean
  onGetStarted: () => void
}

function WelcomeModal({ isOpen, onGetStarted }: WelcomeModalProps) {
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
          <div className="welcome-banner">
            This prototype is for demo purposes only. Certain functionalities may not work. Final design may look different.
          </div>
        </div>
        <div className="modal-footer">
          <button className="modal-button modal-button-primary" onClick={onGetStarted}>
            Get Started
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default WelcomeModal
