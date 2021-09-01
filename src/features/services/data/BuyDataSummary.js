import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OtpInput from 'react-otp-input';
import { ThreeDots } from 'svg-loaders-react';

import Submit from '../../../components/common/Button';

import back from '../../../assets/images/left-arrow.svg';
import info from '../../../assets/images/tooltip-icon.svg';
import formatToCurrency from '../../../utils/formatToCurrency';
import generateNetworkImageUrl from './generateNetworkImageUrl';

import styles from './BuyDataSummary.module.scss';

export const BuyDataSummary = (props) => {
    const {
        DataPurchaseFormState,
        loading,
        dispatch,
        hasSetPin,
        handleOnSubmit,
        transactionCost,
        setComponentToRender,
        service,
    } = props;
    const { phone, amount, transaction_pin } = DataPurchaseFormState;

    const networkImageUrl = generateNetworkImageUrl(service);

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
                <img className={styles.logo} src={networkImageUrl} alt='' />
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
                    <span className={styles.contentHeading}>Phone Number:</span>
                    <span className={styles.contentDetails}>{phone}</span>
                </div>
                <div className={styles.contentItem}>
                    <span className={styles.contentHeading}>Transaction:</span>
                    <span className={styles.contentDetails}>
                        Airtime Purchase
                    </span>
                </div>
                <div className={styles.contentItem}>
                    <span className={styles.contentHeading}>Network:</span>
                    <span className={styles.contentDetails}>{service}</span>
                </div>
                <div className={styles.contentItem}>
                    <span className={styles.contentHeading}>Amount:</span>
                    <span className={styles.contentDetails}>
                        &#8358;{formatToCurrency(amount)}
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

BuyDataSummary.propTypes = {
    DataPurchaseFormState: PropTypes.object.isRequired,
    selectedNetworkName: PropTypes.string.isRequired,
    handleOnSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    transactionCost: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
    return {
        service: state.modal.service,
    };
};

export default connect(mapStateToProps)(BuyDataSummary);
