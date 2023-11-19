import React, {useState} from "react";

import wallet from '../../../assets/icons/walletIc.svg'
import withdrawal from '../../../assets/icons/withdrawIc.svg'
import deposit from '../../../assets/icons/depositIc.svg'
import agent from '../../../assets/icons/agentIc.svg'
import growth from '../../../assets/icons/growth.svg'
import fall from '../../../assets/icons/fall.svg'
// import styles from "./Balance.module.scss";


const WalletBreakDown = ({}) => {



  return (
    <>
    <div className="mt-8">
      <div className="flex justify-evenly w-full">
        <div className="bg-white rounded-md w-[250px] px-4 py-8">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-3">
              <p>Current Balance </p>
              <p className="font-extrabold text-xl">₦500,000</p>
            </div>
            <img src={wallet} alt="" />
          </div>
          <div className="flex items-center gap-5 mt-6">
            <img src={growth} alt="" />
            <p className="text-xl"><span className="text-progress-green">29.30%</span> from yesterday</p>
          </div>
        </div>
        <div className="bg-white rounded-md w-[250px] p-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-3">
              <p>Total Withdrawal</p>
              <p className="font-extrabold text-xl">₦150,000.00</p>
            </div>
            <img src={withdrawal} alt="" />
          </div>
          <div className="flex items-center gap-5 mt-6">
            <img src={fall} alt="" />
            <p className="text-xl"><span className="text-failed">29.30%</span> from yesterday</p>
          </div>
        </div>
        <div className="bg-white rounded-md w-[250px] p-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-3">
              <p>Total Deposit</p>
              <p className="font-extrabold text-xl">₦450,000.00</p>
            </div>
            <img src={deposit} alt="" />
          </div>
          <div className="flex items-center gap-5 mt-6">
            <img src={growth} alt="" />
            <p className="text-xl"><span className="text-progress-green">29.30%</span> from yesterday</p>
          </div>
        </div>
        {/* <div className="bg-white rounded-md w-[250px] p-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-3">
              <p>Active Agent</p>
              <p className="font-extrabold text-xl">5</p>
            </div>
            <img src={agent} alt="" />
          </div>
          <div className="flex items-center gap-5 mt-6">
            <img src={growth} alt="" />
            <p className="text-xl"><span className="text-progress-green">29.30%</span> from yesterday</p>
          </div>
        </div> */}
      </div>
    </div>
   </>
  );
};


export default WalletBreakDown;
