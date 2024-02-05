import React from 'react';

const WalletLog = ({ transactions }) => {
  return (
    <div className="bg-white p-8 rounded-md mt-8 overflow-x-auto md:overflow-x-hidden">
      <div className=" w-[1200px]">
        <p className="text-deep-green font-medium my-4 text-3xl">Recent Transactions</p>

        {transactions && transactions.length > 0 ? (
          <div>
            <div className="grid grid-cols-6 grid-rows-1 p-8 font-medium text-xl bg-[#F1F1F1]">
              <span>Previous Balance</span>
              <span>Amount</span>
              <span>Description</span>
              <span>Current Balance</span>
              <span>Transaction Type</span>
              <span>Date</span>
            </div>
            <div>
              {transactions.map((transaction, index) => (
                <div
                  key={index}
                  className={`grid grid-cols-6 grid-rows-1 p-8 font-medium text-xl ${
                    index % 2 === 0 ? 'bg-white' : 'bg-[#F1F1F1]'
                  }`}
                >
                  <div className="text-wrapper-5">{transaction.previous_bal}</div>
                  <div className="text-wrapper-6">{transaction.amount}</div>
                  <div className="text-wrapper-6 w-64">{transaction.description}</div>
                  <div className="text-wrapper-6">{transaction.current_bal}</div>
                  <div className="text-wrapper-6">{transaction.type}</div>
                  <div className="text-wrapper-9">{transaction.date}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-4 mx-10 text-lg">No transactions found</div>
        )}
      </div>
    </div>
  );
};

export default WalletLog;
