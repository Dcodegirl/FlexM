import React, { useState } from 'react';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import { ThreeDots } from 'svg-loaders-react';
import { connect } from 'react-redux';

import styles from './index.module.scss';
import Uploader from './Upload';
import { SUBMIT_DOCUMENT } from '../../../utils/constants';

const Document = ({ agent_code }) => {
    const [utility, setUtility] = React.useState({});
    const [passport, setPassport] = React.useState({});
    const [id, setID] = React.useState({});
    const [guarantor, setGuarantor] = React.useState({});
    const [loading, setLoading] = useState(false);
    const { addToast } = useToasts();

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
                console.log(res);

                setLoading(false);
                addToast(res.data.message, {
                    appearance: 'success',
                    autoDismiss: true,
                });
            } catch (err) {
                console.log(err.response, err);
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

    console.lo('you');

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

                    <p className={styles.documentsUploadedText}>
                        No documents has been uploaded yet, Kindly proceed below
                        to upload your documents
                    </p>
                </div>

                <div className={styles.documentsUpload}>
                    <h5 className={styles.documentsUploadHeadings}>
                        Upload Document
                    </h5>

                    <form className={styles.form}>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor='firstname'>
                                Utility bill
                                <span className={styles.fileFormat}>
                                    (jpeg, jpg, png)
                                </span>
                            </label>
                            <Uploader type='utility' setUtility={setUtility} />
                        </div>
                        <div className={styles.formGroup}>
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
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor='firstname'>
                                ID Card
                                <span className={styles.fileFormat}>
                                    (jpeg, jpg, png)
                                </span>
                            </label>
                            <Uploader type='id' setID={setID} />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor='firstname'>
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
    );
};

const mapStateToProps = (state) => {
    return {
        agent_code: state.auth.user.agent_code,
    };
};

export default connect(mapStateToProps)(Document);
