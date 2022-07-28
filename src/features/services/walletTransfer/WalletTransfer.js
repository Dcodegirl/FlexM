import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import transferReducer, { initialState } from "./transfer-reducer";
import { WALLET_TRANSFER } from "../../../utils/constants";
import WalletTransferForm from "./WalletTransferForm";
import WalletTransferStatus from "./WalletTransferStatus";
import WalletTransferSummary from "./WalletTransferSummary";
import FailedTransaction from "../../../components/common/FailedTransaction";
import { useToasts } from 'react-toast-notifications';
import styles from "./WalletTransfer.module.scss";

export const WalletTransfer = () => {
  const [transferDetails, dispatch] = useReducer(transferReducer, initialState);
  const [status, setStatus] = useState("form");
  const [successData, setSuccessData] = useState({});
  const [loading, setLoading] = useState(false);
  const [transactionDate, setTransactionDate] = useState(null);
  const [agentLocation, setAgentLocation] = useState(null);
  const [failedErrorMessage, setFailedErrorMessage] = useState('');
  const { addToast } = useToasts();

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
        addToast(message, {
          appearance: 'success',
          autoDismiss: true,
      });
     
        const date = new Date();
        const transactionDate = getTransactionDate(date);

        setTransactionDate(transactionDate);
        setSuccessData(res.data.data);
        setStatus("status");
        
      } catch (error) {
        if (error.response && error.response.data.status_code === 429) {
          setLoading(false);
          addToast(error.response.data.message, {
              appearance: 'error',
              autoDismiss: true,
          });
          setFailedErrorMessage(error.response.data.message || undefined);
      } else if (error.response && error.response.status === 403) {
          setLoading(false);
          addToast(error.response.data.message, {
              appearance: 'error',
              autoDismiss: true,
          });
          setFailedErrorMessage(error.response.data.message || undefined);
      }else if (error.response && error.response.status === 401) {
        setLoading(false);
        addToast(error.response.data.message, {
            appearance: 'error',
            autoDismiss: true,
        });
        setFailedErrorMessage(error.response.data.message || undefined);
    }else{
        setTimeout(()=>{
          setStatus('failed');
          addToast(error.response.data.message, {
            appearance: 'error',
            autoDismiss: true,
        });
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
              loading={loading}
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
