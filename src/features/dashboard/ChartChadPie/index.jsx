import React, { useState, useEffect } from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Sector } from 'recharts';
import axios from '../../../utils/axiosInstance';
import { useSelector } from 'react-redux';

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
      <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 6} outerRadius={outerRadius + 10} fill={fill} />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`TV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const ChartChadPie = ({ period, onDataUpdate }) => {
  const [chartData, setChartData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const agentId = useSelector((state) => state.auth.user?.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/tranxvolume?period=${period}&agent_id=${agentId}`);
        const { status, data } = response.data;

        if (status === 'Successful') {
          // Format data based on period
          const formattedData = Object.keys(data).map((category, index) => ({
            name: category.charAt(0).toUpperCase() + category.slice(1),
            value: data[category].reduce((total, entry) => total + parseFloat(entry.amount), 0),
          }));

          setChartData(formattedData);
          // Calculate total value
          const totalValue = formattedData.reduce((total, entry) => total + entry.value, 0);

          // Pass data to the parent component
          onDataUpdate({ totalValue, data: formattedData });
        } else {
          console.error('Error fetching data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [period, onDataUpdate]);

  const colors = ['#0BC2FF', '#00B378', '#F09711'];

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={chartData}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={120}
          fill="#0BC2FF"
          dataKey="value"
          label
          onMouseEnter={onPieEnter}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ChartChadPie;
