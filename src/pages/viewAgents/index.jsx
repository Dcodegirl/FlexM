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
    const [searchBusinessName, setSearchBusinessName] = useState('');
    const [loading, setLoading] = useState(true);
    const [noResults, setNoResults] = useState(false);



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
    const handleAssignTerminalClick = (selectedTerminalId, selectedSerialNumber) => {
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

    const fetchData = async () => {
        try {
          // Replace 'searchInput' with the actual state or variable containing the search value
          const data = await AgentTransactionData(agent_id, "");
          setTransactions(data);
          setNoResults(data.length === 0);  // Set noResults state based on data length
          setLoading(false)
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false)
        }
      };
    
    useEffect(() => {
     
      fetchData();
      
    }, []);

    const handleSearch = (e) => {
    
        const searchValue = e.target.value
        if (searchValue.length > 0){
            setLoading(true);

            // Filter transactions based on the inputted business name
            const filteredTransactions = transactions.filter(
                (transaction) =>
                    transaction.businessName.toLowerCase().includes(searchBusinessName.toLowerCase())
            );
console.log(filteredTransactions);
    
            //setNoResults(filteredTransactions.length === 0); // Set noResults state based on filtered transactions
            if(filteredTransactions.length == 0) {
                setTransactions([]);
            }else {
                setTransactions(filteredTransactions);
            }
            setLoading(false);
        } else {
            fetchData()
        }

        setSearchBusinessName(e.target.value);
        console.log(e.target.value);
        if (e.key === 'Enter') {
            console.log(e.key);
            
        }
            // fetchData();

    };


    const selectedTransaction = transactions.find(transaction => transaction.id === selectedTransactionId);
    // Use react-router-dom to navigate to the ViewSingleAgent page
    
    return (
        <>
            {/* Render AssignTerminalModal if isAssignTerminalModalOpen is true */}
            {isAssignTerminalModalOpen && (
                <AssignTerminalModal isOpen={isAssignTerminalModalOpen} onClose={() => setIsAssignTerminalModalOpen(false)} 
                onAssignConfirmClick={() => setIsConfirmationModalOpen(true)} 
                />
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
                            <img src={searchIcon} alt="Search" className="absolute left-2 top-3  text-gray-400"  
                            

                               />
                            <input type="text" placeholder="Search agent by business name"
                             className="pl-10 pr-2 border w-72 border-[#E5E5E5] text-[#C4C4C4] rounded-md p-2"
                             value={searchBusinessName}
                             onChange={(e) => handleSearch(e)} />
                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col gap-3 items-center">
                        <div className="relative md:block hidden">
                            <img src={searchIcon} alt="Search" className="absolute left-2 top-3  text-gray-400" 
                             />
                            <input type="text" placeholder="Search agent by business name"  
                            value={searchBusinessName}
                             onChange={(e) => handleSearch(e)} 
                             className="pl-10 pr-2 border w-72 border-[#E5E5E5] text-[#C4C4C4] rounded-md p-2" />
                        </div>
                        {/* <div className="flex gap-3 justify-between items-center mt-3 md:mt-0">
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
                        </div> */}
                    </div>
                </div>

                <div className="box overflow-x-auto md:overflow-x-hidden">
    <div className="md:w-full w-[1200px]">
        <div className="grid grid-cols-8 grid-rows-1 p-8 font-medium text-xl bg-[#F1F1F1]">
            <p>Agent Code</p>
            <p>Name</p>
            <p>Business Name</p>
            <p>Phone Number</p>
            <p>Address</p>
            <p>Local Govt</p>
            <p>State</p>
        </div>
        
        {transactions.length === 0 ? (
                            <p className="text-red-500 text-center mt-4 text-xl">No agents found with the specified business name.</p>
                        ) : (
                            transactions.map((transaction, index) => (
                                <div key={index} className={`grid grid-cols-8 grid-rows-1 p-8 font-medium text-xl ${index % 2 === 0 ? 'bg-white' : 'bg-[#F1F1F1]'}`}>
                                    <div className="text-wrapper-6">{transaction.agentCode || 'NA'}</div>
                                    <div className="text-wrapper-6">{transaction.name || 'NA'}</div>
                                    <div className="text-wrapper-6">{transaction.businessName || 'NA'}</div>
                                    <div className="text-wrapper-6">{transaction.phoneNumber || 'NA'}</div>
                                    <div className="text-wrapper-6">{transaction.address || 'NA'}</div>
                                    <div className="text-wrapper-6">{transaction.localGovt || 'NA'}</div>
                                    <div className="text-wrapper-6">{transaction.state || 'NA'}</div>
                                    <div className="flex gap-3 relative">
                                        <div className="text-wrapper-6 cursor-pointer" onClick={() => handleMoreClick(transaction.id)}>
                                            <img src={more} alt="" />
                                        </div>
                                        <div className="absolute right-6 -top-8 md:right-2">
                                            {(isModalOpen && (selectedTransactionId === transaction.id)) && (
                                                <AgentDetailsModal agentDetails={selectedTransaction} onClose={closeModal} onAssignTerminalClick={handleAssignTerminalClick} />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}


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
