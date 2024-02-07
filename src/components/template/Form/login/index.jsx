import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useHistory } from 'react-router-dom';
import axios from '../../../../utils/axiosInstance';
// import { useToasts } from 'react-toast-notifications';
import { useCustomToast } from '../../../toast/useCustomToast';


function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const showToast = useCustomToast();


  const history = useHistory();
  // const { addToast } = useToasts();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
       // Validate phone number
    if (phoneNumber.length !== 11) {
      showToast('Phone Number is less than 11 digits!.', 'error');
      return;
    }

      const apiUrl = '/users/signin';

      const requestBody = {
        user: {
          password: password,
          phone: phoneNumber,
        },
        type: 'agent',
      };

      const response = await axios.post(apiUrl, requestBody);
      console.log('logged in successfully and otp sent:', response.data);

      showToast('Contact Info Passed successfully and otp sent!', 'success');
      history.push('/otpVerification');
    } catch (error) {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='md:m-8 my-8 overflow-hidden'>
        <div className="md:p-16 py-16 px-8  md:bg-bg-green md:border-border-primary bg-white border-white rounded-3xl border">
          <div className="text-deep-green font-bold text-center">
            <p className='text-2xl'>Enter your Contact Detail</p>
            <p className="text-gray-500 text-xl font-thin w[360px]">Enter your contact details to sign in.</p>
          </div>
          <div className='w-[350px] mt-6'>
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
              <div className="flex justify-between my-4 items-center">
                <div>
                  {/* <label className="text-[#1F1F1F] flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={acceptRemember}
                      onChange={handleAcceptRemChange}
                    />
                    Remember for 30 days
                  </label> */}
                </div>
                <div className='flex justify-center'>
                  <NavLink to="/forgotPassword" className='text-color1 text-xl font-xl'>
                    Forgot Password?
                  </NavLink>
                </div>
              </div>
              <div className='flex justify-center mt-4'>
                <button
                  type='button'
                  onClick={handleSubmit}
                  className={`bg-color1  border rounded-lg h-14 w-full text-white mx-auto ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Next'}
                </button>
              </div>
              <div className="flex justify-center mt-4">
                <p>Don’t have an account?<NavLink to='/signup'><span className="text-color1"> Sign up</span></NavLink></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
