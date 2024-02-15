import React, { useState, useEffect } from 'react';
import axios from '../../../../utils/axiosInstance';
import { useCustomToast } from '../../../toast/useCustomToast';
import { useGlobalContext } from '../../../../custom-hooks/Context';
import { POST_ONBOARDING_CONFIRM } from '../../../../utils/constants';
import { POST_ONBOARDING_RESEND } from '../../../../utils/constants';

function Contact({ nextStep }) {
  const showToast  = useCustomToast();
  const { setUserId } = useGlobalContext();
  const { phoneNum } = useGlobalContext();
  const [timeLeft, setTimeLeft] = useState(600);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendButtonDisabled, setResendButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleOtpChange = (index, value) => {
    if (value >= 0 && value <= 9) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < newOtp.length - 1 && value !== '') {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace' && index > 0 && !otp[index]) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const enteredOtp = otp.join('');
      const payload = {
        code: enteredOtp,
      };

      const response = await axios.post(POST_ONBOARDING_CONFIRM, payload);

      const responseData = response.data;
      setUserId(responseData.data.id);

      showToast('OTP verification successful!', 'success');
      nextStep();
    } catch (error) {
      console.error("Error saving changes:", error);
  
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


  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setResendButtonDisabled(false);
    }
  }, [timeLeft]);

  useEffect(() => {
    for (let i = 0; i < otp.length; i++) {
      if (!otp[i]) {
        document.getElementById(`otp-input-${i}`).focus();
        break;
      }
    }
  }, [otp]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  const handleResendOtp = async () => {
    try {
      setLoading(true);
      const response = await axios.post(POST_ONBOARDING_RESEND, { phone: phoneNum });
      const responseData = response.data;

      if (responseData.status === 'Successful') {
        // Reset the timer and disable the Resend button
        setTimeLeft(600);
        setResendButtonDisabled(true);
        showToast('OTP has been resent successfully!', 'success');
      } else {
        showToast('Failed to resend OTP. Please try again.', 'error');
      }
    } catch (error) {
      console.error('API Error:', error);
      showToast('An unexpected error occurred. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='md:m-8 my-8 overflow-hidden'>
        <div className='md:p-16 py-16 px-8 md:bg-bg-green md:border-border-primary bg-white border-white rounded-3xl border'>
          <div className='text-deep-green font-bold text-center'>
            <p className='text-2xl'>Verify your OTP</p>
            <p className='text-gray-500 text-xl font-thin w-[360px]'>
              We sent OTP to the number attached to your OTP {phoneNum}
            </p>
          </div>
          <div className='w-[350px] mt-6 flex items-center justify-center'>
            <form onSubmit={handleSubmit} className='text-lg'>
              <p className='text-gray-700 mb-2'>Your 6-Digit Code</p>
              {otp.map((value, index) => (
                <input
                  key={index}
                  type='tel'
                  value={value}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  min='0'
                  max='9'
                  maxLength='1'
                  required
                  id={`otp-input-${index}`}
                  tabIndex={index + 1}
                  className='border md:bg-bg-green bg-white border-[#D0D5DD] h-16 w-14 text-center m-2 rounded-lg p-4 font-bold'
                />
              ))}
            </form>
          </div>
          <div className='mt-4'>
            <div className='text-right text-color1 -ml-8'>{formatTime(timeLeft)}</div>
          </div>
          <div className='flex justify-center'>
            <p>
              I didn't get the code?{' '}
              {resendButtonDisabled ? (
                `Resend OTP in ${formatTime(timeLeft)}`
              ) : (
                <span onClick={handleResendOtp} style={{ cursor: 'pointer' }}>
                  Resend OTP
                </span>
              )}
            </p>
          </div>
          <div className='flex p-2'>
            <button
              className='bg-global-gray border rounded-lg h-14 w-[30%] text-deep-green mx-auto'
            >
              <i className='fa-solid fa-left-long md:px-4 px-2'></i>Previous
            </button>
            <button
              onClick={handleSubmit}
              className={` bg-color1 rounded-lg h-14 md:w-[60%] w-[30%] text-white mx-auto relative ${loading ? 'opacity-50 pointer-events-none' : ''
                }`}
              disabled={loading}
            >
              {loading && (
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                  <div className='loader'></div>
                </div>
              )}
              {loading ? 'Loading...' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
