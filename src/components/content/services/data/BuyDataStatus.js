import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import check from "../../../../assets/images/check.svg";
import cross from "../../../../assets/images/redCross.svg";
import styles from './BuyDataStatus.module.scss';

export const BuyDataStatus = ({ successData, transactionStatus, setComponentToRender }) => {
  return (
    <div className={styles.container}>
      <div className={styles.sectionContainer} >
        <div className={styles.imageContainer}>
          <img src={transactionStatus ? check : cross} alt="transaction status icon" />
          <p>{transactionStatus ? "Transaction Successful" : "Transaction Failed"}</p>
        </div>
        <div className={styles.contentContainer}>
          {transactionStatus ?
          <div>
            <div>
              <span>Transaction Reference:</span>
              <span>{successData.tranxReference}</span>   
            </div>
            <div>
              <span>Network:</span>
              <span>{successData.network}</span>   
            </div>
            <div>
              <span>Recipient:</span>
              <span>{successData.recipient}</span>   
            </div>
            <div>
              <span>Date:</span>
              <span>{successData.tranxDate}</span>   
            </div>
            <div>
              <span>Amount:</span>
              <span>&#8358;{Number(successData.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
            </div>
            <div className={styles.link}>
              <Link to="/" className={styles.linkHome}>Home</Link>
              <a onClick={() => setComponentToRender("form")} className={styles.linkServiceHome}>New Payment</a>
            </div>
          </div> :
          <div className={styles.failed}>
            <p>We were unable to process your transaction, 
              please try again later!</p>  
            <div><Link to="/">&larr; Home</Link></div>
          </div> }
        </div>
      </div>    
    </div>
)};

export default BuyDataStatus;