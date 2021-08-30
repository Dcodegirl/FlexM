import React, { useState, useEffect } from 'react';
import OtpInput from 'react-otp-input';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ThreeDots } from 'svg-loaders-react';
import { connect } from 'react-redux';

import {
    SET_PIN,
    CHANGE_PIN,
    VERIFY_CURRENTT_PIN,
} from '../../utils/constants';
import { setDisplayModal } from '../../actions/modal';

import styles from './TransactionPin.module.scss';
import { useToasts } from 'react-toast-notifications';

const CurrentPin = ({ formState, setStatus, handleChange }) => {
    const { addToast } = useToasts();

    const onSubmitHandler = () => {
        const { current_pin } = formState;
        (async function verifycurrentPin() {
            try {
                const res = await axios.post(VERIFY_CURRENTT_PIN, {
                    current_pin,
                });
                const status = res?.data.status;

                if (
                    status === 'Successful' &&
                    formState.current_pin.length === 4
                )
                    setStatus('pin');
            } catch (err) {
                addToast(err.response && err.response.data.message, {
                    appearance: 'error',
                    autoDismiss: true,
                });
            }
        })();
    };
    return (
        <form
            className={styles.form}
            onSubmit={(e) => {
                e.preventDefault();
                onSubmitHandler();
            }}
            autoComplete='off'
        >
            <div className={styles.formBanner}></div>
            <h3 className={styles.formHeading}>Transaction Pin</h3>
            <p className={styles.formText}>
                Enter your current transaction pin to proceed
            </p>
            <div className={styles.formContainer}>
                <div className={styles.inputGroup}>
                    <OtpInput
                        value={formState.current_pin}
                        onChange={handleChange}
                        numInputs={4}
                        inputStyle={styles.input}
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
            <button type='submit' className={styles.button}>
                Continue
            </button>
        </form>
    );
};

const Pin = ({ formState, setStatus, handleChange }) => {
    return (
        <form
            className={styles.form}
            onSubmit={(e) => {
                e.preventDefault();

                if (formState.otp.length === 4) {
                    setStatus('confirm');
                }
            }}
            autoComplete='off'
        >
            <div className={styles.formBanner}></div>
            <h3 className={styles.formHeading}>Transaction Pin</h3>
            <p className={styles.formText}>
                Enter your new transaction pin to proceed
            </p>
            <div className={styles.formContainer}>
                <div className={styles.inputGroup}>
                    <OtpInput
                        value={formState.otp}
                        onChange={handleChange}
                        numInputs={4}
                        inputStyle={styles.input}
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
            <button type='submit' className={styles.button}>
                Continue
            </button>
        </form>
    );
};

const PinConfirmation = ({ formState, handleChange, loading, setPin }) => {
    return (
        <form
            className={styles.form}
            onSubmit={(e) => {
                e.preventDefault();

                if (formState.otp_confirmation.length === 4) {
                    setPin();
                }
            }}
            autoComplete='off'
        >
            <div className={styles.formBanner}></div>
            <h3 className={styles.formHeading}>Transaction Pin</h3>
            <p className={styles.formText}>
                Confirm your transaction pin to proceed
            </p>
            <div className={styles.formContainer}>
                <div className={styles.inputGroup}>
                    <OtpInput
                        value={formState.otp_confirmation}
                        onChange={handleChange}
                        numInputs={4}
                        inputStyle={styles.input}
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
            <button type='submit' className={styles.button}>
                {loading ? <ThreeDots /> : 'Proceed'}
            </button>
        </form>
    );
};

export const TransactionPin = ({ displayModal, agentData }) => {
    const [status, setStatus] = useState('pin');
    const [formState, setFormState] = useState({
        otp: '',
        otp_confirmation: '',
        current_pin: '',
    });
    const [loading, setLoading] = useState(false);
    const { addToast } = useToasts();

    useEffect(() => {
        if (agentData.hasSetPin) setStatus('current');
    }, []);

    const handleChange = (otp) => setFormState({ ...formState, otp });

    const handleConfirmationChange = (otp_confirmation) =>
        setFormState({ ...formState, otp_confirmation });

    const handleCurrentChange = (current_pin) =>
        setFormState({ ...formState, current_pin });

    const setPin = () => {
        (async function setPin() {
            setLoading(true);

            const payload = {
                pin: formState.otp,
                pin_confirmation: formState.otp_confirmation,
                current_pin: formState.current_pin,
            };
            try {
                const res = await axios.post(
                    agentData.hasSetPin ? CHANGE_PIN : SET_PIN,
                    payload
                );

                if (res) {
                    addToast('Pin set successfully', {
                        appearance: 'success',
                        autoDismiss: false,
                    });

                    displayModal({
                        overlay: false,
                        modal: false,
                    });
                }
            } catch (e) {
                addToast('Pin set unsuccessfully', {
                    appearance: 'error',
                    autoDismiss: false,
                });
            } finally {
                setLoading(false);
            }
        })();
    };

    return (
        <>
            {agentData.hasSetPin
                ? {
                      current: (
                          <CurrentPin
                              formState={formState}
                              setStatus={setStatus}
                              handleChange={handleCurrentChange}
                          />
                      ),
                      pin: (
                          <Pin
                              formState={formState}
                              setStatus={setStatus}
                              handleChange={handleChange}
                          />
                      ),
                      confirm: (
                          <PinConfirmation
                              formState={formState}
                              setStatus={setStatus}
                              handleChange={handleConfirmationChange}
                              setPin={setPin}
                              loading={loading}
                          />
                      ),
                  }[status]
                : {
                      pin: (
                          <Pin
                              formState={formState}
                              setStatus={setStatus}
                              handleChange={handleChange}
                          />
                      ),
                      confirm: (
                          <PinConfirmation
                              formState={formState}
                              setStatus={setStatus}
                              handleChange={handleConfirmationChange}
                              setPin={setPin}
                              loading={loading}
                          />
                      ),
                  }[status]}
        </>
    );
};

TransactionPin.propTypes = {
    TransactionPinState: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    setComponentToRender: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        agentData: {
            hasSetPin: state.auth.user.hasSetPin,
        },
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        displayModal: (payload) => dispatch(setDisplayModal(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPin);
