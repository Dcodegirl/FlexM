import React, { useState } from 'react';
import { useGlobalContext } from '../../../../custom-hooks/Context'; 
import { NavLink, useHistory } from "react-router-dom";

function ForgotPass() {
    const { email, setEmail } = useGlobalContext();
    const history = useHistory();

    const handleSubmit = async () => {
    setEmail(email);
    try {
        // Make your API request here using axios
        // Example:
        // const response = await axios.post('your-api-endpoint', { phoneNumber, password });

        // Check the API response and perform necessary actions

        // Assuming the API request is successful, navigate to otpVerification
        history.push('/forgotConfirmation');
    } catch (error) {
        // Handle API request error here
        console.error('API request error:', error);
    }
    };

  return (
    <>
      <div className='md:m-8 my-8 overflow-hidden'>
        <div className="md:p-16 py-16 px-8  md:bg-bg-green md:border-[#00BD7A40] bg-white border-white rounded-3xl border">
          <div className='w-[350px] mt-6'>
            <form>
              <p className='text-gray-700 text-sm mb-2'>Email</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder='Enter your email'
                className='md:bg-bg-green bg-white border-[#D0D5DD] border rounded-lg h-14 w-full mb-6 p-4'
              />
              <div className='flex justify-center'>
                <button
                onClick={handleSubmit}
                  className="bg-cico-green border rounded-lg h-14 w-full text-white mx-auto"
                >
                  Reset password
                </button>
              </div>
              <div className='flex justify-center mt-6'>
                <NavLink to="/signin"><p className='text-gray-500 text-xl font-xl'><i className="fa-solid fa-left-long px-4"></i>Back to Login</p></NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPass;
