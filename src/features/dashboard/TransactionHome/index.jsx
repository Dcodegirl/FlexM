import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import "./style.css";

const Trans = ({ }) => {

    const periods = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
    const [selectedPeriod, setSelectedPeriod] = useState('Monthly');

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
                        <div className="grid grid-cols-5 grid-rows-1 p-8 font-medium text-xl  bg-white">
                            <div className="text-wrapper-5">CI/AGT/LA/94659262</div>
                            <div className="text-wrapper-6">Cico/deposit/successful</div>
                            <p className="n">
                                <span className="span">N</span>
                                <span className="text-wrapper-7">5000</span>
                            </p>
                            <div className="text-wrapper-8">Successful</div>
                            <div className="text-wrapper-9">Friday 5th, 2022 6:45pm</div>
                        </div>
                        <div className="grid grid-cols-5 grid-rows-1 p-8 font-medium text-xl  bg-[#F1F1F1]">
                            <div className="text-wrapper-5">CI/AGT/LA/94659262</div>
                            <div className="text-wrapper-6">Cico/deposit/successful</div>
                            <p className="n">
                                <span className="span">N</span>
                                <span className="text-wrapper-7">5000</span>
                            </p>
                            <div className="text-wrapper-8">Successful</div>
                            <div className="text-wrapper-9">Friday 5th, 2022 6:45pm</div>
                        </div>
                        <div className="grid grid-cols-5 grid-rows-1 p-8 font-medium text-xl  bg-white">
                            <div className="text-wrapper-10">CI/AGT/LA/94659262</div>
                            <div className="text-wrapper-11">Cico/deposit/successful</div>
                            <p className="p">
                                <span className="span">N</span>
                                <span className="text-wrapper-7">5000</span>
                            </p>
                            <div className="text-wrapper-12">Successful</div>
                            <div className="text-wrapper-13">Friday 5th, 2022 6:45pm</div>
                        </div>
                        <div className="grid grid-cols-5 grid-rows-1 p-8 font-medium text-xl  bg-[#F1F1F1]">
                            <div className="text-wrapper-5">CI/AGT/LA/94659262</div>
                            <div className="text-wrapper-6">Cico/deposit/successful</div>
                            <p className="n">
                                <span className="span">N</span>
                                <span className="text-wrapper-7">5000</span>
                            </p>
                            <div className="text-wrapper-8">Successful</div>
                            <div className="text-wrapper-9">Friday 5th, 2022 6:45pm</div>
                        </div>
                        <div className="grid grid-cols-5 grid-rows-1 p-8 font-medium text-xl bg-white">
                            <div className="text-wrapper-5">CI/AGT/LA/94659262</div>
                            <div className="text-wrapper-6">Cico/deposit/successful</div>
                            <p className="n">
                                <span className="span">N</span>
                                <span className="text-wrapper-7">5000</span>
                            </p>
                            <div className="text-wrapper-8">Successful</div>
                            <div className="text-wrapper-9">Friday 5th, 2022 6:45pm</div>
                        </div>
                        <div className="grid grid-cols-5 grid-rows-1 p-8 font-medium text-xl  bg-[#F1F1F1]">
                            <div className="text-wrapper-10">CI/AGT/LA/94659262</div>
                            <div className="text-wrapper-11">Cico/deposit/successful</div>
                            <p className="p">
                                <span className="span">N</span>
                                <span className="text-wrapper-7">5000</span>
                            </p>
                            <div className="text-wrapper-12">Successful</div>
                            <div className="text-wrapper-13">Friday 5th, 2022 6:45pm</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Trans;
