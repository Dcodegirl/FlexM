import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { authMiddleware } from './authMiddleware';

// Your Axios instance with middleware
const axiosInstance = axios.create();
authMiddleware();

// Create a mock adapter instance
const mock = new MockAdapter(axiosInstance);

// Simulate a 401 error for a specific route
mock.onGet('/api/data').reply(401);

// Perform a request to trigger the middleware
axiosInstance.get('/api/data')
  .then(response => {
  })
  .catch(error => {
    console.log('Error:', error);
    // Check if the logout and redirection logic was triggered
    // Add assertions or expectations as needed for your testing framework
  });
