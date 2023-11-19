import React, { useEffect } from 'react';
import './index.css'

const AgentDetailsModal = ({ agentDetails, onClose }) => {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      // Close the modal if the click is outside the modal content
      if (!e.target.closest('.modal-content')) {
        onClose();
      }
    };

    // Add event listener for clicks outside the modal
    document.addEventListener('mousedown', handleOutsideClick);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div className="modal">
      <div className="modal-content flex flex-col gap-3">
        <p>View Transaction</p>
        <p>Assign Terminal</p>
      </div>
    </div>
  );
};

export default AgentDetailsModal;
