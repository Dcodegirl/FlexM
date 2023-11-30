// TransactionData.jsx

export const TransactionData = () => {
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
export const Transactions = () => {
  // Fetch or provide your transaction data here
  const transactions = [
    {id:1, PreviousBalance : '24,000.45', Amount: '5000', Description : 'Commission on transaction with ref: CICO', status: 'Successful', CurrentBalance : '19,000.23', TransactionType :'Transfer ' , date: 'Friday 5th, 2022 6:45pm' },
    {id:2, PreviousBalance : '24,000.45', Amount: '5000', Description : 'Commission on transaction with ref: CICO', status: 'Successful', CurrentBalance : '19,000.23', TransactionType :'Transfer ' , date: 'Friday 5th, 2022 6:45pm' },    
    {id:3, PreviousBalance : '24,000.45', Amount: '5000', Description : 'Commission on transaction with ref: CICO', status: 'Failed', CurrentBalance : '19,000.23', TransactionType :'Transfer ' , date: 'Friday 5th, 2022 6:45pm' },    
    {id:4, PreviousBalance : '24,000.45', Amount: '5000', Description : 'Commission on transaction with ref: CICO', status: 'Pending', CurrentBalance : '19,000.23', TransactionType :'Transfer ' , date: 'Friday 5th, 2022 6:45pm' },
    {id:5, PreviousBalance : '24,000.45', Amount: '5000', Description : 'Commission on transaction with ref: CICO', status: 'Failed', CurrentBalance : '19,000.23', TransactionType :'Transfer ' , date: 'Friday 5th, 2022 6:45pm' },
    {id:6, PreviousBalance : '24,000.45', Amount: '5000', Description : 'Commission on transaction with ref: CICO', status: 'Successful', CurrentBalance : '19,000.23', TransactionType :'Transfer ' , date: 'Friday 5th, 2022 6:45pm' },
    {id:7, PreviousBalance : '24,000.45', Amount: '5000', Description : 'Commission on transaction with ref: CICO', status: 'Pending', CurrentBalance : '19,000.23', TransactionType :'Transfer ' , date: 'Friday 5th, 2022 6:45pm' },
    {id:8, PreviousBalance : '24,000.45', Amount: '5000', Description : 'Commission on transaction with ref: CICO', status: 'Pending', CurrentBalance : '19,000.23', TransactionType :'Transfer ' , date: 'Friday 5th, 2022 6:45pm' },
    {id:9, PreviousBalance : '24,000.45', Amount: '5000', Description : 'Commission on transaction with ref: CICO', status: 'Failed', CurrentBalance : '19,000.23', TransactionType :'Transfer ' , date: 'Friday 5th, 2022 6:45pm' },
    {id:10, PreviousBalance : '24,000.45', Amount: '5000', Description : 'Commission on transaction with ref: CICO', status: 'Pending', CurrentBalance : '19,000.23', TransactionType :'Transfer ' , date: 'Friday 5th, 2022 6:45pm' },
    {id:11, PreviousBalance : '24,000.45', Amount: '5000', Description : 'Commission on transaction with ref: CICO', status: 'Failed', CurrentBalance : '19,000.23', TransactionType :'Transfer ' , date: 'Friday 5th, 2022 6:45pm' },    // Add more data as needed
  ];

  return transactions;
};
export const AgentTransactionData = () => {
  // Fetch or provide your transaction data here
  const agentTansaction = [
    { id:1 , agentCode: 'CI/AGT/LA/94659262', name: 'Jummzyy Venture', phoneNumber: +2347065292789, address: 'No 5, Ileri Ayoola Ogba', localGovt: 'Ikeja North', state: 'Lagos State' },
    { id: 2, agentCode: 'CI/AGT/LA/94659262', name: 'Kaleb Enterprises', phoneNumber: +2347065292789, address: 'No 5, Ileri Ayoola Ogba', localGovt: 'Ikeja North', state: 'Lagos State' },
    { id: 3, agentCode: 'CI/AGT/LA/94659262', name: 'Solo Squard', phoneNumber: +2347065292789, address: 'No 5, Ileri Ayoola Ogba', localGovt: 'Ikeja North', state: 'Lagos State' },
    { id: 4, agentCode: 'CI/AGT/LA/94659262', name: 'Welllness  HQ', phoneNumber: +2347065292789, address: 'No 5, Ileri Ayoola Ogba', localGovt: 'Ikeja North', state: 'Lagos State' },
    { id: 5, agentCode: 'CI/AGT/LA/94659262', name: 'GDM Consult', phoneNumber: +2347065292789, address: 'No 5, Ileri Ayoola Ogba', localGovt: 'Ikeja North', state: 'Lagos State' },
    { id: 6, agentCode: 'CI/AGT/LA/94659262', name: 'DAggregate', phoneNumber: +2347065292789, address: 'No 5, Ileri Ayoola Ogba', localGovt: 'Ikeja North', state: 'Lagos State' },
    { id: 7, agentCode: 'CI/AGT/LA/94659262', name: 'EIC', phoneNumber: +2347065292789, address: 'No 5, Ileri Ayoola Ogba', localGovt: 'Ikeja North', state: 'Lagos State' },
    { id: 8, agentCode: 'CI/AGT/LA/94659262', name: 'StartUp Lagos', phoneNumber: +2347065292789, address: 'No 5, Ileri Ayoola Ogba', localGovt: 'Ikeja North', state: 'Lagos State' },
    { id: 9, agentCode: 'CI/AGT/LA/94659262', name: 'DPrmix', phoneNumber: +2347065292789, address: 'No 5, Ileri Ayoola Ogba', localGovt: 'Ikeja North', state: 'Lagos State' },
    { id: 10, agentCode: 'CI/AGT/LA/94659262', name: 'Hazon Tech', phoneNumber: +2347065292789, address: 'No 5, Ileri Ayoola Ogba', localGovt: 'Ikeja North', state: 'Lagos State' },
    { id: 11, agentCode: 'CI/AGT/LA/94659262', name: 'VIGA Enterprises', phoneNumber: +2347065292789, address: 'No 5, Ileri Ayoola Ogba', localGovt: 'Ikeja North', state: 'Lagos State' },
    // Add more data as needed
  ];

  return agentTansaction;
};

export const SingleAgentTransactionData = () => {
  // Fetch or provide your transaction data here
  const agentTansaction = [
    { id:1 , TransactionRef: 'CiCO_KU9HYMS3BFAEZP7', TransactionID: 'A0000000041010', TransactionType: 'Deposit', Status: 'Successful', date: '2022-07-09 14:02:24'},
    { id: 2, TransactionRef: 'CiCO_KU9HYMS3BFAEZP7', TransactionID: 'A0000000041010', TransactionType: 'DSTV', Status: 'Failed', date: '2022-07-09 14:02:24'},
    { id: 3, TransactionRef: 'CiCO_KU9HYMS3BFAEZP7', TransactionID: 'A0000000041010', TransactionType: 'Deposit', Status: 'Successful', date: '2022-07-09 14:02:24'},
    { id: 4, TransactionRef: 'CiCO_KU9HYMS3BFAEZP7', TransactionID: 'A0000000041010', TransactionType: 'Deposit', Status: 'Failed', date: '2022-07-09 14:02:24'},
    { id: 5, TransactionRef: 'CiCO_KU9HYMS3BFAEZP7', TransactionID: 'A0000000041010', TransactionType: 'Airtime', Status: 'Pending', date: '2022-07-09 14:02:24'},
    { id: 6, TransactionRef: 'CiCO_KU9HYMS3BFAEZP7', TransactionID: 'A0000000041010', TransactionType: 'GOTV', Status: 'Successful', date: '2022-07-09 14:02:24'},
    { id: 7, TransactionRef: 'CiCO_KU9HYMS3BFAEZP7', TransactionID: 'A0000000041010', TransactionType: 'Airtime', Status: 'Failed', date: '2022-07-09 14:02:24'},
    { id: 8, TransactionRef: 'CiCO_KU9HYMS3BFAEZP7', TransactionID: 'A0000000041010', TransactionType: 'Transfer', Status: 'Pending', date: '2022-07-09 14:02:24'},
    { id: 9, TransactionRef: 'CiCO_KU9HYMS3BFAEZP7', TransactionID: 'A0000000041010', TransactionType: 'Deposit', Status: 'Pending', date: '2022-07-09 14:02:24'},
    { id: 10, TransactionRef: 'CiCO_KU9HYMS3BFAEZP7', TransactionID: 'A0000000041010', TransactionType: 'Transfer', Status: 'Successful', date: '2022-07-09 14:02:24'},
    { id: 11, TransactionRef: 'CiCO_KU9HYMS3BFAEZP7', TransactionID: 'A0000000041010', TransactionType: 'Airtime', Status: 'Failed', date: '2022-07-09 14:02:24'},
    // Add more data as needed
  ];

  return agentTansaction;
};

export const AgentPerformanceData = () => {
  // Fetch or provide your transaction data here
  const agentTansaction = [
    { id:1 , agentCode: 'CI/AGT/LA/94659262', BusinessName: 'Jummzyy Venture', CashCount : 456, TransferCount: 4356, TotalCount: 4356, CashVolume: 58234987.00, TransferVolume: 23345345.22, TotalAmount: 34987000.00},
    { id: 2, agentCode: 'CI/AGT/LA/94659262', BusinessName: 'Kaleb Enterprises', CashCount: 456, TransferCount: 4356, TotalCount: 4356, CashVolume: 58234987.00, TransferVolume: 23345345.22, TotalAmount: 34987000.00 },
    { id: 3, agentCode: 'CI/AGT/LA/94659262', BusinessName: 'Solo Squard', CashCount: 456, TransferCount: 4356, TotalCount: 4356, CashVolume: 58234987.00, TransferVolume: 23345345.22, TotalAmount: 34987000.00 },
    { id: 4, agentCode: 'CI/AGT/LA/94659262', BusinessName: 'Welllness  HQ', CashCount: 456, TransferCount: 4356, TotalCount: 4356, CashVolume: 58234987.00, TransferVolume: 23345345.22, TotalAmount: 34987000.00 },
    { id: 5, agentCode: 'CI/AGT/LA/94659262', BusinessName: 'GDM Consult', CashCount: 456, TransferCount: 4356, TotalCount: 4356, CashVolume: 58234987.00, TransferVolume: 23345345.22, TotalAmount: 34987000.00},
    { id: 6, agentCode: 'CI/AGT/LA/94659262', BusinessName: 'DAggregate', CashCount: 456, TransferCount: 4356, TotalCount: 4356, CashVolume: 58234987.00, TransferVolume: 23345345.22, TotalAmount: 34987000.00 },
    { id: 7, agentCode: 'CI/AGT/LA/94659262', BusinessName: 'EIC', CashCount: 456, TransferCount: 4356, TotalCount: 4356, CashVolume: 58234987.00, TransferVolume: 23345345.22, TotalAmount: 34987000.00 },
    { id: 8, agentCode: 'CI/AGT/LA/94659262', BusinessName: 'StartUp Lagos', CashCount: 456, TransferCount: 4356, TotalCount: 4356, CashVolume: 58234987.00, TransferVolume: 23345345.22, TotalAmount: 34987000.00 },
    { id: 9, agentCode: 'CI/AGT/LA/94659262', BusinessName: 'DPrmix', CashCount: 456, TransferCount: 4356, TotalCount: 4356, CashVolume: 58234987.00, TransferVolume: 23345345.22, TotalAmount: 34987000.00 },
    { id: 10, agentCode: 'CI/AGT/LA/94659262', BusinessName: 'Hazon Tech', CashCount: 456, TransferCount: 4356, TotalCount: 4356, CashVolume: 58234987.00, TransferVolume: 23345345.22, TotalAmount: 34987000.00 },
    { id: 11, agentCode: 'CI/AGT/LA/94659262', BusinessName: 'VIGA Enterprises', CashCount: 456, TransferCount: 4356, TotalCount: 4356, CashVolume: 58234987.00, TransferVolume: 23345345.22, TotalAmount: 34987000.00 },
    // Add more data as needed
  ];

  return agentTansaction;
};