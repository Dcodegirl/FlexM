import React, { useState } from 'react';
import Contact from '../contact';
import Bvn from '../bvn';
import Otp from '../Otp'
import Biodata from '../bioData';
import Verification from '../BvnVerification';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    step1Data: '',
    step2Data: '',
    step3Data: '',
    step4Data: '',
    step5Data: '',
  });

  const formTitles = ['Contact', 'Otp', 'Biodata', 'BVN', 'Bvn Verification'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const isLastStep = step === formTitles.length;
  const isFirstStep = step === 1;

  let currentStepComponent;

  switch (step) {
    case 1:
      currentStepComponent = <Contact />;
      break;
    case 2:
      currentStepComponent = <Otp />;
      break;
    case 3:
      currentStepComponent = <Biodata />;
      break;
    case 4:
      currentStepComponent = <Verification />;
      break;
    case 5:
      currentStepComponent = <Bvn />;
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
                  className={`${index < step - 1
                      ? 'bg-progress-green h-2'
                      : index === step - 1
                        ? 'bg-progress-green h-2'
                        : 'bg-progress-light h-2'
                    } rounded-lg transition-all ease-in-out duration-300`}
                >
                  <div
                    className={`text-sm font-semibold capitalize ${index < step - 1
                        ? 'text-black'
                        : index === step - 1
                          ? 'text-black'
                          : 'text-global-gray'
                      } -mt-6`}
                  >
                    {title}
                  </div>
                  <div className="text-left py-1.5 pl-2 md:pr-4 h-2 md:w-52 w-[50px]"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col">
          {currentStepComponent}
          <div className="flex p-2">
            {!isFirstStep && (
              <button
                onClick={prevStep}
                className="bg-dark-gray border-dark-gray border rounded-lg h-14 w-[30%] text-deep-green mx-auto"
              >
                <i className="fa-solid fa-left-long md:px-4 px-2"></i>Previous
              </button>
            )}

            {!isLastStep ? (
            <button
              onClick={nextStep}
              className="bg-cico-green border-deep-green border rounded-lg h-14 md:w-[60%] w-[30%] text-white mx-auto"
            >
              Next
            </button>
            ) : (
              <button
                 // Add your submit handler function
                className="bg-cico-green border-deep-green border rounded-lg h-14 w-[60%]  text-white mx-auto"
              >
                Submit
              </button>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
