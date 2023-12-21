import React from 'react';
import { NavLink, useHistory } from "react-router-dom";
import success from '../../../../assets/images/succesmodal.svg';

function SuccessModal() {
  const history = useHistory();

  const handleProceedBtn = async () => {
    try {
      // Assuming the API request is successful, navigate to otpVerification
      history.push('/signin');
    } catch (error) {
      // Handle API request error here
      console.error('API request error:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white md:p-16 py-16 px-8 md:bg-bg-green md:border-border-primary rounded-3xl border">
        <div className="w-[350px] mt-6">
          <div className="flex flex-col text-center">
            <div className="mx-auto mb-6">
              <img src={success} alt="Mail Icon" />
            </div>
            <div className="mb-2 text-center">
              <p className=" font-extrabold text-2xl text-[#110D26]">Welcome to Fleex Money</p>
            </div>
            <div>
              <p>Congratulations, Your Profile has been created</p>
            </div>
            <div className=" mt-8">
              <NavLink to="/login'">
                <button className="bg-color1 rounded-lg h-14 w-full text-white">
                  Proceed
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
