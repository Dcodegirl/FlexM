import React, { useState, useEffect } from 'react';
import axios from '../../../../utils/axiosInstance';
import { useGlobalContext } from '../../../../custom-hooks/Context';
import { useToasts } from 'react-toast-notifications';

function Contact({ nextStep }) {
  const { setUserId, setFirstname, setLastname, setAddress, setSelectedState, setSelectedCountry, setState, setCountry } = useGlobalContext();
  const { addToast } = useToasts();

  const [timeLeft, setTimeLeft] = useState(600);
  const [bvn, setBvn] = useState(["", "", "", "", "", ""]);
  const [resendButtonDisabled, setResendButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleBvnChange = (index, value) => {
    if (value >= 0 && value <= 9) {
      // Ensure the value is within the range 0-9
      const newBvnDigits = [...bvn];
      newBvnDigits[index] = value;
      setBvn(newBvnDigits);

      // Automatically focus on the next input
      if (index < newBvnDigits.length - 1 && value !== "") {
        document.getElementById(`bvn-input-${index + 1}`).focus();
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
      // Timer has run out, enable the Resend OTP button
      setResendButtonDisabled(false);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const isBvnComplete = bvn.every((digit) => digit !== "");

  useEffect(() => {
    for (let i = 0; i < bvn.length; i++) {
      if (!bvn[i]) {
        document.getElementById(`bvn-input-${i}`).focus();
        break;
      }
    }
  }, [bvn]);

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && index > 0 && !bvn[index]) {
      // If the backspace key is pressed, and the current input is empty, focus on the previous input.
      document.getElementById(`bvn-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isBvnComplete) {
      try {
        setLoading(true);

        const enteredBvn = bvn.join("");
        const payload = {
          code: enteredBvn,
        };

        // Call the API with Axios
        const response = await axios.post('/onboarding/verify', payload);

        // Handle the response as needed
        const responseData = response.data;
        console.log('API Response:', responseData);

        setUserId(responseData.data.user_id);
        setFirstname(responseData.data.first_name);
        setLastname(responseData.data.last_name);
        setAddress(responseData.data.address);
        setSelectedState(responseData.data.state);
        setSelectedCountry(responseData.data.country);
        setState(responseData.data.state);
        setCountry(responseData.data.country);

        addToast('BVN verification successful!', { appearance: 'success' });
        nextStep();
      } catch (error) {
        console.error('API Error:', error);
        // Handle API errors
        addToast('BVN verification failed. Please try again.', { appearance: 'error' });
      } finally {
        setLoading(false);
      }
    } else {
      addToast('Please enter all 6 BVN digits.', { appearance: 'error' });
    }
  };

  return (
    <>
      <div className='md:m-8 my-8 overflow-hidden'>
        <div className="md:p-16 py-16 px-8 md:bg-bg-green md:border-border-primary bg-white border-white rounded-3xl border">
          <div className="text-deep-green font-bold text-center">
            <p className='text-2xl'>Verify your BVN</p>
            <p className="text-gray-500 text-xl font-thin w-[360px]">we sent OTP to the number attached to your BVN +2347065436765</p>
          </div>
          <div className='w-[350px] mt-6 flex items-center justify-center'>
            <form onSubmit={handleSubmit} className=''>
              <p className='text-gray-700 text-sm mb-2'>Your 6-Digit Code</p>
              {bvn.map((value, index) => (
                <input
                  key={index}
                  type="tel"
                  value={value}
                  onChange={(e) => handleBvnChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  min="0"
                  max="9"
                  maxLength="1"
                  required
                  id={`bvn-input-${index}`}
                  tabIndex={index + 1}
                  className='border border-[#D0D5DD] md:bg-bg-green bg-white h-16 w-14 text-center m-2 rounded-lg p-4'
                />
              ))}
            </form>
          </div>
          <div className="text-color1 mt-4 text-right w-[350px] ">
            {formatTime(timeLeft)}
          </div>
          <div className="flex justify-center">
            <p>I didn't get the code? {resendButtonDisabled ? 'Resend OTP' : <a href="#"><span className="text-[#00BD7A]">Resend OTP</span></a>}</p>
          </div>
          <div className="flex p-2">
            <button
              // onClick={prevStep}
              className="bg-global-gray border rounded-lg h-14 w-[30%] text-deep-green mx-auto"
            >
              <i className="fa-solid fa-left-long md:px-4 px-2"></i>Previous
            </button>
            <button
              onClick={handleSubmit}
              className={`bg-gradient-to-r hover:bg-gradient-to-l from-color1 to-color2 rounded-lg h-14 md:w-[60%] w-[30%] text-white mx-auto relative ${loading ? 'opacity-50 pointer-events-none' : ''}`}
              disabled={loading}
            >
              {loading && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="loader"></div>
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
