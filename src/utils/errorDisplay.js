import React from 'react';
import { useToasts } from 'react-toast-notifications';

const ErrorDisplay = ({ error }) => {
  const { addToast } = useToasts();

  if (!error) {
    return null;
  }

  if (error.response) {
    const { status, data } = error.response;

    if (data && data.errors) {
      Object.entries(data.errors).forEach(([key, value]) => {
        // Assuming value is an array of error messages
        value.forEach(errorMessage => {
          addToast(`${key}: ${errorMessage}`, {
            appearance: 'error',
            autoDismiss: true,
            autoDismissTimeout: 3000,
          });
        });
      });
    } else {
      addToast(`An unexpected error occurred..`, {
        appearance: 'error',
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
    }
  } else if (error.request) {
    addToast('No response from the server. Please try again.', {
      appearance: 'error',
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });
  } else {
    addToast('An unexpected error occurred. Please try again.', {
      appearance: 'error',
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });
  }

  return null;
};

export default ErrorDisplay;
