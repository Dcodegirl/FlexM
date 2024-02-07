import React, { useState } from "react";
import money from '../../../../assets/icons/Money.svg'
import axios from "../../../../utils/axiosInstance";
import { useSelector } from 'react-redux';
import { useCustomToast } from "../../../../components/toast/useCustomToast";


const ConfirmTerminalModal = ({ isOpen, onConfirm, onCancel, selectedTerminalId, selectedSerialNumber , agentName, agentId }) => {
  // const agentId = useSelector((state) => state.auth.user?.id);
  const showToast = useCustomToast();
  const [loading, setLoading] = useState('');
const handleConfirmClick = async () => {
  try {
    setLoading(true);
    // Make the API call to /agent/terminal with the selected values
    const response = await axios.patch("/agent/terminal", {
      agent_id: agentId,
      terminal_id: selectedTerminalId,
      terminal_serial: selectedSerialNumber,
    });

    // Check if the response status is successful
    if (response.status === 201) {
      // Handle the response as needed
      console.log("API Response:", response.data);
      showToast("Terminal assigned successfully", 'success');
      setLoading(false);

      // Trigger the onConfirm callback
      onConfirm();
    } else {
      // Handle other types of errors
      handleApiError(response);
    }
  } catch (error) {
    // Handle network or other errors
    setLoading(false);
    handleApiError(error);
  }
};

const handleApiError = (error) => {
  console.error("Error confirming terminal:", error);

  if (error.response) {
    // The request was made and the server responded with a status code
    const { status, data } = error.response;
    if (status === 400 && data && data.message === "Terminal already assigned") {
      showToast("Terminal already assigned", 'error');
      setLoading(false);
    } else {
      // Handle other types of errors
      showToast("Error assigning terminal. Please try again.", 'error');
      setLoading(false);
    }
  } else {
    // Handle other types of errors
    showToast("Error assigning terminal. Please try again.", 'error');
  }
  setLoading(false);
  // Trigger the onConfirm callback
  onConfirm();
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
            <p>You’re assigning Terminal with ID {selectedTerminalId} to {agentName} with the Serial No {selectedSerialNumber}</p>
            {/* <p>You’re assigning Terminal to this agent</p> */}
          </div>
            <div className="flex justify-center space-x-4 py-4">
              {/* <button
                className="bg-cico1 text-white px-6 py-3 rounded-md hover:bg-bg-green hover:text-black"
                onClick={handleConfirmClick}
              >
                Confirm
              </button> */}
              <button
                type="submit"
                onClick={handleConfirmClick}
                className={`bg-color1  rounded-md  px-6 py-3  text-white  relative ${
                  loading ? 'opacity-50 pointer-events-none' : ''
                }`}
                disabled={loading}
              >
                {loading && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="loader"></div>
                  </div>
                )}
                {loading ? 'Confirming...' : 'Confirm'}
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
