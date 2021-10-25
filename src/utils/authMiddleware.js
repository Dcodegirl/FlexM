import axios from 'axios';

export const authMiddleware = () => {
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.log(error.response);

            if (error.response && error.response.status === 401) {
                window.location = '/login';
            } else if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                alert(error.response.data.message, 1);
            } else if (error.response && error.response.data) {
            } else return Promise.reject(error);
        }
    );
};
