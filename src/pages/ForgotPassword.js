import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { RESET_PASSWORD, FORGOT_PASSWORD } from '../utils/constants';
import { useCustomToast } from '../components/toast/useCustomToast';
import appLogo from '../assets/images/flexbycico.svg';

import styles from './ForgotPassword.module.scss';
import { NavLink } from 'react-router-dom';

export const ForgotPassword = ({ history }) => {
    const [status, setStatus] = useState('token');
    const [verificationCode, setVerificationCode] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [hasError, setHasError] = useState(false);
    const [loading, setLoading] = useState(false);
    const showToast  = useCustomToast();

    useEffect(() => {
        if (password.length && confirmPassword !== password) {
            setHasError(true);
        } else {
            setHasError(false);
        }
    }, [confirmPassword]);

    const handleInputChange = ({ target }) => {
        if (target.name === 'phone') {
            setPhone(target.value);
        } else if (target.name === 'code') {
            setVerificationCode(target.value);
        } else if (target.name === 'new') {
            setPassword(target.value);
        } else if (target.name === 'confirm') {
            setConfirmPassword(target.value);
        }
    };

    const handleInitiateResetPassword = (e) => {
        e.preventDefault();
        setLoading(true);

        const req = {
            account: phone,
        };

        (async function resetPassword() {
            try {
                const res = await axios.post(FORGOT_PASSWORD, req);

                if (res.status === 200) {
                    showToast(res.data.message, 'success');
                    setLoading(false);
                    setStatus('verification');
                }
            } catch (e) {
                if (!e.response) {
                    showToast("Please Check Internet Connection", 'error');
                  }else{
                const { message } = e.response.data;
                showToast(message, 'error');
                  }

                setLoading(false);
            }
        })();
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        setLoading(true);

        if (password && !hasError) {
            const req = {
                phone,
                code: verificationCode,
                password,
            };

            (async function resetPassword() {
                try {
                    const res = await axios.post(RESET_PASSWORD, req);

                    if (res.status === 200) {
                        showToast(res.data.message, 'success');
                        setLoading(false);
                    }
                } catch (e) {
                    const { message } = e.response.data;
                    showToast(message, 'error');

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
                    <p className={styles.formHeading}>Forgot Password</p>
                    <div className={styles.formGroup}>
                        <label
                            className={phone ? styles.notEmpty : styles.empty}
                            htmlFor='phone'
                        >
                            Phone number
                        </label>
                        <input
                            name='phone'
                            type='text'
                            value={phone}
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
                    <p className={styles.formHeading}>Reset Password</p>
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
                                password ? styles.notEmpty : styles.empty
                            }
                            htmlFor='new'
                        >
                            New password
                        </label>
                        <input
                            name='new'
                            type='password'
                            value={password}
                            onChange={handleInputChange}
                            placeholder='New password'
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label
                            className={
                                confirmPassword ? styles.notEmpty : styles.empty
                            }
                            htmlFor='confirm'
                        >
                            Confirm password
                        </label>
                        <input
                            name='confirm'
                            type='password'
                            value={confirmPassword}
                            onChange={handleInputChange}
                            placeholder='Confirm password'
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
                </form>
            )}
        </div>
    );
};

export default ForgotPassword;
