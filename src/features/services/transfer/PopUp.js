import React, { useState } from "react";
import bank from "../../../assets/images/mdi_bank.png";
import SearchInputPopup from "./SearchInputPopup";

const Popup = ({ isVisible, suggestedBanks, onClose, onBankSelected, onSearch }) => {
  const [selectedBank, setSelectedBank] = useState("");
  const [visiblePopup, setVisiblePopup] = useState(true);
  const [searchPopupVisible, setSearchPopupVisible] = useState(false);

  const handleCheckboxChange = (bankCode) => {
    setSelectedBank(bankCode);
  };

  const handleBankSelection = () => {
    onBankSelected(selectedBank);
    setVisiblePopup(false);
  };

  const handleSearchButtonClick = () => {
    setVisiblePopup(false);
    setSearchPopupVisible(true);
  };

  const handleCloseSearchPopup = () => {
    setSearchPopupVisible(false);
    setVisiblePopup(true);
  };

  return (
    <div>
      {isVisible && visiblePopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-center">
          <div className="bg-white p-6 rounded-md md:w-[400px] absolute md:top-4/5 top-[200px] md:left-[45%] left-2/5">
            <h2 className="text-2xl font-bold mb-4">Suggested Bank</h2>
            <h2 className="text-xl mb-4">Select the most suitable bank</h2>

            <ul>
              {suggestedBanks.map((bank) => (
                <li key={bank.bankcode} className="mb-2 cursor-pointer">
                  <label className="flex justify-between items-center">
                    {bank.bankName}
                    <input
                      type="radio"
                      value={bank.bankcode}
                      onClick={handleBankSelection}
                      checked={selectedBank === bank.bankcode}
                      onChange={() => handleCheckboxChange(bank.bankcode)}
                      className="mr-2"
                    />
                  </label>
                </li>
              ))}
            </ul>

            <button
              onClick={handleSearchButtonClick}
              className="flex gap-4 items-center bg-global-gray rounded-lg p-4 m-6 text-center"
            >
              <img src={bank} alt="bank icon" className="w-10" />
              <div className="text-xl font-semibold">Search Bank</div>
            </button>
          </div>
        </div>
      )}

      <SearchInputPopup
        isVisible={searchPopupVisible}
        onClose={handleCloseSearchPopup}
        onSearch={onSearch}
      />
    </div>
  );
};

export default Popup;
