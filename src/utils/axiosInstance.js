import axios from 'axios';


// Retrieve token from session storage
const token = sessionStorage.getItem('token');

// Define base URLs for different environments
const baseURLs = 'https://flexmoney.cico.ng/api'
// const staggingBaseURLs = 'https://stagging-api.flexdeals.com.ng/api'


// Create an Axios instance with the appropriate base URL
const axiosInstance = axios.create({
  baseURL: baseURLs,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Authorization header if a token is present
if (token) {
  axiosInstance.defaults.headers['Authorization'] = `Token ${token}`;
}


export default axiosInstance;
