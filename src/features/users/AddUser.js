import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ThreeDots } from 'svg-loaders-react';
import Axios from 'axios';
import { useCustomToast } from '../../components/toast/useCustomToast';
import { setDisplayModal } from '../../actions/modal';

import logo from '../../assets/images/flexbycico.svg';

import { CREATE_SUB_USER } from '../../utils/constants';
import { setCurrentPage } from '../../actions/page';

import Form from '../../components/common/Form';
import FormGroup from '../../components/common/FormGroup';
import Input from '../../components/common/Input';
import Submit from '../../components/common/Button';

export const AddUser = ({ changeCurrentPage, displayModal }) => {
    const showToast = useCustomToast();
    changeCurrentPage({
        heading: 'Add User',
        search: false,
    });

    const [validationErrors, setValidationErrors] = useState({});
    const [formState, setFormState] = useState({
        email: '',
        phone: '',
        username: '',
        limit: '',
    });
    const [loading, setLoading] = useState(false);

    const handleOnChange = (e) => {
        e.preventDefault();

        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
    
        (async function fetchWalletBalance() {
            try {
                const res = await Axios.post(CREATE_SUB_USER, formState);
    
                showToast('User created successfully', 'success');
    
                displayModal({
                    overlay: false,
                    modal: '',
                    service: '',
                    modalIsUpdated: res.data.data.email,
                });
    
            } catch (error) {
                setLoading(false);
    
                if (error.response) {
                    // The request was made and the server responded with a status code
                    const { data, status } = error.response;
    
                    if (status === 400 && data && data.errors) {
                        // Handle specific validation errors
                        Object.values(data.errors).flat().forEach(errorMessage => {
                            showToast(`${errorMessage}`, 'error');
                        });
                    } else if (status === 401) {
                        // Handle unauthorized error
                        showToast('Unauthorized. Please log in again.', 'error');
                    } else {
                        // Handle other error cases
                        showToast('An unexpected error occurred. Please try again.', 'error');
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
    
    return (
        <Form
            autoComplete='off'
            title='Create Sub Agent'
            caption='Complete sub agent information'
            handleOnSubmit={handleOnSubmit}
            logo={logo}
        >
            <FormGroup>
                <Input
                    name='phone'
                    label='Phone'
                    placeholder='Phone number'
                    value={formState.phone}
                    type='text'
                    handleOnChange={(e) => handleOnChange(e)}
                    error={validationErrors.phone}
                />
            </FormGroup>
            <FormGroup>
                <Input
                    name='email'
                    label='Email'
                    placeholder='Enter email'
                    value={formState.email}
                    type='text'
                    error={validationErrors.email}
                    handleOnChange={(e) => handleOnChange(e)}
                />
            </FormGroup>
            <FormGroup>
                <Input
                    name='username'
                    label='Username'
                    placeholder='Enter username'
                    value={formState.username}
                    type='text'
                    handleOnChange={(e) => handleOnChange(e)}
                    error={validationErrors.username}
                />
            </FormGroup>
            <FormGroup>
                <Input
                    name='limit'
                    label='Transaction Limit'
                    placeholder='Transaction limit'
                    error={validationErrors.limit}
                    value={formState.limit}
                    type='text'
                    handleOnChange={(e) => handleOnChange(e)}
                />
            </FormGroup>
            <Submit type='submit'>{loading ? <ThreeDots /> : 'Create'}</Submit>
        </Form>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
        displayModal: (payload) => dispatch(setDisplayModal(payload)),
    };
};

export default connect(undefined, mapDispatchToProps)(AddUser);
