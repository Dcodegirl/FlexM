import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ThreeDots } from 'svg-loaders-react';
import Axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import { setDisplayModal } from '../../actions/modal';

import logo from '../../assets/images/flexbycico.svg';

import { CREATE_SUB_USER } from '../../utils/constants';
import { setCurrentPage } from '../../actions/page';

import Form from '../../components/common/Form';
import FormGroup from '../../components/common/FormGroup';
import Input from '../../components/common/Input';
import Submit from '../../components/common/Button';

export const AddUser = ({ changeCurrentPage, displayModal }) => {
    const { addToast } = useToasts();
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
    
                addToast('User created successfully', {
                    appearance: 'success',
                    autoDismiss: true,
                    autoDismissTimeout: 3000,
                });
    
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
                            addToast(`${errorMessage}`, {
                                appearance: 'error',
                                autoDismiss: true,
                                autoDismissTimeout: 3000,
                            });
                        });
                    } else if (status === 401) {
                        // Handle unauthorized error
                        addToast('Unauthorized. Please log in again.', {
                            appearance: 'error',
                            autoDismiss: true,
                            autoDismissTimeout: 3000,
                        });
                    } else {
                        // Handle other error cases
                        addToast('An unexpected error occurred. Please try again.', {
                            appearance: 'error',
                            autoDismiss: true,
                            autoDismissTimeout: 3000,
                        });
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    addToast('No response from the server. Please try again.', {
                        appearance: 'error',
                        autoDismiss: true,
                        autoDismissTimeout: 3000,
                    });
                } else {
                    // Something happened in setting up the request that triggered an error
                    addToast('An unexpected error occurred. Please try again.', {
                        appearance: 'error',
                        autoDismiss: true,
                        autoDismissTimeout: 3000,
                    });
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
