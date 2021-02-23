import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";

import { FUND_BETTING_WALLET } from "../../../../utils/constants";
import FundWalletReducer, { initialFormState } from "./wallet-reducer.js";
import FundWalletForm from "./FundWalletForm";
import FundWalletSummary from "./FundWalletSummary";
import FundWalletCompleted from "./FundWalletCompleted";
import FailedTransaction from "../../../../components/common/FailedTransaction";

import styles from "./FundWallet.module.scss";

export const FundWallet = () => {
  let renderedComponent;
  const TRANSACTION_COST = 0;
  const [componentToRender, setComponentToRender] = useState("form");
  const [FundWalletFormState, dispatch] = useReducer(
    FundWalletReducer,
    initialFormState
  );
  const [successData, setSuccessData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = () => {
    setLoading(true);
    const { accountId, amount, phone } = FundWalletFormState;

    const req = {
      bank_code: "9001",
      amount,
      recipient: phone,
    };

    (async function fundWallet() {
      try {
        const res = await axios.post(FUND_BETTING_WALLET, req);
        setLoading(false);
        setSuccessData(res.data.data);
        setComponentToRender("success");
      } catch (e) {
        setLoading(false);
        setComponentToRender("failed");
      }
    })();
  };

  switch (componentToRender) {
    case "form":
      renderedComponent = (
        <FundWalletForm
          FundWalletFormState={FundWalletFormState}
          dispatch={dispatch}
          setComponentToRender={setComponentToRender}
        />
      );
      break;
    case "summary":
      renderedComponent = (
        <FundWalletSummary
          FundWalletFormState={FundWalletFormState}
          loading={loading}
          handleOnSubmit={handleOnSubmit}
          transactionCost={TRANSACTION_COST}
        />
      );
      break;
    case "success":
      renderedComponent = (
        <FundWalletCompleted
          FundWalletFormState={FundWalletFormState}
          transactionCost={TRANSACTION_COST}
          setComponentToRender={setComponentToRender}
          successData={successData}
        />
      );
      break;
    case "failed":
      renderedComponent = <FailedTransaction />;
      break;
    default:
      renderedComponent = null;
  }

  return <div className={styles.container}>{renderedComponent}</div>;
};

export default FundWallet;
