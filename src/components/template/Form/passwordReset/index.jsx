import React, { useState } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import { useGlobalContext } from '../../../../custom-hooks/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import lock from '../../../../assets/images/padlock.svg';
import axios from '../../../../utils/axiosInstance';
import { useCustomToast } from '../../../toast/useCustomToast';

function ForgotConfirmation() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showToken, setShowToken ] = useState(false);
    const [token, setToken] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isSpecialCharacterValid, setIsSpecialCharacterValid] = useState(false);
    const history = useHistory();
    const showToast = useCustomToast()
    const payload = {
        token: token,
        password: password,
    }

    const RESET_PASSWORD = "/user/resetpasss"

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);

        // Check if the password contains at least one special character
        const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\\-]/.test(newPassword);

        setIsSpecialCharacterValid(hasSpecialCharacter);
        setIsPasswordValid(newPassword.length >= 8);
    };

const handleTokenChange=(event)=>{
    const tokenSent= event.target.value;
    setToken(tokenSent)
}
    const handleConfirmPasswordChange = (event) => {
        const newConfirmPassword = event.target.value;
        setConfirmPassword(newConfirmPassword);
        validatePasswordMatch(newConfirmPassword);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleTokenVisibility = () => {
        setShowToken(!showToken);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validatePassword = (password) => {
        // Check if the password is at least 8 characters
        setIsPasswordValid(password.length >= 8);
    };

    const validatePasswordMatch = (confirmPassword) => {
        // Check if the confirm password matches the password
        setPasswordMatch(password === confirmPassword);
    };

    const handleResetBtn = async () => {
        // Check if both password and special character requirements are met
        if (isPasswordValid && isSpecialCharacterValid) {
            try {
                // Assuming the API request is successful, navigate to otpVerification
                console.log(payload)
                const response = await axios.post(RESET_PASSWORD, payload);
                
                console.log(response.data)
                history.push('/passwordSet');
            } catch (error) {
                console.error("Error saving changes:", error);
                 const {status, data}= error.response
                if (status === 400 || status === 404 || status === 422) {
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
                } else if (status === 500) {
                  // Internal Server Error (500)
                  showToast('Internal Server Error. Please try again later.', 'error');
                } else {
                  // Display an error toast with the API response message for other status codes
                  showToast(data.message || 'An unexpected error occurred.', 'error');
                }
                 }
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
                                    <img src={lock} alt="Mail Icon" />
                                </div>
                                <div className='mb-2 text-center'>
                                    <p className='font-bold text-xl text-[#110D26]'>
                                        Set new password
                                    </p>
                                    <p className='w-[300px]'>Your new password must be different to previously used passwords.</p>
                                </div>
                                <div className='mt-4 w-full'>
                                    <form>
                                    <div className="relative">
                                            <p className='text-gray-700 text-sm mb-2'>Token</p>
                                            <input
                                                type={showToken ? 'text' : 'password'}
                                                value={token}
                                                onChange={handleTokenChange}
                                                required
                                                placeholder='**********'
                                                className='bg-bg-green border-[#D0D5DD] border rounded-lg h-14 w-full mb-6 p-4'
                                            />
                                            <FontAwesomeIcon
                                                icon={showToken ? faEye : faEyeSlash}
                                                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                                                onClick={toggleTokenVisibility}
                                            />
                                        </div>
                                        <div className="relative">
                                            <p className='text-gray-700 text-sm mb-2'>Password</p>
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={password}
                                                onChange={handlePasswordChange}
                                                required
                                                placeholder='**********'
                                                className='bg-bg-green border-[#D0D5DD] border rounded-lg h-14 w-full mb-6 p-4'
                                            />
                                            <FontAwesomeIcon
                                                icon={showPassword ? faEye : faEyeSlash}
                                                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                                                onClick={togglePasswordVisibility}
                                            />
                                        </div>
                                        <div className="relative">
                                            <p className='text-gray-700 text-sm mb-2'>Confirm Password</p>
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                value={confirmPassword}
                                                onChange={handleConfirmPasswordChange}
                                                required
                                                placeholder='**********'
                                                className='bg-bg-green border-[#D0D5DD] border rounded-lg h-14 w-full mb-6 p-4'
                                            />
                                            <FontAwesomeIcon
                                                icon={showPassword ? faEye : faEyeSlash}
                                                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                                                onClick={toggleConfirmPasswordVisibility}
                                            />
                                            {!passwordMatch && (
                                                <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
                                            )}
                                        </div>
                                    </form>
                                </div>
                                <div className="flex flex-col mt-6 gap-5">
                                    <div className='flex items-center gap-1'>
                                        <input
                                            className={`w-6 h-6 rounded-full border border-gray-400 cursor-pointer transition-all ${isPasswordValid ? 'bg-cico-green text-black' : 'bg-gray-400 text-gray-400'
                                                }`}
                                            type="checkbox"
                                            checked={isPasswordValid}
                                            onChange={() => setIsPasswordValid(!isPasswordValid)}
                                        />
                                        <p>Must be at least 8 characters</p>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <input
                                            className={`w-6 h-6 rounded-full border border-gray-400 cursor-pointer transition-all ${isSpecialCharacterValid ? 'bg-cico-green text-black' : 'bg-gray-400 text-gray-400'
                                                }`}
                                            type="checkbox"
                                            checked={isSpecialCharacterValid}
                                            onChange={() => setIsSpecialCharacterValid(!isSpecialCharacterValid)}
                                        />
                                        <p>Must contain one special character</p>
                                    </div>
                                </div>
                                <div className='w-full mt-4'>
                                    <button
                                        onClick={handleResetBtn}
                                        className="bg-color1 border rounded-lg h-14 w-full text-white"
                                        disabled={!isPasswordValid || !isSpecialCharacterValid}
                                    >
                                        Reset password
                                    </button>
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
