import React, { useState, useEffect } from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from '../../../utils/axiosInstance';
import { useSelector } from 'react-redux';

const ChartChad = ({ period, onLoadingChange }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const agentId = useSelector((state) => state.auth.user?.id);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/tranxanalysis?period=${period}&agent_id=${agentId}`);
        const { status, data } = response.data;

        if (status === 'Successful') {
            // Format data based on period
            const formattedData =
              period === 'weekly'
                ? data.days.map((day, index) => ({ name: day, pv: data.amount[index] }))
                : period === 'monthly'
                ? data.month.map((month, index) => ({ name: month, pv: parseFloat(data.amount[index]) }))
                : period === 'yearly'
                ? data.year.map((year, index) => ({ name: String(year), pv: parseFloat(data.amount[index]) }))
                : [];
  
            setChartData(formattedData);
          } else {
            console.error('Error fetching data:', data.message);
          }
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }finally {
            setLoading(false);
            // Notify the parent component about the loading state change
            onLoadingChange && onLoadingChange(loading);
          }
        };

    fetchData();
  }, [period, onLoadingChange]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#3E215B" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChartChad;
