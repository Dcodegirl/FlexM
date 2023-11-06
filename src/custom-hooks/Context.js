import React, { createContext, useContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [email, setEmail] = useState('');
    const [successModalOpen, setSuccessModalOpen] = useState(false);

    return (
        <GlobalContext.Provider
            value={{ 
                email, setEmail,
                successModalOpen, setSuccessModalOpen,
                }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
