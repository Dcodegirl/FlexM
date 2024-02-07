import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { useHistory } from 'react-router-dom';


const AgentDetailsModal = ({ agentDetails, onClose, onAssignTerminalClick  }) => {
  const history = useHistory();

  const handleViewTransactionClick = () => {
    // Close the modal
    onClose();

    // Trigger the navigation to the 'View' page
    history.push(`/agent/view?agentCode=${agentDetails.agentCode}&name=${agentDetails.name}&phoneNumber=${agentDetails.phoneNumber}&agentId=${agentDetails.id}`);
  };

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
    <div className="">
      <div className="flex flex-col gap-3 bg-white p-5 rounded-lg shadow-lg modal-content">
        <div onClick={handleViewTransactionClick}>
          <p className='cursor-pointer'>View Transaction</p>
        </div>
        <div onClick={onAssignTerminalClick}>
          <p className='cursor-pointer'>Assign Terminal</p>
        </div>
      </div>
    </div>
  );
};

export default AgentDetailsModal;
