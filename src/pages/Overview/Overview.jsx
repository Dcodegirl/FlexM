import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BarChart from '../../features/dashboard/BarChart';
import PieChart from '../../features/dashboard/PieChart';
import Trans from '../../features/dashboard/TransactionHistory';
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
   
  
    
    
    
    

    return (
        <div className={styles.container}>
            <UserInfo/>
             <Balance/>
            <QuickAction displayModal={displayModal}/>
            <div className="flex md:gap-10 md:flex-row flex-col">
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
