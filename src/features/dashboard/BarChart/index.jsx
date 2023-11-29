import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ChartChad from '../ChartChad';

const BarChart = ({ }) => {

    const periods = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
    const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
    
    const handlePeriodSelect = (e) => {
        // Handle the period change logic here
        // You can fetch data for the selected period or perform any other actions
        console.log(`Selected Period: ${e.target.value}`);
        setSelectedPeriod(e.target.value);
    };

    const handlePeriodChange = (period) => {
        // Handle the period change logic here
        // You can fetch data for the selected period or perform any other actions
        console.log(`Selected Period: ${period}`);
        setSelectedPeriod(period);
    };
    return (
        <>
            <div className="bg-white p-8 rounded-md mt-8 w-full">

                <div className='flex md:gap-16 gap-6 mb-24 justify-between items-center'>
                    <div>
                        <p className="text-deep-green font-medium my-4 text-3xl">Transactions</p>
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
            
                    {/* Add a bar or any other UI element for period selection */}
                    <div className="flex md:flex hidden">
                        {periods.map((period) => (
                            <div
                                key={period}
                                className={`cursor-pointer p-2 md:w-48 w-30 flex items-center justify-center  ${selectedPeriod === period ? 'bg-[#3E215B] text-white text-center' : 'bg-[#F1F1F1] text-black text-center'
                                    } rounded-lg`}
                                onClick={() => handlePeriodChange(period)}
                            >
                                {period}
                            </div>
                        ))}
                    </div>
                </div>
                <ChartChad />
            </div>
        </>
    );
};

export default BarChart;
