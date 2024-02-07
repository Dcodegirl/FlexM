import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import { ThreeDots } from 'svg-loaders-react';
import { connect } from 'react-redux';
import _ from 'lodash';

import styles from './index.module.scss';
import Uploader from './Upload';
import { SUBMIT_DOCUMENT, UPLOADED_DOCUMENT } from '../../../utils/constants';
import moment from 'moment';
import LoadingOverlay from 'react-loading-overlay';
import UploadReducer, { initialState } from './upload-reducer.js';
import { setDisplayModal } from '../../../actions/modal';

const Document = ({ agent_code, displayModal }) => {
    const [utility, setUtility] = React.useState({});
    const [passport, setPassport] = React.useState({});
    const [id, setID] = React.useState({});
    const [guarantor, setGuarantor] = React.useState({});
    const [uploaded, setUploaded] = React.useState([]);
    const [showReason, setShowReason] = useState({
        reason: false,
        reasonData: [],
    });
    const [isOverlayActive, setOverlayActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadState, dispatch] = useReducer(UploadReducer, initialState);
    const { addToast } = useToasts();

    const handleShowReason = (data) => {
        if (data.status === 'rejected')
            return setShowReason({
                reason: !showReason.reason,
                data,
            });
    };

    useEffect(() => {
        setOverlayActive(true);
        (async function getUploadedDocument() {
            try {
                const res = await axios.get(UPLOADED_DOCUMENT, {
                    params: { agent_code },
                });
                setUploaded(res.data.data);
                res.data.data.forEach((data) => {
                    if (data.status === 'approved') {
                        return dispatch({
                            type: 'UPDATE_DETAILS',
                            payload: {
                                [data.type.split(' ').join('')]: true,
                            },
                        });
                    }
                });
                setOverlayActive(false);
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
                setOverlayActive(false);
            }
        })();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        (async function disburseFunds() {
            let arr = [];

            if (!_.isEmpty(utility)) {
                arr.push(utility);
            } else if (!_.isEmpty(passport)) {
                arr.push(passport);
            } else if (!_.isEmpty(id)) {
                arr.push(id);
            } else if (!_.isEmpty(guarantor)) {
                arr.push(guarantor);
            }

            const payload = {
                agent_code,
                documents: arr,
            };

            if (payload.documents.length < 1) {
                addToast('The documents field is required.', {
                    appearance: 'error',
                    autoDismiss: true,
                    autoDismissTimeout: 3000
                });
                setLoading(false);
                return;
            }

            try {
                const res = await axios.post(SUBMIT_DOCUMENT, payload);

                setLoading(false);
                addToast(res.data.message, {
                    appearance: 'success',
                    autoDismiss: true,
                });
                window.location.reload();
            } catch (err) {
                if (err.response && err.response.status === 403) {
                    setLoading(false);
                    addToast(err.response.statusText, {
                        appearance: 'error',
                        autoDismiss: true, 
                    autoDismissTimeout: 3000
                    });
                } else if (err.response && err.response.status === 401) {
                    setLoading(false);
                    addToast(err.response.statusText, {
                        appearance: 'error',
                        autoDismiss: true, 
                    autoDismissTimeout: 3000
                    });
                } else if (err.response && err.response.status === 500) {
                    setLoading(false);
                    addToast(err.response.statusText, {
                        appearance: 'error',
                        autoDismiss: true, 
                    autoDismissTimeout: 3000
                    });
                } else if (err.response && err.response.status === 412) {
                    setLoading(false);
                    addToast(err.response.data.error[0], {
                        appearance: 'error',
                        autoDismiss: true, 
                    autoDismissTimeout: 3000
                    });
                } else {
                    setTimeout(() => {
                        setLoading(false);
                    }, 7000);
                }
            }
        })();
    };

    return (
        <LoadingOverlay
            active={isOverlayActive}
            spinner
            text={'fetching uploaded document'}
        >
            <div className={styles.container}>
                <div className={styles.documents}>
                    <h3 className={styles.documentsHeading}>
                        Documents Management
                    </h3>
                    <div className={styles.documentsUploaded}>
                        <h5 className={styles.documentsUploadedHeadings}>
                            Uploaded Documents
                        </h5>
                        {uploaded === {} ? (
                            <p className={styles.documentsUploadedText}>
                                No documents has been uploaded yet, Kindly
                                proceed below to upload your documents
                            </p>
                        ) : (
                            <div className={styles.uploadedDocument}>
                                {uploaded &&
                                    uploaded.map((data, index) => (
                                        <div
                                            className={styles.image}
                                            key={index}
                                        >
                                            <img
                                                src={data.path}
                                                alt=''
                                                onClick={() =>
                                                    displayModal({
                                                        overlay: true,
                                                        modal: 'showUpload',
                                                        service: data.path,
                                                    })
                                                }
                                            />
                                            <span
                                                onClick={() =>
                                                    handleShowReason(data)
                                                }
                                                className={`${
                                                    data.status === 'rejected'
                                                        ? styles.red
                                                        : data.status ===
                                                          'approved'
                                                        ? styles.green
                                                        : styles.grey
                                                }`}
                                            >
                                                {data.status}
                                                {data.status === 'rejected' &&
                                                    `(${data?.docs_reasons?.length})`}
                                            </span>

                                            {showReason.reason && (
                                                <ul className={styles.reason}>
                                                    {showReason.data.id ===
                                                        data.id &&
                                                        showReason.data?.docs_reasons.map(
                                                            (res, index) => (
                                                                <li key={index}>
                                                                    <span
                                                                        style={{
                                                                            marginRight:
                                                                                '10px',
                                                                        }}
                                                                    >
                                                                        {moment(
                                                                            res.updated_at
                                                                        ).fromNow()}{' '}
                                                                        {'--'}
                                                                    </span>
                                                                    {res.reason}
                                                                </li>
                                                            )
                                                        )}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>

                    <div className={styles.documentsUpload}>
                        <h5 className={styles.documentsUploadHeadings}>
                            Upload Document
                        </h5>

                        <form className={styles.form}>
                            <div
                                className={`${
                                    uploadState.utilitybill
                                        ? styles.formGroupDisabled
                                        : styles.formGroup
                                }`}
                            >
                                <label
                                    className={styles.label}
                                    htmlFor='firstname'
                                >
                                    Utility bill
                                    <span className={styles.fileFormat}>
                                        (jpeg, jpg, png)
                                    </span>
                                </label>
                                <Uploader
                                    type='utility'
                                    setUtility={setUtility}
                                />
                            </div>
                            <div
                                className={`${
                                    uploadState.passportpix
                                        ? styles.formGroupDisabled
                                        : styles.formGroup
                                }`}
                            >
                                <label
                                    className={styles.label}
                                    htmlFor='firstname'
                                >
                                    Passport Photograph
                                    <span className={styles.fileFormat}>
                                        (jpeg, jpg, png)
                                    </span>
                                </label>
                                <Uploader
                                    type='passport'
                                    setPassport={setPassport}
                                />
                            </div>
                            <div
                                className={`${
                                    uploadState.idcard
                                        ? styles.formGroupDisabled
                                        : styles.formGroup
                                }`}
                            >
                                <label
                                    className={styles.label}
                                    htmlFor='firstname'
                                >
                                    ID Card
                                    <span className={styles.fileFormat}>
                                        (jpeg, jpg, png)
                                    </span>
                                </label>
                                <Uploader type='id' setID={setID} />
                            </div>
                            <div
                                className={`${
                                    uploadState.guarantorform
                                        ? styles.formGroupDisabled
                                        : styles.formGroup
                                }`}
                            >
                                <label
                                    className={styles.label}
                                    htmlFor='firstname'
                                >
                                    Guarantor's Form
                                    <span className={styles.fileFormat}>
                                        (jpeg, jpg, png)
                                    </span>
                                </label>
                                <Uploader
                                    type='guarantor'
                                    setGuarantor={setGuarantor}
                                />
                            </div>
                            <div
                                className={`${styles.submit} ${styles.formGroup}`}
                                onClick={handleSubmit}
                            >
                                <button className={styles.submit} type='submit'>
                                    {loading ? <ThreeDots /> : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </LoadingOverlay>
    );
};

const mapStateToProps = (state) => {
    return {
        agent_code: state.auth.user.agent_code,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        displayModal: (payload) => dispatch(setDisplayModal(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Document);
