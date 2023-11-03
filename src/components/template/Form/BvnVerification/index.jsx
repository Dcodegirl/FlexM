import React, { useState } from 'react'
import svg from '../../../../assets/images/Upload.svg'
import downloadsvg from '../../../../assets/images/download.svg'
import warning from '../../../../assets/images/warning.svg'

function Guarantor() {
    const [selectedDocument, setSelectedDocument] = useState('');
    const [bvn, setBvn] = useState('');
    const [dob, setDob] = useState('');

    return (
        <>
            <div className='m-8'>
                <div className="p-16 bg-bg-green border-[#00BD7A40] rounded-3xl border">
                    <div className="text-deep-green font-bold text-center">
                        <p className='text-2xl'>Enter your BVN</p>
                        <p className="text-gray-700 text-xl font-thin w[360px]">Enter your 11 Digit BVN</p>
                    </div>
                    <div className='w-[350px] mt-6'>
                        <form>
                            <p className='text-gray-700 text-sm mb-2'>BVN</p>
                            <input
                                type="tel"
                                value={bvn}
                                onChange={(e) => setBvn(e.target.value)}
                                required
                                placeholder='Enter BVN'
                                className='bg-bg-green border-[#D0D5DD] border rounded-lg h-14 w-full mb-6 p-4'
                            />
                            <div className='bg-[#CDFEEE] rounded-lg h-14 w-full mb-6 p-6 flex items-center justify-between'>
                                <div className='flex gap-2 items-center'>
                                    <img
                                        src={warning} // Provide the actual path to your SVG upload icon
                                        alt="Upload Icon"
                                        className="h-10 w-10"
                                    />
                                    <div className='flex'>
                                        <p className="block text-deep-green text-sm">Dial *342*0# on your registered phone number to get your BVN</p>
                                    </div>
                                </div>
                            </div>
                            <p className='text-gray-700 text-sm mb-2'>Date of Birth</p>
                            <input
                                type="date"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                required
                                placeholder='00/00/0000'
                                className='bg-bg-green border-[#D0D5DD] border rounded-lg h-14 w-full mb-6 p-4'
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Guarantor