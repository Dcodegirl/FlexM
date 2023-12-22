import React from "react";
import money from '../../../../assets/icons/Money.svg'
import axios from "../../../../utils/axiosInstance";
import { useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';


const ConfirmTerminalModal = ({ isOpen, onConfirm, onCancel, selectedTerminalId, selectedSerialNumber , agentName }) => {
  // const agentId = useSelector((state) => state.auth.user?.id);
  const { addToast } = useToasts();
console.log('agent name:', agentName?.id)
const handleConfirmClick = async () => {
  try {
    // Make the API call to /agent/terminal with the selected values
    const response = await axios.patch("/agent/terminal", {
      agent_id: agentName.id, // Replace with the actual agent ID
      terminal_id: selectedTerminalId,
      terminal_serial: selectedSerialNumber,
    });

    // Check if the response status is successful
    if (response.status === 200) {
      // Handle the response as needed
      console.log("API Response:", response.data);
      addToast("Terminal assigned successfully", {
        appearance: 'success',
        autoDismiss: true,
        autoDismissTimeout: 3000
      });

      // Trigger the onConfirm callback
      onConfirm();
    } else {
      // Handle the error, log it, or show a notification
      console.error("Error confirming terminal. Unexpected response status:", response.status);

      // Check for specific error status code (e.g., 400 Bad Request)
      if (response.status === 400) {
        // Check for specific error message
        const errorMessage = response.data && response.data.message;
        if (errorMessage) {
          addToast(errorMessage, {
            appearance: 'error',
            autoDismiss: true,
            autoDismissTimeout: 3000
          });
          onConfirm();
        } else {
          addToast("Bad Request. Please check your input and try again.", {
            appearance: 'error',
            autoDismiss: true,
            autoDismissTimeout: 3000
          });
          onConfirm();
        }
      } else {
        // Handle other types of errors
        addToast("Error assigning terminal. Please try again.", {
          appearance: 'error',
          autoDismiss: true,
          autoDismissTimeout: 3000
        });
        onConfirm();
      }
    }
  } catch (error) {
    // Handle network or other errors
    console.error("Error confirming terminal:", error);

    // Check if the error response includes validation errors
    if (error.response && error.response.data && error.response.data.errors) {
      const validationErrors = error.response.data.errors;

      // Handle validation errors (e.g., show a notification to the user)
      Object.values(validationErrors).forEach(errorMessages => {
        errorMessages.forEach(errorMessage => {
          addToast(errorMessage, { appearance: 'error', autoDismiss: true, autoDismissTimeout: 3000 });
        });
      });
      onConfirm();
    } else {
      // Handle other types of errors
      addToast("Error assigning terminal. Please try again.", {
        appearance: 'error',
        autoDismiss: true,
        autoDismissTimeout: 3000
      });
      onConfirm();
    }
  }
};

  console.log('selected transaction info: ', agentName)
  return (
    <div
      className={`${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } fixed inset-0 z-50 transition-opacity ease-in-out duration-300`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-md w-full  text-center">
          <div className="">
          <div className="bg-[#f9f9f9] px-12 py-6 text-white text-center">
            <h2 className="text-2xl font-bold text-[#111023]">Assign Terminal</h2>
            <p className="text-sm text-[#A59696]">Assign Terminal to the Agents to start transacting seamlessly</p>
          </div>
          <div className="w-full px-8 py-4">
            <div className="flex justify-center py-6">
                <img src={money} alt="" />
            </div>
            <p>You’re assigning Terminal with ID {selectedTerminalId} to {agentName?.name} with the Serial No {selectedSerialNumber}</p>
            {/* <p>You’re assigning Terminal to this agent</p> */}
          </div>
            <div className="flex justify-center space-x-4 py-4">
              <button
                className="bg-progress-green text-white px-6 py-3 rounded-md hover:bg-bg-green hover:text-black"
                onClick={handleConfirmClick}
              >
                Confirm
              </button>
              <button
                className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmTerminalModal;
