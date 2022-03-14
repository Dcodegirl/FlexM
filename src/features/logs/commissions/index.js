import React from "react";
import { connect } from "react-redux";

import { setCurrentPage } from "../../../actions/page";
import { setDisplayModal } from "../../../actions/modal";

import CommissionLogs from "./CommissionLogs";
import userGroup from "../../../assets/icons/users.svg";

import styles from "./index.module.scss";

export const Users = ({ changeCurrentPage, displayModal }) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={styles.card}>
          <h3 className={styles.sectionHeading}>Commission Logs</h3>
          <div className={styles.services}>
            <div
              className={styles.service}
              onClick={() => {
                displayModal({
                  overlay: true,
                  modal: "commissionTransfer",
                  service: "",
                });
              }}
            >
              <img className={styles.serviceLogo} src={userGroup} alt="" />
              <p className={styles.serviceText}>Commission Transfer</p>
            </div>
          </div>
        </div>
      </div>
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