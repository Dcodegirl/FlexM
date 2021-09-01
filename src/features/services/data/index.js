import React, { useState, useReducer } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

import { setCurrentPage } from '../../../actions/page';
import { VEND_DATA } from '../../../utils/constants';
import DataPurchaseReducer, { initialState } from './data-reducer';
import BuyDataForm from './BuyDataForm';
import BuyDataSummary from './BuyDataSummary';
import BuyDataStatus from './BuyDataCompleted';
import FailedTransaction from '../../../components/common/FailedTransaction';

// import styles from "./BuyData.module.scss";

export const BuyData = ({ service, hasSetPin }) => {
    let renderedComponent;
    const TRANSACTION_COST = 0;
    const [componentToRender, setComponentToRender] = useState('form');
    const [DataPurchaseFormState, dispatch] = useReducer(
        DataPurchaseReducer,
        initialState
    );
    const [successData, setSuccessData] = useState(null);
    const [loading, setLoading] = useState(false);
    const { addToast } = useToasts();

    const handleOnSubmit = () => {
        const { amount, phone, plan } = DataPurchaseFormState;
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
            productId: plan,
            amount,
            bank_code: '9001',
            recipient: `234${newPhone}`,
        };

        axios
            .post(VEND_DATA, payload)
            .then((res) => {
                const successData = res.data.data;
                const message = res.data.data.Message;

                const date = new Date();

                setLoading(false);
                setSuccessData({ ...successData, date: date.toDateString() });
                addToast(message, {
                    appearance: 'success',
                    autoDismiss: true,
                });
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
                <BuyDataForm
                    DataPurchaseFormState={DataPurchaseFormState}
                    setState={dispatch}
                    setComponentToRender={setComponentToRender}
                    service={service}
                />
            );
            break;
        case 'summary':
            renderedComponent = (
                <BuyDataSummary
                    DataPurchaseFormState={DataPurchaseFormState}
                    handleOnSubmit={handleOnSubmit}
                    loading={loading}
                    dispatch={dispatch}
                    transactionCost={TRANSACTION_COST}
                    service={service}
                    hasSetPin={hasSetPin}
                />
            );
            break;
        case 'success':
            renderedComponent = (
                <BuyDataStatus
                    successData={successData}
                    transactionCost={TRANSACTION_COST}
                    setComponentToRender={setComponentToRender}
                    DataPurchaseFormState={DataPurchaseFormState}
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

export default connect(mapStateToProps, mapDispatchToProps)(BuyData);
