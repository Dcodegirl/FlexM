import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import flexShield from "../../../assets/icons/bronze-badge.svg";
import premiumShield from "../../../assets/icons/silver-badge.svg";
import vipShield from "../../../assets/icons/gold-badge.svg";
import formatToCurrency from "../../../utils/formatToCurrency";
import refresh from "../../../assets/icons/refresh.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from "../../../utils/axiosInstance";
import { useSelector } from 'react-redux';
// import styles from "./Balance.module.scss";


const Balance = ({}) => {
  const [showWallet, setShowWallet] = useState(false);
  const [aggregatorBalance, setAggregatorBalance] = useState('');
  const [walletBalance, setWalletBalance] = useState('');
  const [commissionBalance, setCommissionBalance] = useState('');
  const [showCommission, setShowCommission] = useState(false);
  const [showAggregator, setShowAggregator] = useState(false);
  const superAgentId = useSelector((state) => state.auth.user.super_agent_id); 
  console.log('super agent id: ',superAgentId)

  const toggleWalletVisibility = () => {
    setShowWallet(!showWallet);
  };

  const toggleCommissionVisibility = () => {
    setShowCommission(!showCommission);
  };

  const toggleAggregatorVisibility = () => {
    setShowAggregator(!showAggregator);
  };

  useEffect(() => {
    // Fetch wallet balance
    const fetchWalletBalance = async () => {
      try {
        const response = await axios.get("/main/balance");
        setWalletBalance(response.data.data);
      } catch (error) {
        console.error("Error fetching wallet balance:", error);
      }
    };

    // Fetch commission balance
    const fetchCommissionBalance = async () => {
      try {
        const response = await axios.get("/commission/balance");
        setCommissionBalance(response.data.data);
      } catch (error) {
        console.error("Error fetching commission balance:", error);
      }
    };

    // Call the functions to fetch balances
    fetchWalletBalance();
    fetchCommissionBalance();
  }, []); 
 
 
  const balanceContent = showWallet ? (
    <span>₦{formatToCurrency(walletBalance)}</span>
  ) : (
    <span>*********</span>
  );
  const commissionContent = showCommission ? (
    <span>₦{formatToCurrency(commissionBalance)}</span>
  ) : (
    <span>*********</span>
  );
  const aggregatorContent = showAggregator && superAgentId ? (
    <span>₦{formatToCurrency(aggregatorBalance)}</span>
  ) : (
    <span>*********</span>
  );

  

  return (
    <>
    <div className="bg-white p-8 rounded-md mt-8 overflow-x-auto md:overflow-x-hidden">
      <div>
        <p className="text-deep-green font-medium my-4 text-3xl">Your Balance</p>
      </div>
      <div className="mt-4 flex gap-5 md:w-full w-[1000px] ">
        <div className="p-4 bg-bg-card1 bg-cover bg-no-repeat justify-between flex flex-col gap-10 md:w-full w-[600px] h-[170px] rounded-3xl ">
          <div className="flex justify-between relative">
            <p className="text-[#F5FFFD] font-extrabold text-2xl">Wallet Balance</p>
            <FontAwesomeIcon
                  icon={showWallet ? faEye : faEyeSlash}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-[#B2B5BC]"
                  onClick={toggleWalletVisibility}
                />
          </div>
          <div className=" flex flex-col gap-10">
            <div>
              <p className="text-[#F9F9F9]">Total Balance</p>
            </div>
            <div className="font-bold text-3xl text-white">
              <p>{balanceContent}</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-bg-card2 bg-cover bg-no-repeat justify-between flex flex-col gap-10 md:w-full w-[650px] h-[170px] rounded-3xl">
          <div className="flex justify-between relative">
            <p className="text-[#F5FFFD] font-extrabold text-2xl">Commission Balance</p>
            <FontAwesomeIcon
                  icon={showCommission ? faEye : faEyeSlash}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-[#B2B5BC]"
                  onClick={toggleCommissionVisibility}
                />
          </div>
          <div className=" flex flex-col gap-10">
            <div>
              <p className="text-[#F9F9F9]">Total Balance</p>
            </div>
            <div className="font-bold text-3xl text-white">
              <p>{commissionContent}</p>
            </div>
          </div>
        </div>
        {superAgentId && ( // Only render the Aggregator Balance card if superAgentId is not null
            <div className="p-4 bg-bg-card3 bg-cover bg-no-repeat justify-between flex flex-col gap-10 md:w-full w-[650px] h-[170px] rounded-3xl">
              <div className="flex justify-between relative">
                <p className="text-[#F5FFFD] font-extrabold text-2xl">Aggregator Balance</p>
                <FontAwesomeIcon
                  icon={showAggregator ? faEye : faEyeSlash}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-[#B2B5BC]"
                  onClick={toggleAggregatorVisibility}
                />
              </div>
              <div className=" flex flex-col gap-10">
                <div>
                  <p className="text-[#F9F9F9]">Total Balance</p>
                </div>
                <div className="font-bold text-3xl text-white">
                  <p>{aggregatorContent}</p>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
   </>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     walletBalance: state.wallet.balance,
   
//     agentClassification: state.auth.user.agentClassification,
//   };
// };

export default Balance;
