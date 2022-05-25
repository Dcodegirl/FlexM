import React from 'react';
import { Switch } from 'react-router-dom';
import PublicRoute from '../router/PublicRoute';
import PrivateRoute from '../router/PrivateRoute';
import './AppRouter.scss';
import Landing from '../pages/Landing';
import ForgotPassword from '../pages/ForgotPassword';
import Dashboard from '../features/dashboard/index';
import Register from '../pages/createAgent/index';
import ErrorHandler from '../components/template/ErrorHandler';

export const AppRouter = () => {
    return (
        <ErrorHandler>
            <Switch>
                <PublicRoute
                    path='/forgot-password'
                    component={ForgotPassword}
                />
                <PublicRoute path='/login' component={Landing} exact />
                <PublicRoute path='/register' component={Register} exact />
                <PrivateRoute path='/' component={Dashboard} />
            </Switch>
        </ErrorHandler>
    );
};

export default AppRouter;
