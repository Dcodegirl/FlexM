import React, { useState } from "react";



const PersonalDetails = ({ setStatus, agentData, dispatch }) => {
  const [errors, setErrors] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [lastname, setLastname] = useState('');
  const [address, setAddress] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [dob, setDob] = useState('');




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
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };




  return (
    <div>
      <form >
        <div className="grid grid-cols-1 grid-rows-4">
          <div className="flex gap-5 w-full">
            <div className=''>
              <p className='text-gray-700 text-xl mb-2 font-medium'>Legal First Name</p>
              <input
                type="text"
                value={firstname}
                onChange={handlefirstnameChange}
                required
                placeholder='Type First Name'
                className='bg-white border-[#D0D5DD] border rounded-lg h-20 w-[500px] mb-6 p-4'
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
                className='bg-white border-[#D0D5DD] border rounded-lg h-20  w-[500px] mb-6 p-4'
              />
            </div>
          </div>
          <div className="flex gap-5 w-full">
            <div className="flex gap-3">
              <div className=' w-full'>
                <p className='text-gray-700 text-xl mb-2 font-medium'>Country</p>
                <select
                  className=' bg-white border-[#D0D5DD] border rounded-lg h-20 w-[244px] mb-6 p-4'
                  value={selectedCountry}
                  onChange={handleCountryChange}
                >
                  <option value="">Choose Country</option>
                </select>
              </div>
              <div className=' w-full'>
                <p className='text-gray-700 text-xl mb-2 font-medium'>State</p>
                <select
                  className=' bg-white border-[#D0D5DD] border rounded-lg h-20 w-[244px] mb-6 p-4'
                  value={selectedState}
                  onChange={handleStateChange}
                >
                  <option value="">Choose state</option>
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
                className='bg-white border-[#D0D5DD] border rounded-lg h-20 w-[500px] mb-6 p-4'
              />
            </div>
          </div>
          <div className="flex gap-5 w-full">
            <div className=''>
              <p className='text-gray-700 text-xl mb-2 font-medium'>Email</p>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                placeholder='Type Email'
                className='bg-white border-[#D0D5DD] border rounded-lg h-20 w-[500px] mb-6 p-4'
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
                className='bg-white border-[#D0D5DD] border rounded-lg h-20  w-[500px] mb-6 p-4'
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
              className='bg-white border-[#D0D5DD] border rounded-lg h-20  w-[500px] mb-6 p-4'
            />
          </div>
        </div>
      </form>
      <div className='flex justify-center mt-2'>
        <button
          className="bg-cico-green  border rounded-lg h-20 w-[450px] text-white mx-auto "
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PersonalDetails;
