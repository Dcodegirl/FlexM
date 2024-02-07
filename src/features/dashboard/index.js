import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Sidebar from './Sidebar';
import { setDisplayModal } from '../../actions/modal';
import Main from './Main/Main';
import { useCustomToast } from '../../components/toast/useCustomToast';

import styles from './index.module.scss';

const Dashboard = ({ overlay, displayModal, hasSetPin }) => {
    const showToast  = useCustomToast();

    useEffect(() => {
        const body = document.getElementsByTagName('body')[0];

        if (overlay) {
            body.style.maxHeight = '100vh';
            body.style.overflow = 'hidden';
        } else {
            body.style.maxHeight = 'initial';
            body.style.overflow = 'auto';
        }
    }, [overlay]);

    useEffect(() => {
        if (!hasSetPin) {
            showToast(
                "You currently don't have transaction pin yet, Kindly navigate to  settings to set one",
                'warning'
            );
        }
    }, []);

    return (
        <div className={styles.container}>
            <Sidebar />
            <Main />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        overlay: state.modal.overlay,
        hasSetPin: state.auth.user.transaction_pin,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        displayModal: (payload) => dispatch(setDisplayModal(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
