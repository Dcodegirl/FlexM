import React, { useState } from 'react'
import svg from '../../../../assets/images/Upload.svg'
import downloadsvg from '../../../../assets/images/download.svg'
import warning from '../../../../assets/images/warning.svg'

function Guarantor() {
    const [selectedDocument, setSelectedDocument] = useState('');
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const downloadForm = () => {
        const fileUrl = process.env.PUBLIC_URL + '/GUARANTOR form.pdf';
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = 'GUARANTOR form.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    
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
                        <p className='text-2xl'>Guarantor Form</p>
                        <p className="text-gray-700 text-xl font-thin w[360px]">Download and Upload the Guarantor Form</p>
                    </div>
                    <div className='w-[350px] mt-6'>
                        <form>
                            <div className='bg-bg-green border-[#D0D5DD] border rounded-lg h-14 w-full mb-6 p-6 flex items-center justify-between'>
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
                                    className="bg-[#BEFEE9] py-2 px-4 mt-2 rounded-md text-deep-green"
                                    onClick={downloadForm}
                                >
                                    
                                    Download
                                </button>
                                </div>
                            </div>
                            <div className='bg-[#CDFEEE] rounded-lg h-14 w-full mb-6 p-6 flex items-center justify-between'>
                                <div className='flex gap-2 items-center'>
                                    <img
                                        src={warning} // Provide the actual path to your SVG upload icon
                                        alt="Upload Icon"
                                        className="h-10 w-10"
                                    />
                                    <div className='flex'>
                                        <p className="block text-deep-green text-sm">Make sure the form is fill and sign to be the person you know and trusted </p>
                                    </div>

                                </div>
                            </div>

                            <div className="relative">
                                <div className="border border-gray-300 border-dotted p-6 rounded-md h-16 w-full flex items-center">
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
                            {/* {file && uploadProgress === 0 && (
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
                                </div> */}
                            {/* )} */}

                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Guarantor