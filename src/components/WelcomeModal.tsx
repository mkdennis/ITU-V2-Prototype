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
          <div className="welcome-features">
            <div className="welcome-feature">
              <div className="welcome-feature-icon">📸</div>
              <div className="welcome-feature-content">
                <h4 className="welcome-feature-title">Upload Photos</h4>
                <p className="welcome-feature-description">
                  Upload images of your item for AI analysis
                </p>
              </div>
            </div>
            <div className="welcome-feature">
              <div className="welcome-feature-icon">📝</div>
              <div className="welcome-feature-content">
                <h4 className="welcome-feature-title">Paste Information</h4>
                <p className="welcome-feature-description">
                  Copy and paste any text about your item
                </p>
              </div>
            </div>
            <div className="welcome-feature">
              <div className="welcome-feature-icon">✨</div>
              <div className="welcome-feature-content">
                <h4 className="welcome-feature-title">Get Smart Suggestions</h4>
                <p className="welcome-feature-description">
                  Review and apply AI-generated listing details
                </p>
              </div>
            </div>
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
