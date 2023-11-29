import React, { useState, useReducer, useEffect } from "react";
import person from '../../assets/icons/performance.svg'
import searchIcon from '../../assets/icons/mdi_search.svg';
import { AgentPerformanceData } from "../../features/dashboard/data/transactionData";

const agentPerformance = () => {
    const transactions = AgentPerformanceData();



    return (
        <>
            <div className="bg-white p-8 rounded-md mt-8 flex gap-10 items-center mb-8">
                <div>
                    <img src={person} alt="" />
                </div>
                <div className="flex flex-col text-[#111023] gap-3">
                    <p className="text-[16px]">Agents Performance</p>
                    <p className="font-medium text-xl">Manage your account settings and preferences</p>
                </div>
            </div>
            <div className="bg-white p-8 rounded-md mt-8">
                <div className="mb-8 flex justify-between text-[#494343]">
                    <div className="">
                        <p className="font-medium text-[16px]">Agent Details</p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <div className="relative">
                            <img src={searchIcon} alt="Search" className="absolute left-2 top-3  text-gray-400" />
                            <input type="text" placeholder="Search agents" className="pl-10 pr-2 border w-72 border-[#E5E5E5] text-[#C4C4C4] rounded-md p-2" />
                        </div>
                        <div>
                            <p>Sort by</p>
                        </div>
                        <div className="">
                            <select name="" id="" className="bg-[#F1F1F1] rounded py-1 px-2">
                                <option value="Agent Code">Agent Code</option>
                            </select>
                        </div>
                        <div className="">
                            <select name="" id="" className="bg-[#F1F1F1] rounded py-1 px-2">
                                <option value="Agent Code">Business Name</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="box">
                    <div className="">
                        <div className="grid grid-cols-8 p-8 font-medium text-xl bg-[#F1F1F1]">
                            <p>Agent Code</p>
                            <p>Business name</p>
                            <p>Cash count</p>
                            <p>Transfer count</p>
                            <p>Total count</p>
                            <p>Cash volume</p>
                            <p>Transfer volume</p>
                            <p>Total Amount</p>
                        </div>
                        {transactions.map((transaction, index) => (
                            <div key={index} className={`grid grid-cols-8 p-8 font-medium text-xl ${index % 2 === 0 ? 'bg-white' : 'bg-[#F1F1F1]'}`}>
                                <div className="text-wrapper-5">{transaction.agentCode}</div>
                                <div className="text-wrapper-6">{transaction.BusinessName}</div>
                                <div className="text-wrapper-6">{transaction.CashCount}</div>
                                <div className="text-wrapper-6">{transaction.TransferCount}</div>
                                <div className="text-wrapper-6">{transaction.TotalCount}</div>
                                <div className="text-wrapper-6">#{transaction.CashVolume.toLocaleString()}</div>
                                <div className="text-wrapper-6">#{transaction.TransferVolume.toLocaleString()}</div>
                                <div className="text-wrapper-6">#{transaction.TotalAmount.toLocaleString()}</div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </>
    )
}

export default agentPerformance;