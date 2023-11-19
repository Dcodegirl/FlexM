import React, { useState, useReducer } from "react";
import person from '../../../assets/icons/person.svg'
import PersonalDetails from "./PersonalDetails";



const CreateAgent = () => {
  const [tabIndex, setTabIndex] = useState(1);
  const formTitles = ['Contact'];



  return (
    <>
      <div className="bg-white p-8 rounded-md mt-8 flex gap-10 items-center mb-8">
        <div>
          <img src={person} alt="" />
        </div>
        <div className="flex flex-col text-[#111023] gap-3">
          <p className="text-[16px]">Create Agent</p>
          <p className="font-medium text-xl">Manage your account settings and preferences</p>
        </div>
      </div>
      <div className="bg-white p-8 rounded-md mt-8 mb-8">
        <div className="flex mt-8">
          <div className="flex flex-row w-full gap-20">
            {formTitles.map((title, index) => (
              <div
                key={index}
                className={`${index < tabIndex - 1
                  ? 'bg-progress-green h-2'
                  : index === tabIndex - 1
                    ? 'bg-progress-green h-2'
                    : 'bg-progress-light h-2'
                  } rounded-lg transition-all ease-in-out duration-300`}
              >
                <div
                  className={` text-xl capitalize ${index < tabIndex - 1
                    ? 'text-black'
                    : index === tabIndex - 1
                      ? 'text-black'
                      : 'text-global-gray'
                    } -mt-12`}
                >
                  {title}
                </div>
                <div className="text-left py-1.5 pl-2 md:pr-4 h-2 w-48 mt-"></div>
              </div>

            ))}
            
          </div>
        </div>
      <div className="mt-10">
        <PersonalDetails></PersonalDetails>
      </div>
      </div>
    </>
  );
};

export default CreateAgent;
