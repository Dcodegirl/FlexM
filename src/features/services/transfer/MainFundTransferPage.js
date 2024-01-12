import React, { useState, useEffect } from "react";
import bank from "../../../assets/images/mdi_bank.png";
// import {VERIFY_ACCOUNT, FETCH_BANK } from "../../../utils/constants";
import Popup from "./PopUp";
// import axios from "../../../utils/axiosInstance";
import Amount from "./Amount";
import Summary from "./Summary";


const MainFundTransferPage = () => {
  const [step, setStep] = useState(1);
  const [tabIndex, setTabIndex] = useState(1);
  const [userInput, setUserInput] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [suggestedBanks, setSuggestedBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [bankSelected, setBankSelected] = useState(false);




  const formTitles = ["Account Number", "Amount", "Summary"];
 
  const handleNextButtonClick = () => {
    // Add logic to move to the next step
    if (step < 3) {
      setStep(step + 1);
      setTabIndex(tabIndex + 1);

      // Add logic to fetch banks and show popup for step 1
      if (step === 1 && userInput.length === 10) {
        fetchBanks(userInput);
      }
    }
  };

 
  const handleBankSelected = (bankCode) => {
  // Set the selected bank
  setSelectedBank(bankCode);

  // Close the popup
  setPopupVisible(false);

  // Set the bankSelected state to true
  setBankSelected(true);
};


  useEffect(() => {
    if (bankSelected) {
      // Move to the next step
      handleNextButtonClick();
    }
  }, [bankSelected]);

  useEffect(() => {
    if (step === 1 && userInput.length === 10) {
      // Fetch banks and show popup
      fetchBanks(userInput);
    }
  }, [step, userInput]);

  const bankData=[
    {
      bankName: "GT Bank",
      bankcode: "01"
    },
    {
      bankName: "First Bank",
      bankcode: "30"
    },
    {
      bankName: "Zenith Bank",
      bankcode: "21"
    },
    {
      bankName: "Polaris Bank",
      bankcode: "30"
    },
    {
      bankName: "Fidelity Bank",
      bankcode: "62"
    },
    {
      bankName: "Wema Bank",
      bankcode: "02"
    },
    {
      bankName: "Eco Bank",
      bankcode: "25"
    },
    {
      bankName: "Sterling Bank",
      bankcode: "00"
    },
    {
      bankName: "Access Bank",
      bankcode: "07"
    }
  ]
  
  
const fetchBanks = async (accountNumber) => {
  try {
    // Extract the first two digits (bank code) from the account number
    const bankCode = accountNumber.slice(0, 2);

    // Filter the bankData array based on the provided bank code
    const selectedBanks = bankData.filter((bank) => bank.bankcode === bankCode);

    // Show the pop-up with the selected banks
    setSuggestedBanks(selectedBanks);
    setPopupVisible(true);

    // You may choose to automatically move to the next step here if needed
    // setStep(step + 1);
    // setTabIndex(tabIndex + 1);
  } catch (error) {
    console.error("Error fetching banks:", error);
  }
};
  

  let currentStepComponent;
  

  switch (step) {
    case 1:
      currentStepComponent = (
        <div className="my-7">
          <h1 className="font-extrabold text-3xl my-3">Enter an Account Number</h1>
          <p className="text-xl my-3">Enter the 10 digit bank account number</p>
          <div className="relative">
            <img src={bank} className="absolute top-8 left-1 w-[20px]" alt="bank icon"/>
            <input
              type="text"
              pattern="[0-9]*" 
              inputMode="numeric" 
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter account number"
              className="border border-gray-200 py-3 px-10 w-full my-6"
            />
          </div>
        </div>
      );
      break;
    case 2:
      currentStepComponent = (
        <Amount onNextButtonClick={handleNextButtonClick} />
        );
      break;
    case 3:
      currentStepComponent = (
        <Summary/>
      );
      break;
    default:
      currentStepComponent = null;
      break;
  }

  return (
    <div className="rounded-lg mt-10 pt-20">
      <div className="mb-4">
        <div className="relative pt-1">
          <div className="flex">
            <div className="flex flex-row w-full gap-2 justify-center">
              {formTitles.map((title, index) => (
                <div
                  key={index}
                  className={`${
                    index < tabIndex - 1
                      ? "bg-color1 h-2"
                      : index === tabIndex - 1
                      ? "bg-color1 h-2"
                      : "bg-global-gray h-2"
                  } rounded-lg transition-all ease-in-out duration-300`}
                >
                  <div
                    className={`text-2xl md:font-semibold capitalize mx-6 ${
                      index < tabIndex - 1
                        ? "text-black"
                        : index === tabIndex - 1
                        ? "text-black"
                        : "text-gray-300"
                    } -mt-8`}
                  >
                    {title}
                  </div>
                  <div className="text-left py-1.5 pl-2 md:pr-4 h-2 w-48"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col">{currentStepComponent}</div>
      </div>

      <Popup
        isVisible={popupVisible}
        suggestedBanks={suggestedBanks}
        onClose={() => setPopupVisible(false)}
        onBankSelected={handleBankSelected}
      />
    </div>
  );
};

export default MainFundTransferPage;

