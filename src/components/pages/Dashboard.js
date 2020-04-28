import React, { useEffect } from "react";
import { connect } from "react-redux";
import Card from "../shared/Card";
import style from "./Dashboard.module.scss";
import cabletv from "../../assets/images/cabletv.svg";
import power from "../../assets/images/electricity.svg";
import transfer from "../../assets/images/transfer-outlined.svg";
import data from "../../assets/images/internet-phone.svg";
import insurance from "../../assets/images/insurance-outlined.svg";
import airtime from "../../assets/images/phone-svgrepo-com.svg";
import books from "../../assets/images/books-outline.svg";
import wallet from "../../assets/images/wallet-outline.svg";
import { setCurrentPage } from "../../actions/page";

export const Dashboard = ({ changeCurrentPage }) => {
  useEffect(() => {
    changeCurrentPage({
      heading: "Dashboard",
      search: true
    });    
  }, [changeCurrentPage]);
  
  return (
  <div className={style.container}>
    <div className={style.cardContainer}>
      <Card link="transfer" text="Transfer Funds" image={transfer} />
      <Card link="recharge-cable" text="Recharge Cable TV" image={cabletv} />
      <Card link="buy-data" text="Buy Data" image={data} />
      <Card link="buy-airtime" text="Buy Airtime" image={airtime} />
      <Card link="pay-electricity" text="Pay Electricity" image={power} />
      <Card link="buy-insurance" text="Buy Insurance" image={insurance}  />
      <Card link="education" text="Education" image={books} />
      <Card link="wallet-transfer" text="Wallet Transfer" image={wallet} />
    </div>
  </div>
)};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
};

export default connect(undefined, mapDispatchToProps)(Dashboard);