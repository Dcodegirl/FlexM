import React, { useState, useReducer, useEffect } from 'react';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import { withRouter } from 'react-router-dom';
import agentDataReducer, { initialState } from './agent-reducer';
import { REGISTER_AGENT, REGISTRATION_SELECT } from '../../utils/constants';
import PersonalDetails from './PersonalDetails';
import BusinessDetails from './BusinessDetails';
import AccountDetails from './AccountDetails';

import NavHome from '../../components/layout/HomeNavBar';

import styles from './index.module.scss';

const CreateAgent = ({ history }) => {
    const { addToast } = useToasts();
    const [agentData, dispatch] = useReducer(agentDataReducer, initialState);
    const [status, setStatus] = useState('personal');
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({});
 

    useEffect(() => {
        let isCancelled = false;

        (async function fecthRegistrationSelects() {
            try {
                const res = await axios.get(REGISTRATION_SELECT);
                const state = res.data.data;

                if (!isCancelled)
                    localStorage.setItem(
                        'Registration-select',
                        JSON.stringify(state)
                    );
                setState(state);
            } catch (e) {
                console.log(e)
            } finally {
                setLoading(false);
            }
        })();

        return () => {
            isCancelled = true;
        };
    }, []);

    const createAgent = (agentData) => {
        setLoading(true);

        (async function create() {
            const payload = agentData;

            try {
                const res = await axios.post(REGISTER_AGENT, payload);
                const message = res.data.message;
                
                if (res) {
                    
                    setLoading(false);
                 
                    addToast(
                        message,
                        {
                            appearance: 'success',
                            autoDismiss: true, 
                            autoDismissTimeout: 3000
                        }
                    );

                    history.push('/login');
                }
            } catch (e) {
                
                setLoading(false);
                addToast(e.response.data.data, {
                    appearance: 'error',
                    autoDismiss: true, 
                    autoDismissTimeout: 3000
                });
            }
        })();
    };

    return (
        <div className={styles.register}>
            <NavHome theme='dark' />
            <div className={styles.createAgent}>
                <div className={styles.create}>
                    <div className={styles.steps}>
                        <span
                            className={
                                status === 'personal'
                                    ? `${styles.tab} ${styles.tabActive}`
                                    : `${styles.tab}`
                            }
                        >
                            Personal
                        </span>
                        <span
                            className={
                                status === 'business'
                                    ? `${styles.tab} ${styles.tabActive}`
                                    : `${styles.tab}`
                            }
                        >
                            Business
                        </span>
                        <span
                            className={
                                status === 'account'
                                    ? `${styles.tab} ${styles.tabActive}`
                                    : `${styles.tab}`
                            }
                        >
                            Account
                        </span>
                        {/* <span
              className={
                status === "file"
                  ? `${styles.tab} ${styles.tabActive}`
                  : `${styles.tab}`
              }
            >
              Files
            </span> */}
                    </div>
                    <div className={styles.content}>
                        {
                            {
                                personal: (
                                    <PersonalDetails
                                        agentData={agentData}
                                        dispatch={dispatch}
                                        setStatus={setStatus}
                                        state={state}
                                    />
                                ),
                                business: (
                                    <BusinessDetails
                                        agentData={agentData}
                                        dispatch={dispatch}
                                        setStatus={setStatus}
                                        state={state}
                                    />
                                ),
                                account: (
                                    <AccountDetails
                                        agentData={agentData}
                                        dispatch={dispatch}
                                        setStatus={setStatus}
                                        createAgent={createAgent}
                                        loading={loading}
                                        state={state}
                                    />
                                ),
                                // file: <FileUploads />,
                            }[status]
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

const CreateAgentWithRouter = withRouter(CreateAgent);

export default CreateAgentWithRouter;
