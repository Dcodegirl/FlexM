import React from 'react';
import ChartChad from '../ChartChadPie';

const PieChart = () => {
    const data = [
        { name: 'Deposit', value: 400 },
        { name: 'Cashout', value: 300 },
        { name: 'Transfer', value: 300 },
    ];

    const colors = ['#0BC2FF', '#00B378', '#F09711'];
    const totalValue = data.reduce((total, entry) => total + entry.value, 0);

    return (
        <>
            <div className="bg-white p-8 rounded-md mt-8 w-full">
                <div>
                    <p className="text-deep-green font-medium my-4 text-3xl">Transaction Volume</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <ChartChad />
                    <div className="flex gap-10 -mt-20">
                        {data.map((entry, index) => (
                            <div key={`label-${index}`} className="flex items-center">
                                <div className="w-8 h-8 rounded-full mr-2" style={{ backgroundColor: colors[index % colors.length] }}></div>
                                <div className='flex flex-col gap-3 items-end mt-8'>
                                    <span className='text-xl'>{entry.name}</span>
                                    <p style={{ color: colors[index % colors.length] }}>{`${((entry.value / totalValue) * 100).toFixed(2)}%`}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PieChart;
