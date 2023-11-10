// TransactionData.jsx

const TransactionData = () => {
  // Fetch or provide your transaction data here
  const transactionData = [
    { agentCode: 'CI/AGT/LA/94659262', description: 'Cico/deposit/successful', amount: 5000, status: 'Successful', date: 'Friday 5th, 2022 6:45pm' },
    { agentCode: 'CI/AGT/LA/94659262', description: 'Cico/transfer/failed', amount: 4000, status: 'Failed', date: 'Friday 5th, 2022 6:45pm' },
    { agentCode: 'CI/AGT/LA/94659262', description: 'Cico/transfer/Pending', amount: 3000, status: 'Pending', date: 'Friday 5th, 2022 6:45pm' },
    { agentCode: 'CI/AGT/LA/94659262', description: 'Cico/deposit/successful', amount: 5000, status: 'Successful', date: 'Friday 5th, 2022 6:45pm' },
    { agentCode: 'CI/AGT/LA/94659262', description: 'Cico/transfer/failed', amount: 4000, status: 'Failed', date: 'Friday 5th, 2022 6:45pm' },
    { agentCode: 'CI/AGT/LA/94659262', description: 'Cico/transfer/Pending', amount: 3000, status: 'Pending', date: 'Friday 5th, 2022 6:45pm' },
    // Add more data as needed
  ];

  return transactionData;
};

export default TransactionData;
