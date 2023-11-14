import React from "react";
import { connect } from "react-redux";
import { setCurrentPage } from "../../../actions/page";
import { setDisplayModal } from "../../../actions/modal";
import WalletInfo from "../../dashboard/WalletInfo";
import WalletBreakDown from "../../dashboard/WalleBreakdown";
import CommissionLogs from "./CommissionLogs";
import userGroup from "../../../assets/icons/users.svg";
import styles from "./index.module.scss";

export const Users= ({ changeCurrentPage, displayModal }) => {
  const walletInfoProps = {
    title: "Commision's Wallet Balance",
    amount: "NGN 20,000,000",
  };
  return (
    <div className=''>
      <WalletInfo walletInfoProp={walletInfoProps}/>
      <WalletBreakDown/>
      <CommissionLogs />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
    displayModal: (payload) => dispatch(setDisplayModal(payload)),
  };
};

export default connect(undefined, mapDispatchToProps)(Users);