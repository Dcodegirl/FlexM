import React, { useState, useEffect } from "react";
import { useToasts } from 'react-toast-notifications';
import axios from "../../../../utils/axiosInstance";

const PersonalDetails = () => {
  const { addToast } = useToasts();
  const [errors, setErrors] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [lastname, setLastname] = useState('');
  const [address, setAddress] = useState('');
  const [lga, setLga] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [dob, setDob] = useState('');
  const [loading, setLoading] = useState('');

  const handlefirstnameChange = (event) => {
    setFirstname(event.target.value);
  };
  const handlelastnameChange = (event) => {
    setLastname(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleLgaChange = (event) => {
    setLga(event.target.value);
  };
  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleaddressnameChange = (event) => {
    setAddress(event.target.value);
  };

  const handleCountryChange = async (event) => {
    const selectedCountryId = event.target.value;

    // Find the selected country object
    const selectedCountryObject = countries.find(country => country.id === selectedCountryId);

    // Update selectedCountry state with the entire country object
    setSelectedCountry(selectedCountryObject);

    // Fetch states based on the selected country
    try {
      const response = await axios.get(`/countries/all-states/${selectedCountryId}`);
      setStates(response.data.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const handleStateChange = (event) => {
    const selectedStateId = event.target.value;

    // Find the selected state object
    const selectedStateObject = states.find(state => state.id === selectedStateId);

    // Update selectedState state with the entire state object
    setSelectedState(selectedStateObject);
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
        country: selectedCountry.name, // Use country name instead of ID
        state: selectedState.name, // Use state name instead of ID
        email: email,
        lga: lga,
        phone_number: phoneNumber,
        date_of_birth: dob,
      };
      // Call the API with Axios
      const response = await axios.post('/agent/create', payload);

      // Handle the response as needed
      const responseData = response.data;
      console.log('API Response:', responseData);

      addToast("Agent Invite sent successfully", { appearance: 'success', autoDismiss: true, 
      autoDismissTimeout: 3000});
      resetForm();
    } catch (error) {
      console.error('API Error:', error);

      // Error handling code
      if (error.response) {
        const { status, data } = error.response;

        if (data && data.errors) {
          Object.values(data.errors).flat().forEach(errorMessage => {
            addToast(` ${errorMessage}`, { appearance: 'error', autoDismiss: true, 
            autoDismissTimeout: 3000 });
          });
        } else {
          addToast(`An unexpected error occurred.`, { appearance: 'error', autoDismiss: true, 
          autoDismissTimeout: 3000 });
        }
      } else if (error.request) {
        addToast('No response from the server. Please try again.', { appearance: 'error', autoDismiss: true, 
        autoDismissTimeout: 3000 });
      } else {
        addToast('An unexpected error occurred. Please try again.', { appearance: 'error', autoDismiss: true, 
        autoDismissTimeout: 3000 });
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
                  value={selectedCountry.id}
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
                  value={selectedState.id}
                  onChange={handleStateChange}
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
          <div className="flex md:flex-row flex-col gap-5 w-full">
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
          <div>
            <p className='text-gray-700 text-sm mb-2'>Local Govt</p>
            <input
              type="text"
              value={lga}
              onChange={handleLgaChange}
              required
              placeholder='Type Local Govt'
              className='bg-white border-[#D0D5DD] border rounded-lg h-20  md:w-[500px] w-full mb-6 p-4'
            />
          </div>
          </div>
          
        </div>
      </form>
      <div className='flex justify-center mt-2'>
      <button
                type="submit"
                onClick={handleSubmit}
                className={`bg-color1  rounded-lg h-14 w-full text-white mx-auto relative ${
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
