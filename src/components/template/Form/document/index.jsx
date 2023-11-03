import React, { useState } from 'react'
import svg from '../../../../assets/images/Upload.svg'


function Document() {
    const [selectedDocument, setSelectedDocument] = useState('');
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleDocumentChange = (event) => {
        setSelectedDocument(event.target.value);
    };
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
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



    return (
        <>
            <div className='m-8'>
                <div className="p-16 bg-bg-green border-[#00BD7A40] rounded-3xl border">
                    <div className="text-deep-green font-bold text-center">
                        <p className='text-2xl'>Upload Document</p>
                        <p className="text-gray-700 text-xl font-thin w[360px]">Document</p>
                    </div>
                    <div className='w-[350px] mt-6'>
                        <form>
                            <p className='text-gray-700 text-sm mb-2'>Select Document Type:</p>
                            <select
                                className='bg-bg-green border-[#D0D5DD] border rounded-lg h-14 w-full mb-6 p-4'
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
                                    <div className=" flex gap-5 items-center">
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
                            {file && uploadProgress === 0 && (
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
                            )}

                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Document