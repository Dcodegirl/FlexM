import React, { useState } from 'react';
import Confirm from '../../components/template/Form/forgotConfirmation';
import NavHome from '../../components/layout/HomeNavBar';

const ForgotConfirm = () => {


    return (
        <div className="h-screen p-16 bg-[#Fafffd] bg-bg-pattern bg-cover bg-no-repeat">
            <div>
                <NavHome theme='dark' signUpContent="Forgot Password"/>
            </div>
            <div className=" mt-10">
                <div className="flex justify-center">
                    <div className="flex flex-col">
                        <Confirm />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ForgotConfirm;