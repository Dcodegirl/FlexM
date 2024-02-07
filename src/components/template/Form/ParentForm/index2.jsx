import React, { useState } from 'react';
import Contact from '../contact';
import Bvn from '../bvn';
import Document from '../document';
import Utility from '../utilities';
import Guarantor from '../guarantor';
import Profile from '../profile';

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    step1Data: '',
    step2Data: '',
    step3Data: '',
    step4Data: '',
    step5Data: '',
    step6Data: '',
  });

  const formTitles = [
    'Contact Detail',
    'BVN',
    'Document',
    'Utilities',
    'Guarantor Form',
    'Create your Profile',
  ];

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

  // Define a variable to hold the current step component
  let currentStepComponent;

  switch (step) {
    case 1:
      currentStepComponent = <Contact />;
      break;
    case 2:
      currentStepComponent = <Bvn />;
      break;
    case 3:
      currentStepComponent = <Document />;
      break;
    case 4:
      currentStepComponent = <Utility />;
      break;
    case 5:
      currentStepComponent = <Guarantor />;
      break;
    case 6:
      currentStepComponent = <Profile />;
      break;
    default:
      currentStepComponent = null;
      break;
  }

  return (
    <div className="bg-white p-8  rounded-lg mt-10 pt-20">
      <div className="mb-4">
        <div className="relative pt-1">
          <div className="flex">
            <div className="flex flex-row w-full gap-2 justify-center">
              {formTitles.map((title, index) => (
                <div
                  key={index}
                  className={`${
                    index < step - 1
                      ? 'bg-progress-green h-2'
                      : index === step - 1
                      ? 'bg-progress-green h-2'
                      : 'bg-progress-light h-2'
                  } rounded-lg transition-all ease-in-out duration-300`}
                >
                  <div
                    className={`text-sm font-semibold capitalize ${
                      index < step - 1 ? 'text-black' : 'text-black'
                    } -mt-6`}
                  >
                    {title}
                  </div>
                  <div className="text-left py-1.5 pl-2 pr-4 h-2 w-52"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {currentStepComponent}

      <div className="flex gap-3 p-2">
        {!isFirstStep && (
          <button onClick={prevStep} className='bg-dark-gray border-dark-gray border rounded-lg h-14 w-[30%] text-deep-green mx-auto'>
            <i className="fa-solid fa-left-long px-4"></i>Previous
          </button>
        )}
        {!isLastStep && (
          <button onClick={nextStep} className='bg-deep-green border-deep-green border rounded-lg h-14 w-[60%] text-white mx-auto'>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
