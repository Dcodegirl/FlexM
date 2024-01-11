import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import people from "../../../assets/images/mdi_users-group.png";
import logo from "../../../assets/images/flexbycico.svg";



  
  

const Amount = ({onNextButtonClick}) => {
    const [value, setValue] = useState('NGN 0:00');

  const handleAmountChange = (e) => {
    setValue(e.target.value);
  };

  const handleNextClick = () => {
    // Call the parent component's function to handle the next button click
    onNextButtonClick();
  };
  const [isChecked, setChecked] = useState(false);

  const handleToggleChange = () => {
    setChecked(!isChecked);
  };

  return (
    <div className="my-7 text-xl">
          <h1 className="font-extrabold text-3xl my-3">Amount</h1>
          <p className="text-xl my-3">Enter the 10 digit bank account number</p>
          <div className="">
           <p>Send to</p>
           <div className="flex justify-between items-center border border-gray-200 rounded-lg my-3 p-4 md:w-[300px] w-full ">
              <div className="flex gap-2 items-center">
              <div className="bg-global-light p-3 rounded-lg text-color1">ME</div>
                <div>
                  <p>Mark Ekpobiyere</p>
                  <p>GTBank MFB-0118721470</p>
                </div>
              </div>
                
              
                  <Link to='/transfer' className="hover:underline text-color1"> Change</Link>
                

           </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
              <img src={people} alt="people icon"/>
              <div> Add to beneficiaries</div>
              </div>
              <div>
              <input
        type="checkbox"
        id="toggle"
        checked={isChecked}
        onChange={handleToggleChange}
        className="hidden"
      />
      <label
        htmlFor="toggle"
        className={`cursor-pointer w-14 rounded-full p-1 transition duration-300 ease-in-out ${
          isChecked ? 'bg-purple-500' : ''
        }`}
      >
        <div
          className={`bg-white w-6 h-6 rounded-full shadow-md transform ${
            isChecked ? 'translate-x-6 bg-purple-500' : 'translate-x-0'
          } transition duration-300 ease-in-out`}
        ></div>
      </label>


              </div>
            </div>
          </div>

          <div className="flex justify-between items-center border border-gray-200 rounded-lg my-3 p-4 md:w-[300px] w-full ">
              <div className="flex gap-3 items-center">
              <div className="bg-global-light p-3 rounded-lg text-color1"><img src={logo} alt="logo" className="w-20"/></div>
                <div>
                  <p>Mark Ekpobiyere</p>
                  <p>GTBank MFB-0118721470</p>
                  <p>Balance-#600,000</p>

                </div>
              </div>
                
              <Link to='/transfer' className="hover:underline text-color1"> </Link>
            

           </div>
           <div className="mb-4 text-xl">
      <label htmlFor="editableInput" className="block text-sm font-medium text-gray-700">
        Amount
      </label>
      <input
        type="text"
        id="editableInput"
        value={value}
        onChange={handleAmountChange}
        className="mt-1 p-2 border font-bold text-xl p-5 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
    <div className="mb-4 text-xl">
      <label htmlFor="remarks" className="block text-sm font-medium text-gray-700">
        Remarks
      </label>
      <textarea
        id="remarks"
        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 resize-none"
      ></textarea>
    </div>

    <div className="flex gap-2 items-center" >
    
    <button className="bg-white text-color1 rounded-lg h-14 w-full border border-color1">
    <Link to='/transfer'> Back </Link>
    </button>
    <button className="bg-color1 text-color1 rounded-lg h-14 w-full text-white" onClick={handleNextClick}>
     Next 
    </button>
    </div>
        </div> 
  )
}

export default Amount
