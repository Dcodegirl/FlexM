import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ChartChad from '../ChartChad';

const BarChart = ({ }) => {

    const periods = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
    const [selectedPeriod, setSelectedPeriod] = useState('Monthly');

    const handlePeriodChange = (period) => {
        // Handle the period change logic here
        // You can fetch data for the selected period or perform any other actions
        console.log(`Selected Period: ${period}`);
        setSelectedPeriod(period);
    };
    return (
        <>
            <div className="bg-white p-8 rounded-md mt-8">
                <div className='flex gap-16 mb-24'>
                    <div>
                        <p className="text-deep-green font-medium my-4 text-3xl">Transactions</p>
                    </div>
                    {/* Add a bar or any other UI element for period selection */}
                    <div className="flex">
                        {periods.map((period) => (
                            <div
                                key={period}
                                className={`cursor-pointer p-2 w-48 flex items-center justify-center  ${selectedPeriod === period ? 'bg-[#3E215B] text-white text-center' : 'bg-[#F1F1F1] text-black text-center'
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
