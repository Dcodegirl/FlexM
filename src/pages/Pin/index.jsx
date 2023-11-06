import React, { useState } from 'react';
import NavHome from '../../components/layout/HomeNavBar';
import SignUpPin from '../../components/template/Form/pin';

const Pin = () => {


    return (
        <div className="h-screen p-16 bg-[#Fafffd] bg-bg-pattern bg-cover bg-no-repeat">
            <div>
                <NavHome theme='dark' signUpContent="Setup a transaction PIN"/>
            </div>
            <div className=" mt-10">
                <div className="flex justify-center">
                    <div className="flex flex-col">
                        <SignUpPin/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Pin;