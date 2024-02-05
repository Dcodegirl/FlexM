import React, { Suspense, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Route, Switch, withRouter } from 'react-router-dom';
import Profile from '../../profile/Profile';
import routes from '../../../routes/routes';
import Overlay from '../modal/index';
import Header from '../Header';

import styles from './Main.module.scss';


import { setDisplayModal } from '../../../actions/modal';

export const Main = ({ history , overlay}) => {
    const [overviewData, setOverviewData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [commissionBalance, setCommissionBalance] = useState(0);
   


    // Simulating static data instead of API call
    const staticOverviewData = {
        wallet: { current_bal: 1000 }, // Replace with your desired static values
        commission: { current_commission: 500 }, // Replace with your desired static values
    };

    useEffect(() => {
        // Simulating data fetching
        setOverviewData(staticOverviewData);
        setCommissionBalance(staticOverviewData.commission.current_commission);
        setLoading(false);
    }, []);

    return (
        <Suspense fallback={<div>This is loading the main page</div>}>
            <main className={styles.main}>
            <Header />
                <section className={styles.contentContainer}>
                    <div className={styles.content}>
                        <div className={styles.contentMain}>
                            {/* <span
                                className={`styles.back md:block hidden md:mt-12 w-24 bg-[#EAF2FA] text-xl cursor-pointer border rounded-lg p-3 mb-4`}
                                onClick={() => {
                                    history.goBack();
                                }}
                            >
                                &#8592; back
                            </span> */}
                            <Switch>
                                <Route path='/profile' component={Profile} />
                                {routes.map((route, index) => (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        exact={route.exact}
                                        component={route.component}
                                    />
                                ))}
                            </Switch>
                        </div>
                        {overlay && <Overlay />}
                    </div>
                </section>
            </main>
        </Suspense>
    );
};
const mapStateToProps = (state) => {
    return {
        overlay : state.modal.overlay
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        displayModal: (payload) => dispatch(setDisplayModal(payload)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Main));