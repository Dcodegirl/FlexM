import React, { useState, useEffect } from 'react';
import profile from '../../../assets/icons/profileuser.svg'
import mark from '../../../assets/icons/aggregator.svg'
import sun from '../../../assets/icons/sun.svg'
import moon from '../../../assets/icons/moon.svg'
import Ellipse from '../../../assets/icons/Ellipse.svg'
import warn from '../../../assets/icons/warning.svg'
import smallwarn from '../../../assets/icons/smallwarning.png'
import arrowright from '../../../assets/icons/rightarrow.svg'
import axios from '../../../utils/axiosInstance';
import { NavLink } from 'react-router-dom';

const UserInfo = () => {
  const [userData, setUserData] = useState(null);
  const currentDate = new Date();

  useEffect(() => {
    // Make API call to fetch user information
    axios.get('/agent/userinfo')
      .then(response => {
        setUserData(response.data.data);
        console.log('user info:', "user info from user info api: ", response.data.data)
      })
      .catch(error => {
        console.error('Error fetching user information:', error);
      });
  }, []);

  if (!userData) {
    // Loading state or handle error
    return null;
  }


  const isKYCVerified = userData?.image || userData.agent.documents.length < 3;
  const isAggregatorVerified = (userData.agent.bvn_status === "1") && (userData.agent.status === "1" || userData.agent.status === 'Active');
  const isAggregatorActive = userData.agent.status == null || userData.agent.status == 0;
  console.log('is verified: ', isAggregatorVerified, userData.agent.bvn_status, userData.agent.status)
  const currentHour = currentDate.getHours();
  const isAfter4PM = currentHour >= 16;
  return (
    <div className="flex flex-col gap-7">
      <div className='justify-between w-full md:flex hidden'>
        <div className='flex gap-2 items-center'>
          <div>
            <img src={userData?.image || profile} alt="" className='w-20 h-20 rounded-full' />
          </div>
          <div className='flex flex-col'>
            <div className='flex gap-3 items-center p-2 rounded-3xl'>
              <div className='font-semibold text-deep-green text-2xl'>{`Hi, ${userData?.agent?.first_name}!`}</div>

              {!isAggregatorActive && isAggregatorVerified && (
                <div className={`flex gap-3 ${!isAggregatorVerified ? 'bg-[#FEF8F0]' : 'bg-[#FCFDFC]'} items-center p-4 rounded-3xl`} >
                  <p className={`text-${isAggregatorVerified ? 'light-deep-green' : 'red-500'}`}>
                    {isAggregatorVerified ? 'Agent Verified' : 'Agent Not Verified'}
                  </p>
                  <img src={isAggregatorVerified ? mark : smallwarn} alt="" />
                </div>
              )}

              {isAggregatorActive && (
                <div className="bg-[#FEF8F0] flex gap-3 items-center p-2 px-4 rounded-3xl">
                  <img src={smallwarn} alt="" />
                  <div className='flex flex-col text-red-500'>
                    <p>Agent Inactive</p>
                    <p>Your account is not yet active. Please contact support for assistance.</p>
                  </div>
                </div>
              )}
            </div>

            <div className='flex gap-3 items-center -mt-2'>
              <span><img src={isAfter4PM ? moon : sun} alt="" /></span>
              <span className=''><img src={Ellipse} alt="" /></span>
              <span className='text-[#748274]'>{currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className=''><img src={Ellipse} alt="" /></span>
              <span className='text-[#748274]'>{currentDate.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='text-[14px]'>
            <span className='text-[#748274]'>Account Number: </span><span className='font-extrabold text-deep-green'> {userData.agent.virtual_account_number || 'N/A'}</span>
          </div>
          <div className='text-[14px]'>
            <span className='text-[#748274]'>Bank Name: </span><span className='font-extrabold text-deep-green'> {userData.agent.virtual_account_bank || 'N/A'}</span>
          </div>
        </div>
      </div>
      {!isKYCVerified && (
        <div className='bg-light-orange w-full py-4 px-8 rounded-md flex gap-3 items-center justify-between'>
          <div className='flex gap-3 items-center'>
            <div>
              <img src={warn} alt="" />
            </div>

            <div className='flex flex-col gap-5'>
              <p className='text-[#331E00] font-extrabold'>KYC Update</p>
              <p className='text-[#111023] text-xl'>You’re yet to finish up your registrations. You will need to upload your <span className='font-bold'>guarantor form in biodata settings</span>, <span className='font-bold'>create a new pin in pin settings</span>  and get verified.</p>
            </div>
          </div>

          <div>
            <NavLink to='/settings/biodata'>
              <div className='cursor-pointer flex items-center'>
                <p className='text-[#FFAC33] text-2xl font-medium'>Proceed</p>
                <img src={arrowright} alt="" />
              </div>
            </NavLink>

          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
