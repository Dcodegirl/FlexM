import React, { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

import { setCurrentPage } from '../../../actions/page';
import { VEND_AIRTIME } from '../../../utils/constants';
import AirtimePurchaseReducer, { initialState } from './airtime-reducer';
import BuyAirtimeForm from './BuyAirtimeForm';
import BuyAirtimeSummary from './BuyAirtimeSummary';
import BuyAirtimeCompleted from './BuyAirtimeCompleted';
import FailedTransaction from '../../../components/common/FailedTransaction';

// import styles from "./BuyAirtime.module.scss";

export const BuyAirtime = ({ service, hasSetPin }) => {
    let renderedComponent;
    const TRANSACTION_COST = 0;
    const [componentToRender, setComponentToRender] = useState('form');
    const [AirtimePurchaseFormState, dispatch] = useReducer(
        AirtimePurchaseReducer,
        initialState
    );
    const [successData, setSuccessData] = useState(null);
    const [loading, setLoading] = useState(false);
    const networkList = [
        { code: 'A01E', id: 1, name: 'Airtel', type: 'Airtime' },
        { code: 'A02E', id: 2, name: '9 Mobile', type: 'Airtime' },
        { code: 'A03E', id: 3, name: 'Globacom', type: 'Airtime' },
        { code: 'A04E', id: 4, name: 'MTN', type: 'Airtime' },
    ];
    const [selectedNetworkName, setSelectedNetworkName] = useState('');
    const { addToast } = useToasts();

    useEffect(() => {
        if (AirtimePurchaseFormState.network) {
            const selectedNetwork = networkList.find((telco) => {
                return telco.code === AirtimePurchaseFormState.network;
            });

            setSelectedNetworkName(selectedNetwork.name);
        }
    }, [AirtimePurchaseFormState.network]);

    const handleOnSubmit = () => {
        const { amount, phone } = AirtimePurchaseFormState;
        var newPhone = phone;

        setLoading(true);

        if (phone.indexOf('+234') === 0) {
            newPhone = phone.replace('+234', '');
        }

        if (phone.indexOf('234') === 0) {
            newPhone = phone.replace('234', '');
        }

        if (phone.indexOf('0') === 0) {
            newPhone = phone.replace('0', '');
        }

        const payload = {
            amount,
            bank_code: '9001',
            recipient: `234${newPhone}`,
        };

        axios
            .post(VEND_AIRTIME, payload)
            .then((res) => {
                const successData = res.data.data;
                const message = res.data.data.message;

                const date = new Date();

                setLoading(false);
                addToast(message, {
                    appearance: 'success',
                    autoDismiss: true,
                });
                setSuccessData({ ...successData, date: date.toDateString() });
                setComponentToRender('success');
            })
            .catch((err) => {
                if (err.response && err.response.status === 403) {
                    setLoading(false);
                    addToast(err.response.data.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                    setComponentToRender('failed');
                } else if (err.response && err.response.status === 401) {
                    setLoading(false);
                    addToast(err.response.data.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                    setComponentToRender('failed');
                } else if (err.response && err.response.status === 400) {
                    setLoading(false);
                    addToast(err.response.data.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                    setComponentToRender('failed');
                } else {
                    setTimeout(() => {
                        setLoading(false);
                        setComponentToRender('failed');
                    }, 7000);
                }
            });
    };

    switch (componentToRender) {
        case 'form':
            renderedComponent = (
                <BuyAirtimeForm
                    networkList={networkList}
                    AirtimePurchaseFormState={AirtimePurchaseFormState}
                    dispatch={dispatch}
                    service={service}
                    setComponentToRender={setComponentToRender}
                />
            );
            break;
        case 'summary':
            renderedComponent = (
                <BuyAirtimeSummary
                    AirtimePurchaseFormState={AirtimePurchaseFormState}
                    selectedNetworkName={selectedNetworkName}
                    handleOnSubmit={handleOnSubmit}
                    loading={loading}
                    transactionCost={TRANSACTION_COST}
                    service={service}
                    hasSetPin={hasSetPin}
                    dispatch={dispatch}
                    setComponentToRender={setComponentToRender}
                />
            );
            break;
        case 'success':
            renderedComponent = (
                <BuyAirtimeCompleted
                    successData={successData}
                    transactionCost={TRANSACTION_COST}
                    setComponentToRender={setComponentToRender}
                    AirtimePurchaseFormState={AirtimePurchaseFormState}
                    selectedNetworkName={selectedNetworkName}
                    service={service}
                />
            );
            break;
        case 'failed':
            renderedComponent = <FailedTransaction />;
            break;
        default:
            renderedComponent = null;
            break;
    }

    return <div>{renderedComponent}</div>;
};

const mapStateToProps = (state) => {
    return {
        service: state.modal.service,
        hasSetPin: state.auth.user.hasSetPin,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyAirtime);
