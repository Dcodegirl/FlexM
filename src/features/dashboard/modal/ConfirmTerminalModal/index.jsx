import React from "react";
import money from '../../../../assets/icons/Money.svg'


const ConfirmTerminalModal = ({ isOpen, onConfirm, onCancel }) => {
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
            <p>You’re assigning Terminal with ID 65363366363# to Jummzy Venture Capital LTD with the Serial No 243553636 #</p>
          </div>
            <div className="flex justify-center space-x-4 py-4">
              <button
                className="bg-progress-green text-white px-6 py-3 rounded-md hover:bg-bg-green hover:text-black"
                onClick={onConfirm}
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
