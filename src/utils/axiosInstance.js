import axios from 'axios';

// Retrieve token from session storage
const token = sessionStorage.getItem('token');

// Define base URLs for different environments
const baseURLs = {
  local: 'http://localhost:3000/api', // Replace with your local base URL
  staging: 'https://staging-api.flexdeals.com.ng/api', // Replace with your staging base URL
  production: 'https://flexmoney.cico.ng/api', // Replace with your production base URL
};

// Determine the environment (you can set this dynamically based on your build process or other logic)
const environment = process.env.REACT_APP_ENVIRONMENT || 'local';

// Create an Axios instance with the appropriate base URL
const axiosInstance = axios.create({
  baseURL: baseURLs[environment],
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
