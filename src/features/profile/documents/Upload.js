import React from 'react';
import styles from './Upload.module.scss';
import ProgressBar from '../../../components/common/ProgressBar/ProgressBar';

const Uploader = ({ onStatusChange, files, handleOnChange }) => {
    return (
        <div className={styles.uploadContainer}>
            <input
                type='file'
                name='utility_bill'
                onChange={handleOnChange}
                className={`${styles.input} ${styles.fileInput}`}
            />

            <div className={styles.uploadDetails}>
                <div className={styles.actions}>
                    <div className={styles.fileDetails}>
                        <p className={styles.fileName}>
                            Name: TalentX.Africa Site Map.docxxxxuuu
                        </p>
                        <p className={styles.fileStatus}>
                            Upload status: <span>Inactive</span>{' '}
                        </p>
                    </div>
                    <div className={styles.removeBtn}>
                        <span>Remove</span>
                    </div>
                </div>
                <div className={styles.progressBar}>
                    <ProgressBar />
                </div>
            </div>
        </div>
    );
};

export default Uploader;
