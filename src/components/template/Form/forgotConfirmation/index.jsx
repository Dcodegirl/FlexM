
import React from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useGlobalContext } from '../../../../custom-hooks/Context';
import mail from '../../../../assets/images/mailIcon.svg';

function ForgotConfirmation() {
    const { email: globalEmail } = useGlobalContext();
    const history = useHistory();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email') || globalEmail
    
    const handleResetBtn = async () => {
        try {
            // Assuming the API request is successful, navigate to otpVerification
            history.push('/ResetPassword');
        } catch (error) {
            // Handle API request error here
            console.error('API request error:', error);
        }
    };

    return (
        <>
            <div className='m-8 overflow-hidden'>
                <div className="md:p-16 py-16 px-8  md:bg-bg-green md:border-[#00BD7A40] bg-white border-white rounded-3xl border">
                    <div className='w-[350px] mt-6'>
                        <div className='flex justify-center items-center'>
                            <div className="flex flex-col text-center">
                                <div className='mx-auto mb-4'>
                                    <img src={mail} alt="Mail Icon" />
                                </div>
                                <div className='mb-2 text-center'>
                                    <p className='font-bold text-xl text-[#110D26]'>
                                        Check your Phone
                                    </p>
                                    <p>We sent a password reset code to <span className='text-deep-green font-semibold'>{email}</span></p>
                                </div>
                                <div className='flex justify-center mt-4'>
                                     <button
                                        className="bg-color1  border rounded-lg h-14 w-full text-white mx-auto"
                                        onClick={handleResetBtn}
                                    >
                                        Reset Your Password Here
                                    </button> 
                                </div>
                                <div className="flex justify-center mt-4">
                                    <p>Didn’t receive the otp?  <span className="text-color1 px-3" onClick={handleResetBtn}> Click to resend</span></p>
                                </div>
                                <div className='flex justify-center mt-6'>
                                    <NavLink to="/signin"><p className='text-gray-500 text-xl font-xl'><i className="fa-solid fa-left-long px-4"></i>Back to Login</p></NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgotConfirmation;
