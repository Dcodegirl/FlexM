import axios from "../../../utils/axiosInstance";

export const TransactionData = async (period) => {
  try {
    const response = await axios.get(`/alltranx?period=${period}`);
    const data = response.data;
    return data.status === 'Successful' ? data.data : [];
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const fetchTransactionsData = async (agentId) => {
  try {
    const response = await axios.get('/aggregtorwallet', {
      params: {
        'agent_id': agentId, // Include 'agent-id' as a parameter
      },
    });

    const data = response.data;
    const transactionsFromAPI = data.data.transaction.data;

    // Map the API transactions to the format you want
    const mappedTransactions = transactionsFromAPI.map((apiTransaction, index) => ({
      id: index + 1,
      PreviousBalance: apiTransaction.previous_bal,
      Amount: apiTransaction.amount,
      Description: apiTransaction.status_description,
      status:
        apiTransaction.status_description === 'Transaction successful'
          ? 'Successful'
          : apiTransaction.status_description === 'Transaction pending'
          ? 'Pending'
          : 'Failed',
      CurrentBalance: apiTransaction.current_bal,
      TransactionType: 'Transfer', // You can update this based on your actual data
      date: apiTransaction.created_at,
    }));

    return mappedTransactions;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};



export const AgentTransactionData = async () => {
  try {
    const response = await axios.get('/searchAg');
    const data = response.data;

    // Map the API response to the desired format
    const agentTransactionData = data.data.map(agent => ({
      id: agent.id,
      agentCode: agent.agent_code,
      name: `${agent.first_name} ${agent.last_name}`,
      phoneNumber: agent.business_phone || '',
      address: agent.business_address || '',
      localGovt: agent.lga || '',
      state: agent.state || ''
    }));

    return agentTransactionData;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
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