import React from "react";
import success from "../../../assets/images/success.png"

const TransactionDetailsPopup = ({ isVisible, onClose, transactionDetails }) => {
  return (
    <div className="relative">
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-center">
          <div className="bg-white p-4 rounded-md md:w-[400px] h-[350px] md:w-[400px] absolute md:top-4/5 top-[200px] md:left-3/5 left-2/5">
            <img src={success} alt="icon succes" className="m-auto "/>
            <h2 className="text-2xl font-bold mb-4">Transaction Approved</h2>
            {/* Display transaction details and receipt here */}
            <div className="mb-4">
            <p>Name: {transactionDetails.accountName}</p>
              <p>Amount: {transactionDetails.amount}</p>
              <p>Fees: {transactionDetails.fees}</p>
              {/* Add other details as needed */}
            </div>
            <div className="flex gap-2">
              <button
                className="bg-white border border-color1 text-gray-700 rounded-lg h-12 w-full"
              >
                Receipt
              </button>
              <button
                onClick={onClose}
                className="bg-color1 text-white rounded-lg h-12 w-full"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionDetailsPopup;
