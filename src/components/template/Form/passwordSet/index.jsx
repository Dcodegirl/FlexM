import React from 'react';
import { useHistory } from "react-router-dom";
import mark from '../../../../assets/images/mark.svg';

function PasswordSet() {
    const history = useHistory();

    const handleResetBtn = async () => {
        // Check if both password and special character requirements are met
            try {
                // Assuming the API request is successful, navigate to otpVerification
                history.push('/signin');
            } catch (error) {
                // Handle API request error here
                console.error('API request error:', error);
            }
    };

    return (
        <>
            <div className='m-8 overflow-hidden hidden md:block '>
                <div className="p-16 bg-bg-green border-[#00BD7A40] rounded-3xl border">
                    <div className='w-[350px] mt-6'>
                        <div className='flex justify-center items-center'>
                            <div className="flex flex-col">
                                <div className='mx-auto mb-4'>
                                    <img src={mark} alt="Mark Icon" />
                                </div>
                                <div className='mb-2 text-center'>
                                    <p className='font-bold text-xl text-[#110D26]'>
                                    Password reset
                                    </p>
                                    <p className='w-[300px]'>Your password has been successfully reset click below to login</p>
                                </div>
                                <div className='w-full mt-4'>
                                    <button
                                        onClick={handleResetBtn}
                                        className="bg-color1  border rounded-lg h-14 w-full text-white"
                                       
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PasswordSet;
