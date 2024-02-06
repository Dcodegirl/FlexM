import React, { useState, useEffect } from 'react';
import axios from '../../../../utils/axiosInstance';
import { useGlobalContext } from '../../../../custom-hooks/Context';
import { useCustomToast } from '../../../toast/useCustomToast';

function Contact({ nextStep }) {
  const { setUserId, setFirstname, setLastname, setAddress, setSelectedState, setSelectedCountry, setState, setCountry, setLga, updateBvnPhoneNum } = useGlobalContext();
  const showToast = useCustomToast()

  const [timeLeft, setTimeLeft] = useState(600);
  const [bvn, setBvn] = useState(["", "", "", "", "", ""]);
  const [resendButtonDisabled, setResendButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const updatedBvnPhoneNum = updateBvnPhoneNum();

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
        setLga(responseData.data.lga);
        setState(responseData.data.state);
        setCountry(responseData.data.country);

        showToast('BVN verification successful!', 'success');
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
              } else if (status && data && data.message) {
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
    } else {
      showToast('Please enter all 6 BVN digits.', 'error');
    }
  };
  const handleResendOtp = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/onboarding/resend', { phone: updatedBvnPhoneNum });
      const responseData = response.data;

      if (responseData.status === 'Successful') {
        // Reset the timer and disable the Resend button
        setTimeLeft(600);
        setResendButtonDisabled(true);
        showToast('OTP has been resent successfully!', 'success' );
      } else {
        showToast('Failed to resend OTP. Please try again.', 'error' );
      }
    } catch (error) {
      console.error('API Error:', error);
      showToast('An unexpected error occurred. Please try again.', 'error' );
    } finally {
      setLoading(false);
    }
  };
  const updatedBvnPhoneNumToShow = `${updatedBvnPhoneNum.substring(0, 3)} *** ${updatedBvnPhoneNum.substring(updatedBvnPhoneNum.length - 3)}`;

  return (
    <>
      <div className='md:m-8 my-8 overflow-hidden'>
        <div className="md:p-16 py-16 px-8 md:bg-bg-green md:border-border-primary bg-white border-white rounded-3xl border">
          <div className="text-deep-green font-bold text-center">
            <p className='text-2xl'>Verify your BVN</p>
            <p className="text-gray-500 text-xl font-thin w-[360px]">we sent OTP to the number attached to your BVN {updatedBvnPhoneNumToShow}</p>
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
          <div className="flex p-2">
            <button
              // onClick={prevStep}
              className="bg-global-gray border rounded-lg h-14 w-[30%] text-deep-green mx-auto"
            >
              <i className="fa-solid fa-left-long md:px-4 px-2"></i>Previous
            </button>
            <button
              onClick={handleSubmit}
              className={`bg-color1 rounded-lg h-14 md:w-[60%] w-[30%] text-white mx-auto relative ${loading ? 'opacity-50 pointer-events-none' : ''}`}
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
