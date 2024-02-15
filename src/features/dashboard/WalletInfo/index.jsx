import React, {useState} from "react";

// import styles from "./Balance.module.scss";


const WalletInfo = ({walletInfoProp}) => {



  return (
    <>
    <div className="bg-white p-8 rounded-md mt-8">
      <div>
        <p className="text-deep-green font-medium my-4 text-3xl">{walletInfoProp.title}</p>
      </div>
      <div className="flex flex-col text-[#494343] ">
        <p className="text-[12px]">Total Funds Transacted</p>
        <p className="font-medium text-xl">{walletInfoProp.amount}</p>
      </div>
    </div>
   </>
  );
};


export default WalletInfo;
