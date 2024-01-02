import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import ContactDetail from "../../components/contactDetails/contactDetail";
import BiodataSettings from "../../components/biodatasettings/BiodataSettings";
import TransactionPinSettings from "../../components/transactionpinsettings/TransactionPinSettings";

const SettingsForm = () => {
  const biodataRef = useRef('');
  const [step, setStep] = useState(1);
  const [tabIndex, setTabIndex] = useState(1);

  useEffect(() => {
    const url = new URL(window.location.href);
    const scrollToBiodata = url.searchParams.get('scrollToBiodata') === 'true' || url.hash === '#biodata';

    if (scrollToBiodata && biodataRef.current) {
      biodataRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const formTitles = ["Contact Details", "Biodata", "Transaction Pin"];

  const handleStepChange = (newStep) => {
    setStep(newStep);
    setTabIndex(newStep);
  };
  

  const components = [
    <ContactDetail />,
    <BiodataSettings />,
    <TransactionPinSettings />,
  ];

  return (
    <div className="rounded-lg mt-10 pt-20">
      <div className="mb-4">
        <div className="relative pt-1">
          <div className="flex">
            <div className="flex flex-row w-full gap-2 justify-evenly">
              {formTitles.map((title, index) => (
                <NavLink
                  key={index}
                  to={`#${title.toLowerCase().replace(/\s/g, '')}`}
                  onClick={() => handleStepChange(index + 1)}
                  className={`cursor-pointer ${index === tabIndex - 1
                    ? "text-color1 font-semibold border-b-2 border-color1 pb-2"
                    : "text-[#1F1F1F]"
                  } transition-all ease-in-out duration-300 text-2xl md:w[200px]`}
                >
                  {title}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          {components.map((component, index) =>
            index + 1 === step ? component : null
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsForm;
