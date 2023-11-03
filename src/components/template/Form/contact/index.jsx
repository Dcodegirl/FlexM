import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Contact() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [OtpVerification, setOtpVerification] = useState("");
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if the passwords match
    if (password === confirmPassword) {
      // Passwords match, you can proceed with form submission or other actions
      console.log('Username:', username);
      console.log('Password:', password);
    } else {
      // Passwords don't match, display an error or handle it as needed
      setPasswordMatch(false);
    }
  };
  return (
    <>
      <div className='md:m-8 my-8 overflow-hidden'>
        <div className="p-16 md:bg-bg-green md:border-[#00BD7A40] bg-white border-white rounded-3xl border">
          <div className="text-deep-green font-bold text-center">
            <p className='text-2xl'>Contact Information</p>
            <p className="text-gray-500 text-xl font-thin w[360px]">Enter your contact details to get started</p>
          </div>
          <div className='md:w-[350px] w-full mt-6'>
            <form>
              <p className='text-gray-700 text-sm mb-2'>Phone Number</p>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                placeholder='Enter your phone Number'
                className='md:bg-bg-green bg-white border-[#D0D5DD] border rounded-lg h-14 w-full mb-6 p-4'
              />
              <div className="relative">
                <p className='text-gray-700 text-sm mb-2'>Password</p>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  placeholder='**********'
                  className='md:bg-bg-green bg-white border-[#D0D5DD] border rounded-lg h-14 w-full mb-6 p-4'
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
                  className='md:bg-bg-green bg-white border-[#D0D5DD] border rounded-lg h-14 w-full mb-6 p-4'
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
        </div>
      </div>
    </>

  )
}

export default Contact