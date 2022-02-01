import React, { useState, useEffect } from 'react';
import cico from '../assets/images/cico-logo-login.svg';
import styles from '../components/common/TransactionDetails.module.scss';

const CashoutDetails = () => {
    return (
        <>
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
                                <span>TERMINAL ID:</span>
                                <span>2ISW8232</span>
                            </div>
                            <div className={styles.details}>
                                <span>TEL:</span>
                                <span>9839746388</span>
                            </div>
                            <div className={styles.details}>
                                <span>CHANNEL:</span>
                                <span>CARD PAYMENT</span>
                            </div>
                            <div className={styles.details}>
                                <span>DATE:</span>
                                <span className={styles.customerInfo}>
                                2021-12-03
                                </span>
                            </div>

                            <div className={styles.details}>
                                <span>TIME:</span>
                                <span>19:47:59.337</span>
                            </div>
                        </div>
                        <div className={styles.transactionAmount}>
                            <div className={styles.details}>
                                <span>AMOUNT:</span>
                                <span>&#8358; 400,000.00</span>
                            </div>
                        </div>
                        <div className={styles.details}>
                            <span>CARD TYPE:</span>
                            <span>VERVE</span>
                        </div>
                        <div className={styles.details}>
                            <span>CARD PAN:</span>
                            <span>506119*********8300</span>
                        </div>
                        <div className={styles.details}>
                            <span>EXPIRY DATE:</span>
                            <span></span>
                        </div>
                        <div className={styles.details}>
                            <span>STAN</span>
                            <span>000147</span>
                        </div>

                        <div className={styles.details}>
                            <span>NAME</span>
                            <span>PAY CICO</span>
                        </div>
                        <div className={styles.details}>
                            <span>REF</span>
                            <span>
                            WEMA|POS|2ISW8232|CICO|031221194759|UMBVYGDR
                            </span>
                        </div>
                        <div className={styles.details}>
                            <span>RRN</span>
                            <span>004576071836</span>
                        </div>
                        <div className={styles.details}>
                            <span>AID</span>
                            <span>UN1000</span>
                        </div>
                        <div className={styles.details}>
                            <span>STATUS</span>
                            <span>SUCCESSFUL</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CashoutDetails;
