import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../../../../custom-hooks/Context'; 
import SuccessModal from '../../../layout/Modal/successModal'

function Contact() {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);
  const { successModalOpen, setSuccessModalOpen } = useGlobalContext();

  const handlePinChange = (index, value) => {
    if (value >= 0 && value <= 9) {
      const newPinDigits = [...pin];
      newPinDigits[index] = value;
      setPin(newPinDigits);

      if (index < newPinDigits.length - 1 && value !== "") {
        document.getElementById(`pin-input-${index + 1}`).focus();
      }
    }
  };

  const handleConfirmPinChange = (index, value) => {
    if (value >= 0 && value <= 9) {
      const newConfirmPinDigits = [...confirmPin];
      newConfirmPinDigits[index] = value;
      setConfirmPin(newConfirmPinDigits);

      if (index < newConfirmPinDigits.length - 1 && value !== "") {
        document.getElementById(`confirmpin-input-${index + 1}`).focus();
      }
    }
  };

  const isPinComplete = pin.every((digit) => digit !== "");

  useEffect(() => {
    for (let i = 0; i < pin.length; i++) {
      if (!pin[i]) {
        document.getElementById(`pin-input-${i}`).focus();
        break;
      }
    }
  }, [pin]);

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && index > 0 && !pin[index]) {
      document.getElementById(`pin-input-${index - 1}`).focus();
    }
  };

  const handleConfirmKeyDown = (event, index) => {
    if (event.key === "Backspace" && index > 0 && !confirmPin[index]) {
      document.getElementById(`confirmpin-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPinComplete) {
      const enteredPin = pin.join("");
      const enteredConfirmPin = confirmPin.join("");
  
      if (enteredPin === enteredConfirmPin) {
        // If the form submission is successful, show the SuccessModal
        setSuccessModalOpen(true);
      } else {
        alert("PINs do not match. Please try again.");
      }
    } else {
      alert("Please enter all 4 PIN digits.");
    }
  };
  

  return (
    <>
      <div className='md:m-8 my-8 overflow-hidden'>
        <div className="md:p-16 py-16 px-8 md:bg-bg-green md:border-[#00BD7A40] bg-white border-white rounded-3xl border">
          <div className="text-deep-green font-bold text-center">
            <p className='text-2xl'>Verify your pin</p>
            <p className="text-gray-500 text-xl font-thin w-[360px]">We sent a PIN to the number attached to your account: +2347065436765</p>
          </div>
          <div className='w-[350px] mt-6 flex items-center justify-center'>
            <form onSubmit={handleSubmit} className=''>
              <p className='text-gray-700 text-sm mb-2 mx-8'>Enter PIN</p>
              {pin.map((value, index) => (
                <input
                  key={index}
                  type="tel"
                  value={value}
                  onChange={(e) => handlePinChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  min="0"
                  max="9"
                  maxLength="1"
                  required
                  id={`pin-input-${index}`}
                  tabIndex={index + 1}
                  className='border md:bg-bg-green bg-white border-[#D0D5DD] h-16 w-14 text-center m-2 rounded-lg p-4 mx-8'
                />
              ))}
              <p className='text-gray-700 text-sm mb-2 mx-8'>Confirm PIN</p>
              {confirmPin.map((value, index) => (
                <input
                  key={index}
                  type="tel"
                  value={value}
                  onChange={(e) => handleConfirmPinChange(index, e.target.value)}
                  onKeyDown={(e) => handleConfirmKeyDown(e, index)}
                  min="0"
                  max="9"
                  maxLength="1"
                  required
                  id={`confirmpin-input-${index}`}
                  tabIndex={index + 1}
                  className='border md:bg-bg-green bg-white border-[#D0D5DD] h-16 w-14 text-center m-2 rounded-lg p-4 mx-8'
                />
              ))}
            </form>
          </div>
          <div className='flex justify-center items-center mt-8'>
            <button
                onClick={handleSubmit}
              className="bg-cico-green rounded-lg h-14 md:w-[60%] w-[30%] text-white mx-auto cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      
      {successModalOpen && <SuccessModal />}
    </>
  );
}

export default Contact;
