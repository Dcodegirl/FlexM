import React from 'react';

import styles from './index.module.scss';
import { connect } from 'react-redux';

const ShowUpload = ({ service }) => {
    return (
        <div className={styles.showUploader}>
            <img src={service} alt='uploaded pic' />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        service: state.modal.service,
    };
};

export default connect(mapStateToProps)(ShowUpload);
