import React, { useState , useEffect} from 'react';
import { connect } from 'react-redux';
import TransactionDetailsModal from '../../dashboard/modal/TransactionDetailsModal';
import more from '../../../assets/icons/moreDot.svg'
import { fetchTransactionsData } from '../../dashboard/data/transactionData';
// import "./style.css";
import { useSelector } from 'react-redux';

const TransactionLog = ({ user }) => {

    
    const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
    const [selectedTransactionId, setSelectedTransactionId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const agentId = useSelector((state) => state.auth.user?.id);

    const handlePeriodSelect = (e) => {
        // Handle the period change logic here
        // You can fetch data for the selected period or perform any other actions
        console.log(`Selected Period: ${e.target.value}`);
        setSelectedPeriod(e.target.value);
    };
    const handleMoreClick = (transactionId) => {

        setSelectedTransactionId(transactionId);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setSelectedTransactionId(null);
        setIsModalOpen(false);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (agentId) {
                    
                    // Extract the 'id' from the user data in Redux state
                    const agentId = agentId;
    
                    // Fetch transactions data using the agentId
                    const transactionData = await fetchTransactionsData(agentId);
                    setTransactions(transactionData);
                } else {
                    console.error("User data not found in Redux state");
                }
            } catch (error) {
                console.error("Error fetching transaction data:", error);
            }
        };
    
        fetchData();
    }, [user]);
    
    
    
    useEffect(() => {
        const handleOutsideClick = (e) => {
            // Close the modal if the click is outside the modal content
            if (!e.target.closest('.modal-content')) {
                closeModal();
            }
        };

        // Add event listener for clicks outside the modal
        document.addEventListener('mousedown', handleOutsideClick);
        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []); // Ensure that closeModal is accessible within this scope
    
    return (
        <>
            <div className="bg-white p-8 rounded-md mt-8">
                <div className='flex md:flex-row flex-col  justify-between  mb-24'>
                    <div>
                        <p className="text-deep-green font-medium my-4 text-3xl">All Transactions</p>
                    </div>
                    {/* Add a bar or any other UI element for period selection */}
                    <div className="flex md:flex-row flex-col gap-3 items-center">
                        <div className="flex gap-3 items-center">
                            <p>Sort by</p>
                            
                        <div className="md:hidden block">
                            <select name="" id="" className="bg-[#F1F1F1] rounded py-1 px-2">
                                <option value="Agent Code">Transaction type</option>
                            </select>
                        </div>
                        </div>
                        <div className="md:block hidden">
                            <select name="" id="" className="bg-[#F1F1F1] rounded py-1 px-2">
                                <option value="Agent Code">Transaction type</option>
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
                        {/* Date input for end date */}
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
                    </div>
                </div>
                <div className="box  overflow-x-auto md:overflow-x-hidden">
                    <div className="md:w-full w-[1000px]">
                        <div className="grid grid-cols-8 p-8 font-medium text-xl bg-[#F1F1F1]">
                            <p>Previous Balanace</p>
                            <p>Amount</p>
                            <p>Description</p>
                            <p>Status</p>
                            <p>Curent Balanace</p>
                            <p>Transaction Type</p>
                            <p>Date</p>
                        </div>
                        {transactions.map((transaction, index) => (
                            <div key={index} className={`grid grid-cols-8 p-8 font-medium text-xl ${index % 2 === 0 ? 'bg-white' : 'bg-[#F1F1F1]'}`}>
                                <div className="text-wrapper-5">
                                <span className="span">₦</span>
                                <span className="text-wrapper-7">{transaction.PreviousBalance}</span>
                                    </div>
                                <p>
                                    <span className="span">₦</span>
                                    <span className="text-wrapper-7">{transaction.Amount}</span>
                                </p>
                                <div className="text-wrapper-6 w-48">{transaction.Description}</div>
                                <div style={{
                                    color:
                                        transaction.status === 'Successful' ? '#00B378' :
                                            transaction.status === 'Failed' ? '#FF1919' :
                                                '#FF9212'
                                }}>{transaction.status}</div>
                                <div className="text-wrapper-9">{transaction.CurrentBalance}</div>
                                <div className="text-wrapper-9">{transaction.TransactionType}</div>
                                <div className="text-wrapper-9">{transaction.date}</div>
                                <div className="flex gap-3 relative">
                                    <div className="text-wrapper-6 cursor-pointer" onClick={() => handleMoreClick(transaction.id)}><img src={more} alt="" /></div>
                                    <div className="absolute right-6 -top-8 md:right-2">
                                        {(isModalOpen && (selectedTransactionId == transaction.id)) && (
                                            <TransactionDetailsModal onClose={closeModal}  />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </>
    );
};
const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    };
};

export default TransactionLog;
