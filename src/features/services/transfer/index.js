import React, { useEffect, useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from '../../../utils/axiosInstance';
import { useCustomToast } from '../../../components/toast/useCustomToast';
import { setWalletBalance } from '../../../actions/wallet';
import FundsTransferReducer, { initialFormState } from './transfer-reducer';
import { setCurrentPage } from '../../../actions/page';
import { DISBURSE_FUNDS} from '../../../utils/constants';
import FundsTransferForm from './FundsTransferForm';
import FundsTransferCompleted from './FundsTransferCompleted';
import FundsTransferSummary from './FundsTransferSummary';
import FailedTransaction from '../../../components/common/FailedTransaction';
import { EventEmitter } from '../../../utils/event';

import styles from './index.module.scss';

export const FundsTransfer = ({ changeCurrentPage, hasSetPin }) => {
    const TRANSACTION_COST = 25;
    let renderedComponent;
    const [componentToRender, setComponentToRender] = useState('form');
    const [FundsTransferFormState, dispatch] = useReducer(
        FundsTransferReducer,
        initialFormState
    );
    const [successData, setSuccessData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [agentLocation, setAgentLocation] = useState(null);
    const [failedErrorMessage, setFailedErrorMessage] = useState('');
    const showToast  = useCustomToast();

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setAgentLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            });
        }
    }, []);

    useEffect(() => {
        changeCurrentPage({
            heading: 'Funds Transfer',
            search: false,
        });

    }, []);

    const handleOnSubmit = () => {
        setLoading(true);

        const {
            accountNumber,
            beneficiaryBankCode,
            amount,
            phone,
            transaction_pin,
        } = FundsTransferFormState;

        const req = {
            account_number: accountNumber,
            bank: beneficiaryBankCode,
            amount: amount,
            phone: phone,
            transaction_pin,
        };

        (async function disburseFunds() {
            try {
                const options = {
                    headers: {
                        lat: agentLocation?.latitude,
                        lng: agentLocation?.longitude,
                    },
                };

                const res = await axios.post(DISBURSE_FUNDS, req, options);
                const reference = res.data?.data?.Data?.TxnId;
                const status = res.data.status;
                const message = res.data.data.Message;
                const agentCode = res.data.data.agent_code;
                const transactionDate = res.data.data.transaction_date;
                setSuccessData({
                    message,
                    reference,
                    status,
                    agentCode,
                    transactionCost: TRANSACTION_COST,
                    date: transactionDate,
                });

                setLoading(false);
                showToast(message, 'success');
                setComponentToRender('completed');
                EventEmitter.dispatch('refresh-wallet-balance', {});
            } catch (err) {
                console.log(err)
                if(err.response === undefined){
                    showToast("You cannot transfer below the transfer limit", 'error'); 
                    setLoading(false)
                    return
                }
                if (err.response && err.response.status === 401 ) {
                    setLoading(false);
                    showToast(err.response.data.message, 'error');
                    setFailedErrorMessage(err.response.data.message || undefined);
                    setComponentToRender('failed');
                } else if (err.response && err.response.status === 403) {
                    setLoading(false);
                    showToast(err.response.data.message, 'error');
                    setComponentToRender('failed');
                    setFailedErrorMessage(err.response.data.message || undefined);
                }
                 else {
                    setTimeout(() => {
                        setLoading(false);
                       
                        showToast(err.response.data.message, 'error');
                        setFailedErrorMessage(
                            err.response.data.message || undefined
                        );
                        setComponentToRender('failed');
                    }, 3000);
                }
            }
        })();
    };

    switch (componentToRender) {
        case 'form':
            renderedComponent = (
                <FundsTransferForm
                    FundsTransferFormState={FundsTransferFormState}
                    dispatch={dispatch}
                    setComponentToRender={setComponentToRender}
                    transactionCost={TRANSACTION_COST}
                />
            );
            break;
        case 'summary':
            renderedComponent = (
                <FundsTransferSummary
                    loading={loading}
                    dispatch={dispatch}
                    handleOnSubmit={handleOnSubmit}
                    transactionCost={TRANSACTION_COST}
                    setComponentToRender={setComponentToRender}
                    FundsTransferFormState={FundsTransferFormState}
                    hasSetPin={hasSetPin}
                />
            );
            break;
        case 'completed':
            renderedComponent = (
                <FundsTransferCompleted
                    successData={successData}
                    setComponentToRender={setComponentToRender}
                    FundsTransferFormState={FundsTransferFormState}
                />
            );
            break;
        case 'failed':
            renderedComponent = (
                <FailedTransaction message={failedErrorMessage} />
            );
            break;
        default:
            renderedComponent = null;
    }

    return <div className={styles.container}>{renderedComponent}</div>;
};

const mapStateToProps = (state) => {
    return {
        hasSetPin: state.auth.user.transaction_pin,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
        setWalletBalance: (payload) => dispatch(setWalletBalance(payload)),
    };
};

FundsTransfer.propTypes = {
    changeCurrentPage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FundsTransfer);
