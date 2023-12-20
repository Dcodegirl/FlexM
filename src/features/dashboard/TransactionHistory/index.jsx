import React, { useState, useEffect } from 'react';
import { TransactionData, Transactions } from '../data/transactionData';

const Trans = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTransactionData = async (selectedPeriod) => {
        try {
            setLoading(true);
            const data = await TransactionData(selectedPeriod);
            setTransactions(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching transaction data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactionData(selectedPeriod);
    }, [selectedPeriod]);

    const handlePeriodSelect = (e) => {
        const selectedPeriod = e.target.value;
        console.log(`Selected Period: ${selectedPeriod}`);
        setSelectedPeriod(selectedPeriod);
    };
    const formatDate = (createdAt) => {
        const date = new Date(createdAt);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const getStatusLabel = (statusCode) => {
        switch (statusCode) {
            case '1':
                return 'Pending';
            case '2':
                return 'Successful';
            case '3':
                return 'Failed';
            default:
                return 'Unknown';
        }
    };

    return (
        <>
            <div className="bg-white p-8 rounded-md mt-8">
                <div className="flex justify-between mb-24">
                    <div>
                        <p className="text-deep-green font-medium my-4 text-3xl">Recent Transactions</p>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                        <p>Sort By: </p>
                        <select
                            onChange={handlePeriodSelect}
                            value={selectedPeriod}
                            className="border rounded bg-[#F1F1F1] py-1.5 px-3"
                        >
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Yearly">Yearly</option>
                        </select>
                    </div>
                </div>
                <div className="box overflow-x-auto md:overflow-x-hidden">
                    <div className="md:w-full w-[1000px]">
                        <table className="w-full border-collapse border border-gray-200">
                            <thead>
                                <tr className="bg-[#F1F1F1]">
                                    <th className="p-3">Agent Code</th>
                                    <th className="p-3">Description</th>
                                    <th className="p-3">Amount</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="p-3 text-center">
                                            Loading...
                                        </td>
                                    </tr>
                                ) : transactions.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="p-3 text-center">
                                            No transactions found
                                        </td>
                                    </tr>
                                ) : (
                                    transactions.map((transaction, index) => (
                                        <tr
                                            key={index}
                                            className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#F1F1F1]'
                                                } text-center`}
                                        >
                                            <td className="p-3">{transaction.agent_code}</td>
                                            <td className="p-3">{transaction.status_description}</td>
                                            <td
                                                style={{
                                                    color:
                                                        transaction.status === 'Successful'
                                                            ? '#00B378'
                                                            : transaction.status === 'Failed'
                                                                ? '#FF1919'
                                                                : '#FF9212',
                                                }}
                                                className="p-3"
                                            >
                                                <span className="span">N</span>
                                                {transaction.amount}
                                            </td>
                                            <td
                                                style={{
                                                    color:
                                                        transaction.status === 'Successful'
                                                            ? '#00B378'
                                                            : transaction.status === 'Failed'
                                                                ? '#FF1919'
                                                                : '#FF9212',
                                                }}
                                                className="p-3"
                                            >
                                                {getStatusLabel(transaction.status)}
                                            </td>

                                            <td className="p-3">{formatDate(transaction.created_at)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Trans;
