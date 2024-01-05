import React from 'react';
import { Switch } from 'react-router-dom';
import PublicRoute from '../router/PublicRoute';
import PrivateRoute from '../router/PrivateRoute';
import './AppRouter.scss';
import Landing from '../pages/Landing';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword'
import Dashboard from '../features/dashboard/index';
import Register from '../pages/createAgent/index';
import SignUp from '../pages/signUp'
import signIn from '../pages/signIn';
import ForgotWord from '../pages/forgotPass';
import PasswordSet from '../pages/PasswordSet';
import signInOtp from '../pages/signInOtp';
import Pin from '../pages/Pin';
import ForgotConfirm from '../pages/forgotConfirmation';
import ErrorHandler from '../components/template/ErrorHandler';
import ForgotTransactionPin from '../pages/ForgotTransactionPin';
import Settings from '../pages/settings';
import ContactDetail from '../components/contactDetails/contactDetail';
import BiodataSettings from '../components/biodatasettings/BiodataSettings';
import TransactionPinSettings from '../components/transactionpinsettings/TransactionPinSettings';




export const AppRouter = () => {
    return (
        <ErrorHandler>
            <Switch>
                <PublicRoute
                    path='/forgot-password'
                    component={ForgotPassword}
                />
                 <PublicRoute
                    path='/forgot-transaction-pin'
                    component={ForgotTransactionPin}
                />
                <PublicRoute path='/login' component={signIn} exact />
                <PublicRoute path='/register' component={Register} exact />
                <PublicRoute path='/signup' component={SignUp} exact />
                <PublicRoute path='/signin' component={signIn} exact />
                <PublicRoute path='/pin' component={Pin} exact />
                <PublicRoute path='/forgotPassword' component={ForgotWord} exact />
                <PublicRoute path='/resetPassword' component={ResetPassword} exact />
                <PublicRoute path='/passwordSet' component={PasswordSet} exact />
                <PublicRoute path='/forgotConfirmation' component={ForgotConfirm} exact />
                <PublicRoute path='/otpVerification' component={signInOtp} exact />
                <PrivateRoute path='/' component={Dashboard} />
                <PrivateRoute path='/settings' component={Settings} />
                <PrivateRoute path='/settings/:step' component={Settings} />
                {/* <PrivateRoute path='/settings/biodata' component={BiodataSettings} exact/>
                <PrivateRoute path='/settings/contact' component={ContactDetail} exact/>
                <PrivateRoute path='/settings/pin' component={TransactionPinSettings} exact/> */}

            </Switch>
        </ErrorHandler>
    );
};
export default AppRouter;
