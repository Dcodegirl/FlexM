import React, { useState } from 'react';
import { useGlobalContext } from '../../../../custom-hooks/Context'; 
import { NavLink, useHistory } from "react-router-dom";
import axios from '../../../../utils/axiosInstance';

function ForgotPass() {
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            const response = await axios.post("/user/pass", { email: email });
            console.log(response);

            // Check the API response and perform necessary actions
            if (response.status === 201) {
                setSuccessMessage(response.data.message);
                // Assuming the API request is successful, navigate to otpVerification
                history.push(`/forgotConfirmation?email=${email}`);
              } else {
                setSuccessMessage(''); // Reset success message if not successful
            }
        } catch (error) {
            // Handle API request error here
            console.error('API request error:', error);
            setSuccessMessage(''); // Reset success message on error
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
