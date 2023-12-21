import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useHistory } from 'react-router-dom';
import axios from '../../../../utils/axiosInstance';
import { useToasts } from 'react-toast-notifications';

function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptRemember, setAcceptRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { addToast } = useToasts();

  const handleAcceptRemChange = () => {
    setAcceptRemember(!acceptRemember);
  };

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

      addToast('Contact Info Passed successfully and otp sent!', { appearance: 'success', autoDismiss: true, autoDismissTimeout: 3000  });
      history.push('/otpVerification');
    } catch (error) {
      addToast( error.response.data.message, { appearance: 'error' });
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
