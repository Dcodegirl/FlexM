import React, { useState, useEffect } from "react";
import person from '../../assets/icons/performance.svg';
import searchIcon from '../../assets/icons/mdi_search.svg';
import { AgentPerformanceData } from "../../features/dashboard/data/transactionData";
import { useSelector } from 'react-redux';

const AgentPerformance = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchBusinessName, setSearchBusinessName] = useState('');
    const agentId = useSelector((state) => state.auth.user?.id);

    const fetchData = async () => {
        try {
          const data = await AgentPerformanceData(agentId, searchBusinessName);
          setTransactions(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching agent performance data:', error);
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, [agentId, searchBusinessName]);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            setLoading(true);
            fetchData();
          }
      };
    return (
        <>
            <div className="bg-white p-8 rounded-md mt-8 flex gap-10 items-center mb-8">
                <div>
                    <img src={person} alt="" />
                </div>
                <div className="flex flex-col text-[#111023] gap-3">
                    <p className="text-[16px]">Agents Performance</p>
                    <p className="font-medium text-xl">Manage your agent's performances</p>
                </div>
            </div>
            <div className="bg-white p-8 rounded-md mt-8">
                <div className="mb-8 flex md:flex-row flex-col md:justify-between text-[#494343]">
                    <div className="flex md:block justify-between">
                        <p className="font-medium text-[16px]">Agent Details</p>
                        <div className="relative md:hidden block">
                            <img src={searchIcon} alt="Search" className="absolute left-2 top-3  text-gray-400" />
                            <input type="text" placeholder="Search agents by business name"
                             value={searchBusinessName}
                             onChange={handleSearch}
                            className="pl-10 pr-2 border w-72 border-[#E5E5E5] text-[#C4C4C4] rounded-md p-2" />
                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col gap-3 items-center">
                        <div className="relative md:block hidden">
                            <img src={searchIcon} alt="Search" 
                             value={searchBusinessName}
                             onChange={handleSearch}
                            className="absolute left-2 top-3  text-gray-400" />
                            <input type="text" placeholder="Search agents by business name" className="pl-10 pr-2 border w-72 border-[#E5E5E5] text-[#C4C4C4] rounded-md p-2" />
                        </div>
                    </div>
                </div>
                <div className="box overflow-x-auto md:overflow-x-hidden">
                    <div className="md:w-full w-[1100px]">
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
                        {loading ? (
                            <p className="flex justify-center mt-8 text-xl">Loading...</p>
                        ) : transactions.length === 0 ? (
                            <p className="flex justify-center mt-8 text-xl">No agent to display under this aggregator.</p>
                        ) : (
                            transactions.map((transaction, index) => (
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
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AgentPerformance;
