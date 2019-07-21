import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis
} from 'recharts';

const data = [
  { name: '26.06.19', uv: 3.2 },
  { name: '27.06.19', uv: 5.2 },
  { name: '28.06.19', uv: 6.6 },
  { name: '29.06.19', uv: 3 },
  { name: '30.06.19', uv: 4.2 },
  { name: '31.06.19', uv: 5 }
];

const renderLineChart = (
  <ResponsiveContainer height={300} width="100%">
    <LineChart data={data}>
      <Line
        type="monotone"
        name="Напряжение, В"
        dataKey="uv"
        stroke="#8884d8"
      />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
    </LineChart>
  </ResponsiveContainer>
);

export default renderLineChart;
