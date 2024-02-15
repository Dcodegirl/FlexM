import React, { Component } from 'react';
import axios from 'axios';

import styles from './Upload.module.scss';
import ProgressBar from '../../../components/common/ProgressBar/ProgressBar';
import { UPLOAD_DOCUMENT } from '../../../utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEye } from '@fortawesome/free-regular-svg-icons';

class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: {},
            error: '',
            responses: {},
            showStatus: false,
            upload_percentage: 0,
            preview: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    setUrl = (data) => {
        const { type, setUtility, setPassport, setID, setGuarantor } =
            this.props;
        switch (type) {
            case 'utility':
                return setUtility({ ...data, type: 'utility bill' });
            case 'passport':
                return setPassport({ ...data, type: 'passport pix' });
            case 'id':
                return setID({ ...data, type: 'id card' });
            case 'guarantor':
                return setGuarantor({ ...data, type: 'guarantor form' });
            default:
                return;
        }
    };

    handleRemoval = () => {
        this.setState({
            file: {},
            responses: {},
            showStatus: false,
            upload_percentage: 0,
        });
    };

    handleChange = (e) => {
        this.setState({ file: e.target.files[0], showStatus: true }, () => {
            this.handleUpload();
        });
    };

    handlePreview = () => {
        this.setState((prevstate) => ({ preview: !prevstate.preview }));
    };

    handleUpload = () => {
        let fileExt = ['png', 'jpeg', 'jpg'];
        const { type } = this.state.file;
        let fileType = type.split('/')[1];

        if (fileExt.includes(fileType)) {
            this.setState({ error: '' });

            const formData = new FormData();
            formData.append('file', this.state.file);
            formData.append('folder', 'testDoc');

            return axios
                .post(UPLOAD_DOCUMENT, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Access-Control-Allow-Origin': '*',
                    },
                    onUploadProgress: function (progressEvent) {
                        this.setState({
                            upload_percentage: parseInt(
                                Math.round(
                                    (progressEvent.loaded * 100) /
                                        progressEvent.total
                                )
                            ),
                        });
                    }.bind(this),
                })
                .then((res) => {
                    if (res.statusText === 'OK') {
                        this.setUrl({
                            filepath: res.data.data.filepath,
                            name: res.data.data.filepath,
                            size: res.data.data.size,
                            path: res.data.data.url,
                        });
                        this.setState({
                            responses: res.data,
                        });
                    }
                })
                .catch((err) => {
                });
        } else {
            return this.setState({
                error: 'file type not allowed',
                showStatus: false,
            });
        }
    };

    render() {
        const { responses, showStatus, error, preview } = this.state;

        return (
            <div className={styles.uploadContainer}>
                <input
                    type='file'
                    name='file'
                    onChange={this.handleChange}
                    className={`${styles.input} ${styles.fileInput}`}
                />

                {error && <p className={styles.erroMessage}>{error}</p>}
                {showStatus && (
                    <div className={styles.uploadDetails}>
                        <div className={styles.actions}>
                            <div className={styles.fileDetails}>
                                <p className={styles.fileName}>
                                    Name:{' '}
                                    {responses.data
                                        ? responses?.data.name
                                        : '----'}
                                </p>
                                <p className={styles.fileStatus}>
                                    Upload status:{' '}
                                    <span>
                                        {responses.status
                                            ? responses?.status
                                            : 'Pending'}
                                    </span>{' '}
                                </p>
                            </div>
                            <div className={styles.fileAction}>
                                <FontAwesomeIcon
                                    icon={faEye}
                                    className={styles.removeBtn}
                                    onClick={this.handlePreview}
                                />
                                <FontAwesomeIcon
                                    icon={faTrashAlt}
                                    className={styles.removeBtn}
                                    onClick={this.handleRemoval}
                                />
                            </div>
                        </div>
                        <div className={styles.progressBar}>
                            <ProgressBar
                                percentage={this.state.upload_percentage}
                            />
                        </div>
                        {preview && (
                            <div className={styles.previewImg}>
                                <img src={responses.data.url} alt='' />
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

export default Uploader;
