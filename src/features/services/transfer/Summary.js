import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TransactionDetailsPopup from './TransactionDetailsPopup';
import TransactionPinPopup from './TransactPinPopup';

const Summary = () => {
    const history = useHistory();
    const [pinPopupVisible, setPinPopupVisible] = useState(false);
    const [detailsPopupVisible, setDetailsPopupVisible] = useState(false);
    const [transactionDetails, setTransactionDetails] = useState({});
  
  const summaryData = [
    {
      Title: "Amount",
      Num: "N200.00",
    },
    {
      Title: "Fees",
      Num: "N0.00",
    },
    {
      Title: "Account",
      Num: "0118721470",
    },
    {
      Title: "Account Name",
      Num: "Ekpobiyere Mark E",
    },
    {
      Title: "Remark",
      Num: "Enjoy",
    },
  ];
  const handleBackClick = () => {
    // Use the history.goBack() method to navigate back
    history.goBack();
  };
  const handleConfirmClick = () => {
    setPinPopupVisible(true);
  };

  const handlePinEntered = (pin) => {
    // Perform pin verification logic here
    // For simplicity, let's assume the pin is correct
    const fakeTransactionDetails = {
      amount: "N200.00",
      fees: "N0.00",
      account: "0118721470",
      accountName: "Ekpobiyere Mark E",
      remark: "Enjoy",
    };

    setTransactionDetails(fakeTransactionDetails);
    setDetailsPopupVisible(true);
    setPinPopupVisible(false);
  };

  const handleDoneClick = () => {
    // Perform any cleanup or navigation logic after transaction completion
    // For example, redirecting to another page
    history.push("/success");
  };

  return (
    <div className='md:w-[400px] bg-global-light rounded-lg p-3 m-auto text-xl p-4'>
      <h1 className="text-3xl font-bold mb-4">Summary</h1>
      <div className="grid grid-cols-1 gap-4">
        {summaryData.map((item, index) => (
          <div key={index} className="flex justify-between items-center border-b pb-2 mb-2">
            <span className="font-semibold">{item.Title}</span>
            <span>{item.Num}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        <button
          className="bg-white text-color1 rounded-lg h-14 w-full border border-color1"
          onClick={handleBackClick}
        >
          Back
        </button>
        <button
          className="bg-color1 text-color1 rounded-lg h-14 w-full text-white"
          onClick={handleConfirmClick}
        >
          Confirm
        </button>
      </div>

      <TransactionPinPopup
        isVisible={pinPopupVisible}
        onClose={() => setPinPopupVisible(false)}
        onPinEntered={handlePinEntered}
      />

      <TransactionDetailsPopup
        isVisible={detailsPopupVisible}
        onClose={() => setDetailsPopupVisible(false)}
        transactionDetails={transactionDetails}
      />


    </div>
  );
};

export default Summary;
