import axios from 'axios';

// Retrieve token from session storage
const token = sessionStorage.getItem('token');

// Define base URLs for different environments
const baseURLs = 'https://flexmoney.cico.ng/api' // Replace with your production base URL
// staging: 'https://staging-api.flexdeals.com.ng/api'


// Create an Axios instance with the appropriate base URL
const axiosInstance = axios.create({
  baseURL: baseURLs,
  headers: {
    'Content-Type': 'application/json',
    // Add any additional headers if needed
  },
});

// Add Authorization header if a token is present
if (token) {
  axiosInstance.defaults.headers['Authorization'] = `Token ${token}`;
}

export default axiosInstance;
