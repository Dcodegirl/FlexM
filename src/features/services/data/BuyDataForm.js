import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from '../../../utils/axiosInstance';
import { connect } from 'react-redux';
import Form from '../../../components/common/Form';
import FormGroup from '../../../components/common/FormGroup';
import Select from '../../../components/common/Select';
import Input from '../../../components/common/Input';
import Submit from '../../../components/common/Button';
import generateNetworkImageUrl from './generateNetworkImageUrl';
import { GET_DATA_PLANS } from '../../../utils/constants';
import validateFormData from '../../../validation/validateFormData';

export const BuyDataForm = (props) => {
    const {
        DataPurchaseFormState: state,
        setState,
        setComponentToRender,
        service,
    } = props;
    const [validationErrors, setValidationErrors] = useState({});
    const [dataPlans, setDataPlans] = useState([]);
    const [data,setData] = useState([])
    const networkImageUrl = generateNetworkImageUrl(service);

    useEffect(() => {
        const telcoList = {
            airtel: 'Airtel',
            '9mobile': '9mobile',
            glo: 'Globacom',
            mtn: 'MTN',
        };

        const telcoName = telcoList[`${service}`];
        axios
            .post(GET_DATA_PLANS, {"operator":telcoName})
            .then((res) => {  
                setDataPlans(res.data.data);

            })
            
            .catch((err) => {
                
            });
    }, [service]);

    useEffect(() => {
       
        if (state.productId) {
            const selectedPlan = dataPlans.filter((plan) => {
                return plan.productId === state.productId;
            })[0];
          

            const amount = selectedPlan.amount;

            setState({
                type: 'UPDATE_FORM_STATE',
                payload: { amount },
            });
        }
        
    }, [state.productId]);

    const handleOnContinue = (e) => {
        e.preventDefault();
        const keys = Object.keys(state);
        const errors = validateFormData(state, keys);
        setValidationErrors(errors);

        delete errors.transaction_pin;

        if (Object.keys(errors).length > 0) return;

        setComponentToRender('summary');
    };

    const handleSetFormState = ({ target }) => {
        setValidationErrors({ ...validationErrors, [target.name]: false });

        setState({
            type: 'UPDATE_FORM_STATE',
            payload: { [target.name]: target.value },
        });
    };
    state.operator=service
    return (
        <Form
            autoComplete='off'
            title='Buy Data'
            caption='Complete your payment information'
            handleOnSubmit={handleOnContinue}
            logo={networkImageUrl}
        >
            <FormGroup>
                <Input
                    name='phone'
                    placeholder='e.g 08012345678'
                    label='Phone Number'
                    value={state.phone}
                    type='text'
                    handleOnChange={(e) => handleSetFormState(e)}
                    error={validationErrors.phone}
                />
            </FormGroup>
            <FormGroup>
                <Select
                    name='productId'
                    label='Plan'
                    handleOnChange={(e) => handleSetFormState(e)}
                    error={validationErrors.plan}
                >
                    <option value=''>Select Plan</option>
                    {dataPlans.map((plan, index) => {
                        return (
                            <option
                                value={plan.productId}
                                key={`${index}`}
                            >
                                {plan.description}
                            </option>
                        );
                    })}
                </Select>
            </FormGroup>
            <FormGroup>
                <Input
                    name='amount'
                    label='Amount'
                    placeholder='Amount'
                    value={state.amount}
                    type='text'
                    handleOnChange={(e) => handleSetFormState(e)}
                    disabled
                />
            </FormGroup>
            <Submit type='submit'>Continue</Submit>
        </Form>
    );
};

BuyDataForm.propTypes = {
    networkList: PropTypes.array.isRequired,
    AirtimePurchaseFormState: PropTypes.object.isRequired,
    setState: PropTypes.func.isRequired,
    setComponentToRender: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
        service: state.modal.service,
    };
};

export default connect(mapStateToProps)(BuyDataForm);
