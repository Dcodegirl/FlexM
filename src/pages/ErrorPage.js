import React from 'react';

import styles from './ErrorPage.module.scss';
import Submit from '../components/common/Button';

const ErrorPage = ({}) => {
    return (
        <main className={styles.errorContainer}>
            <div className={styles.errorCenter}>
                <h1>Oops!</h1>
                <p>
                    Something went wrong!, please click refresh, if problem
                    persist, kindly contact support. Thanks.
                </p>
                <div className={styles.errorActions}>
                    <Submit
                        type='button'
                        onClick={() => window.location.reload()}
                    >
                        Refresh
                    </Submit>
                </div>
            </div>
        </main>
    );
};

export default ErrorPage;
