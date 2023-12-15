import React, { useState, useEffect } from 'react'
import svg from '../../../../assets/images/Upload.svg'
import ngn from '../../../../assets/images/nigeria.svg'
import downloadsvg from '../../../../assets/images/download.svg'
import { useGlobalContext } from '../../../../custom-hooks/Context'
import axios from '../../../../utils/axiosInstance'
import "./style.css";
import SuccessModal from '../../../layout/Modal/successModal'

function Document({ nextStep }) {
    const { setFirstname, setLastname, setAddress, firstname, lastname, address, country, setCountryId,
        state, userId } = useGlobalContext();
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedDocument, setSelectedDocument] = useState('');
    const [documentImage, setDocumentImage] = useState(null);
    const [utilityImage, setUtilityImage] = useState(null);
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const { successModalOpen, setSuccessModalOpen } = useGlobalContext();

    const handleDocumentChange = (event) => {
        setSelectedDocument(event.target.value);
    };
    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
    };
    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };
    const convertDocToBase64Document = (file) => {
        if (file) {
            try {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setDocumentImage(reader.result);
                };
                reader.readAsDataURL(file);
            } catch (error) {
                console.error('Error encoding document image:', error);
            }
        }
    };

    const convertUtilityToBase64Utility = (file) => {
        if (file) {
            try {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setUtilityImage(reader.result);
                };
                reader.readAsDataURL(file);
            } catch (error) {
                console.error('Error encoding utility image:', error);
            }
        }
    };
    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            try {
                convertDocToBase64Document(selectedFile);
                console.log('document image = ', selectedFile)
            } catch (error) {
                console.error('Error encoding image:', error);
            }
        }
    };

    // ... (your existing functions)

    const handleUtilityFileChange = async (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            try {
                convertUtilityToBase64Utility(selectedFile);
                console.log('utility image = ', selectedFile)
            } catch (error) {
                console.error('Error encoding utility image:', error);
            }
        }
    };
    
    const handlefirstnameChange = (event) => {
        setFirstname(event.target.value);
    };
    const handlelastnameChange = (event) => {
        setLastname(event.target.value);
    };
    const handleaddressnameChange = (event) => {
        setAddress(event.target.value);
    };
    const downloadForm = () => {
        // Replace with the actual URL of the form document to be downloaded
        const formDocumentURL = '/path-to-your-form-document.pdf';
        window.open(formDocumentURL);
    };

    const handleUpload = () => {
        // Simulate file upload progress (replace with actual upload logic)
        let progress = 0;
        const interval = setInterval(() => {
            if (progress < 100) {
                progress += 10;
                setUploadProgress(progress);
            } else {
                clearInterval(interval);
            }
        }, 1000);
    };
    useEffect(() => {
        console.log('state id = ', state);
        console.log('country id = ', country)
    }, [])

   
    const handleSubmit = async () => {
        try {
            const postData = {
                first_name: firstname,
                last_name: lastname,
                user_id: userId, // Replace with your logic to get the user ID
                business_address: address,
                country_id: country,
                state_id: state,
                document: {
                    type: selectedDocument,
                    image: documentImage,
                },
                utility: {
                    image: utilityImage,
                },
            };

            const response = await axios.post('/onboarding/bioData', postData);

            console.log('BioData submitted successfully:', response.data);
            setSuccessModalOpen(true);
        } catch (error) {
            console.error('Error submitting BioData:', error);
        }
    };

    return (
        <>
            <div className='md:m-8 my-8 overflow-hidden'>
                <div className="md:p-16 py-16 px-8  md:bg-bg-green md:border-border-primary bg-white border-white rounded-3xl border">
                    <div className="text-deep-green font-bold text-center">
                        <p className='text-2xl'>Biodata</p>
                        <p className="text-gray-700 text-xl font-thin w-[360px]">Be sure to enter your legal name as it appears on your government-issued ID</p>
                    </div>
                    <div className='w-[350px] mt-6'>
                        <form>
                            <div className="flex gap-5">
                                <div className=' w-full'>
                                    <p className='text-gray-700 text-sm mb-2'>Legal First Name</p>
                                    <input
                                        type="text"
                                        value={firstname}
                                        onChange={handlefirstnameChange}
                                        required
                                        readOnly
                                        placeholder='Type First Name'
                                        className='md:bg-bg-green bg-white border-[#D0D5DD] border rounded-lg h-14 w-full mb-6 p-4'
                                    />
                                </div>
                                <div className=' w-full'>
                                    <p className='text-gray-700 text-sm mb-2'>Legal Last Name</p>
                                    <input
                                        type="text"
                                        value={lastname}
                                        onChange={handlelastnameChange}
                                        required
                                        readOnly
                                        placeholder='Type Last Name'
                                        className='md:bg-bg-green bg-white border-[#D0D5DD] border rounded-lg h-14  w-full mb-6 p-4'
                                    />
                                </div>
                            </div>
                            <div>
                                <p className='text-gray-700 text-sm mb-2'>Address</p>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={handleaddressnameChange}
                                    required
                                    readOnly
                                    placeholder='Type Address'
                                    className='md:bg-bg-green bg-white border-[#D0D5DD] border rounded-lg h-14  w-full mb-6 p-4'
                                />
                            </div>
                            <div className="flex gap-5">
                                <div className=' w-full'>
                                    <p className='text-gray-700 text-sm mb-2'>Country</p>
                                    <select
                                        className='md:bg-bg-green bg-white border-[#D0D5DD] border rounded-lg h-14 w-full mb-6 p-4'
                                        value={selectedCountry}
                                        onChange={handleCountryChange}
                                    >
                                        <option value="" disabled hidden>
                                            {country ? country : 'Select Country'}
                                        </option>
                                        {/* Add other country options if needed */}
                                    </select>

                                </div>
                                <div className=' w-full'>
                                    <p className='text-gray-700 text-sm mb-2'>State</p>
                                    <select
                                        className='md:bg-bg-green bg-white border-[#D0D5DD] border rounded-lg h-14 w-full mb-6 p-4'
                                        value={selectedState}
                                        onChange={handleStateChange}
                                    >
                                        <option value="" disabled hidden>
                                            {state ? state : 'Select State'}
                                        </option>
                                        {/* Add other state options if needed */}
                                    </select>
                                </div>
                            </div>

                            <div className="text-deep-green font-bold text-left gap-2 mb-2 flex flex-col">
                                <p className='text-sm'>Guarantor Form</p>
                                <p className="text-gray-700 text-sm font-thin w-[360px]">Download and Upload a signed copy of this form in your profile</p>
                            </div>
                            <div className='md:bg-bg-green bg-white border-[#D0D5DD] border rounded-lg h-14 w-full mb-6 p-6 flex items-center justify-between'>
                                <div className='flex gap-2'>
                                    <img
                                        src={downloadsvg} // Provide the actual path to your SVG upload icon
                                        alt="Upload Icon"
                                        className="h-10 w-10"
                                    />
                                    <div className='flex flex-col'>
                                        <p className="text-sm text-gray-900">Download Guarantor Form</p>
                                        <p className="block text-gray-400 text-xs">Guarantor form | 10MB max.</p>
                                    </div>

                                </div>
                                <div className='mb-2'>
                                    <button
                                        type="button"
                                        className="bg-[#ECE9FC] py-2 px-4 mt-2 rounded-md text-deep-green"
                                        onClick={downloadForm}
                                    >
                                        Download
                                    </button>
                                </div>
                            </div>


                            <div className="text-deep-green font-bold text-left gap-2 mb-2">
                                <p className='text-sm'>Means of ID</p>
                                <p className="text-gray-700 text-sm font-thin w[360px]">Download and Upload a signed copy of this form in your profile</p>
                            </div>
                            <select
                                className='md:bg-bg-green bg-white border-[#D0D5DD] border rounded-lg h-14 w-full mb-6 p-4'
                                value={selectedDocument}
                                onChange={handleDocumentChange}
                            >
                                <option value="">Choose Document Type</option>
                                <option value="drivers-license">Driver's License</option>
                                <option value="nin-id">NIN ID</option>
                                <option value="int-passport">Int Passport</option>
                            </select>

                            <div className="relative">
                                <div className="border border-gray-300 border-dotted p-2 rounded-md h-16 w-full ">
                                    <div className=" flex gap-5 items-center justify-between">
                                        <div className='flex gap-2'>
                                            <img
                                                src={svg} // Provide the actual path to your SVG upload icon
                                                alt="Upload Icon"
                                                className="h-10 w-10"
                                            />
                                            <div className='flex flex-col'>
                                                <p className="text-sm text-gray-900">Tap to Upload</p>
                                                <p className="block text-gray-400 text-xs">PNG, JPG | 10MB max</p>
                                            </div>

                                        </div>
                                        <div>
                                            <input
                                                type="file"
                                                accept=".pdf, .jpg, .png"
                                                onChange={handleFileChange}
                                            />
                                        </div>

                                    </div>

                                </div>
                            </div>
                            {/* {documentImage && uploadProgress === 0 && (
                                <button
                                    type="button"
                                    className="bg-progress-green text-white p-2 mt-2 rounded-md"
                                    onClick={handleUpload}
                                >
                                    Upload
                                </button>
                            )}
                            {uploadProgress > 0 && (
                                <div className="relative mt-4">
                                    <div className="flex h-2 mb-4 overflow-hidden text-xs bg-progress-light rounded-xl">
                                        <div
                                            style={{ width: `${uploadProgress}%` }}
                                            className="flex flex-col text-center whitespace-nowrap text-white bg-progress-green shadow-none w-0 h-4"
                                        ></div>
                                    </div>
                                    <div className="flex mb-2 items-center justify-between">
                                        <div className="text-right">
                                            <span className="text-xs font-semibold inline-block text-progress-green">
                                                {uploadProgress}% <span> Completed</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )} */}
                            <div className='mt-6'>
                                <p className='text-gray-700 text-sm mb-2'>Utilities Bill</p>
                                <div className="relative">
                                    <div className="border border-gray-300 border-dotted p-2 rounded-md h-16 w-full ">
                                        <div className=" flex gap-5 items-center justify-between">
                                            <div className='flex gap-2'>
                                                <img
                                                    src={svg} // Provide the actual path to your SVG upload icon
                                                    alt="Upload Icon"
                                                    className="h-10 w-10"
                                                />
                                                <div className='flex flex-col'>
                                                    <p className="text-sm text-gray-900">Tap to Upload</p>
                                                    <p className="block text-gray-400 text-xs">PNG, JPG | 10MB max</p>
                                                </div>

                                            </div>
                                            <div>
                                                <input
                                                    type="file"
                                                    accept=".pdf, .jpg, .png"
                                                    onChange={handleUtilityFileChange}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                {/* {utilityImage && uploadProgress === 0 && (
                                    <button
                                        type="button"
                                        className="bg-progress-green text-white p-2 mt-2 rounded-md "
                                        onClick={handleUpload}
                                    >
                                        Upload
                                    </button>
                                )}
                                {uploadProgress > 0 && (
                                    <div className="relative mt-4">
                                        <div className="flex h-2 mb-4 overflow-hidden text-xs bg-progress-light rounded-xl">
                                            <div
                                                style={{ width: `${uploadProgress}%` }}
                                                className="flex flex-col text-center whitespace-nowrap text-white bg-progress-green shadow-none w-0 h-4"
                                            ></div>
                                        </div>
                                        <div className="flex mb-2 items-center justify-between">
                                            <div className="text-right">
                                                <span className="text-xs font-semibold inline-block text-progress-green">
                                                    {uploadProgress}% <span> Completed</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )} */}
                            </div>
                        </form>
                    </div>
                    <div className="flex p-2">
                        <button
                            onClick={handleSubmit}
                            className="bg-gradient-to-r hover:bg-gradient-to-l from-color1 to-color2 rounded-lg h-14 md:w-[60%] w-[30%] text-white mx-auto"
                        >
                            Submit
                        </button>

                    </div>
                </div>
            </div>
            {successModalOpen && <SuccessModal />}
        </>

    )
}

export default Document