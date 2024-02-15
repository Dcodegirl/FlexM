import React, { useState } from 'react';
import { useGlobalContext } from '../../../../custom-hooks/Context'; 
import { NavLink, useHistory } from "react-router-dom";
import { useCustomToast } from '../../../toast/useCustomToast';
import axios from '../../../../utils/axiosInstance';
import { FORGOT_PASSWORDS } from '../../../../utils/constants';

function ForgotPass() {
    const [phone, setPhone] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const history = useHistory();
    const showToast = useCustomToast();


    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            const response = await axios.post(FORGOT_PASSWORDS, { phone: phone });
            console.log(response);

            // Check the API response and perform necessary actions
            if (response.status === 201) {
                setSuccessMessage(response.data.message);
                // Assuming the API request is successful, navigate to otpVerification
                history.push("/ResetPassword");
              } else {
                setSuccessMessage(''); // Reset success message if not successful
            }
        }
        catch (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              const { data, status } = error.response;
              console.error(`HTTP error! Status: ${status}, Message: ${data.message}`);
             
              // Handle different status codes
              switch (status) {
                case 400:
                  // Bad Request (400)
                  if (data && data.errors) {
                    Object.values(data.errors).flat().forEach(errorMessage => {
                      showToast(`${errorMessage}`, 'error');
                    });
                  } else if (data && data.message) {
                    showToast(`${data.message}`, 'error');
                  } else {
                    showToast('Bad Request. Please check your input.', 'error');
                  }
                  break;
                  case 422:
                  // Bad Request (400)
                  if (data && data.errors) {
                    Object.values(data.errors).flat().forEach(errorMessage => {
                      showToast(`${errorMessage}`, 'error');
                    });
                  } else if (status && data && data.message) {
                    showToast(`${data.message}`, 'error');
                  } else {
                    showToast('Bad Request. Please check your input.', 'error');
                  }
                  break;
                case 500:
                  // Internal Server Error (500)
                  showToast('Internal Server Error. Please try again later.', 'error');
                  break;
                // Add more cases for other status codes as needed
                default:
                  // Display an error toast with the API response message
                  showToast(data.message || 'An unexpected error occurred.', 'error');
              }
            } else if (error.request) {
              // The request was made but no response was received
              console.error("No response received from the server.");
          
              showToast("No response from the server. Please try again.", 'error');
            } else {
              // Something happened in setting up the request that triggered an error
              console.error("An unexpected error occurred:", error.message);
          
              // Display an error toast with the API response message if available
              showToast(error.message || 'An unexpected error occurred.', 'error');
            }
            setSuccessMessage('');
          } 
    };

    return (
        <>
            <div className='md:m-8 my-8 overflow-hidden'>
                <div className="md:p-16 py-16 px-8  md:bg-bg-green md:border-[#00BD7A40] bg-white border-white rounded-3xl border">
                    <div className='w-[350px] mt-6'>
                        <form>
                            <p className='text-gray-700 text-lg mb-2'>Phone</p>
                            <input
                                type="number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                placeholder='Enter your phone number'
                                className='md:bg-bg-green bg-white border-[#D0D5DD] border rounded-lg h-14 w-full mb-6 p-4'
                            />
                            <div className='flex justify-center'>
                                <button
                                    type='button'
                                    onClick={handleSubmit}
                                    className="bg-color1 border rounded-lg h-14 w-full text-white mx-auto"
                                >
                                    Reset password
                                </button>
                            </div>
                            {successMessage && (
                                <div className='flex justify-center mt-3 text-green-600'>
                                    {successMessage}
                                </div>
                            )}
                            <div className='flex justify-center mt-6'>
                                <NavLink to="/signin">
                                    <p className='text-gray-500 text-xl font-xl'>
                                        <i className="fa-solid fa-left-long px-4"></i>Back to Login
                                    </p>
                                </NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgotPass;
