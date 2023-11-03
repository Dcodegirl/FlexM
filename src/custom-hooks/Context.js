import React, { createContext, useContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [email, setEmail] = useState('');

    return (
        <GlobalContext.Provider
            value={{ 
                email, setEmail,
                }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
