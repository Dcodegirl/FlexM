import React, { useState } from 'react';
import axios from '../../../../utils/axiosInstance'; // Import Axios
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Contact = ({ nextStep }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [email, setEmail] = useState('');
  const [businessType, setBusinessType] = useState('Agent');
  const [gender, setGender] = useState('Male');
  const [businessName, setBusinessName] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleBnameChange = (event) => {
    setBusinessName(event.target.value);
  };
  const handleBtypeChange = (event) => {
    setBusinessType(event.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if the passwords match
    if (password === confirmPassword) {
      try {

        // Create the payload variable and update it with form data
        const payload = {
          phone: phoneNumber,
          password,
          password_confirmation: confirmPassword,
          email,
          business_name: businessName,
          gender,
          business_type: businessType,
        };
        // Call the API with Axios
        const response = await axios.post('/onboarding/contactInfo', payload);

        // Handle the response as needed
        const responseData = response.data;
        console.log('API Response:', responseData);


        nextStep();
      } catch (error) {
        console.error('API Error:', error);
        // Handle API errors
      }
    } else {
      // Passwords don't match, display an error or handle it as needed
      setPasswordMatch(false);
    }
  };
  const nextClick = () => {
    nextStep();
  }

  return (
    <>
      <div className='md:m-8 my-8 overflow-hidden'>
        <div className="md:p-16 py-16 px-8  md:bg-bg-green md:border-border-primary bg-white border-white rounded-3xl border">
          <div className="text-color1 font-bold text-center">
            <p className='text-2xl'>Contact Information</p>
            <p className="text-gray-500 text-xl font-thin w[360px]">Enter your contact details to get started</p>
          </div>
          <div className='w-[350px] mt-6'>
            <form onSubmit={handleSubmit}>
              <p className='text-gray-700 text-sm mb-2'>Phone Number</p>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                placeholder='Enter your phone Number'
                className='md:bg-bg-green bg-white border-[#D0D5DD] border rounded-lg h-14 w-full mb-6 p-4'
              />
              <p className='text-gray-700 text-sm mb-2'>Business Name</p>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
                placeholder='Enter your Business Name'
                className='md:bg-bg-green bg-white border-[#D0D5DD] border rounded-lg h-14 w-full mb-6 p-4'
              />
              <p className='text-gray-700 text-sm mb-2'>Select Business Type:</p>
              <select
                className='bg-bg-green border-[#D0D5DD] border rounded-lg h-14 w-full mb-6 p-4'
                value={businessType}
                onChange={handleBtypeChange}
              >
                <option value="">Agent</option>
                <option value="drivers-license">Individual</option>
              </select>
              <p className='text-gray-700 text-sm mb-2'>Gender:</p>
              <select
                className='bg-bg-green border-[#D0D5DD] border rounded-lg h-14 w-full mb-6 p-4'
                value={gender}
                onChange={handleGenderChange}
              >
                <option value="">Male</option>
                <option value="drivers-license">Female</option>
              </select>
              <p className='text-gray-700 text-sm mb-2'>Email</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <button
                type="submit"
                className="bg-gradient-to-r hover:bg-gradient-to-l from-color1 to-color2 rounded-lg h-14 w-full text-white mx-auto"
              >
                Next
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
