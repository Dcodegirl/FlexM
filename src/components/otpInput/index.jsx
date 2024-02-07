import React from 'react';
import OtpInput from 'react-otp-input';
import "./index.css"

export default function OtpInputComp({otp, setOtp}) {
  
    const inlineStyles = {
      width: '66px !important',
      height: '66px !important,',
      border: '1px solid gray'
    }

  return (
    <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={4}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} style={inlineStyles}/>}
    />
  );
}
