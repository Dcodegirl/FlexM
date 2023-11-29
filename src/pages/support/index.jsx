import React, { useState } from "react";
import supportImage from '../../assets/icons/support.svg'
import dispute from '../../assets/icons/dispute.svg'

const support = () => {


    return (
        <>
            <div className="bg-white p-8 rounded-md mt-8 flex gap-10 items-center mb-8">
                <div>
                    <img src={supportImage} alt="" />
                </div>
                <div className="flex flex-col text-[#111023] gap-3">
                    <p className="text-[16px]">Support</p>
                    <p className="font-medium text-xl">Manage your account settings and preferences</p>
                </div>
            </div>
            <div className="bg-white p-8 rounded-md mt-8 flex items-center mb-8 justify-center h-[60vh]">
                <div>
                    <div className="mb-4">
                        <img src={dispute} alt="" /> 
                    </div>
                   <div>
                    <button className="bg-gradient-to-r hover:bg-gradient-to-l from-color1 to-color2  text-white px-6 py-3 w-full rounded-md">
                        Report a dispute
                    </button>
                   </div>
                </div>
                
            </div>
        </>
    )
}

export default support;