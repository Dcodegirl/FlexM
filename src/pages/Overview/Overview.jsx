import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BarChart from '../../features/dashboard/BarChart';
import PieChart from '../../features/dashboard/PieChart';
import Trans from '../../features/dashboard/TransactionHome';
import Balance from '../../features/dashboard/Balance/Balance';
import QuickAction from '../../features/dashboard/QuickAction';
import axios from 'axios';
import { AGENT_DASHBOARD_DATA } from '../../utils/constants';
import { ThreeDots } from 'svg-loaders-react';
import { setDisplayModal } from '../../actions/modal';
import { setCurrentPage } from '../../actions/page';
import UserInfo from '../../features/dashboard/userInfo';
import formatToCurrency from '../../utils/formatToCurrency';

import styles from './Overview.module.scss';

export const Overview = ({
    changeCurrentPage,
    setWalletBalance,
    displayModal,
    overviewData,
}) => {
    const [commissionBalance, setCommissionBalance] =useState(0);
    const [loading, setLoading] = useState(true);
   
  

    
    
    async function fetchOverviewData() {
        try {
            const res = await axios.get(AGENT_DASHBOARD_DATA);

            const overviewData = res.data.data;
            setWalletBalance(overviewData.wallet.current_bal);
            setCommissionBalance(overviewData.commission.current_commission)
           
           
        } catch (e) {
            
        } finally {
            setLoading(false);
        }
    };
    const refreshOverviewData = () => {
        fetchOverviewData();
    };

    return (
        <div className={styles.container}>
            <UserInfo/>
             <Balance refreshOverviewData={refreshOverviewData} commissionBalance={commissionBalance}/>
            <QuickAction displayModal={displayModal}/>
            <div className="flex gap-10">
            <BarChart/>
            <PieChart/>
            </div>
            <Trans/>
            
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
        displayModal: (payload) => dispatch(setDisplayModal(payload)),
    };
};

export default connect(undefined, mapDispatchToProps)(Overview);
