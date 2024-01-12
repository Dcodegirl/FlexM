// SearchInputPopup.js

import React, { useState } from "react";

const SearchInputPopup = ({ isVisible, onClose, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
    onClose();
  };

  return (
    <div>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-center h-[300px]">
          <div className="bg-white p-6 rounded-md md:w-[400px]">
            <h2 className="text-2xl font-bold mb-4">Search Banks</h2>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter bank name"
              className="border border-gray-200 py-3 px-4 w-full mb-4"
            />
            <button
              onClick={handleSearch}
              className="bg-color1 text-white rounded-lg h-12 w-full"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInputPopup;
