import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ThreeDots } from 'svg-loaders-react';
import { useCustomToast } from '../../components/toast/useCustomToast';
import { connect } from 'react-redux';
import logo from '../../assets/images/flexbycico.svg';
import Form from '../../components/common/Form';
import FormGroup from '../../components/common/FormGroup';
import Input from '../../components/common/Input';
import Submit from '../../components/common/Button';
import { UPDATE_USER_PASSWORD } from '../../utils/constants';
import validateFormData from '../../validation/validateFormData';

import { setDisplayModal } from '../../actions/modal';

export const Password = ({ displayModal }) => {
    const [formState, setFormState] = useState({
        password: '',
        new_password: '',
        confirm_password: '',
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const showToast = useCustomToast();

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const { new_password, confirm_password, password } = formState;

        const payload = {
            password,
            new_password,
            confirm_password,
        };

        const keys = Object.keys(payload);
        const errors = validateFormData(formState, keys);

        setValidationErrors(errors);

        if (Object.keys(errors).length > 0) return;

        submit();
    };

    const submit = () => {
        const payload = formState;
        setLoading(true);
    
        (async function changePassword() {
            try {
                const res = await axios.put(UPDATE_USER_PASSWORD, payload);
    
                if (res) {
                    showToast('Password changed successfully', 'success');
    
                    displayModal({
                        overlay: false,
                        modal: false,
                        service: null,
                    });
                }
            } catch (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    const { status, data } = error.response;
    
                    if (data && data.errors) {
                        // If the error response contains 'errors' field, display each error in a separate toast
                        Object.values(data.errors).flat().forEach(errorMessage => {
                            showToast(`${errorMessage}`, 'error');
                        });
                    } else if (data && data.message) {
                        // If the error response does not contain 'errors' field, display the message in the toast
                        showToast(`${data.message}`, 'error');
                    } else {
                        // If the error response does not contain 'errors' or 'message' field, display a generic error message
                        showToast(`An unexpected error occurred.`, 'error');
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    showToast('No response from the server. Please try again.', 'error');
                } else {
                    // Something happened in setting up the request that triggered an error
                    showToast('An unexpected error occurred. Please try again.', 'error');
                }
            } finally {
                setLoading(false);
            }
        })();
    };
    

    const handleSetFormState = ({ target }) => {
        setValidationErrors({ ...validationErrors, [target.name]: false });

        setFormState({
            ...formState,
            [target.name]: target.value,
        });
    };
    return (
        <Form
            autoComplete='off'
            title='Change password'
            caption='Complete your information'
            handleOnSubmit={handleOnSubmit}
            logo={logo}
        >
            <FormGroup>
                <Input
                    name='password'
                    label='Password'
                    placeholder='Enter password'
                    value={formState.password}
                    type='password'
                    handleOnChange={(e) => handleSetFormState(e)}
                    error={validationErrors.password}
                />
            </FormGroup>
            <FormGroup>
                <Input
                    name='new_password'
                    label='New Password'
                    value={formState.new_password}
                    placeholder='Enter new password'
                    type='password'
                    handleOnChange={(e) => handleSetFormState(e)}
                    error={validationErrors.new_password}
                />
            </FormGroup>
            <FormGroup>
                <Input
                    name='confirm_password'
                    label='Confirm Password'
                    placeholder='Confirm password'
                    value={formState.confirm_password}
                    type='password'
                    handleOnChange={(e) => handleSetFormState(e)}
                    error={validationErrors.confirm_password}
                />
            </FormGroup>
            <Submit type='submit'>
                {loading ? <ThreeDots /> : 'Continue'}
            </Submit>
        </Form>
    );
};

Password.propTypes = {
    networkList: PropTypes.array.isRequired,
    AirtimePurchaseFormState: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    setComponentToRender: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        displayModal: (payload) => dispatch(setDisplayModal(payload)),
    };
};

export default connect(undefined, mapDispatchToProps)(Password);
