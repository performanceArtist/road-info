import React from 'react';

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

type Props = {
  data: Array<{ [key: string]: number }>;
  breakpoints?: { start: number; finish: number };
};

const RoadChart: React.FC<Props> = ({ data, breakpoints }) => {
  return (
    <div className="road-chart">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
        layout="horizontal"
        barGap={0}
        barCategoryGap={0}
        stackOffset="expand"
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="distance" />
        <Bar dataKey="distance" fill="#8884d8">
          {data.map((entry, index) => {
            const color =
              entry.density > 0 && entry.density < 2 ? 'green' : 'red';
            return <Cell fill={color} />;
          })}
        </Bar>
      </BarChart>
    </div>
  );
};

export default RoadChart;
