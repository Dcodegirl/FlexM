import React from "react";
import wallet from '../../../assets/icons/walletIc.svg';
import withdrawal from '../../../assets/icons/withdrawIc.svg';
import deposit from '../../../assets/icons/depositIc.svg';
import growth from '../../../assets/icons/growth.svg';
import fall from '../../../assets/icons/fall.svg';

const WalletBreakDown = ({
  walletBalance,
  currentBalance,
  totalCashout,
  totalDeposit,
  currentGrowthRate,
  totalCashoutGrowthRate,
  totalDepositGrowthRate
}) => {
  return (
    <>
      <div className="mt-8 overflow-x-auto md:overflow-x-hidden">
        <div className="flex justify-evenly md:w-full w-[800px]">
          <div className="bg-white rounded-md md:w-[250px] px-4 py-8">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-3">
                <p>Current Balance </p>
                <p className="font-extrabold text-xl">{`₦${currentBalance}`}</p>
              </div>
              <img src={wallet} alt="" />
            </div>
            <div className="flex items-center gap-5 mt-6">
              <img src={growth} alt="" />
              <p className="text-xl"><span className="text-progress-green">{`${currentGrowthRate}%`}</span> from yesterday</p>
            </div>
          </div>
          <div className="bg-white rounded-md md:w-[250px] p-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-3">
                <p>Total Cashout</p>
                <p className="font-extrabold text-xl">{`₦${totalCashout.toFixed(2)}`}</p>
              </div>
              <img src={withdrawal} alt="" />
            </div>
            <div className="flex items-center gap-5 mt-6">
              <img src={fall} alt="" />
              <p className="text-xl"><span className="text-failed">{`${totalCashoutGrowthRate}%`}</span> from yesterday</p>
            </div>
          </div>
          <div className="bg-white rounded-md md:w-[250px] p-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-3">
                <p>Total Funds Transfer</p>
                <p className="font-extrabold text-xl">{`₦${totalDeposit.toFixed(2)}`}</p>
              </div>
              <img src={deposit} alt="" />
            </div>
            <div className="flex items-center gap-5 mt-6">
              <img src={growth} alt="" />
              <p className="text-xl"><span className="text-progress-green">{`${totalDepositGrowthRate}%`}</span> from yesterday</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WalletBreakDown;
