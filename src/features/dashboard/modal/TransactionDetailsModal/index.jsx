import React, { useEffect } from 'react';


const TransactionDetailsModal = ({ onClose, onDetailsClick  }) => {


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
        <div onClick={onDetailsClick}>
          <p className='cursor-pointer'>View Details</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsModal;
