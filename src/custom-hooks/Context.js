import React, { createContext, useContext, useState, useEffect } from 'react';

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
    const [selectedState, setSelectedState] = useState({});
    const [selectedCountry, setSelectedCountry] = useState({});
    const [successModalOpen, setSuccessModalOpen] = useState(false);

    useEffect(() => {
        // Retrieve values from localStorage when the component mounts
        const storedCountry = JSON.parse(localStorage.getItem('selectedCountry'));
        const storedState = JSON.parse(localStorage.getItem('selectedState'));
    
        // Set initial values from localStorage or default values
        setSelectedCountry(storedCountry || {});
        setSelectedState(storedState || {});
      }, []);
    
      const updateSelectedCountry = (country) => {
        setSelectedCountry(country);
        // Store the selected country in localStorage
        localStorage.setItem('selectedCountry', JSON.stringify(country));
      };
    
      const updateSelectedState = (state) => {
        setSelectedState(state);
        // Store the selected state in localStorage
        localStorage.setItem('selectedState', JSON.stringify(state));
      };
    

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
                state, setState,
                updateSelectedCountry,
               updateSelectedState,
                }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
