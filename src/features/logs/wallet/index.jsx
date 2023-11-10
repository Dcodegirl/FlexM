import React from "react";
import { connect } from "react-redux";
import { setCurrentPage } from "../../../actions/page";
import { setDisplayModal } from "../../../actions/modal";
import WalletLogs from "./WalletLog";
import WalletInfo from "../../dashboard/WalletInfo";
import WalletBreakDown from "../../dashboard/WalleBreakdown";
import userGroup from "../../../assets/icons/users.svg";


export const Users = ({}) => {
  return (
    <div className=''>
      <WalletInfo/>
      <WalletBreakDown/>
      <WalletLogs />
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
