import axios from 'axios';

// Retrieve token from session storage
const token = sessionStorage.getItem('token');

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: 'https://stagging-api.flexdeals.com.ng/api', // Replace with your actual base URL
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
