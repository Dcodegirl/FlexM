import React, { useState } from 'react';
import { NavLink, useHistory } from "react-router-dom";
import { useGlobalContext } from '../../../../custom-hooks/Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import lock from '../../../../assets/images/padlock.svg';

function ForgotConfirmation() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isSpecialCharacterValid, setIsSpecialCharacterValid] = useState(false);
    const history = useHistory();

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);

        // Check if the password contains at least one special character
        const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\\-]/.test(newPassword);

        setIsSpecialCharacterValid(hasSpecialCharacter);
        setIsPasswordValid(newPassword.length >= 8);
    };


    const handleConfirmPasswordChange = (event) => {
        const newConfirmPassword = event.target.value;
        setConfirmPassword(newConfirmPassword);
        validatePasswordMatch(newConfirmPassword);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                history.push('/passwordSet');
            } catch (error) {
                // Handle API request error here
                console.error('API request error:', error);
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
