// SessionExpired.js
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { startLogout } from '../../../actions/auth';
import { useToasts } from 'react-toast-notifications';
import store from "../../../store/configureStore"


const SessionExpired = () => {
  const history = useHistory();
  const { addToast } = useToasts();
  const { dispatch } = store();

  useEffect(() => {
    // Show toast when component mounts
    addToast('Your session has expired. Please log in again to continue.', {
      appearance: 'error',
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });
  }, [addToast]);

  const handleLoginAgain = () => {
    // Dispatch logout action and redirect to login
    // This assumes that you have the startLogout action available
    // and that it performs the necessary logout logic
    dispatch(startLogout());
    history.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="max-w-md p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4">Session Expired</h2>
        <p className="text-gray-600 mb-8">
          Your session has expired. Please log in again to continue.
        </p>
        <button
          onClick={handleLoginAgain}
          className="bg-color1 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
          Log In Again
        </button>
      </motion.div>
    </div>
  );
};

export default SessionExpired;
