import axios from 'axios';

import { startLogout } from '../actions/auth';
import store from '../store/configureStore';
import history from '../utils/history';

const { dispatch } = store();

export const authMiddleware = () => {
    return axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                dispatch(startLogout());
                history.push('/login');
            } return Promise.reject(error);
        }
    );
};
