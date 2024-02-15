import React, { useContext, useState } from 'react';
import axios from '../../../../utils/axiosInstance'; // Import Axios
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useCustomToast } from '../../../toast/useCustomToast';
import { useGlobalContext } from '../../../../custom-hooks/Context';
import { POST_ONBOARDING_CONTACTINFO } from '../../../../utils/constants';

const Contact = ({ nextStep }) => {
  const showToast  = useCustomToast();
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const {setPhoneNum} = useGlobalContext();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [businessType, setBusinessType] = useState('Agent');
  const [gender, setGender] = useState('Male');
  const [businessName, setBusinessName] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    // Reset password match error when the password changes
    setPasswordMatch(true);
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
        setLoading(true);
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
        const response = await axios.post(POST_ONBOARDING_CONTACTINFO, payload);
  
        // Handle the response as needed
        const responseData = response.data;
  
        showToast('Contact Info Passed successfully and otp sent!', 'success');
        setPhoneNum(phoneNumber)
        nextStep();
      } catch (error) {
        console.error('API Error:', error);
  
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const { status, data } = error.response;
  
          if (data && data.errors) {
            // If the error response contains 'errors' field, display each error in a separate toast
            Object.values(data.errors).flat().forEach(errorMessage => {
              showToast(`${errorMessage}`, 'error');
            });
          } else if(status === 400 && data && data.message) {
            // If the error response does not contain 'errors' field, display a generic error message
            showToast(`${data.message}`, 'error');
          }
        } else if (error.request) {
          // The request was made but no response was received
          showToast('No response from the server. Please try again.', 'error');
        } else {
          // Something happened in setting up the request that triggered an error
          showToast('An unexpected error occurred. Please try again.', 'error');
        }
      } finally {
        setLoading(false);
      }
    } else {
      // Passwords don't match, display an error or handle it as needed
      setPasswordMatch(false);
      showToast('Passwords do not match.', 'error');
    }
  };
  
  
  

  const nextClick = () => {
    nextStep();
  };

  return (
    <>
      <div className="md:m-8 my-8 overflow-hidden">
        <div className="md:p-16 py-16 px-8 md:bg-bg-green md:border-border-primary bg-white border-white rounded-3xl border">
          <div className="text-color1 font-bold text-center">
            <p className="text-2xl font-bold">Contact Information</p>
            <p className="text-gray-500 text-xl font-thin w-[360px]">
              Enter your contact details to get started
            </p>
          </div>
          <div className="w-[350px] mt-6">
            <form onSubmit={handleSubmit} className="text-lg">
              <div className="mb-6">
                <label htmlFor="phoneNumber" className="text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  placeholder="Enter your phone number"
                  className="md:bg-bg-green bg-white border-[#D0D5DD] border rounded-lg h-14 w-full p-4"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="businessName" className="text-gray-700 mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  id="businessName"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  required
                  placeholder="Enter your Business Name"
                  className="md:bg-bg-green bg-white border-[#D0D5DD] border rounded-lg h-14 w-full p-4"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="businessType" className="text-gray-700 mb-2">
                  Select Business Type:
                </label>
                <select
                  id="businessType"
                  className="bg-bg-green border-[#D0D5DD] border rounded-lg h-14 w-full p-4"
                  value={businessType}
                  onChange={handleBtypeChange}
                >
                  <option value="agent">Individual/Agent</option>
                  <option value="merchant" disabled>Merchant</option>
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="gender" className="text-gray-700 mb-2">
                  Gender:
                </label>
                <select
                  id="gender"
                  className="bg-bg-green border-[#D0D5DD] border rounded-lg h-14 w-full p-4"
                  value={gender}
                  onChange={handleGenderChange}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="md:bg-bg-green bg-white border-[#D0D5DD] border rounded-lg h-14 w-full p-4"
                />
              </div>
              <div className="relative mb-6">
                <label htmlFor="password" className="text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  placeholder="**********"
                  className="md:bg-bg-green bg-white border-[#D0D5DD] border rounded-lg h-14 w-full p-4"
                />
                <FontAwesomeIcon
                  icon={showPassword ? faEye : faEyeSlash}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              </div>
              <div className="relative mb-6">
                <label htmlFor="confirmPassword" className="text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                  placeholder="**********"
                  className="md:bg-bg-green bg-white border-[#D0D5DD] border rounded-lg h-14 w-full p-4"
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
                className={` bg-color1 rounded-lg h-14 w-full text-white mx-auto relative ${
                  loading ? 'opacity-50 pointer-events-none' : ''
                }`}
                disabled={loading}
              >
                {loading && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="loader"></div>
                  </div>
                )}
                {loading ? 'Loading...' : 'Next'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
