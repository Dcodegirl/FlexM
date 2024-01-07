import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ContactDetail from "../../components/contactDetails/contactDetail";
import BiodataSettings from "../../components/biodatasettings/BiodataSettings";
import TransactionPinSettings from "../../components/transactionpinsettings/TransactionPinSettings";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

const SettingsForm = () => {
  const {step} = useParams();
  const biodataRef = useRef('');
  // const [step, setStep] = useState(1);
  const [currentStep, setCurrentStep] = useState('contact');
  const [tabIndex, setTabIndex] = useState(1);
  const location = useLocation();
  const history = useHistory();

  console.log(currentStep);

  useEffect(() => {
    if(step) {
      setCurrentStep(step);
    }
  },[step]);


 
  

  
  const formTitles = [
    {
    name: 'Contact Details',
    step: 'contact'
    },
    {
      name: 'Bio Data',
      step: 'biodata'
    },
    {
      name: 'Transaction Pin',
      step: 'pin'
    }
  ];


  // const handleStepChange = (newStep) => {
  //   setStep(newStep);
  //   setTabIndex(newStep);
  // };
  

  const components = [
    <ContactDetail/>,
    <BiodataSettings/>,
    <TransactionPinSettings/>,
  ];
  

  return (
    <div className="rounded-lg mt-10 pt-20">
      <div className="mb-4">
        <div className="relative pt-1">
          <div className="flex">
            <div className="flex flex-row w-full gap-2 justify-evenly">
                            {formTitles.map((d, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setCurrentStep(d.step);
                    //history.push(`/settings/${d.step}`);
                  }}
                  className={`cursor-pointer ${currentStep == d.step
                    ? "text-color1 font-semibold border-b-2 border-color1 pb-2"
                    : "text-[#1F1F1F]"
                  } transition-all ease-in-out duration-300 text-2xl md:w[200px]`}
                >
                  {d.name}
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          {
            currentStep == 'contact' && <ContactDetail />
          }
          {
            currentStep == 'biodata' && <BiodataSettings />
          }
          {
            currentStep == 'pin' && <TransactionPinSettings />
          }
          {/* {components.map((component, index) =>
            index + 1 === step ? component : null
          )} */}
        </div>
      </div>
    </div>
  );
};

export default SettingsForm;
