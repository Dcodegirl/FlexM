import React, { useState, useEffect } from 'react';
import ChartChadPie from '../ChartChadPie';

const PieChart = () => {
  const periods = ['Weekly', 'Monthly', 'Yearly'];
  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
  const [chartData, setChartData] = useState({ totalValue: 0, data: [] });

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };
  const colors = ['#0BC2FF', '#00B378', '#F09711'];

  return (
    <>
      <div className="bg-white p-8 rounded-md mt-8 w-full">
        <div className="flex gap-1 items-center">
          <p className="text-deep-green font-medium my-4 text-3xl">Transaction Volume</p>
          <div className="md:flex hidden mt-2">
            {periods.map((period) => (
              <div
                key={period}
                className={`cursor-pointer p-1 md:w-48 h-10 w-30 flex items-center justify-center  ${selectedPeriod === period ? 'bg-[#3E215B] text-white text-center' : 'bg-[#F1F1F1] text-black text-center'
                  } rounded-lg`}
                onClick={() => handlePeriodChange(period)}
              >
                {period}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <ChartChadPie period={selectedPeriod.toLowerCase()} onDataUpdate={setChartData} />
          <div className="flex gap-10 -mt-20">
            {chartData.data.map((entry, index) => (
              <div key={`label-${index}`} className="flex items-center">
                <div className="w-8 h-8 rounded-full mr-2" style={{ backgroundColor: colors[index % colors.length] }}></div>
                <div className='flex flex-col gap-3 items-end mt-8'>
                  <span className='text-xl'>{entry.name}</span>
                  <p style={{ color: colors[index % colors.length] }}>{`${((entry.value / chartData.totalValue) * 100).toFixed(2)}%`}</p>
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
