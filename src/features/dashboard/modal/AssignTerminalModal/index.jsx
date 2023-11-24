import React, { useState } from "react";

const AssignTerminalModal = ({ isOpen, onClose, onAssignConfirmClick }) => {
  const [selectedTerminalId, setSelectedTerminalId] = useState("");
  const [selectedSerialNumber, setSelectedSerialNumber] = useState("");

  const handleAssignClick = () => {
    // Perform assignment logic here
    console.log("Assigned Terminal ID:", selectedTerminalId);
    console.log("Assigned Serial Number:", selectedSerialNumber);

    // Trigger the callback to open the confirmation modal
    onAssignConfirmClick();

    // Close the assign terminal modal
    onClose();
  };

  return (
    // Modal backdrop
    <div
      className={`${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } fixed inset-0 z-50 transition-opacity ease-in-out duration-300`}
    >
      {/* Modal container */}
      <div className="flex items-center justify-center min-h-screen modal-content">
        {/* Modal content */}
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-md w-full">
          {/* Modal header */}
          <div className="bg-[#f9f9f9] px-12 py-6 text-white text-center">
            <h2 className="text-2xl font-bold text-[#111023]">Assign Terminal</h2>
            <p className="text-sm text-[#A59696]">Assign Terminal to the Agents to start transacting seamlessly</p>
          </div>

          {/* Modal body */}
          <div className="p-6">
            {/* Terminal ID select input */}
            <div className="mb-4">
              <label htmlFor="terminalId" className="block text-sm font-medium text-gray-700">
                Terminal ID
              </label>
              <select
                id="terminalId"
                name="terminalId"
                className="mt-1 p-2 border rounded-md w-full"
                onChange={(e) => setSelectedTerminalId(e.target.value)}
              >
                {/* Add options for terminal IDs */}
                <option value="terminal1">Terminal 1</option>
                <option value="terminal2">Terminal 2</option>
                {/* Add more options as needed */}
              </select>
            </div>

            {/* Terminal Serial Number select input */}
            <div className="mb-4">
              <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700">
                Terminal Serial Number
              </label>
              <select
                id="serialNumber"
                name="serialNumber"
                className="mt-1 p-2 border rounded-md w-full"
                onChange={(e) => setSelectedSerialNumber(e.target.value)}
              >
                {/* Add options for terminal serial numbers */}
                <option value="serial1">Serial 1</option>
                <option value="serial2">Serial 2</option>
                {/* Add more options as needed */}
              </select>
            </div>

            {/* Assign button */}
            <div className="text-center">
              <button
                className="bg-progress-green text-white px-6 py-3 w-full rounded-md hover:bg-bg-green hover:text-black"
                onClick={handleAssignClick}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignTerminalModal;
