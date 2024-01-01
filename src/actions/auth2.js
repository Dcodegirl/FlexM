import axios from '../utils/axiosInstance';
import history from '../utils/history';
import setAuthToken from '../utils/setAuthToken';



const LOGIN_API = '/users/signin';
const OTP_VERIFICATION_API = '/user/otpVer';

// Action types
const START_LOGIN_USER = 'START_LOGIN_USER';
const START_OTP_VERIFICATION = 'START_OTP_VERIFICATION';
const LOGOUT_USER = 'LOGOUT_USER';

// Action creators
const loginUser = (userData) => ({
  type: START_LOGIN_USER,
  payload: userData,
});



const logoutUser = () => ({
  type: LOGOUT_USER,
});

// Thunk actions
export const startLoginUser = (payload, history) => async (dispatch) => {
  try {
    const response = await axios.post(OTP_VERIFICATION_API, payload);
    const { data } = response;
    const token = data.data.token;
    sessionStorage.setItem('token', token);
    // console.log(token)


    // Extract necessary data from the response
    if (token) {
      sessionStorage.setItem('isAuthenticated', true);
      const authDetails = {
        isAuthenticated: true,
        user: {
          ...data.data.user_info
        },
        bank: {
          ...data.data.bank_info
        },
        has_pin: data.data.has_pin,
        image: data.data.image,


      };
      setAuthToken(token);
      dispatch(loginUser(authDetails));
      sessionStorage.setItem('user', JSON.stringify(authDetails));
      // Use history.replace instead of history.push to replace the current entry
      history.replace('/overview');
      window.location.reload();

    }



    // Dispatch action to update the store with code

  } catch (error) {
    // Handle login error
    console.error('Login error:', error);
  }
};



export const startLogout = () => (dispatch) => {
    dispatch({
        type: 'SET_LOADING',
        payload: {
            loading: false,
            message: undefined,
        },
    });

    sessionStorage.clear('user');
    sessionStorage.clear('token');
    sessionStorage.clear('balance');
    history.push('/');
    dispatch(logoutUser());
};
