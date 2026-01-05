import './FlowSelectionModal.css'
import Modal from './Modal'

interface FlowSelectionModalProps {
  isOpen: boolean
  onSelectAIAssist: () => void
  onSelectStandard: () => void
}

function FlowSelectionModal({ isOpen, onSelectAIAssist, onSelectStandard }: FlowSelectionModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <div className="flow-selection-modal">
        <div className="modal-header">
          <h2 className="modal-title">Choose Your Upload Method</h2>
          <p className="modal-description">
            Select how you'd like to create your listing
          </p>
        </div>
        <div className="flow-cards">
          <div className="flow-card" onClick={onSelectAIAssist}>
            <div className="flow-card-icon">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="30" stroke="#436B93" strokeWidth="2" fill="none"/>
                <path d="M35 35 L45 40 L35 45 Z" fill="#436B93"/>
                <circle cx="40" cy="25" r="3" fill="#436B93"/>
                <circle cx="55" cy="40" r="3" fill="#436B93"/>
                <circle cx="40" cy="55" r="3" fill="#436B93"/>
                <circle cx="25" cy="40" r="3" fill="#436B93"/>
              </svg>
            </div>
            <h3 className="flow-card-title">AI Assist</h3>
            <p className="flow-card-description">
              Upload photos and paste text. Our AI will help fill out your listing details.
            </p>
          </div>
          <div className="flow-card" onClick={onSelectStandard}>
            <div className="flow-card-icon">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <rect x="25" y="25" width="30" height="35" stroke="#436B93" strokeWidth="2" fill="none" rx="2"/>
                <line x1="30" y1="32" x2="50" y2="32" stroke="#436B93" strokeWidth="2"/>
                <line x1="30" y1="40" x2="50" y2="40" stroke="#436B93" strokeWidth="2"/>
                <line x1="30" y1="48" x2="45" y2="48" stroke="#436B93" strokeWidth="2"/>
              </svg>
            </div>
            <h3 className="flow-card-title">Standard</h3>
            <p className="flow-card-description">
              Manually fill out all listing details yourself.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default FlowSelectionModal
