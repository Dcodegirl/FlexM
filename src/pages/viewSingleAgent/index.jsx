import React, { useState, useEffect } from "react";
import person from '../../assets/icons/personWhite.svg';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { SingleAgentTransactionData } from "../../features/dashboard/data/transactionData";
import { useLocation } from 'react-router-dom';
import { useCustomToast } from "../../components/toast/useCustomToast";

const ViewSingleAgent = () => {
    const [transactions, setTransactions] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const agentCode = queryParams.get('agentCode') || 'Default Agent Code';
    const name = queryParams.get('name') || 'Default Name';
    const phoneNumber = queryParams.get('phoneNumber') || 'Default Phone Number';
    const agentId = queryParams.get('agentId');
    const [loading, setLoading] = useState(true);
    const [noResults, setNoResults] = useState(false);
    const [selectedTransactionType, setSelectedTransactionType] = useState('Transfer');
    const showToast  = useCustomToast();

    const fetchData = async () => {
        try {
            setLoading(true);
    
            const response = await SingleAgentTransactionData(agentId, selectedTransactionType, startDate, endDate);
            const data = response;
    
            if (response.status === 404) {
                throw new Error('Transactions not found');
            } else if (response.status === 400 || response.status === 422) {
                // Handle specific validation errors
                if (data && data.errors) {
                    Object.values(data.errors).flat().forEach(errorMessage => {
                        showToast(`${errorMessage}`, 'error');
                    });
                } else {
                    throw new Error('Invalid request. Please check your parameters.');
                }
            } else if (response.status >= 500) {
                throw new Error('Internal server error. Please try again later.');
            }
    
            setTransactions(data);
            setNoResults(data.length === 0);
            showToast('Transactions fetched successfully!', 'success');
        } catch (error) {
            console.error('Error fetching data:', error);
            showToast(`Error fetching transactions: ${error.message || 'Unknown error'}`, 'error');
        } finally {
            setLoading(false);
        }
    };
    

    const handleSearch = () => {
        if (startDate && endDate) {
            fetchData();
        } else {
            // Show an error message or handle the case where start and end dates are not selected
            showToast('Please select a start and end date', 'error');
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedTransactionType]);

    return (
        <>
            <div className="bg-white p-8 rounded-md mt-8 flex justify-between items-center mb-8">
                <div className="flex flex-col text-[#111023] gap-3">
                    <p className="text-3xl font-extrabold">{name}</p>
                    <div>
                        <p className="font-medium">{agentCode} </p>
                        <p className="font-medium">{phoneNumber}</p>
                    </div>
                </div>
                <NavLink to='/create-agent'>
                    <div className="bg-btn-purple px-6 py-3 flex gap-3 items-center justify-center text-white cursor-pointer">
                        <img src={person} alt="" />
                        <p className="font-medium text-[14px]">Create Agent</p>
                    </div>
                </NavLink>
            </div>
            <div className="bg-white p-8 rounded-md mt-8">
                <div className="mb-8 flex justify-between text-[#494343] md:flex-row flex-col">
                    <div className="">
                        <p className="font-medium text-[16px]">Agent Transaction</p>
                    </div>
                    <div className="flex md:flex-row flex-col gap-3 items-center">
                        <div className="flex gap-3 items-center">
                            <p>Sort by</p>
                            <div className="md:hidden block">
                                <select
                                    value={selectedTransactionType}
                                    onChange={(e) => setSelectedTransactionType(e.target.value)}
                                    className="bg-[#F1F1F1] rounded py-1 px-2"
                                >
                                    <option value="Transfer">Transfer</option>
                                    <option value="Cashout">Cashout</option>
                                    <option value="TotalFundTransfer">Total Funds Transfer</option>
                                </select>
                            </div>
                        </div>

                        <div className="md:block hidden">
                            <select
                                value={selectedTransactionType}
                                onChange={(e) => setSelectedTransactionType(e.target.value)}
                                className="bg-[#F1F1F1] rounded py-1 px-2"
                            >
                                <option value="Transfer">Transfer</option>
                                <option value="Cashout">Cashout</option>
                                <option value="TotalFundTransfer">Total Funds Transfer</option>
                            </select>
                        </div>
                        <div className="flex md:hidden justify-between items-center flex-row">
                            <div className="flex gap-3 items-center">
                                <div>
                                    <p>Start Date</p>
                                </div>
                                <div className="">
                                    <input
                                        className="bg-[#F1F1F1] rounded py-1 px-2"
                                        type="date"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        placeholder="Select Start Date"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 items-center">
                                <div>
                                    <p>End Date</p>
                                </div>
                                <div className="">
                                    <input
                                        className="bg-[#F1F1F1] rounded py-1 px-2"
                                        type="date"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        placeholder="Select End Date"
                                    />
                                </div>
                            </div>
                            <button className="bg-color1 text-white p-2 rounded" onClick={handleSearch}>
                                Search
                            </button>
                        </div>
                        <div className="md:block hidden">
                            <p>Start Date</p>
                        </div>
                        <div className="md:block hidden">
                            <input
                                className="bg-[#F1F1F1] rounded py-1 px-2"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                placeholder="Select Start Date"
                            />
                        </div>
                        <div className="md:block hidden">
                            <p>End Date</p>
                        </div>
                        {/* Date input for end date */}
                        <div className="md:block hidden">
                            <input
                                className="bg-[#F1F1F1] rounded py-1 px-2"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                placeholder="Select End Date"
                            />
                        </div>
                        <button className="bg-color1 md:block hidden text-white p-2 rounded" onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                </div>
                <div className="box overflow-x-auto md:overflow-x-hidden">
                    <div className="md:w-full w-[1100px]">

                        <div className="grid grid-cols-5  p-8 font-medium text-xl bg-[#F1F1F1]">
                            <p>Transaction ref</p>
                            <p>Transaction ID</p>
                            <p>Transaction type</p>
                            <p>Status</p>
                            <p>Date created</p>
                        </div>
                        {loading ? (
                            <p className="flex justify-center mt-8 text-xl">Loading......</p>
                        ) : transactions?.length === 0 ? (
                            <p className="flex justify-center mt-8 text-xl">No transactions to display under this agent.</p>
                        ) : (
                            transactions.map((transaction, index) => (<>
                                <div className="text-wrapper-6">{transaction.totalAmount?.toLocaleString()}</div><div key={index} className={`grid grid-cols-5 p-8 font-medium text-xl ${index % 2 === 0 ? 'bg-white' : 'bg-[#F1F1F1]'}`}>
                                    <div className="text-wrapper-5">{transaction.id}</div>
                                    <div className="text-wrapper-6">{transaction.transactionRef}</div>
                                    <div className="text-wrapper-6">{transaction.transactionId}</div>
                                    <div className="text-wrapper-6">{transaction.transactionType}</div>
                                    <div className="text-wrapper-6">{transaction.status}</div>
                                </div></>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </>
    );
};

export default ViewSingleAgent;
