import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import history from './utils/history';

import AppRouter from './router/AppRouter';
import { GlobalProvider } from './custom-hooks/Context';

const App = () => {
    useEffect(() => {
        const isSupported = () =>
            'Notification' in window &&
            'serviceWorker' in navigator &&
            'PushManager' in window;

        let isCancelled = false;

        if (!isCancelled && isSupported()) {
            (function requestNotification() {
                if (Notification.permission !== 'denied') {
                    Notification.requestPermission();
                }
            })();
        }

        return () => {
            isCancelled = true;
        };
    }, []);

    return (
        <ToastProvider>
             <GlobalProvider> {/* Wrap your entire app with GlobalProvider */}
                <Router history={history}>
                    <AppRouter />
                </Router>
            </GlobalProvider>
        </ToastProvider>
    );
};

export default App;
