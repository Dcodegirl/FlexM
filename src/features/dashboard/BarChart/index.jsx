import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ChartChad from '../ChartChad';

const BarChart = ({ }) => {

    const periods = ['Weekly', 'Monthly', 'Yearly'];
    const [selectedPeriod, setSelectedPeriod] = useState('Monthly');

    const handlePeriodSelect = (e) => {
        setSelectedPeriod(e.target.value);
    };

    const handlePeriodChange = (period) => {
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
                    <div className="flex items-center justify-center gap-3 md:hidden">
                        <p>Sort By: </p>
                        <select onChange={handlePeriodSelect} className="border rounded bg-[#F1F1F1] py-1.5 px-3">
                            {periods.map((periodOption) => (
                                <option key={periodOption} value={periodOption.toLowerCase()}>
                                    {periodOption}
                                </option>
                            ))}
                        </select>
                    </div>


                    {/* Add a bar or any other UI element for period selection */}
                    <div className="md:flex hidden">
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
                <ChartChad period={selectedPeriod.toLowerCase()} />
            </div>
        </>
    );
};

export default BarChart;
