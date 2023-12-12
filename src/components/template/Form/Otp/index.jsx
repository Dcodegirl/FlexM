import React, { useState, useRef, useEffect } from 'react'
import axios from '../../../../utils/axiosInstance';
import { useGlobalContext } from '../../../../custom-hooks/Context';

function Contact({ nextStep }) {
    const [timeLeft, setTimeLeft] = useState(600);
    const [otp, setotp] = useState(["", "", "", "", "", ""]);
    const [resendButtonDisabled, setResendButtonDisabled] = useState(true);
    const { setUserId } = useGlobalContext();

    const handleotpChange = (index, value) => {
        if (value >= 0 && value <= 9) {
            // Ensure the value is within the range 0-9
            const newotpDigits = [...otp];
            newotpDigits[index] = value;
            setotp(newotpDigits);

            // Automatically focus on the next input
            if (index < newotpDigits.length - 1 && value !== "") {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            // Timer has run out, enable the Resend OTP button
            setResendButtonDisabled(false);
        }
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };
    const isotpComplete = otp.every((digit) => digit !== "");
    useEffect(() => {
        for (let i = 0; i < otp.length; i++) {
            if (!otp[i]) {
                document.getElementById(`otp-input-${i}`).focus();
                break;
            }
        }
    }, [otp]);
    const handleKeyDown = (event, index) => {
        if (event.key === "Backspace" && index > 0 && !otp[index]) {
            // If the backspace key is pressed, and the current input is empty, focus on the previous input.
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isotpComplete) {
            try {
                const enteredotp = otp.join("");
                const payload = {
                    code: enteredotp
                }
                // You can now handle otp validation or form submission as needed
                // Call the API with Axios
                const response = await axios.post('/onboarding/confirm', payload);

                // Handle the response as needed
                const responseData = response.data;
                // Save the id to the global context using setUserId
                setUserId(responseData.data.id);


                nextStep();
            } catch (error) {
                console.error('API Error:', error);
                // Handle API errors
            }
        } else {
            alert("Please enter all 6 otp digits.");
        }
    };
    return (
        <>
            <div className='md:m-8 my-8 overflow-hidden'>
                <div className="md:p-16 py-16 px-8  md:bg-bg-green md:border-border-primary bg-white border-white rounded-3xl border">
                    <div className="text-deep-green font-bold text-center">
                        <p className='text-2xl'>Verify your otp</p>
                        <p className="text-gray-500 text-xl font-thin w-[360px]">we sent OTP to the number attached to your otp +2347065436765</p>
                    </div>
                    <div className='w-[350px] mt-6 flex items-center justify-center'>
                        <form onSubmit={handleSubmit} className=''>
                            <p className='text-gray-700 text-sm mb-2'>Your 6-Digit Code</p>
                            {otp.map((value, index) => (
                                <input
                                    key={index}
                                    type="tel"
                                    value={value}
                                    onChange={(e) => handleotpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    min="0"
                                    max="9"
                                    maxLength="1"
                                    required
                                    id={`otp-input-${index}`}
                                    tabIndex={index + 1}
                                    className='border md:bg-bg-green bg-white border-[#D0D5DD] h-16 w-14 text-center m-2 rounded-lg p-4'
                                />
                            ))}
                        </form>
                    </div>
                    <div className=" mt-4">
                        <div className=' text-right text-color1  -ml-8'>
                            {formatTime(timeLeft)}
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <p>I didn't get the code? {resendButtonDisabled ? 'Resend OTP' : <a href="#"><span className="text-color1 font-medium">Resend OTP</span></a>}</p>
                    </div>
                    <div className="flex p-2">
                        <button
                            // onClick={prevStep}
                            className="bg-global-gray border rounded-lg h-14 w-[30%] text-deep-green mx-auto"
                        >
                            <i className="fa-solid fa-left-long md:px-4 px-2"></i>Previous
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="bg-gradient-to-r hover:bg-gradient-to-l from-color1 to-color2 rounded-lg h-14 md:w-[60%] w-[30%] text-white mx-auto"
                        >
                            Next
                        </button>

                    </div>
                </div>
            </div>
        </>

    )
}

export default Contact