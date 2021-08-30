import React, { useEffect, useState, useReducer } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';

import { setWalletBalance } from '../../../actions/wallet';
import FundsTransferReducer, { initialFormState } from './transfer-reducer';
import { setCurrentPage } from '../../../actions/page';
import { DISBURSE_FUNDS, AGENT_DASHBOARD_DATA } from '../../../utils/constants';
import FundsTransferForm from './FundsTransferForm';
import FundsTransferCompleted from './FundsTransferCompleted';
import FundsTransferSummary from './FundsTransferSummary';
import FailedTransaction from '../../../components/common/FailedTransaction';

import styles from './index.module.scss';

export const FundsTransfer = ({ changeCurrentPage }) => {
    const TRANSACTION_COST = 0;
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
    const { addToast } = useToasts();

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

    const getTransactionDate = (date) => {
        const dateString = date.toString();
        return dateString.slice(0, 24);
    };

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
                addToast(message, {
                    appearance: 'success',
                    autoDismiss: true,
                });
                (async function getUser() {
                    try {
                        const res = await axios.get(AGENT_DASHBOARD_DATA);

                        const overviewData = res.data.data;
                        setWalletBalance(overviewData.wallet.current_bal);
                    } catch (error) {
                        console.log(error);
                    }
                })();
                setComponentToRender('completed');
            } catch (err) {
                if (err.response && err.response.status === 403) {
                    setLoading(false);
                    addToast(err.response.data.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                    setFailedErrorMessage(err.response?.message || undefined);
                    setComponentToRender('failed');
                } else if (err.response && err.response.status === 401) {
                    setLoading(false);
                    addToast(err.response.data.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                    setComponentToRender('failed');
                } else {
                    setTimeout(() => {
                        setLoading(false);
                        setFailedErrorMessage(
                            err.response?.message || undefined
                        );
                        setComponentToRender('failed');
                    }, 7000);
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

const mapDispatchToProps = (dispatch) => {
    return {
        changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
        setWalletBalance: (payload) => dispatch(setWalletBalance(payload)),
    };
};

FundsTransfer.propTypes = {
    changeCurrentPage: PropTypes.func.isRequired,
};

export default connect(undefined, mapDispatchToProps)(FundsTransfer);
