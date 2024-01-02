import axios from './axiosInstance';
import { startLogout } from '../actions/auth';
import store from '../store/configureStore';
import history from '../utils/history';
// import addToast from './toastUtils';// Import the addToast function from the utility file

const { dispatch } = store();

export const authMiddleware = () => {
  return axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        dispatch(startLogout());
        // addToast("Active Session expired, please log in to continue", {
        //   appearance: 'error',
        //   autoDismiss: true,
        //   autoDismissTimeout: 3000,
        // });
        window.location.replace('/login');
      }
      return Promise.reject(error);
    }
  );
};
