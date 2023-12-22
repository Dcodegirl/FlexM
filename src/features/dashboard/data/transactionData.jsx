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


export const AgentTransactionData = async (agentId, searchValue) => {
  try {
    if (!agentId) {
      console.error('Agent ID is required.');
      return [];
    }

    const response = await axios.get('/searchAgtByAggregator', {
      params: {
        agent_id: agentId,
        business_name: searchValue, // Add the business_name parameter
      },
    });

    const data = response.data;

    // Map the API response to the desired format
    const agentTransactionData = data.data.map(agent => ({
      id: agent.id,
      agentCode: agent.agent_code,
      name: `${agent.first_name} ${agent.last_name}`,
      businessName: agent.business_name || '',
      phoneNumber: agent.business_phone || '',
      address: agent.business_address || '',
      localGovt: agent.lga || '',
      state: agent.state || ''
    }));

    console.log(agentTransactionData);
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



export const AgentPerformanceData = async (agentId, businessName) => {
  try {
    const params = { agent_id: agentId };
    if (businessName) {
      params.business_name = businessName;
    }

    const response = await axios.get('/agtAggregatorPerformance', {
      params: params,
    });

    const data = response.data;

    // Map the API response to the desired format
    const agentPerformanceData = data.agent_info.map((info, index) => ({
      id: index + 1,
      agentCode: info.agent_code,
      businessName: info.business_name,
      cashCount: data.CashCount[index],
      transferCount: data['Transfer count'][index],
      totalCount: data.TotalCount[index],
      cashVolume: parseFloat(data.Cashvolume[index]),
      transferVolume: parseFloat(data.Transfervolume[index]),
      totalAmount: parseFloat(data.Totalamount[index]),
    }));

    return agentPerformanceData;
  } catch (error) {
    console.error('Error fetching agent performance data:', error);
    return [];
  }
};
