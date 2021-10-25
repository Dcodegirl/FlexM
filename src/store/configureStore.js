import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import pageReducer from '../reducers/page';
import walletReducer from '../reducers/wallet';
import errorReducer from '../reducers/error';
import notificationReducer from '../reducers/notification';
import modalReducer from '../reducers/modal';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            page: pageReducer,
            wallet: walletReducer,
            error: errorReducer,
            notification: notificationReducer,
            modal: modalReducer,
        }),
        composeEnhancer(applyMiddleware(thunk))
    );
    return store;
};
