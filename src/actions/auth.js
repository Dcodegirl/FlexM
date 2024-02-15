import axios from 'axios';

import { LOGIN_API } from '../utils/constants';
import setAuthToken from '../utils/setAuthToken';
// import setAxiosDefaults from '../utils/setAxiosDefaults';
import isEmpty from '../validation/isEmpty';
import history from '../utils/history';
import { setWalletBalance } from './wallet';

const loginUser = ({
    user,
    isAuthenticated,
    walletBalance,
    commissionBalance,
    transactionSettings,
    virtualAccountNumber,
    virtualAccountBank,
}) => {
    return {
        type: 'START_LOGIN_USER',
        payload: {
            isAuthenticated,
            user,
            walletBalance,
            commissionBalance,
            transactionSettings,
            virtualAccountNumber,
            virtualAccountBank,
        },
    };
};

export const startLoginUser = (payload) => (dispatch) => {
    return axios
        .post(LOGIN_API, payload)
        .then((res) => {
            const user = res?.data?.data.user;
            const token = res?.data?.data.token;
            const walletBalance = res?.data?.data.wallet.current_bal;
            const commissionBalance = res?.data?.data.commission.current_commission;
            const transactionSettings = res?.data?.data.settings;
            const agentClassification = res?.data?.data.class;
            const agent = res?.data?.data.agent;
            const virtualAccountNumber = agent?.virtual_account_number;
            const virtualAccountBank = agent?.virtual_account_bank;
            

            // Extract virtual_account_number and virtual_account_bank from the agent object
            // const { virtual_account_number: virtualAccountNumber, virtual_account_bank: virtualAccountBank } = agent;

            const proprietor = res?.data?.data.user.proprietor;
            const hasSetPin = res?.data?.data.has_set_pin;
           

            const { id, username, phone, email, is_default } = user;
            const {
                first_name: firstName,
                last_name: lastName,
                user_id: userId,
                business_name: businessName,
                wallet_no: walletNo,
                uuid,
                gender,
                business_address,
                date_of_birth,
                business_phone,
                account_name,
                account_number,
                bank_id,
                state_id,
                local_government_id,
                business_type,
                bvn,
                agent_code,
            } = agent;

            if (!isEmpty(token)) {
                const authDetails = {
                    isAuthenticated: true,
                    user: {
                        account_name,
                        account_number,
                        bank_id,
                        state_id,
                        local_government_id,
                        business_type,
                        agent_code,
                        id,
                        username,
                        phone,
                        email,
                        type: proprietor ? 'sub' : 'main',
                        uuid,
                        is_default,
                        business_address,
                        business_phone,
                        bvn,
                        firstName,
                        lastName,
                        virtualAccountNumber: virtualAccountNumber,
                        virtualAccountBank: virtualAccountBank,
                        agentClassification,
                        userId,
                        date_of_birth,
                        gender,
                        businessName,
                        walletNo,
                        hasSetPin,
                    },
                    walletBalance,
                    transactionSettings,
                };

                setAuthToken(token);
                dispatch(loginUser(authDetails));
                dispatch(setWalletBalance(walletBalance));
                sessionStorage.setItem('user', JSON.stringify(authDetails));
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('balance', walletBalance);
            }
        })
        .catch((err) => {
            if (err.response && err.response.status === 401) {
                dispatch({
                    type: 'SET_LOADING',
                    payload: {
                        loading: false,
                        message: err.response.data.message,
                    },
                });
            } else {
                setTimeout(() => {
                    dispatch({
                        type: 'SET_LOADING',
                        payload: {
                            loading: false,
                            message: 'An error occurred',
                        },
                    });
                }, 4000);
            }
        });
        
};


export const logoutUser = () => {
    return {
        type: 'START_LOGOUT_USER',
    };
};

export const startLogout = () => (dispatch) => {
    dispatch({
        type: 'SET_LOADING',
        payload: {
            loading: false,
            message: undefined,
        },
    });

    sessionStorage.clear('user');
    sessionStorage.clear('token');
    sessionStorage.clear('balance');
    history.push('/');
    dispatch(logoutUser());
};
