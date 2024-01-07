import React from "react";
import wallet from '../../../assets/icons/walletIc.svg';
import withdrawal from '../../../assets/icons/withdrawIc.svg';
import deposit from '../../../assets/icons/depositIc.svg';
import growth from '../../../assets/icons/growth.svg';
import fall from '../../../assets/icons/fall.svg';
import { connect } from "react-redux";
import { setCurrentPage } from "../../../actions/page";
import { setDisplayModal } from "../../../actions/modal";
import userGroup from "../../../assets/icons/users.svg";
import styles from "../../logs/commissions/index.module.scss";

const WalletBreakDown = ({
  walletBalance,
  currentBalance,
  totalCashout,
  totalDeposit,
  currentGrowthRate,
  totalCashoutGrowthRate,
  totalDepositGrowthRate,
  displayModal,
  currentPage
}) => {
  const isCommissionWalletPage = currentPage === 'commissionWallet';
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
                <p className="font-extrabold text-xl">{`₦${typeof totalCashout === 'number' ? totalCashout.toFixed(2) : totalCashout}`}</p>
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
                <p className="font-extrabold text-xl">{`₦${typeof totalDeposit === 'number' ? totalDeposit.toFixed(2) : totalDeposit}`}</p>
              </div>
              <img src={deposit} alt="" />
            </div>
            <div className="flex items-center gap-5 mt-6">
              <img src={growth} alt="" />
              <p className="text-xl"><span className="text-progress-green">{`${totalDepositGrowthRate}%`}</span> from yesterday</p>
            </div>
          </div>
          {isCommissionWalletPage && (
            <div className='bg-white rounded-md md:w-[250px] p-4'>
              <div className="flex justify-between items-center">
                <h3 className={styles.sectionHeading}>Commission Transfer</h3>
                <img className={styles.serviceLogo} src={userGroup} alt="" />
              </div>

              <div className={styles.services}>
                <div className="bg-btn-purple px-6 py-3 flex gap-3 items-center justify-center text-white mt-4 cursor-pointer"
                  onClick={() => {
                    displayModal({
                      overlay: true,
                      modal: "commissionTransfer",
                      service: "",
                    });
                  }}
                >
                  <p className="font-medium text-[14px]">Transfer Your Commissions</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
    displayModal: (payload) => dispatch(setDisplayModal(payload)),
  };
};

export default connect(undefined, mapDispatchToProps)(WalletBreakDown);
