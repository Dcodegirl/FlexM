import React, { useState } from 'react';
import ForgotPass from '../../components/template/Form/forgotPassword';
import NavHome from '../../components/layout/HomeNavBar';

const ForgotWord = () => {


    return (
        <div className="h-screen p-16 bg-[#Fafffd] bg-bg-pattern bg-cover bg-no-repeat">
            <div>
                <NavHome theme='dark' signUpContent="Forgot Password"/>
            </div>
            <div className=" mt-10">
                <div className="flex justify-center">
                    <div className="flex flex-col">
                        <ForgotPass />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ForgotWord;