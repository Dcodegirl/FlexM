import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import generateServiceProviderImageUrl from './generateServiceProviderImageUrl';
import Form from '../../../components/common/Form';
import FormGroup from '../../../components/common/FormGroup';
import Select from '../../../components/common/Select';
import Input from '../../../components/common/Input';
import Submit from '../../../components/common/Button';
import {VALIDATE_METER_NUMBER} from '../../../utils/constants';
import validateFormData from '../../../validation/validateFormData';
import styles from './ElectricityPaymentForm.module.scss';

const ElectricityPaymentForm = (props) => {
    const {
        ElectricityPaymentFormState: state,
        setState,
        setComponentToRender,
    } = props;

    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const { addToast } = useToasts();
    let serviceImageUrl = generateServiceProviderImageUrl(props.service);

    useEffect(() => {
        const { meterNo, paymentPlan, amount } = state;
        const req = {
            meter_number: meterNo,
            disco: props.service,
            type: paymentPlan,
            amount,
        };

        if (!isNaN(parseInt(meterNo)) && meterNo.length >= 10) {
            setLoading(true);

            setState({
                type: 'UPDATE_FORM_STATE',
                payload: { accountName: '' },
            });

            setValidationErrors({ ...validationErrors, accountName: '' });

            (async function validateMeterNumber() {
                try {
                    const res = await axios.post(VALIDATE_METER_NUMBER, req);

                    const customerName = res.data.data.name;

                    setLoading(false);

                    setState({
                        type: 'UPDATE_FORM_STATE',
                        payload: { accountName: customerName },
                    });
                } catch (err) {

                    if (err.response && err.response.status === 400) {
                        setLoading(false);
                        addToast(err.response.data.data[0], {
                            appearance: 'error',
                            autoDismiss: true, 
                            autoDismissTimeout: 3000
                        });
                    } else {
                        setValidationErrors({
                            ...validationErrors,
                            accountName:
                                'Account validation failed please try again',
                        });
                        setLoading(false);
                    }
                }
            })();
        }
    }, [state.meterNo]);

    const handleOnContinue = (e) => {
        e.preventDefault();

        const properties = Object.keys(state);
        properties.pop();
        const errors = validateFormData(state, properties);

        setValidationErrors({ ...validationErrors, ...errors });

        if (Object.keys(errors).length > 0) return;

        setComponentToRender('summary');
    };

    const handleStateChange = ({ target }) => {
        setValidationErrors({ ...validationErrors, [target.name]: false });

        setState({
            type: 'UPDATE_FORM_STATE',
            payload: { [target.name]: target.value },
        });
    };

    return (
        <Form
            className={styles.form}
            title='Bill Payment'
            caption='Complete your payment information'
            handleOnSubmit={handleOnContinue}
            autoComplete='off'
            logo={serviceImageUrl}
        >
            <FormGroup>
                <Select
                    name='paymentPlan'
                    label='Plan'
                    error={validationErrors.paymentPlan}
                    handleOnChange={(e) => handleStateChange(e)}
                >
                    <option value=''>Select plan</option>
                    <option value='prepaid'>Prepaid</option>
                    <option value='postpaid'>Postpaid</option>
                </Select>
            </FormGroup>
            <FormGroup>
                <Input
                    name='amount'
                    label='Amount'
                    type='number'
                    placeholder='Enter amount'
                    value={state.amount}
                    error={validationErrors.amount}
                    handleOnChange={(e) => handleStateChange(e)}
                />
            </FormGroup>
            <FormGroup>
                <Input
                    type='text'
                    label='Meter Number'
                    name='meterNo'
                    value={state.meterNo}
                    handleOnChange={(e) => handleStateChange(e)}
                    placeholder='Meter number'
                    error={validationErrors.meterNo}
                />
            </FormGroup>
            <FormGroup>
                <Input
                    type='text'
                    label='Account Name'
                    name='accountName'
                    value={state.accountName}
                    error={validationErrors.accountName}
                    loading={loading}
                    disabled
                />
            </FormGroup>
            <FormGroup>
                <Input
                    name='phone'
                    type='text'
                    label='Phone Number'
                    value={state.phone}
                    handleOnChange={(e) => handleStateChange(e)}
                    placeholder="Customer's phone number"
                    error={validationErrors.phone}
                />
            </FormGroup>
            <Submit type='submit'>Continue</Submit>
        </Form>
    );
};

ElectricityPaymentForm.propTypes = {
    ElectricityPaymentFormState: PropTypes.object.isRequired,
    setState: PropTypes.func.isRequired,
    setComponentToRender: PropTypes.func.isRequired,
};

export default ElectricityPaymentForm;
