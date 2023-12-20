import React, { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
import WalletInfo from "../../dashboard/WalletInfo";
import WalletBreakDown from "../../dashboard/WalleBreakdown";
import WalletLogs from "../wallet/WalletLog";
import { useSelector } from 'react-redux';

const Users = () => {
  const agentId = useSelector((state) => state.auth.user?.id);

  const [totalBalance, setTotalBalance] = useState(0);
  const [currentBalance, setCurrentBalance] = useState({ amount: 0, growth_rate: 0 });
  const [totalCashout, setTotalCashout] = useState({ amount: 0, growth_rate: 0 });
  const [totalDeposit, setTotalDeposit] = useState({ amount: 0, growth_rate: 0 });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/aggregtorwallet",
          {
            params: {
              agent_id: agentId,
            },
          }
        );

        const data = response.data.data;
        setTotalBalance(parseFloat(data.current_bal.current_balance));
        setCurrentBalance({
          amount: parseFloat(data.current_bal.current_balance),
          growth_rate: data.current_bal.rate,
        });
        setTotalCashout({
          amount: parseFloat(data.cashout.total_cashout),
          growth_rate: data.cashout.rate,
        });
        setTotalDeposit({
          amount: parseFloat(data.deposit.total_deposit),
          growth_rate: data.deposit.rate,
        });
        setTransactions(data.transaction.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [agentId]);

  const formatAmount = (amount) => {
    return amount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const walletInfoProps = {
    title: "Aggregator's Wallet Balance",
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
      />
      <WalletLogs transactions={transactions} />
    </div>
  );
};

export default Users;
