import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ThreeDots } from 'svg-loaders-react';
import { useToasts } from 'react-toast-notifications';
import { UPDATE_AGENT_PROFILE } from '../../utils/constants';
import { setCurrentPage } from '../../actions/page';
import { startLogout } from '../../actions/auth';

import { setDisplayModal } from '../../actions/modal';
import pin from '../../assets/icons/pin.svg';
import lock from '../../assets/icons/lock.svg';
import category from '../../assets/icons/category.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';

import styles from './Profile.module.scss';

export const Profile = ({ agentData, changeCurrentPage, displayModal }) => {
    const [formState, setFormState] = useState(agentData);
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(false);
    const { addToast } = useToasts();

    useEffect(() => {
        changeCurrentPage({
            heading: 'Profile',
            search: true,
        });
    }, []);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        (async function fetchProfile() {
            const payload = {
                agent: formState,
            };

            try {
                const res = await axios.put(UPDATE_AGENT_PROFILE, payload);

                if (res) {
                    addToast('Profile updated successfully', {
                        appearance: 'success',
                        autoDismiss: true, 
                        autoDismissTimeout: 3000 
                    });
                }
            } catch (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    const { data, status } = error.response;
    
                    if (data && data.errors) {
                        // If the error response contains 'errors' field, display each error in a separate toast
                        Object.values(data.errors).flat().forEach(errorMessage => {
                            addToast(`${errorMessage}`, {
                                appearance: 'error',
                                autoDismiss: true,
                                autoDismissTimeout: 3000,
                            });
                        });
                    } else if (data && data.message) {
                        // If the error response does not contain 'errors' field, display the message in the toast
                        addToast(`${data.message}`, {
                            appearance: 'error',
                            autoDismiss: true,
                            autoDismissTimeout: 3000,
                        });
                    } else {
                        // If the error response does not contain 'errors' or 'message' field, display a generic error message
                        addToast(`An unexpected error occurred.`, {
                            appearance: 'error',
                            autoDismiss: true,
                            autoDismissTimeout: 3000,
                        });
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    addToast('No response from the server. Please try again.', {
                        appearance: 'error',
                        autoDismiss: true,
                        autoDismissTimeout: 3000,
                    });
                } else {
                    // Something happened in setting up the request that triggered an error
                    addToast('An unexpected error occurred. Please try again.', {
                        appearance: 'error',
                        autoDismiss: true,
                        autoDismissTimeout: 3000,
                    });
                }
            } finally {
                setLoading(false);
            }
        })();
    };

    const handleOnChange = ({ target }) => {
        setFormState({ ...formState, [target.name]: target.value });
    };

    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <div className={styles.card}>
                    <h3 className={styles.sectionHeading}>Profile</h3>
                    <div className={styles.services}>
                        <div
                            className={styles.service}
                            onClick={() => {
                                displayModal({
                                    overlay: true,
                                    modal: 'password',
                                    service: 'password',
                                });
                            }}
                        >
                            <img
                                className={styles.serviceLogo}
                                src={pin}
                                alt=''
                            />
                            <p className={styles.serviceText}>Password</p>
                        </div>
                        <div
                            className={styles.service}
                            onClick={() => {
                                displayModal({
                                    overlay: true,
                                    modal: 'pin',
                                    service: 'pin',
                                });
                            }}
                        >
                            <img
                                className={styles.serviceLogo}
                                src={lock}
                                alt=''
                            />
                            <p className={styles.serviceText}>
                                {!agentData.hasSetPin
                                    ? 'Set Pin'
                                    : 'Change Pin'}
                            </p>
                        </div>
                        <div
                            className={styles.service}
                            onClick={() => {
                                displayModal({
                                    overlay: true,
                                    modal: 'customerStatus',
                                    service: 'customerStatus',
                                });
                            }}
                        >
                            <img
                                className={styles.serviceLogo}
                                src={category}
                                alt=''
                            />
                            <p className={styles.serviceText}>Category</p>
                        </div>

                        <div className={styles.service}>
                            <Link
                                to='/documents'
                                className={styles.serviceLink}
                            >
                                <FontAwesomeIcon
                                    icon={faFileUpload}
                                    className={styles.docBtn}
                                />
                                <p className={styles.serviceText}>Documents</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <form className={styles.form} onSubmit={handleOnSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor='firstname'>
                        First Name
                    </label>
                    <input
                        type='text'
                        name='first_name'
                        onChange={handleOnChange}
                        className={styles.input}
                        value={formState.first_name}
                        disabled
                    />
                    {errors && !formState.first_name && (
                        <p className={styles.errorText}>
                            Please Enter First Name
                        </p>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor='last_name'>
                        Last Name
                    </label>
                    <input
                        type='text'
                        name='last_name'
                        onChange={handleOnChange}
                        value={formState.last_name}
                        disabled
                        className={styles.input}
                    />
                    {errors && !formState.last_name && (
                        <p className={styles.errorText}>
                            Please Enter Last Name
                        </p>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor='date_of_birth'>
                        Date of Birth
                    </label>
                    <input
                        type='date'
                        name='date_of_birth'
                        onChange={handleOnChange}
                        value={formState.date_of_birth}
                        disabled
                        className={styles.input}
                    />
                    {errors && !formState.date_of_birth && (
                        <p className={styles.errorText}>
                            Please Select Date of Birth
                        </p>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor='email'>
                        Email
                    </label>
                    <input
                        type='text'
                        name='email'
                        onChange={handleOnChange}
                        value={formState.email}
                        disabled
                        className={styles.input}
                    />
                    {errors && !formState.email && (
                        <p className={styles.errorText}>Please Enter Email</p>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor='gender'>
                        Gender
                    </label>
                    <select
                        type='text'
                        name='gender'
                        onChange={handleOnChange}
                        value={formState.gender}
                        className={styles.input}
                        disabled
                    >
                        <option value=''>Select Gender</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </select>
                    {errors && !formState.gender && (
                        <p className={styles.errorText}>Please Select Gender</p>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor='business_phone'>
                        Phone
                    </label>
                    <input
                        type='text'
                        name='business_phone'
                        onChange={handleOnChange}
                        value={formState.business_phone}
                        className={styles.input}
                        disabled
                    />
                    {errors && !formState.business_phone && (
                        <p className={styles.errorText}>
                            Please Enter Phone Number
                        </p>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor='business_address'>
                        Business Address
                    </label>
                    <input
                        type='text'
                        name='business_address'
                        onChange={handleOnChange}
                        value={formState.business_address}
                        className={styles.input}
                        disabled
                    />
                    {errors && !formState.business_address && (
                        <p className={styles.errorText}>
                            Please enter business address
                        </p>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor='bvn'>
                        BVN
                    </label>
                    <input
                        type='text'
                        name='bvn'
                        onChange={handleOnChange}
                        value={formState.bvn}
                        className={styles.input}
                        disabled
                    />
                    {errors && !formState.bvn && (
                        <p className={styles.errorText}>Please Enter BVN</p>
                    )}
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        agentData: {
            first_name: state.auth.user.firstName,
            last_name: state.auth.user.lastName,
            business_name: state.auth.user.businessName,
            email: state.auth.user.email,
            business_phone: state.auth.user.business_phone,
            bvn: state.auth.user.bvn,
            business_address: state.auth.user.business_address,
            date_of_birth: state.auth.user.date_of_birth,
            gender: state.auth.user.gender,
            account_name: state.auth.user.account_name,
            account_number: state.auth.user.account_number,
            bank_id: state.auth.user.bank_id,
            state_id: state.auth.user.state_id,
            local_government_id: state.auth.user.local_government_id,
            business_type: state.auth.user.business_type,
            agent_code: state.auth.user.agent_code,
            hasSetPin: state.auth.user.hasSetPin,
        },
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
        startLogout: () => dispatch(startLogout()),
        displayModal: (payload) => dispatch(setDisplayModal(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
