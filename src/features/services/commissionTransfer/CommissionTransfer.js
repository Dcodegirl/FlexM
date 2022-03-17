import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import commissionReducer, { initialState } from "./commission-reducer";
import { COMMISSION_TRANSFER } from "../../../utils/constants";
import CommissionForm from "./Commissionform";
import CommissionTransferStatus from "./CommissionStatus";
import CommissionTransferSummary from "./CommissionSummary";
import FailedTransaction from "../../../components/common/FailedTransaction";
import styles from "./CommissionTransfer.module.scss";

export const CommissionTransfer = () => {
  const [transferDetails, dispatch] = useReducer(commissionReducer, initialState);
  const [status, setStatus] = useState("form");
  const [successData, setSuccessData] = useState({});
  const [loading, setLoading] = useState(false);
  const [transactionDate, setTransactionDate] = useState(null);
  const [agentLocation, setAgentLocation] = useState(null);

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

  const handleCommissionTransfer = () => {
    setLoading(true);

    const { amount} = transferDetails;

    const req = {
      amount,
    };

    (async function transferFunds() {
      try {
        const options = {
          headers: {
            lat: agentLocation?.latitude,
            lng: agentLocation?.longitude,
          },
        };

        const res = await axios.post(COMMISSION_TRANSFER, req,options,);

        const date = new Date();
        const transactionDate = getTransactionDate(date);

        setTransactionDate(transactionDate);
        setSuccessData(res.data.data);
        setStatus("status");
      } catch (e) {
        setStatus("failed");
      }
    })();
  };

  return (
    <div className={styles.container}>
      {
        {
          form: (
            <CommissionForm
              dispatch={dispatch}
              setStatus={setStatus}
              state={transferDetails}
            />
          ),
          summary: (
            <CommissionTransferSummary
              handleCommissionTransfer={handleCommissionTransfer}
              loading={loading}
              state={transferDetails}
            />
          ),
          status: (
            <CommissionTransferStatus
              date={transactionDate}
              successData={successData}
              setStatus={setStatus}
            />
          ),
          failed: <FailedTransaction />,
        }[status]
      }
    </div>
  );
};

export default CommissionTransfer;
