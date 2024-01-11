import React, { useState } from "react";
import bank from "../../../assets/images/mdi_bank.png";

const Popup = ({ isVisible, suggestedBanks, onClose, onBankSelected }) => {
  const [selectedBank, setSelectedBank] = useState("");

  const handleCheckboxChange = (bankCode) => {
    setSelectedBank(bankCode);
  };

  const handleBankSelection = () => {
    onBankSelected(selectedBank);
    onClose();
  };

  return (
    <div>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-center">
          <div className="bg-white p-6 rounded-md md:w-[400px] absolute md:top-4/5 top-[200px] md:left-3/5 left-2/5">
            <h2 className="text-2xl font-bold mb-4">Suggested Bank</h2>
            <h2 className="text-xl mb-4">Select the most suitable bank</h2>

            <ul>
              {suggestedBanks.map((bank) => (
                <li key={bank.bankcode} className="mb-2">
                  <label className="flex justify-between items-center">
                    {bank.bankName}
                    <input
                      type="radio"
                      value={bank.bankcode}
                      checked={selectedBank === bank.bankcode}
                      onChange={() => handleCheckboxChange(bank.bankcode)}
                      className="mr-2"
                    />
                  </label>
                </li>
              ))}
            </ul>
            <button
              onClick={handleBankSelection}
              className="flex gap-4 items-center bg-global-gray rounded-lg p-4 m-6 text-center"
            >
              <img src={bank} alt="bank icon" className="w-10" />
              <div className="text-xl font-semibold">Select Bank</div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
