import React, { useState } from 'react';
import { ThreeDots } from 'svg-loaders-react';

import validateFormData from '../../validation/validateFormData';

import styles from './AccountDetails.module.scss';

const AccountDetails = ({
    setStatus,
    agentData,
    dispatch,
    loading,
    createAgent,
    state = {},
}) => {
    const [validationErrors, setValidationErrors] = useState({ errors: true });

    const handleOnChange = ({ target }) => {
        setValidationErrors({ ...validationErrors, [target.name]: '' });

        dispatch({
            type: 'SET_AGENT_DATA',
            payload: { [target.name]: target.value },
        });
    };

    const handleProceed = (e) => {
        e.preventDefault();

        const {
            account_name,
            account_number,
            identity_type,
            bank_id,
            id_type_no,
        } = agentData;

        const state = {
            account_name,
            account_number,
            identity_type,
            id_type_no,
            bank_id,
        };

        const keys = Object.keys(state);
        const errors = validateFormData(agentData, keys);

        setValidationErrors(errors);

        if (Object.keys(errors).length > 0) return;

        createAgent(agentData);
    };
    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleProceed}>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor='account_name'>
                        Account Name
                    </label>
                    <input
                        className={styles.input}
                        type='text'
                        name='account_name'
                        onChange={handleOnChange}
                        value={agentData.account_name}
                    />
                    {validationErrors.account_name && (
                        <p className={styles.errorText}>
                            {validationErrors.account_name.text}
                        </p>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor='account_number'>
                        Account Number
                    </label>
                    <input
                        className={styles.input}
                        type='text'
                        name='account_number'
                        onChange={handleOnChange}
                        value={agentData.account_number}
                    />
                    {validationErrors.account_number && (
                        <p className={styles.errorText}>
                            {validationErrors.account_number.text}
                        </p>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor='identity_type'>
                        ID Type
                    </label>
                    <select
                        className={styles.select}
                        name='identity_type'
                        onChange={handleOnChange}
                        value={agentData.identity_type}
                    >
                        <option value=''>Select type</option>
                        {state.identity_types &&
                            state.identity_types.map((id, index) => (
                                <option value={id} key={index}>
                                    {id}
                                </option>
                            ))}
                    </select>
                    {validationErrors.identity_type && (
                        <p className={styles.errorText}>
                            {validationErrors.identity_type.text}
                        </p>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor='id_type_no'>
                        ID Type Number
                    </label>
                    <input
                        className={styles.input}
                        type='text'
                        name='id_type_no'
                        onChange={handleOnChange}
                        value={agentData.id_type_no}
                    />
                    {validationErrors.id_type_no && (
                        <p className={styles.errorText}>
                            {validationErrors.id_type_no.text}
                        </p>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor='bank_id'>
                        Bank Name
                    </label>
                    <select
                        className={styles.select}
                        name='bank_id'
                        onChange={handleOnChange}
                        value={agentData.bank_id}
                    >
                        <option value=''>Select Bank</option>
                        {state.banks &&
                            state.banks.map((bank, index) => {
                                return (
                                    <option
                                        value={bank.id}
                                        key={`${index}--${bank.name}`}
                                    >
                                        {bank.name}
                                    </option>
                                );
                            })}
                    </select>
                    {validationErrors.bank_id && (
                        <p className={styles.errorText}>
                            {validationErrors.bank_id.text}
                        </p>
                    )}
                </div>

                <div className={`${styles.submit} ${styles.formGroup}`}>
                    <button
                        onClick={() => setStatus('business')}
                        className={`${styles.button} ${styles.back}`}
                    >
                        Back
                    </button>
                    <button className={`${styles.button}`} type='submit'>
                        {loading ? <ThreeDots /> : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AccountDetails;
