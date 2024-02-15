import React, { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
import WalletInfo from "../../dashboard/WalletInfo";
import WalletBreakDown from "../../dashboard/WalleBreakdown";
import WalletLogs from "../wallet/WalletLog";
import { ThreeDots } from "svg-loaders-react";
import { GET_COMMISSION_BALANCE } from "../../../utils/constants";
import { GET_COMMISSION_CURRENT } from "../../../utils/constants";
import { GET_COMMISSION_WITHDRAWAL } from "../../../utils/constants";
import { GET_COMMISSION_DEPOSIT } from "../../../utils/constants";
import { GET_COMMISSION_TRANSACTIONS } from "../../../utils/constants";

const Users = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [currentBalance, setCurrentBalance] = useState({ amount: 0, growth_rate: 0 });
  const [totalCashout, setTotalCashout] = useState({ amount: 0, growth_rate: 0 });
  const [totalDeposit, setTotalDeposit] = useState({ amount: 0, growth_rate: 0 });
  const [transactions, setTransactions] = useState([]);
  const [isWalletLogsLoading, setIsWalletLogsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('commissionWallet');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseTotalBalance = await axios.get(GET_COMMISSION_BALANCE);
        setTotalBalance(responseTotalBalance.data.data);

        const responseCurrentBalance = await axios.get(GET_COMMISSION_CURRENT);
        setCurrentBalance(responseCurrentBalance.data.data);

        const responseTotalCashout = await axios.get(GET_COMMISSION_WITHDRAWAL);
        setTotalCashout(responseTotalCashout.data.data);

        const responseTotalDeposit = await axios.get(GET_COMMISSION_DEPOSIT);
        setTotalDeposit(responseTotalDeposit.data.data);
      
      const responseTransactions = await axios.get(GET_COMMISSION_TRANSACTIONS);
        setTransactions(responseTransactions.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
        setIsWalletLogsLoading(false);
      }
      
    };

    fetchData();
  }, []);
  const formatAmount = (amount) => {
    return amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  const walletInfoProps = {
    title: "Commission's Wallet Balance",
    amount: `NGN ${formatAmount(totalBalance)}`,
  };

  return (
    <div className=''>
      <WalletInfo walletInfoProp={walletInfoProps} />
      <WalletBreakDown
        walletBalance={formatAmount(totalBalance)}
        currentBalance={formatAmount(currentBalance.amount)}
        totalCashout={formatAmount(totalCashout.amount)}
        totalDeposit={formatAmount(totalDeposit.amount)}
        currentGrowthRate={currentBalance.growth_rate}
        totalCashoutGrowthRate={totalCashout.growth_rate}
        totalDepositGrowthRate={totalDeposit.growth_rate}
        currentPage={currentPage}
      />
       <div className="flex justify-center items-center mt-10">
      {isWalletLogsLoading ? (
        <ThreeDots fill='#1F1474'/> 
      ) : (
        <WalletLogs transactions={transactions} />
      )}
      </div>
    </div>
  );
};

export default Users;
