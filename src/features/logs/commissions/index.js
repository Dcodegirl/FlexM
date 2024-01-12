import React, { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
import WalletInfo from "../../dashboard/WalletInfo";
import WalletBreakDown from "../../dashboard/WalleBreakdown";
import WalletLogs from "../wallet/WalletLog";

const Users = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [currentBalance, setCurrentBalance] = useState({ amount: 0, growth_rate: 0 });
  const [totalCashout, setTotalCashout] = useState({ amount: 0, growth_rate: 0 });
  const [totalDeposit, setTotalDeposit] = useState({ amount: 0, growth_rate: 0 });
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState('commissionWallet');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseTotalBalance = await axios.get('/commission/balance');
        setTotalBalance(responseTotalBalance.data.data);

        const responseCurrentBalance = await axios.get('/commission/current');
        setCurrentBalance(responseCurrentBalance.data.data);

        const responseTotalCashout = await axios.get('/commission/withdrawal');
        setTotalCashout(responseTotalCashout.data.data);

        const responseTotalDeposit = await axios.get('/commission/deposit');
        setTotalDeposit(responseTotalDeposit.data.data);
      
      const responseTransactions = await axios.get('/commission/transactions');
        setTransactions(responseTransactions.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
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
      <WalletLogs transactions={transactions} />
    </div>
  );
};

export default Users;
