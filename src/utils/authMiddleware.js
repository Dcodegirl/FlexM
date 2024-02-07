// authMiddleware.js
import axios from './axiosInstance';
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
        // Redirect to SessionExpired component
        history.push('/session-expired');
        return Promise.resolve({ data: {} }); // Resolve the promise to prevent the default error handling
      }
      return Promise.reject(error);
    }
  );
};
