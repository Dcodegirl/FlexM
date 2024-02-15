import React, { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
import WalletInfo from "../../dashboard/WalletInfo";
import WalletBreakDown from "../../dashboard/WalleBreakdown";
import WalletLogs from "../wallet/WalletLog";
import { ThreeDots } from "svg-loaders-react";
import { GET_AGGREGATORWALLET } from "../../../utils/constants";

const Users = () => {

  const [totalBalance, setTotalBalance] = useState(0);
  const [currentBalance, setCurrentBalance] = useState({ amount: 0, growth_rate: 0 });
  const [totalCashout, setTotalCashout] = useState({ amount: 0, growth_rate: 0 });
  const [totalDeposit, setTotalDeposit] = useState({ amount: 0, growth_rate: 0 });
  const [transactions, setTransactions] = useState([]);
  const [isWalletLogsLoading, setIsWalletLogsLoading] = useState(true);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          GET_AGGREGATORWALLET
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
      finally{
        setIsWalletLogsLoading(false)
      }
    };

    fetchData();
  }, []);

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
