import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RESET_TRANSACTION_PIN, FORGOT_TRANSACTION_PIN, REGENERATE_TRANSACTION_PIN } from '../utils/constants';
import { useToasts } from 'react-toast-notifications';
import appLogo from '../assets/images/cico-logo.svg';
import styles from './ForgotTransactionPin.module.scss';
import { NavLink } from 'react-router-dom';

export const ForgotTransactionPin = ({ history }) => {
    const [status, setStatus] = useState('token');
    const [verificationCode, setVerificationCode] = useState('');
    const [pin_confirmation, setConfirmPin] = useState('');
    const [pin, setPin] = useState('');
    const [phone_number, setPhone] = useState('');
    const [hasError, setHasError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { addToast } = useToasts();

    useEffect(() => {
        if (pin.length && pin_confirmation !== pin) {
            setHasError(true);
        } else {
            setHasError(false);
        }
    }, [pin_confirmation]);

    const handleInputChange = ({ target }) => {
        if (target.name === 'phone') {
            setPhone(target.value);
        } else if (target.name === 'code') {
            setVerificationCode(target.value);
        } else if (target.name === 'new') {
            setPin(target.value);
        } else if (target.name === 'confirm') {
            setConfirmPin(target.value);
        }
    };

    const handleInitiateResetPassword = (e) => {
        e.preventDefault();
        setLoading(true);

        const req = {
            phone_number
        };

        (async function resetPassword() {
            try {
                const res = await axios.post(FORGOT_TRANSACTION_PIN, req);

                if (res.status === 200) {
                    addToast(res.data.message, {
                        appearance: 'success',
                        autoDismiss: true,
                    });
                    setLoading(false);
                    setStatus('verification');
                }
            } catch (e) {
                const { message } = e.response.data.errors;
                addToast(message, {
                    appearance: 'error',
                    autoDismiss: true,
                });
            

                setLoading(false);
            }
        })();
    };
    const handleRegenerateOtp = (e) => {
        e.preventDefault();
        setLoading(true);

            const req = {
                phone_number:phone_number
            };

            (async function resetPassword() {
                try {
                    const res = await axios.post(REGENERATE_TRANSACTION_PIN, req);
                   
                    if (res.status === 200) {
                        addToast(res.data.message, {
                            appearance: 'success',
                            autoDismiss: true,
                        });
                        setLoading(false);
                        setStatus('verification');
                    }
                   
                    // if (res) history.push('/');
                } catch (e) {
                    const { message } = e.res.data.errors;
                    addToast(message, {
                        appearance: 'error',
                        autoDismiss: true,
                    });

                    setLoading(false);
                }
            })();
      
    };
    const handleResetPassword = (e) => {
        e.preventDefault();
        setLoading(true);

        if (pin && !hasError) {
            const req = {
                phone_number,
                code: verificationCode,
                pin,
                pin_confirmation,
            };

            (async function resetPassword() {
                try {
                    const res = await axios.post(RESET_TRANSACTION_PIN, req);

                    if (res.status === 200) {
                        addToast(res.data.message, {
                            appearance: 'success',
                            autoDismiss: true,
                        });
                        setLoading(false);
                    }

                    // if (res) history.push('/');
                } catch (e) {
                    const { message } = e.res.data.message;
                    addToast(message, {
                        appearance: 'error',
                        autoDismiss: true,
                    });

                    setLoading(false);
                }
            })();
        }
    };
    

    return (
        <div className={styles.container}>
            {status === 'token' && (
                <form
                    className={styles.form}
                    autoComplete='off'
                    onSubmit={handleInitiateResetPassword}
                >
                    <NavLink className={styles.formLogo} to={'/'}>
                        <img src={appLogo} alt='logo' />
                    </NavLink>
                    <p className={styles.formHeading}>Forgot Transaction Pin</p>
                    <div className={styles.formGroup}>
                        <label
                            className={phone_number ? styles.notEmpty : styles.empty}
                            htmlFor='phone'
                        >
                            Phone number
                        </label>
                        <input
                            name='phone'
                            type='number'
                            value={phone_number}
                            onChange={handleInputChange}
                            placeholder='Please enter phone number'
                        />
                    </div>
                    <button className={styles.resetButton} type='submit'>
                        <span>{loading ? 'Please wait...' : 'Submit'}</span>
                    </button>
                </form>
            )}
            {status === 'verification' && (
                <form
                    className={styles.form}
                    autoComplete='off'
                    onSubmit={handleResetPassword}
                >
                    <NavLink className={styles.formLogo} to={'/'}>
                        <img src={appLogo} alt='logo' />
                    </NavLink>
                    <p className={styles.formHeading}>Reset Transaction Pin</p>
                    <div className={styles.formGroup}>
                        <label
                            className={
                                verificationCode
                                    ? styles.notEmpty
                                    : styles.empty
                            }
                            htmlFor='code'
                        >
                            Verification Code
                        </label>
                        <input
                            name='code'
                            type='text'
                            value={verificationCode}
                            onChange={handleInputChange}
                            placeholder='Verification code'
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label
                            className={
                                phone_number
                                    ? styles.notEmpty
                                    : styles.empty
                            }
                            htmlFor='phone'
                        >
                            Required Phone Number
                        </label>
                        <input
                            name='phone'
                            type='text'
                            value={phone_number}
                            onChange={handleInputChange}
                            placeholder='Phone Number'
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label
                            className={
                                pin ? styles.notEmpty : styles.empty
                            }
                            htmlFor='new'
                        >
                            New Pin
                        </label>
                        <input
                            name='new'
                            type='text'
                            value={pin}
                            onChange={handleInputChange}
                            placeholder='New pin'
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label
                            className={
                                pin_confirmation ? styles.notEmpty : styles.empty
                            }
                            htmlFor='confirm'
                        >
                            Confirm Pin
                        </label>
                        <input
                            name='confirm'
                            type='text'
                            value={pin_confirmation}
                            onChange={handleInputChange}
                            placeholder='Confirm pin'
                        />
                        {hasError && (
                            <span className={styles.errorText}>
                                Passwords do not match
                            </span>
                        )}
                    </div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.resetButton} type='submit'>
                            <span>{loading ? 'Please wait...' : 'Reset'}</span>
                        </button>
                        <button
                            className={styles.backButton}
                            type='submit'
                            onClick={() => setStatus('token')}
                        >
                            <span>Back</span>
                        </button>
                    </div>
                    <div className={styles.link}>
                 <span>Didn't recieve token?
                      <a href="#"
                      onClick={handleRegenerateOtp} 
                      className={styles.Resend}> Resend Token</a>
                      </span>
             </div>
                </form>
            )}
           
        </div>
    );
};

export default ForgotTransactionPin;
