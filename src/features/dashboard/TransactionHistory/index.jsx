import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TransactionData from '../data/transactionData';
// import "./style.css";

const Trans = ({ }) => {

    const periods = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
    const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
    const transactions = TransactionData();

    const handlePeriodSelect = (e) => {
        // Handle the period change logic here
        // You can fetch data for the selected period or perform any other actions
        console.log(`Selected Period: ${e.target.value}`);
        setSelectedPeriod(e.target.value);
    };
    return (
        <>
            <div className="bg-white p-8 rounded-md mt-8">
                <div className='flex justify-between  mb-24'>
                    <div>
                        <p className="text-deep-green font-medium my-4 text-3xl">Recent Transactions</p>
                    </div>
                    {/* Add a bar or any other UI element for period selection */}
                    <div className="flex items-center justify-center gap-3">
                        <p>Sort By: </p>
                        <select onChange={handlePeriodSelect} className="border rounded bg-[#F1F1F1] py-1.5 px-3">
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Yearly">Yearly</option>
                        </select>
                    </div>
                </div>
                <div className="box">
                    <div className="">
                        <div className="grid grid-cols-5 grid-rows-1 p-8 font-medium text-xl bg-[#F1F1F1]">
                            <p>Agent Code</p>
                            <p>Description</p>
                            <p>Amount</p>
                            <p>Status</p>
                            <p>Date</p>
                        </div>
                        {transactions.map((transaction, index) => (
    <div key={index} className={`grid grid-cols-5 grid-rows-1 p-8 font-medium text-xl ${index % 2 === 0 ? 'bg-white' : 'bg-[#F1F1F1]'}`}>
        <div className="text-wrapper-5">{transaction.agentCode}</div>
        <div className="text-wrapper-6">{transaction.description}</div>
        <p style={{ color: 
            transaction.status === 'Successful' ? '#00B378' :
            transaction.status === 'Failed' ? '#FF1919' :
            '#FF9212'
        }}>
            <span className="span">N</span>
            <span className="text-wrapper-7">{transaction.amount}</span>
        </p>
        <div style={{ color: 
            transaction.status === 'Successful' ? '#00B378' :
            transaction.status === 'Failed' ? '#FF1919' :
            '#FF9212'
        }}>{transaction.status}</div>
        <div className="text-wrapper-9">{transaction.date}</div>
    </div>
))}

                    </div>
                </div>
            </div>
        </>
    );
};

export default Trans;
