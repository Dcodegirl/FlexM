import React, { useState, useEffect } from "react";
import axios from "../../../../utils/axiosInstance";

const AssignTerminalModal = ({ isOpen, onClose, onAssignConfirmClick }) => {
  const [selectedTerminalId, setSelectedTerminalId] = useState("");
  const [selectedSerialNumber, setSelectedSerialNumber] = useState("");
  const [terminals, setTerminals] = useState([]);
  const [serials, setSerials] = useState([]);


  const handleAssignClick = () => {
    // Perform assignment logic here
    console.log("Assigned Terminal ID:", selectedTerminalId);
    console.log("Assigned Serial Number:", selectedSerialNumber);

    // Trigger the callback to open the confirmation modal
    onAssignConfirmClick(selectedTerminalId, selectedSerialNumber);

    // Close the assign terminal modal
    onClose();
  };

  useEffect(() => {
    const fetchTerminals = async () => {
      try {
        const response = await axios.get("/terminals/terminal");
        setTerminals(response.data.data);
      } catch (error) {
        console.error("Error fetching terminals:", error);
      }
    };

    const fetchSerials = async () => {
      try {
        const response = await axios.get("/terminals/serial");
        setSerials(response.data.data);
      } catch (error) {
        console.error("Error fetching serials:", error);
      }
    };

    fetchTerminals();
    fetchSerials();
  }, []);
  return (
    // Modal backdrop
    <div
      className={`${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
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
                <option value="" disabled selected>
                  Select Terminal
                </option>
                {terminals.map((terminal) => (
                  <option key={terminal.id} value={terminal.terminal_id}>
                    {terminal.terminal_id}
                  </option>
                ))}
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
                <option value="" disabled selected>
                  Select Serial Number
                </option>
                {serials.map((serial) => (
                  <option key={serial.id} value={serial.serial_no}>
                    {serial.serial_no}
                  </option>
                ))}
              </select>
            </div>

            {/* Assign button */}
            <div className="text-center">
              <button
                className="bg-color1  text-white px-6 py-3 w-full rounded-md"
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
