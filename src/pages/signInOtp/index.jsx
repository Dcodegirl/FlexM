import React, { useState } from 'react';
import NavHome from '../../components/layout/HomeNavBar';
import Otp from '../../components/template/Form/loginOtp';

const signIn = () => {


    return (
        <div className="h-screen p-16">
            <div>
                <NavHome theme='dark' signUpContent="Log in to your account"/>
            </div>
            <div className=" mt-10">
                <div className="flex justify-center">
                    <div className="flex flex-col">
                        <Otp />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default signIn;