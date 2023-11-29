import React, { useState } from 'react';
import profile from '../../../assets/images/profileImage.png'
import mark from '../../../assets/icons/aggregator.svg'
import sun from '../../../assets/icons/sun.svg'
import Ellipse from '../../../assets/icons/Ellipse.svg'
import warn from '../../../assets/icons/warning.svg'
import arrowright from '../../../assets/icons/rightarrow.svg'

const UserInfo = () => {


  return (
    <div className="flex flex-col gap-7">
      <div className='flex justify-between w-full md:flex hidden'>
        <div className='flex gap-2 items-center'>
          <div>
            <img src={profile} alt="" className='w-20 rounded-full' />
          </div>
          <div className='flex flex-col'>
            <div className='flex gap-3 items-center p-2 rounded-3xl'>
              <div className='font-semibold text-deep-green text-2xl'>Hi, Mark!</div>
              <div className='flex gap-3 bg-[#FCFDFC] items-center p-4 rounded-3xl'><p className='text-light-deep-green'>Aggregator Verified </p><img src={mark} alt="" /></div>
            </div>
            <div className='flex gap-3 items-center -mt-2'>
              <span><img src={sun} alt="" /></span>
              <span className=''><img src={Ellipse} alt="" /></span>
              <span className='text-[#748274]'>Tuesday, October 27</span>
              <span className=''><img src={Ellipse} alt="" /></span>
              <span className='text-[#748274]'>11:26 Pm</span>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='text-[14px]'>
            <span className='text-[#748274]'>Account Number: </span><span className='font-extrabold text-deep-green'> 0118700833</span>
          </div>
          <div className='text-[14px]'>
            <span className='text-[#748274]'>Bank Name: </span><span className='font-extrabold text-deep-green'> Wema Bank</span>
          </div>
        </div>
      </div>
      <div className='bg-light-orange w-full py-4 px-8 rounded-md flex gap-3 items-center justify-between'>
        <div className='flex gap-3 items-center'>
          <div>
            <img src={warn} alt="" />
          </div>
          <div className='flex flex-col gap-5'>
            <p className='text-[#331E00] font-extrabold'>KYC Update</p>
            <p className='text-[#111023] text-xl'>You’re yet to finished up your registrations, you will need to update the your Image, and also add your Email </p>
          </div>
        </div>

        <div>
          <div className='cursor-pointer flex items-center'>
            <p className='text-[#FFAC33] text-2xl font-medium'>Proceed</p>
            <img src={arrowright} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
