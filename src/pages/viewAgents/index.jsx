import React, { useState, useReducer, useEffect } from "react";
import person from '../../assets/icons/person.svg'
import searchIcon from '../../assets/icons/mdi_search.svg';
import { AgentTransactionData } from "../../features/dashboard/data/transactionData";
import more from '../../assets/icons/moreDot.svg'
import AgentDetailsModal from "../../features/dashboard/modal/AgentDetailsModal";



const ViewAgent = () => {
    const transactions = AgentTransactionData();
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleMoreClick = (agent) => {
        setSelectedAgent(agent);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedAgent(null);
        setIsModalOpen(false);
    };

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
                <div className="mb-8 flex justify-between text-[#494343]">
                    <div className="">
                        <p className="font-medium text-[16px]">Agent Details</p>
                    </div>
                    <div className="flex gap-3 items-center">
                        <div className="relative">
                            <img src={searchIcon} alt="Search" className="absolute left-2 top-3  text-gray-400" />
                            <input type="text" placeholder="Search transactions" className="pl-10 pr-2 border w-72 border-[#E5E5E5] text-[#C4C4C4] rounded-md p-2" />
                        </div>
                        <div>
                            <p>Sort by</p>
                        </div>
                        <div className="">
                            <select name="" id="" className="bg-[#F1F1F1] rounded py-1 px-2">
                                <option value="Agent Code">Agent Code</option>
                            </select>
                        </div>
                        <div className="">
                            <select name="" id="" className="bg-[#F1F1F1] rounded py-1 px-2">
                                <option value="Agent Code">Business Name</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="box">
                    <div className="">
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
                                <div className="text-wrapper-5">{transaction.agentCode}</div>
                                <div className="text-wrapper-6">{transaction.name}</div>
                                <div className="text-wrapper-6">{transaction.phoneNumber}</div>
                                <div className="text-wrapper-6">{transaction.address}</div>
                                <div className="text-wrapper-6">{transaction.localGovt}</div>
                                <div className="text-wrapper-6">{transaction.state}</div>
                                <div className="text-wrapper-6 cursor-pointer" onClick={handleMoreClick}><img src={more} alt="" /></div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            {isModalOpen && selectedAgent && (
                <AgentDetailsModal agentDetails={selectedAgent} onClose={closeModal} />
            )}
        </>
    );
};

export default ViewAgent;
