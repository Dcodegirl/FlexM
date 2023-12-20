import React, { useState, useEffect } from 'react';
import Contact from '../contact';
import Bvn from '../bvn';
import Otp from '../Otp'
import Biodata from '../bioData';
import Verification from '../BvnVerification';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [tabIndex, setTabIndex] = useState(1);

  const formTitles = ['Contact', 'BVN', 'Biodata'];

  const nextStep = () => {
    setStep(step + 1);
    if(step === 2 || step === 3){
      setTabIndex(tabIndex +1 )
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    if (step === 4 || step === 3) {
      setTabIndex(tabIndex - 1)
    }
  };

  const isLastStep = step === 5;
  const isFirstStep = tabIndex === 1 && step === 1;

  let currentStepComponent;

  switch (step) {
    case 1:
      currentStepComponent = (
        <Contact  nextStep={nextStep} />
      );
      break;
    case 2:
      currentStepComponent = <Otp  nextStep={nextStep} />;
      break;
    case 3:
      currentStepComponent = (
        <Verification nextStep={nextStep} />
      );
      break;
    case 4:
      currentStepComponent = <Bvn nextStep={nextStep} />;
      break;
    case 5:
      currentStepComponent = (
        <Biodata nextStep={nextStep} />
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
                  className={`${index < tabIndex - 1
                      ? 'bg-color1 h-2'
                      : index === tabIndex - 1
                        ? 'bg-color1 h-2'
                        : 'bg-global-gray h-2'
                    } rounded-lg transition-all ease-in-out duration-300`}
                >
                  <div
                    className={`text-sm md:font-semibold capitalize ${index < tabIndex - 1
                        ? 'text-black'
                        : index === tabIndex - 1
                          ? 'text-black'
                          : 'text-global-gray'
                      } -mt-6`}
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
        <div className="flex flex-col">
          {currentStepComponent}
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
