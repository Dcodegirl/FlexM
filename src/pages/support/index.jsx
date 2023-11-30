import React, { useState } from "react";
import supportImage from '../../assets/icons/support.svg'
import dispute from '../../assets/icons/dispute.svg'

const Support = () => {
    const [showDisputeForm, setShowDisputeForm] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [priority, setPriority] = useState('');
    const [subject, setSubject] = useState('');
    const [address, setAddress] = useState('');
    const [selectedIssue, setSelectedIssue] = useState('');
    const [selectedSub, setSelectedSub] = useState('');
    const [dob, setDob] = useState('');

    const handleDisputeClick = () => {
        setShowDisputeForm(!showDisputeForm);
    };
    const handlefirstnameChange = (event) => {
        setFirstname(event.target.value);
    };
    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePriorityChange = (event) => {
        setPriority(event.target.value);
    };
    const handleaddressnameChange = (event) => {
        setAddress(event.target.value);
    };
    const handleIssuedChange = (event) => {
        setSelectedIssue(event.target.value);
    };
    const handleSubChange = (event) => {
        setSelectedSub(event.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted!');
        // You can add additional logic, such as redirecting the user or handling the form data.
    };

    return (
        <>
            <div className="bg-white p-8 rounded-md mt-8 flex gap-10 items-center mb-8">
                <div>
                    <img src={supportImage} alt="" />
                </div>
                <div className="flex flex-col text-[#111023] gap-3">
                    <p className="text-[16px]">Support</p>
                    <p className="font-medium text-xl">Manage your account settings and preferences</p>
                </div>
            </div>
            <div className="bg-white p-8 rounded-md mt-8 flex items-center mb-8 justify-center h-[70vh]">
                <div>

                    {showDisputeForm ? (
                        <form onSubmit={handleFormSubmit}>
                            {/* Render your dispute form or content here */}
                            <div className="mb-4">
                                <div className=' w-full'>
                                    <p className='text-gray-700 text-xl mb-2 font-medium'>Issued Type</p>
                                    <select
                                        className=' bg-white border-[#D0D5DD] border rounded-lg h-20 md:w-[244px]  w-96 mb-6 p-4'
                                        value={selectedIssue}
                                        onChange={handleIssuedChange}
                                    >
                                        <option value="">Choose</option>
                                    </select>
                                </div>
                                <div className=' w-full'>
                                    <p className='text-gray-700 text-xl mb-2 font-medium'>Sub-Type</p>
                                    <select
                                        className=' bg-white border-[#D0D5DD] border rounded-lg h-20 md:w-[244px]  w-96 mb-6 p-4'
                                        value={selectedSub}
                                        onChange={handleSubChange}
                                    >
                                        <option value="">Choose</option>
                                    </select>
                                </div>
                                <div className=''>
                                    <p className='text-gray-700 text-xl mb-2 font-medium'>Subject</p>
                                    <input
                                        type="text"
                                        value={subject}
                                        onChange={handleSubjectChange}
                                        required
                                        placeholder='Type subject'
                                        className='bg-white border-[#D0D5DD] border rounded-lg h-20  md:w-[244px]  w-96 mb-6 p-4'
                                    />
                                </div>
                                <div className=''>
                                    <p className='text-gray-700 text-xl mb-2 font-medium'>Body</p>
                                    <textarea
                                        value={subject}
                                        onChange={handleSubjectChange}
                                        required
                                        placeholder='Type subject'
                                        className='bg-white border-[#D0D5DD] border rounded-lg h-20 md:w-[244px]  w-96 mb-6 p-4 resize-none'
                                    />
                                </div>
                                <div className=' w-full'>
                                    <p className='text-gray-700 text-xl mb-2 font-medium'>Priority Level</p>
                                    <select
                                        className=' bg-white border-[#D0D5DD] border rounded-lg h-20 md:w-[244px] w-96 mb-6 p-4'
                                        value={priority}
                                        onChange={handlePriorityChange}
                                    >
                                        <option value="">Choose</option>
                                    </select>
                                </div>

                            </div>
                            {/* You can add form fields and other form elements here */}
                            <button
                                type="submit"
                                className="bg-gradient-to-r hover:bg-gradient-to-l from-color1 to-color2 text-white px-6 py-3 w-full rounded-md"
                            >
                                Submit
                            </button>
                        </form>
                    ) : (
                        <div>
                            <div className="mb-4">
                                <img src={dispute} alt="" />
                            </div>
                            <div>
                                <button
                                    className="bg-gradient-to-r hover:bg-gradient-to-l from-color1 to-color2 text-white px-6 py-3 w-full rounded-md"
                                    onClick={handleDisputeClick}
                                >
                                    Report a dispute
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Support;
