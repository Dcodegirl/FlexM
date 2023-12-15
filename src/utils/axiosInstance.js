import axios from 'axios';

// Create an Axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: 'https://stagging-api.flexdeals.com.ng/api', // Replace with your actual base URL
  headers: {
    'Content-Type': 'application/json',
    // Add any additional headers if needed
  },
});

export default axiosInstance;
