import React from 'react';
import PropTypes from 'prop-types';
import OtpInput from 'react-otp-input';
import { ThreeDots } from 'svg-loaders-react';
import generateProviderImageUrl from '../generateProviderImageUrl';

import Submit from '../../../../components/common/Button';

import back from '../../../../assets/images/left-arrow.svg';
import info from '../../../../assets/images/tooltip-icon.svg';
import formatToCurrency from '../../../../utils/formatToCurrency';

import styles from './FundWalletSummary.module.scss';

export const FundWalletSummary = (props) => {
    const {
        FundWalletFormState,
        loading,
        dispatch,
        hasSetPin,
        handleOnSubmit,
        transactionCost,
        setComponentToRender,
        service,
    } = props;
    const { phone, accountId, amount, transaction_pin } = FundWalletFormState;

    const logo = generateProviderImageUrl(service);

    const handleChange = (transaction_pin) => {
        dispatch({
            type: 'UPDATE_FORM_STATE',
            payload: { transaction_pin },
        });
    };

    return (
        <div className={styles.container}>
            <div
                className={styles.back}
                onClick={() => {
                    setComponentToRender('form');
                }}
            >
                <img className={styles.backIcon} src={back} alt='' />
                <span className={styles.backText}>Back</span>
            </div>
            <div className={styles.logoContainer}>
                <img className={styles.logo} src={logo} alt='' />
            </div>
            <div className={styles.heading}>
                <div className={styles.headingIconContainer}>
                    <img className={styles.headingIcon} src={info} alt='' />
                </div>
                <div className={styles.headingText}>
                    Verify the information and enter your transaction pin to
                    proceed.
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.contentItem}>
                    <span className={styles.contentHeading}>Account ID:</span>
                    <span className={styles.contentDetails}>{accountId}</span>
                </div>
                <div className={styles.contentItem}>
                    <span className={styles.contentHeading}>Phone Number:</span>
                    <span className={styles.contentDetails}>{phone}</span>
                </div>
                <div className={styles.contentItem}>
                    <span className={styles.contentHeading}>Type:</span>
                    <span className={styles.contentDetails}>
                        Wallet funding
                    </span>
                </div>
                <div className={styles.contentItem}>
                    <span className={styles.contentHeading}>Amount:</span>
                    <span className={styles.contentDetails}>
                        &#8358;{formatToCurrency(amount)}
                    </span>
                </div>
                <div className={styles.contentItem}>
                    <span className={styles.contentHeading}>
                        Transaction cost:
                    </span>
                    <span className={styles.contentDetails}>
                        &#8358;{formatToCurrency(transactionCost)}
                    </span>
                </div>
            </div>
            <div className={`${styles.contentItem} ${styles.total}`}>
                <span
                    className={`${styles.contentHeading} ${styles.totalHeading}`}
                >
                    Total:
                </span>
                <span
                    className={`${styles.contentDetails} ${styles.totalDetails}`}
                >
                    &#8358;{formatToCurrency(amount)}
                </span>
            </div>
            <p className={styles.otpText}>
                Enter your transaction pin to proceed
            </p>
            <div className={styles.formContainer}>
                <div className={styles.inputGroup}>
                    <OtpInput
                        value={transaction_pin}
                        onChange={handleChange}
                        numInputs={4}
                        inputStyle={styles.input}
                        isInputSecure={true}
                        separator={
                            <span
                                style={{
                                    display: 'inline-block',
                                    width: '2rem',
                                }}
                            ></span>
                        }
                    />
                </div>
            </div>

            <Submit
                onClick={(e) => {
                    e.preventDefault();
                    handleOnSubmit();
                }}
                disabled={!hasSetPin}
            >
                {loading ? <ThreeDots fill='white' /> : 'Proceed'}
            </Submit>
        </div>
    );
};

FundWalletSummary.propTypes = {
    WalletFundingFormState: PropTypes.object,
    loading: PropTypes.bool,
    handleOnSubmit: PropTypes.func,
    transactionCost: PropTypes.number,
};

export default FundWalletSummary;
