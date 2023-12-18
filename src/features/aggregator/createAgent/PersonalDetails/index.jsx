import React, { useState, useEffect } from "react";
import { useToasts } from 'react-toast-notifications';
import axios from "../../../../utils/axiosInstance";


const PersonalDetails = ({ }) => {
  const { addToast } = useToasts();
  const [errors, setErrors] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [lastname, setLastname] = useState('');
  const [address, setAddress] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [dob, setDob] = useState('');
  const [loading, setLoading ] = useState('')




  const handlefirstnameChange = (event) => {
    setFirstname(event.target.value);
  };
  const handlelastnameChange = (event) => {
    setLastname(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleaddressnameChange = (event) => {
    setAddress(event.target.value);
  };
  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  useEffect(() => {
    // Fetch the list of countries when the component mounts
    const fetchCountries = async () => {
      try {
        const response = await axios.get("/countries/all-countries");
        setCountries(response.data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = async (event) => {
    const selectedCountryId = event.target.value;

    // Update selectedCountry state
    setSelectedCountry(selectedCountryId);

    // Fetch states based on the selected country
    try {
      const response = await axios.get(`/countries/all-states/${selectedCountryId}`);
      setStates(response.data.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };
  const resetForm = () => {
    setFirstname('');
    setEmail('');
    setPhoneNumber('');
    setLastname('');
    setAddress('');
    setSelectedState('');
    setSelectedCountry('');
    setDob('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      setLoading(true);
      // Create the payload variable and update it with form data
      const payload = {
        first_name: firstname,
        last_name: lastname,
        business_address: address,
        country_id: selectedCountry,
        state_id: selectedState,
        email: email,
        phone_number: phoneNumber,
        date_of_birth: dob,
      };
      // Call the API with Axios
      const response = await axios.post('/agent/create', payload);
  
      // Handle the response as needed
      const responseData = response.data;
      console.log('API Response:', responseData);
  
      addToast("Agent Invite sent successfully", { appearance: 'success' });
      resetForm(); 
    } catch (error) {
      console.error('API Error:', error);
  
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { status, data } = error.response;
  
        if (data && data.errors) {
          // If the error response contains 'errors' field, display each error in a separate toast
          Object.values(data.errors).flat().forEach(errorMessage => {
            addToast(`Server error: ${status} - ${errorMessage}`, { appearance: 'error' });
          });
        } else {
          // If the error response does not contain 'errors' field, display a generic error message
          addToast(`Server error: ${status} - An unexpected error occurred.`, { appearance: 'error' });
        }
      } else if (error.request) {
        // The request was made but no response was received
        addToast('No response from the server. Please try again.', { appearance: 'error' });
      } else {
        // Something happened in setting up the request that triggered an error
        addToast('An unexpected error occurred. Please try again.', { appearance: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <div>
      <form >
        <div className="md:grid md:grid-cols-1 md:grid-rows-4 flex flex-col">
          <div className="flex md:gap-5 w-full md:flex-row flex-col">
            <div className=''>
              <p className='text-gray-700 text-xl mb-2 font-medium'>Legal First Name</p>
              <input
                type="text"
                value={firstname}
                onChange={handlefirstnameChange}
                required
                placeholder='Type First Name'
                className='bg-white border-[#D0D5DD] border rounded-lg h-20 md:w-[500px] w-full mb-6 p-4'
              />
            </div>
            <div className=''>
              <p className='text-gray-700 text-xl mb-2 font-medium'>Legal Last Name</p>
              <input
                type="text"
                value={lastname}
                onChange={handlelastnameChange}
                required
                placeholder='Type Last Name'
                className='bg-white border-[#D0D5DD] border rounded-lg h-20  md:w-[500px] w-full mb-6 p-4'
              />
            </div>
          </div>
          <div className="flex md:gap-5 w-full md:flex-row flex-col">
            <div className="flex md:gap-3 md:flex-row flex-col">
              <div className=' w-full'>
                <p className='text-gray-700 text-xl mb-2 font-medium'>Country</p>
                <select
                  className=' bg-white border-[#D0D5DD] border rounded-lg h-20 md:w-[244px] w-full mb-6 p-4'
                  value={selectedCountry}
                  onChange={handleCountryChange}
                >
                  <option value="">Choose Country</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className=' w-full'>
                <p className='text-gray-700 text-xl mb-2 font-medium'>State</p>
                <select
                  className=' bg-white border-[#D0D5DD] border rounded-lg h-20 md:w-[244px] w-full mb-6 p-4'
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  <option value="">Choose State</option>
                  {states.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <p className='text-gray-700 text-xl mb-2 font-medium'>Address</p>
              <input
                type="text"
                value={address}
                onChange={handleaddressnameChange}
                required
                placeholder='Type Address'
                className='bg-white border-[#D0D5DD] border rounded-lg h-20 md:w-[500px] w-full mb-6 p-4'
              />
            </div>
          </div>
          <div className="flex md:flex-row flex-col gap-5 w-full">
            <div className=''>
              <p className='text-gray-700 text-xl mb-2 font-medium'>Email</p>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                placeholder='Type Email'
                className='bg-white border-[#D0D5DD] border rounded-lg h-20 md:w-[500px] w-full mb-6 p-4'
              />
            </div>
            <div className=''>
              <p className='text-gray-700 text-xl mb-2 font-medium'>Phone Number</p>
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneNumber}
                required
                placeholder='Type Last Name'
                className='bg-white border-[#D0D5DD] border rounded-lg h-20  md:w-[500px] w-full mb-6 p-4'
              />
            </div>
          </div>
          <div>
            <p className='text-gray-700 text-sm mb-2'>Date of Birth</p>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              placeholder='00/00/0000'
              className='bg-white border-[#D0D5DD] border rounded-lg h-20  md:w-[500px] w-full mb-6 p-4'
            />
          </div>
        </div>
      </form>
      <div className='flex justify-center mt-2'>
      <button
                type="submit"
                onClick={handleSubmit}
                className={`bg-gradient-to-r hover:bg-gradient-to-l from-color1 to-color2 rounded-lg h-14 w-full text-white mx-auto relative ${
                  loading ? 'opacity-50 pointer-events-none' : ''
                }`}
                disabled={loading}
              >
                {loading && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="loader"></div>
                  </div>
                )}
                {loading ? 'Submit...' : 'Submit'}
              </button>
      </div>
    </div>
  );
};

export default PersonalDetails;
