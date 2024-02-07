import React, { useState } from 'react';
import Login from '../../components/template/Form/login';
import NavHome from '../../components/layout/HomeNavBar';
import { useEffect } from 'react';
import { userDetails } from '../../reducers/auth';
import { useHistory } from 'react-router-dom';

const SignIn = () => {

    const history = useHistory();
    
    // useEffect(() => {
    //     if(userDetails){
    //         history.push('/dashboard')
    //     }
    //   }, [userDetails]);
    
    

    return (
        <div className="h-screen p-16 bg-[#Fafffd] bg-bg-pattern bg-cover bg-no-repeat">
            <div>
                <NavHome theme='dark' signUpContent="Log in to your account"/>
            </div>
            <div className=" mt-10">
                <div className="flex justify-center">
                    <div className="flex flex-col">
                        <Login />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignIn;