import React from 'react';

import styles from './index.module.scss';
import Uploader from './Upload';

const Document = () => {
    const [files, setFiles] = React.useState([]);
    // const [state, setstate] = useState(initialState)
    // const [state, setstate] = useState(initialState);
    // const [state, setstate] = useState(initialState);
    // const [state, setstate] = useState(initialState);

    const onStatusChange = (event) => {
        console.log('onStatusChange: ', event.affectedFiles);
        setFiles(event.newState);
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
                            </label>
                            <Uploader
                                onStatusChange={onStatusChange}
                                files={files}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor='firstname'>
                                Passport Photograph
                            </label>
                            <Uploader />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor='firstname'>
                                ID Card
                            </label>
                            <Uploader />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label} htmlFor='firstname'>
                                Guarantor's Form
                            </label>
                            <Uploader />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Document;
