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

  const walletInfoProps = {
    title: "Commission's Wallet Balance",
    amount: `NGN ${totalBalance.toLocaleString()}`,
  };

  return (
    <div className=''>
      <WalletInfo walletInfoProp={walletInfoProps} />
      <WalletBreakDown
        walletBalance={totalBalance}
        currentBalance={currentBalance.amount}
        totalCashout={totalCashout.amount}
        totalDeposit={totalDeposit.amount}
        currentGrowthRate={currentBalance.growth_rate}
        totalCashoutGrowthRate={totalCashout.growth_rate}
        totalDepositGrowthRate={totalDeposit.growth_rate}
      />
      <WalletLogs transactions={transactions} />
    </div>
  );
};

export default Users;
