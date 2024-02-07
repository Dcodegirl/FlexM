import React, { useEffect, useState, useReducer } from "react";
import axios from "../../../utils/axiosInstance";
import transferReducer, { initialState } from "./transfer-reducer";
import { WALLET_TRANSFER } from "../../../utils/constants";
import WalletTransferForm from "./WalletTransferForm";
import WalletTransferStatus from "./WalletTransferStatus";
import WalletTransferSummary from "./WalletTransferSummary";
import FailedTransaction from "../../../components/common/FailedTransaction";
import { useCustomToast } from "../../../components/toast/useCustomToast";
import styles from "./WalletTransfer.module.scss";

export const WalletTransfer = () => {
  const [transferDetails, dispatch] = useReducer(transferReducer, initialState);
  const [status, setStatus] = useState("form");
  const [successData, setSuccessData] = useState({});
  const [loading, setLoading] = useState(false);
  const [transactionDate, setTransactionDate] = useState(null);
  const [agentLocation, setAgentLocation] = useState(null);
  const [failedErrorMessage, setFailedErrorMessage] = useState('');
  const showToast = useCustomToast();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setAgentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  const getTransactionDate = (date) => {
    const dateString = date.toString();
    return dateString.slice(0, 24);
  };

  const handleWalletTransfer = () => {
    setLoading(true);

    const { amount, wallet_id } = transferDetails;

    const req = {
      wallet_id,
      amount,
    };

    (async function transferFunds() {
      try {
        const res = await axios.post(WALLET_TRANSFER, req);
        const message = res.data.message;
        showToast(message, 'success');
     
        const date = new Date();
        const transactionDate = getTransactionDate(date);

        setTransactionDate(transactionDate);
        setSuccessData(res.data.data);
        setStatus("status");
        
      } catch (error) {
        if (error.response && error.response.data.status_code === 429) {
          setLoading(false);
          showToast(error.response.data.message, 'error');
          setFailedErrorMessage(error.response.data.message || undefined);
      } else if (error.response && error.response.status === 403) {
          setLoading(false);
          showToast(error.response.data.message,'error');
          setFailedErrorMessage(error.response.data.message || undefined);
      }else if (error.response && error.response.status === 401) {
        setLoading(false);
        showToast(error.response.data.message, 'error');
        setFailedErrorMessage(error.response.data.message || undefined);
    }else{
        setTimeout(()=>{
          setStatus('failed');
          showToast(error.response.data.message, 'error');
        setFailedErrorMessage(error.response.data.message || undefined);
        },3000);
      }}
    })();
  };

  return (
    <div className={styles.container}>
      {
        {
          form: (
            <WalletTransferForm
              dispatch={dispatch}
              setStatus={setStatus}
              state={transferDetails}
            />
          ),
          summary: (
            <WalletTransferSummary
              handleWalletTransfer={handleWalletTransfer}
              isLoading={loading}
              state={transferDetails}
            />
          ),
          status: (
            <WalletTransferStatus
              date={transactionDate}
              successData={successData}
              setStatus={setStatus}
            />
          ),
          failed: <FailedTransaction message={failedErrorMessage} />
        }[status]
      }
    </div>
  );
};

export default WalletTransfer;
