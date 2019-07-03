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

export interface Measurement {
  distance: number;
  density: number;
  iri: number;
  rutting: number;
  thickness: number;
}

interface DensityChartProps {
  data?: Array<Measurement>;
}

const DensityChart: React.SFC<DensityChartProps> = ({ data = [] }) => (
  <ResponsiveContainer>
    <LineChart data={data}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="distance" />
      <YAxis yAxisId="density" tick={false} tickLine={false} axisLine={false} />
      <YAxis yAxisId="iri" tick={false} tickLine={false} axisLine={false} />
      <YAxis yAxisId="rutting" tick={false} tickLine={false} axisLine={false} />
      <YAxis
        yAxisId="thickness"
        tick={false}
        tickLine={false}
        axisLine={false}
      />
      <Line
        yAxisId="density"
        type="linear"
        name="Плотность, г/см3"
        dataKey="density"
        stroke="#8884d8"
      />
      <Line
        yAxisId="iri"
        type="linear"
        name="IRI, м/км"
        dataKey="iri"
        stroke="#8884d8"
      />
      <Line
        yAxisId="rutting"
        type="linear"
        name="Колейность, мм"
        dataKey="rutting"
        stroke="#8884d8"
      />
      <Line
        yAxisId="thickness"
        type="linear"
        name="Толщина слоя, мм"
        dataKey="thickness"
        stroke="#8884d8"
      />
      <Tooltip />
      <Legend layout="vertical" verticalAlign="middle" align="right" />
    </LineChart>
  </ResponsiveContainer>
);

export default DensityChart;
