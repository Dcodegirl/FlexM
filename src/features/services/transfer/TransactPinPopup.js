import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const TransactionPinPopup = ({ isVisible, onClose, onPinEntered }) => {
  const [pin, setPin] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePinChange = (e) => {
    setPin(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirm = () => {
    onPinEntered(pin);
    onClose();
  };
const handleCancel=() =>{
    onClose()
}
  return (
    <div>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-center">
          <div className="bg-white py-6 px-12 rounded-md md:w-[400px] h-[250px] md:w-[400px] absolute md:top-4/5 top-[200px] md:left-[45%] left-2/5">
            <h2 className="text-3xl font-bold my-4">Enter Transaction Pin</h2>
            <p className="my-3 mx-8 text-2xl text-center">To complete this transfer, please enter your 4-Digit Transaction  PIN</p>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                value={pin}
                onChange={handlePinChange}
                placeholder="Transaction Pin"
                className="border border-gray-200 py-3 px-4 w-full pr-12 my-7"
              />
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                onClick={handleTogglePasswordVisibility}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  className="text-gray-500 cursor-pointer"
                />
              </button>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="bg-white border border-color1 text-gray-700 rounded-lg h-12 w-full"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="bg-color1 text-white rounded-lg h-12 w-full"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionPinPopup;
