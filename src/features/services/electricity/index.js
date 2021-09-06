import React, { useState, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';

import { VEND_ENERGY } from '../../../utils/constants';
import { setCurrentPage } from '../../../actions/page';
import ElectricityPaymentForm from './ElectricityPaymentForm';
import ElectricityPaymentSummary from './ElectricityPaymentSummary';
import ElectricityPaymentCompleted from './ElectricityPaymentCompleted';
import FailedTransaction from '../../../components/common/FailedTransaction';
import ElecticityPaymentReducer, { initialFormState } from './payment-reducer';

export const ElectricityPayment = ({ service, hasSetPin }) => {
    const TRANSACTION_COST = 0;
    let renderedComponent;
    const [componentToRender, setComponentToRender] = useState('form');
    const [ElectricityPaymentFormState, dispatch] = useReducer(
        ElecticityPaymentReducer,
        initialFormState
    );
    const [loading, setLoading] = useState(false);
    const [successData, setSuccessData] = useState(null);
    const [agentLocation, setAgentLocation] = useState(null);
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

    const handleOnSubmit = () => {
        const { meterNo, disco, paymentPlan, amount, phone } =
            ElectricityPaymentFormState;
        setLoading(true);

        const req = {
            meter_number: meterNo,
            disco: service,
            type: paymentPlan,
            amount: parseInt(amount),
            phone: phone,
        };

        (async function vendEnergy() {
            try {
                const options = {
                    headers: {
                        lat: agentLocation?.latitude,
                        lng: agentLocation?.longitude,
                    },
                };

                const res = await axios.post(VEND_ENERGY, req, options);
                const message = res.data.data.message;

                setLoading(false);
                setSuccessData(res.data.data);
                addToast(message, {
                    appearance: 'success',
                    autoDismiss: true,
                });
                setComponentToRender('success');
            } catch (err) {
                if (err.response && err.response.status === 403) {
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
                    setLoading(false);
                    setComponentToRender('failed');
                }
            }
        })();
    };

    switch (componentToRender) {
        case 'form':
            renderedComponent = (
                <ElectricityPaymentForm
                    setComponentToRender={setComponentToRender}
                    setState={dispatch}
                    service={service}
                    ElectricityPaymentFormState={ElectricityPaymentFormState}
                />
            );
            break;
        case 'summary':
            renderedComponent = (
                <ElectricityPaymentSummary
                    ElectricityPaymentFormState={ElectricityPaymentFormState}
                    handleOnSubmit={handleOnSubmit}
                    setComponentToRender={setComponentToRender}
                    loading={loading}
                    service={service}
                    hasSetPin={hasSetPin}
                    dispatch={dispatch}
                    transactionCost={TRANSACTION_COST}
                />
            );
            break;
        case 'success':
            renderedComponent = (
                <ElectricityPaymentCompleted
                    successData={successData}
                    service={service}
                    ElectricityPaymentFormState={ElectricityPaymentFormState}
                />
            );
            break;
        case 'failed':
            renderedComponent = <FailedTransaction />;
            break;
        default:
            renderedComponent = null;
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

export default connect(mapStateToProps, mapDispatchToProps)(ElectricityPayment);
