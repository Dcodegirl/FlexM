import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import { ThreeDots } from 'svg-loaders-react';
import { connect } from 'react-redux';

import styles from './index.module.scss';
import Uploader from './Upload';
import { SUBMIT_DOCUMENT, UPLOADED_DOCUMENT } from '../../../utils/constants';
import moment from 'moment';

const Document = ({ agent_code }) => {
    const [utility, setUtility] = React.useState({});
    const [passport, setPassport] = React.useState({});
    const [id, setID] = React.useState({});
    const [guarantor, setGuarantor] = React.useState({});
    const [uploaded, setUploaded] = React.useState([]);
    const [showReason, setShowReason] = useState({
        reason: false,
        reasonData: [],
    });
    const [loading, setLoading] = useState(false);
    const { addToast } = useToasts();

    const handleShowReason = (data) => {
        if (data.status === 'rejected')
            return setShowReason({
                reason: !showReason.reason,
                data,
            });
    };

    const handleDisable = (type) => {
        uploaded.forEach((data) => {
            if (data.type.includes(type) && data.status === ' approved')
                return true;
        });

        return false;
    };

    useEffect(() => {
        (async function getUploadedDocument() {
            try {
                const res = await axios.get(UPLOADED_DOCUMENT, {
                    params: { agent_code },
                });
                setUploaded(res.data.data);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        (async function disburseFunds() {
            const payload = {
                agent_code,
                documents: [utility, passport, id, guarantor],
            };

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
                    });
                } else if (err.response && err.response.status === 401) {
                    setLoading(false);
                    addToast(err.response.statusText, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                } else if (err.response && err.response.status === 500) {
                    setLoading(false);
                    addToast(err.response.statusText, {
                        appearance: 'error',
                        autoDismiss: true,
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
                            No documents has been uploaded yet, Kindly proceed
                            below to upload your documents
                        </p>
                    ) : (
                        <div className={styles.uploadedDocument}>
                            {uploaded &&
                                uploaded.map((data, index) => (
                                    <div className={styles.image} key={index}>
                                        <img src={data.path} alt='' />
                                        <span
                                            onClick={() =>
                                                handleShowReason(data)
                                            }
                                            className={`${
                                                data.status === 'rejected'
                                                    ? styles.red
                                                        ? data.status ===
                                                          'approved'
                                                        : styles.green
                                                    : styles.grey
                                            }`}
                                        >
                                            {data.status}
                                            {data.status === 'rejected' &&
                                                `(${data?.docs_reasons?.length()})`}
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
                                                                </span>{' '}
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
                            cclassName={`${
                                handleDisable('utility bill')
                                    ? styles.formGroupDisabled
                                    : styles.formGroup
                            }`}
                        >
                            <label className={styles.label} htmlFor='firstname'>
                                Utility bill
                                <span className={styles.fileFormat}>
                                    (jpeg, jpg, png)
                                </span>
                            </label>
                            <Uploader type='utility' setUtility={setUtility} />
                        </div>
                        <div
                            className={`${
                                handleDisable('passport pix')
                                    ? styles.formGroupDisabled
                                    : styles.formGroup
                            }`}
                        >
                            <label className={styles.label} htmlFor='firstname'>
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
                                handleDisable('id card')
                                    ? styles.formGroupDisabled
                                    : styles.formGroup
                            }`}
                        >
                            <label className={styles.label} htmlFor='firstname'>
                                ID Card
                                <span className={styles.fileFormat}>
                                    (jpeg, jpg, png)
                                </span>
                            </label>
                            <Uploader
                                type='id'
                                setID={setID}
                                handleDisable={handleDisable}
                            />
                        </div>
                        <div
                            className={`${
                                handleDisable('guarantor form')
                                    ? styles.formGroupDisabled
                                    : styles.formGroup
                            }`}
                        >
                            <label className={styles.label} htmlFor='firstname'>
                                Guarantor's Form
                                <span className={styles.fileFormat}>
                                    (jpeg, jpg, png)
                                </span>
                            </label>
                            <Uploader
                                type='guarantor'
                                setGuarantor={setGuarantor}
                                handleDisable={handleDisable}
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
    );
};

const mapStateToProps = (state) => {
    return {
        agent_code: state.auth.user.agent_code,
    };
};

export default connect(mapStateToProps)(Document);
