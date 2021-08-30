import axios from 'axios';

export const axiosInterceptor = () => {
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            if (
                error.response &&
                error.response.data &&
                error.response.data.error &&
                (error.response.data.session === false ||
                    error.response.data.session === 'false')
            ) {
                sessionStorage.removeItem('user');
                window.location = '/login';
            } else if (
                error.response &&
                error.response.data &&
                error.response.data.error &&
                error.response.data.error.message
            ) {
                alert(error.response.data.error.message, 1);
            } else if (error.response && error.response.status === 401) {
                sessionStorage.removeItem('user');
                window.location = '/login';
            } else return Promise.reject(error);
        }
    );
};
