import React from 'react';
import PropTypes from 'prop-types';
import OtpInput from 'react-otp-input';
import { ThreeDots } from 'svg-loaders-react';

import Submit from '../../../components/common/Button';

import generateServiceProviderImageUrl from './generateServiceProviderImageUrl';
import formatToCurrency from '../../../utils/formatToCurrency';
import back from '../../../assets/images/left-arrow.svg';
import info from '../../../assets/images/tooltip-icon.svg';

import styles from './ElectricityPaymentSummary.module.scss';

export const ElectricityPaymentSummary = (props) => {
    const {
        ElectricityPaymentFormState: state,
        handleOnSubmit,
        loading,
        dispatch,
        service,
        hasSetPin,
    } = props;
    const {
        disco,
        meterNo,
        accountName,
        paymentPlan,
        amount,
        phone,
        transaction_pin,
    } = state;

    let serviceImageUrl = generateServiceProviderImageUrl(props.service);

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
                    props.setComponentToRender('form');
                }}
            >
                <img className={styles.backIcon} src={back} alt='' />
                <span className={styles.backText}>Back</span>
            </div>
            <div className={styles.logoContainer}>
                <img className={styles.bankLogo} src={serviceImageUrl} alt='' />
            </div>
            <div className={styles.heading}>
                <div className={styles.headingIconContainer}>
                    <img className={styles.headingIcon} src={info} alt='' />
                </div>
                <div className={styles.headingText}>
                    Verify the information before proceeding.
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.contentItem}>
                    <span className={styles.contentHeading}>Disco:</span>
                    <span className={styles.contentDetails}>
                        {service.toUpperCase()}
                    </span>
                </div>
                <div className={styles.contentItem}>
                    <span className={styles.contentHeading}>Meter Number:</span>
                    <span className={styles.contentDetails}>{meterNo}</span>
                </div>
                <div className={styles.contentItem}>
                    <span className={styles.contentHeading}>Account Name:</span>
                    <span className={styles.contentDetails}>{accountName}</span>
                </div>
                <div className={styles.contentItem}>
                    <span className={styles.contentHeading}>Plan:</span>
                    <span className={styles.contentDetails}>{paymentPlan}</span>
                </div>
                <div className={styles.contentItem}>
                    <span className={styles.contentHeading}>Phone No:</span>
                    <span className={styles.contentDetails}>{phone}</span>
                </div>
                <div className={styles.contentItem}>
                    <span className={styles.contentHeading}>Amount:</span>
                    <span className={styles.contentDetails}>
                        &#8358;{formatToCurrency(amount)}
                    </span>
                </div>
                {/* <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Transaction cost:</span>
          <span className={styles.contentDetails}>
            {formatToCurrency(transactionCost)}
          </span>
        </div> */}
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
            </div>
            <Submit
                onClick={(e) => {
                    e.preventDefault();
                    handleOnSubmit();
                }}
                disabled={!hasSetPin}
            >
                {loading ? <ThreeDots /> : 'Continue'}
            </Submit>
        </div>
    );
};

ElectricityPaymentSummary.propTypes = {
    ElectricityPaymentFormState: PropTypes.object.isRequired,
    handleOnSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    transactionCost: PropTypes.number.isRequired,
};

export default ElectricityPaymentSummary;
