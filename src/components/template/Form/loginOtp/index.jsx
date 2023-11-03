import React, { useState, useRef, useEffect } from 'react'

function Contact() {
    const [timeLeft, setTimeLeft] = useState(600);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setotp] = useState(["", "", "", "", "", ""]);
    const [resendButtonDisabled, setResendButtonDisabled] = useState(true);

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
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isotpComplete) {
            const enteredotp = otp.join("");
            // You can now handle otp validation or form submission as needed
            console.log("Entered otp:", enteredotp);
        } else {
            alert("Please enter all 6 otp digits.");
        }
    };
    return (
        <>
            <div className='m-8'>
                <div className="p-16 bg-bg-green border-[#00BD7A40] rounded-3xl border">
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
                                    className='border border-[#D0D5DD] bg-bg-green h-16 w-14 text-center m-2 rounded-lg p-4'
                                />
                            ))}
                        </form>
                    </div>
                    <div className="text-[#00BD7A] mt-4 text-right w-[350px] ">
                        {formatTime(timeLeft)}
                    </div>
                    <div className="flex justify-center">
                    <p>I didn't get the code? {resendButtonDisabled ? 'Resend OTP' : <a href="#"><span className="text-[#00BD7A]">Resend OTP</span></a>}</p>
                </div>
                <div className='flex justify-center mt-2'>
              <button
              className="bg-cico-green  border rounded-lg h-14 w-full text-white mx-auto "
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