import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import cico from '../../assets/images/cico-logo-login.svg';
import styles from './TransactionDetails.module.scss';
import { setCurrentPage } from '../../actions/page';
// import { ThreeDots } from "svg-loaders-react";

// import {
//   AGENT_TRANSACTION_HISTORY,
//   REQUERY_TRANSACTION_STATUS,
// } from "../../utils/constants";

import email from '../../assets/images/email.svg';
import whatsapp from '../../assets/images/whatsapp.svg';

export const TransactionDetails = ({ changeCurrentPage, match }) => {
    const [transaction, setTransaction] = useState({});
    const [transtype, setTranstype] = useState({});
    // const [requeryLoading, setRequeryLoading] = useState(false);
    // const [transactions, setTransactions] = useState([]);

    function PrintDiv(id) {
        var content = document.getElementById(id);
        var pri = document.getElementById('ifmcontentstoprint').contentWindow;
        pri.document.open();
        pri.document.write(content.innerHTML);
        pri.document.close();
        pri.focus();
        pri.print();
    }

    useEffect(() => {
        const transactions = JSON.parse(sessionStorage.getItem('transactions'));
        const transactionItem = transactions.find((transaction) => {
            return transaction.reference === match.params.id;
        });

        setTransaction(transactionItem);
        setTranstype(transactionItem.transtype);
    }, []);

    useEffect(() => {
        changeCurrentPage({
            heading: 'Transaction Details',
            search: false,
        });
    });

    // const getTransactionsLog = async () => {
    //   try {
    //     const res = await axios.get(AGENT_TRANSACTION_HISTORY);

    //     const transactions = res.data.data.data;

    //     sessionStorage.setItem("transactions", JSON.stringify(transactions));
    //     setTransactions(transactions);
    //   } catch (e) {
    //     // console.log(e)
    //   }
    // };

    // const handleRequeryTransactionStatus = async (id) => {
    //   setRequeryLoading(true);

    //   const payload = {
    //     transaction_id: id,
    //   };

    //   try {
    //     const res = await axios.post(REQUERY_TRANSACTION_STATUS, payload);

    //     if (res) getTransactionsLog();
    //   } catch (e) {
    //     // console.log(e)
    //   } finally {
    //     setRequeryLoading(false);
    //   }
    // };

    return (
        <>
            <iframe
                id='ifmcontentstoprint'
                style={{
                    height: '0px',
                    width: '0px ',
                    position: 'absolute',
                    border: 'none',
                }}
                title='toPrint'
            ></iframe>
            <div className={styles.section} id='myDiv'>
                <div className={styles.imageContainer}>
                    <img
                        className={styles.headingImage}
                        src={cico}
                        alt='cico logo'
                    />
                    <p className={styles.headingText}>Transaction Details</p>
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.successContent}>
                        <div className={styles.transactionDetails}>
                            <div className={styles.details}>
                                <span>Status:</span>
                                <span>{transaction.status}</span>
                            </div>
                            <div className={styles.details}>
                                <span>Reference:</span>
                                <span>{transaction.reference}</span>
                            </div>
                            <div className={styles.details}>
                                <span>Type:</span>
                                <span>
                                    {transtype
                                        ? transtype.name
                                        : transaction.type === '12'
                                        ? 'Commission'
                                        : transaction.type === '0'
                                        ? 'Reversal'
                                        : transaction.type === '10'
                                        ? 'Bet'
                                        : transaction.type === '11'
                                        ? 'Cashcall'
                                        : 'Nil'}
                                </span>
                            </div>
                            <div className={styles.details}>
                                <span>Customer:</span>
                                <span className={styles.customerInfo}>
                                    {transaction.customer_info}
                                </span>
                            </div>
                            {transaction.type == '7' ? (
                                <div className={styles.details}>
                                    <span>Session ID:</span>
                                    <span>
                                        {transaction.retrieval_reference}
                                    </span>
                                </div>
                            ) : transaction.type == '1' ? (
                                <div className={styles.details}>
                                    <span>Token:</span>
                                    <span>{transaction.energy_token}</span>
                                </div>
                            ) : undefined}
                            <div className={styles.details}>
                                <span>Date:</span>
                                <span>{transaction.created_at}</span>
                            </div>
                        </div>
                        <div className={styles.transactionAmount}>
                            <div className={styles.details}>
                                <span>Amount:</span>
                                <span>
                                    &#8358;
                                    {Number(transaction.amount)
                                        .toFixed(2)
                                        .replace(
                                            /(\d)(?=(\d{3})+(?!\d))/g,
                                            '$1,'
                                        )}
                                </span>
                            </div>
                            <div className={styles.details}>
                                <span>Total:</span>
                                <span>
                                    &#8358;
                                    {Number(transaction.amount)
                                        .toFixed(2)
                                        .replace(
                                            /(\d)(?=(\d{3})+(?!\d))/g,
                                            '$1,'
                                        )}
                                </span>
                            </div>
                        </div>
                        {/* {transaction.status === "pending" && (
            <div
              className={styles.requery}
              onClick={() => {
                handleRequeryTransactionStatus(transaction.reference);
              }}
            >
              <span className={styles.requeryText}>
                Requery transaction status
              </span>
              {requeryLoading && <ThreeDots fill="#3E215B" />}
            </div>
          )} */}
                        <div className={styles.details}>
                            <Link to='/' className={styles.linkHome}>
                                Go Home
                            </Link>
                            <span
                                onClick={() => PrintDiv('myDiv')}
                                className={styles.print}
                            >
                                Print
                            </span>
                        </div>
                        <div className={styles.message}>
                            <a
                                className={styles.messageText}
                                href={`mailto:hello@cico.ng?subject=Transaction%20Details&body=ref:${transaction.reference}%20amount=${transaction.amount}%20date=${transaction.created_at}`}
                            >
                                <img
                                    className={styles.messageIcon}
                                    src={email}
                                    alt=''
                                />
                                <span>Email support </span>
                            </a>
                            <a
                                className={styles.messageText}
                                href={`https://wa.me/+2349080070040/?text=ref:${transaction.reference} amount=${transaction.amount} date=${transaction.created_at}`}
                            >
                                <img
                                    className={styles.messageIcon}
                                    src={whatsapp}
                                    alt=''
                                />
                                <span>Text support</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// const mapStateToProps = (state) => {
//   return {
//     uuid: state.auth.user.agent.uuid,
//   };
// };

const mapDispatchToProps = (dispatch) => {
    return {
        changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
    };
};

export default connect(undefined, mapDispatchToProps)(TransactionDetails);
