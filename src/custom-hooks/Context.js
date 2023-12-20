import React, { createContext, useContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [address, setAddress] = useState('');
    const [lga, setLga] = useState('');
    const [state, setState] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [country, setCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [successModalOpen, setSuccessModalOpen] = useState(false);

    return (
        <GlobalContext.Provider
            value={{ 
                email, setEmail,
                successModalOpen, setSuccessModalOpen,
                userId, setUserId, 
                firstname, setFirstname,
                lastname, setLastname,
                lga, setLga,
                address, setAddress,
                phoneNum, setPhoneNum,
                selectedState, setSelectedState,
                selectedCountry, setSelectedCountry,
                country, setCountry,
                state, setState
                }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
