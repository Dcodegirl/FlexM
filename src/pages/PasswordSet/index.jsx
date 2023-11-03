import React, { useState } from 'react';
import PasswordSet from '../../components/template/Form/passwordSet';
import NavHome from '../../components/layout/HomeNavBar';

const ForgotWord = () => {


    return (
        <div className="h-screen p-16">
            <div>
                <NavHome theme='dark' signUpContent="Forgot Password"/>
            </div>
            <div className=" mt-10">
                <div className="flex justify-center">
                    <div className="flex flex-col">
                        <PasswordSet />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ForgotWord;