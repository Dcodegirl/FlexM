import React, { useState } from "react";
import bank from "../../../assets/images/mdi_bank.png";
import closeIcon from '../../../assets/icons/closeModal.svg';



const SearchInputPopup = ({ isVisible, onClose, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
    onClose();
  };

  return (
    <div>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-center">
        <div className="bg-white p-6 rounded-md md:w-[300px] absolute md:top-4/5 top-[200px] md:left-3/5 left-2/5">
          <div className="flex justify-between items-center mb-4">
          <div className="w-[70px]">
          </div>
          <div>
          <h2 className="text-2xl font-bold">Select a Bank</h2>
          </div>
          <div>
          <img src={closeIcon} className="w-10" alt="bank icon"  onClick={()=>(onClose())}/>

            </div>
          </div>
          <p className="m-4">Which bank does your recipient use?</p>
          <div className="relative">
          <img src={bank} alt="bank icon" className="w-8 absolute top-2 left-3" />
          <input
              type="text"
              value={searchQuery}
              onClick={handleSearch}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for Bank"
              className="border border-gray-200 py-3 px-12 w-full mb-4"
            />
          </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInputPopup;
