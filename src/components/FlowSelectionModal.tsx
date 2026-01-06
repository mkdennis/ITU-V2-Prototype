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
                <path d="M40 10 L42 38 L70 40 L42 42 L40 70 L38 42 L10 40 L38 38 Z" fill="#436B93"/>
                <path d="M60 20 L61 28 L69 29 L61 30 L60 38 L59 30 L51 29 L59 28 Z" fill="#436B93" opacity="0.7"/>
                <path d="M20 60 L21 68 L29 69 L21 70 L20 78 L19 70 L11 69 L19 68 Z" fill="#436B93" opacity="0.7"/>
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
