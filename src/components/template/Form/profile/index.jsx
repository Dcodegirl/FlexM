import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Profile() {
const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [acceptTerms, setAcceptTerms] = useState(false); 



    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleAcceptTermsChange = () => {
        setAcceptTerms(!acceptTerms);
      };
    const handleSubmit = (event) => {
        event.preventDefault();
        // Check if the passwords match
        if (password === confirmPassword) {
            // Passwords match, you can proceed with form submission or other actions
           
        } else {
            // Passwords don't match, display an error or handle it as needed
            setPasswordMatch(false);
        }
    };
    return (
        <>
            <div className='m-8'>
                <div className="p-16 bg-bg-green border-[#00BD7A40] rounded-3xl border">
                    <div className="text-deep-green font-bold text-center">
                        <p className='text-2xl'>Create your Profile</p>
                        <p className="text-gray-500 text-xl font-thin w[360px]">Enter your Profile details to get started</p>
                    </div>
                    <div className='w-[350px] mt-6'>
                        <form onSubmit={handleSubmit}>
                            <p className='text-gray-700 text-lg mb-2'>Type a username...</p>
                            <input
                                type="text"
                                value={username}
                                onChange={handleUsernameChange}
                                required
                                placeholder='Enter your email'
                                className='bg-bg-green border-[#D0D5DD] border rounded-lg h-14 w-full mb-6 p-4'
                            />
                            <div className="relative">
                                <p className='text-gray-700 text-lg mb-2'>Password</p>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                    className='bg-bg-green border-[#D0D5DD] border rounded-lg h-14 w-full mb-6 p-4'
                                />
                                <FontAwesomeIcon
                                    icon={showPassword ? faEye : faEyeSlash}
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                />
                            </div>
                            <div className="relative">
                                <p className='text-gray-700 text-lg mb-2'>Confirm Password</p>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    required
                                    className='bg-bg-green border-[#D0D5DD] border rounded-lg h-14 w-full mb-6 p-4'
                                />
                                <FontAwesomeIcon
                                    icon={showPassword ? faEye : faEyeSlash}
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                                    onClick={toggleConfirmPasswordVisibility }
                                />
                                {!passwordMatch && (
                                    <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
                                )}
                            </div>
                            <div>
          <label className="text-[#1F1F1F] flex items-center gap-3">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={handleAcceptTermsChange}
            />
            I accept the terms and conditions
          </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Profile