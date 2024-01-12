import React, { useState } from 'react';
import { useGlobalContext } from '../../../../custom-hooks/Context';
import axios from '../../../../utils/axiosInstance';
import { useToasts } from 'react-toast-notifications';
import warning from '../../../../assets/images/warning.svg';

function BvnVerifi({ nextStep }) {
  const { userId, setUserId, updateBvnPhoneNum   } = useGlobalContext();
  const { addToast } = useToasts();

  const [bvn, setBvn] = useState('');
  const [dob, setDob] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      // Validation: Ensure BVN is 11 digits
      if (bvn.length !== 11) {
        addToast('BVN must be 11 digits.', {
          appearance: 'error',
          autoDismiss: true,
          autoDismissTimeout: 3000, // milliseconds
        });
        return;
      }

      const payload = {
        user_id: userId,
        bvn: bvn,
        date_of_birth: dob,
      };

      // Make the Axios request
      const response = await axios.post('/onboarding/validation', payload);

      // Handle the response as needed
      const responseData = response.data;
      console.log('API Response:', responseData);
      updateBvnPhoneNum(responseData.data)
      addToast('BVN validation successful!', {
        appearance: 'success',
        autoDismiss: true,
        autoDismissTimeout: 3000, // milliseconds
      });
      // Move to the next step in your component logic
      nextStep();
    } catch (error) {
      console.error('API Error:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        
        // that falls out of the range of 2xx
        const { status, data } = error.response;
        addToast(` ${data.message}`, { appearance: 'error', autoDismiss: true,
        autoDismissTimeout: 3000, });
      } else if (error.request) {
        // The request was made but no response was received
        addToast('No response from the server. Please try again.', { appearance: 'error', autoDismiss: true, autoDismissTimeout: 3000  });
      } else {
        // Something happened in setting up the request that triggered an error
        addToast('An unexpected error occurred. Please try again.', { appearance: 'error', autoDismiss: true, autoDismissTimeout: 3000  });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='md:m-8 my-8 overflow-hidden'>
        <div className="md:p-16 py-16 px-8 md:bg-bg-green md:border-[#00BD7A40] bg-white border-white rounded-3xl border">
          <div className="text-deep-green font-bold text-center">
            <p className='text-2xl'>Enter your BVN</p>
            <p className="text-gray-700 text-xl font-thin w-[360px]">Enter your 11 Digit BVN</p>
          </div>
          <div className='w-[350px] mt-6'>
            <form>
              <p className='text-gray-700 text-sm mb-2'>BVN</p>
              <input
                type="tel"
                value={bvn}
                onChange={(e) => setBvn(e.target.value)}
                required
                placeholder='Enter BVN'
                className='md:bg-bg-green bg-white border-[#D0D5DD] border rounded-lg h-14 w-full mb-6 p-4'
              />
              <div className='bg-[#CDFEEE] rounded-lg h-14 w-full mb-6 p-6 flex items-center justify-between'>
                <div className='flex gap-2 items-center'>
                  <img
                    src={warning} // Provide the actual path to your SVG upload icon
                    alt="Upload Icon"
                    className="h-10 w-10"
                  />
                  <div className='flex'>
                    <p className="block text-deep-green text-sm">Dial *565*0# on your registered phone number to get your BVN</p>
                  </div>
                </div>
              </div>
              <p className='text-gray-700 text-sm mb-2'>Date of Birth</p>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                placeholder='00/00/0000'
                className='md:bg-bg-green bg-white border-[#D0D5DD] border rounded-lg h-14 w-full mb-6 p-4'
              />
            </form>
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

export default BvnVerifi;
