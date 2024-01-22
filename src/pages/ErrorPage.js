import React from 'react';

import { startLogout } from '../actions/auth';
import store from '../store/configureStore';
import history from '../utils/history';
import styles from './ErrorPage.module.scss';
import Submit from '../components/common/Button';

const ErrorPage = ({}) => {
    const { dispatch } = store();
    const pushOut = () => {
        dispatch(startLogout());
        // Redirect to SessionExpired component
        history.push('/login');
    }
    return (
        <main className={styles.errorContainer}>
            <div className={styles.errorCenter}>
                <h1>Oops!</h1>
                <p>
                    Something went wrong!, please click restart the application, if problem
                    persist, kindly contact support. Thanks.
                </p>
                <div className={styles.errorActions}>
                    <Submit
                        type='button'
                        onClick={pushOut}
                    >
                        Restart Application.
                    </Submit>
                </div>
            </div>
        </main>
    );
};

export default ErrorPage;
