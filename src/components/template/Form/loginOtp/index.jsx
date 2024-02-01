import React, { useState, useRef, useEffect } from 'react';
import axios from '../../../../utils/axiosInstance';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { startLoginUser } from '../../../../actions/auth2';
import { useGlobalContext } from '../../../../custom-hooks/Context';

function Contact() {
  const [timeLeft, setTimeLeft] = useState(600);
  const { phoneNum } = useGlobalContext();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendButtonDisabled, setResendButtonDisabled] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [loading, setLoading] = useState(false);

  const handleOtpChange = (index, value) => {
    if (value >= 0 && value <= 9) {
      const newOtpDigits = [...otp];
      newOtpDigits[index] = value;
      setOtp(newOtpDigits);

      if (index < newOtpDigits.length - 1 && value !== '') {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const isOtpComplete = otp.every((digit) => digit !== '');

  useEffect(() => {
    for (let i = 0; i < otp.length; i++) {
      if (!otp[i]) {
        document.getElementById(`otp-input-${i}`).focus();
        break;
      }
    }
  }, [otp]);

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace' && index > 0 && !otp[index]) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isOtpComplete) {
      const enteredOtp = otp.join('');

      try {
        setLoading(true);

        const payload = {
          otp: enteredOtp,
        };

        dispatch(startLoginUser(payload, history));
      } catch (error) {
        console.error("Error saving changes:", error);
         const {status, data}= error.response
        if (status === 400 || status === 404 || status === 422) {
          // Bad Request (400)
          if (data && data.errors) {
            Object.values(data.errors).flat().forEach(errorMessage => {
              addToast(`${errorMessage}`, {
                appearance: 'error',
                autoDismiss: true,
                autoDismissTimeout: 3000,
              });
            });
          } else if (status && data && data.message) {
            addToast(`${data.message}`, {
              appearance: 'error',
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });
          } else {
            addToast('Bad Request. Please check your input.', {
              appearance: 'error',
              autoDismiss: true,
              autoDismissTimeout: 3000,
            });
          }
        } else if (status === 500) {
          // Internal Server Error (500)
          addToast('Internal Server Error. Please try again later.', {
            appearance: 'error',
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
        } else {
          // Display an error toast with the API response message for other status codes
          addToast(data.message || 'An unexpected error occurred.', {
            appearance: 'error',
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
        }
         } finally {
        setLoading(false);
      }
    } else {
      addToast('Please enter all 6 OTP digits.', { appearance: 'error', autoDismiss: true, autoDismissTimeout: 3000  });
    }
  };

  return (
    <>
      <div className='md:m-8 my-8 overflow-hidden'>
        <div className='md:p-16 py-16 px-8  md:bg-bg-green md:border-[#00BD7A40] bg-white border-white rounded-3xl border'>
          <div className='text-deep-green font-bold text-center'>
            <p className='text-2xl'>Verify your OTP</p>
            <p className='text-gray-500 text-xl font-thin w-[360px]'>
              We sent OTP to the number attached to your OTP {phoneNum}
            </p>
          </div>
          <div className='w-[350px] mt-6 flex items-center justify-center'>
            <form onSubmit={handleSubmit} className=''>
              <p className='text-gray-700 text-sm mb-2'>Your 6-Digit Code</p>
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
                  className='border md:bg-bg-green bg-white border-border-primary h-16 w-14 text-center m-2 rounded-lg p-4'
                />
              ))}
            </form>
          </div>
          <div className='text-color1 mt-4 text-right w-[350px]'>{formatTime(timeLeft)}</div>
          <div className='flex justify-center'>
            <p>
              I didn't get the code?{' '}
              {resendButtonDisabled ? (
                'Resend OTP'
              ) : (
                <a href='#'>
                  <span className='text-color1'>Resend OTP</span>
                </a>
              )}
            </p>
          </div>
          <div className='flex justify-center mt-2'>
            <button
              className={`bg-color1 border rounded-lg h-14 w-full text-white mx-auto ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
