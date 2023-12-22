import React, { useState, useReducer, useEffect } from "react";
import person from '../../assets/icons/person.svg'
import searchIcon from '../../assets/icons/mdi_search.svg';
import { AgentTransactionData } from "../../features/dashboard/data/transactionData";
import more from '../../assets/icons/moreDot.svg'
import AgentDetailsModal from "../../features/dashboard/modal/AgentDetailsModal";
import AssignTerminalModal from "../../features/dashboard/modal/AssignTerminalModal";
import ConfirmTerminalModal from "../../features/dashboard/modal/ConfirmTerminalModal";
import { useSelector } from "react-redux";



const ViewAgent = () => {
    const [transactions, setTransactions] = useState([]);
    const [selectedTransactionId, setSelectedTransactionId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAssignTerminalModalOpen, setIsAssignTerminalModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const agent_id = useSelector((state) => state.auth.user?.id);

    const handleMoreClick = (transactionId) => {

        setSelectedTransactionId(transactionId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedTransactionId(null);
        setIsModalOpen(false);
        setIsAssignTerminalModalOpen(false);
    };
    const handleConfirm = () => {
        setIsConfirmationModalOpen(false);
    };

    const handleCancel = () => {
        setIsConfirmationModalOpen(false);
    };
    const handleAssignTerminalClick = () => {
        setIsAssignTerminalModalOpen(true);
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest('.modal-content')) {
                closeModal();
            }
        };

        // Add event listener for clicks outside the modal
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await AgentTransactionData(agent_id);
            setTransactions(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

    const selectedTransaction = transactions.find(transaction => transaction.id === selectedTransactionId);
    // Use react-router-dom to navigate to the ViewSingleAgent page

    return (
        <>
            {/* Render AssignTerminalModal if isAssignTerminalModalOpen is true */}
            {isAssignTerminalModalOpen && (
                <AssignTerminalModal isOpen={isAssignTerminalModalOpen} onClose={() => setIsAssignTerminalModalOpen(false)} onAssignConfirmClick={() => setIsConfirmationModalOpen(true)} />
            )}
            <div className="bg-white p-8 rounded-md mt-8 flex gap-10 items-center mb-8">
                <div>
                    <img src={person} alt="" />
                </div>
                <div className="flex flex-col text-[#111023] gap-3">
                    <p className="text-[16px]">View Agents</p>
                    <p className="font-medium text-xl">Manage your agents</p>
                </div>
            </div>
            <div className="bg-white p-8 rounded-md mt-8">
                <div className="mb-8 flex md:flex-row flex-col md:justify-between text-[#494343] ">
                    <div className="flex md:block justify-between">
                        <p className="font-medium text-[16px]">Agent Details</p>
                        <div className="relative md:hidden block">
                            <img src={searchIcon} alt="Search" className="absolute left-2 top-3  text-gray-400" />
                            <input type="text" placeholder="Search transactions" className="pl-10 pr-2 border w-72 border-[#E5E5E5] text-[#C4C4C4] rounded-md p-2" />
                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col gap-3 items-center">
                        <div className="relative md:block hidden">
                            <img src={searchIcon} alt="Search" className="absolute left-2 top-3  text-gray-400" />
                            <input type="text" placeholder="Search transactions" className="pl-10 pr-2 border w-72 border-[#E5E5E5] text-[#C4C4C4] rounded-md p-2" />
                        </div>
                        <div className="flex gap-3 justify-between items-center mt-3 md:mt-0">
                            <p>Sort by</p>
                            <div className=" md:hidden block ">
                            <select name="" id="" className="bg-[#F1F1F1] rounded py-1 px-2">
                                <option value="Agent Code">Agent Code</option>
                            </select>
                        </div>
                        <div className="md:hidden block">
                            <select name="" id="" className="bg-[#F1F1F1] rounded py-1 px-2">
                                <option value="Agent Code">Business Name</option>
                            </select>
                        </div>
                        </div>
                        <div className=" md:block hidden">
                            <select name="" id="" className="bg-[#F1F1F1] rounded py-1 px-2">
                                <option value="Agent Code">Agent Code</option>
                            </select>
                        </div>
                        <div className="md:block hidden">
                            <select name="" id="" className="bg-[#F1F1F1] rounded py-1 px-2">
                                <option value="Agent Code">Business Name</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="box overflow-x-auto md:overflow-x-hidden">
                    <div className="md:w-full w-[1200px]">
                        <div className="grid grid-cols-7 grid-rows-1 p-8 font-medium text-xl bg-[#F1F1F1]">
                            <p>Agent Code</p>
                            <p>Name</p>
                            <p>Phone Number</p>
                            <p>Address</p>
                            <p>Local Govt</p>
                            <p>State</p>
                        </div>
                        {transactions.map((transaction, index) => (
                            <div key={index} className={`grid grid-cols-7 grid-rows-1 p-8 font-medium text-xl ${index % 2 === 0 ? 'bg-white' : 'bg-[#F1F1F1]'}`}>
                                <div className="text-wrapper-6">{transaction.agentCode}</div>
                                <div className="text-wrapper-6">{transaction.name}</div>
                                <div className="text-wrapper-6">{transaction.phoneNumber || 'NA'}</div>
                                <div className="text-wrapper-6">{transaction.address || 'NA'}</div>
                                <div className="text-wrapper-6">{transaction.localGovt || 'NA'}</div>
                                <div className="text-wrapper-6">{transaction.state || 'NA'}</div>
                                <div className="flex gap-3 relative">
                                    <div className="text-wrapper-6 cursor-pointer" onClick={() => handleMoreClick(transaction.id)}><img src={more} alt="" /></div>
                                    <div className="absolute right-6 -top-8 md:right-2">
                                        {(isModalOpen && (selectedTransactionId == transaction.id)) && (
                                            <AgentDetailsModal agentDetails={selectedTransaction} onClose={closeModal} onAssignTerminalClick={handleAssignTerminalClick} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            {/* Confirmation Modal */}
            <ConfirmTerminalModal
                isOpen={isConfirmationModalOpen}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />

        </>
    );
};

export default ViewAgent;
