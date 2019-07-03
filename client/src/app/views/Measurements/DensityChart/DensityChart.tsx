import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  Legend,
  CartesianGrid,
  XAxis
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
      <XAxis dataKey="distance" interval="preserveStartEnd" />
      <Line
        yAxisId="density"
        type="linear"
        name="Плотность, г/см3"
        dataKey="density"
        stroke="red"
      />
      <Line
        yAxisId="iri"
        type="linear"
        name="IRI, м/км"
        dataKey="iri"
        stroke="blue"
      />
      <Line
        yAxisId="rutting"
        type="linear"
        name="Колейность, мм"
        dataKey="rutting"
        stroke="black"
      />
      <Line
        yAxisId="thickness"
        type="linear"
        name="Толщина слоя, мм"
        dataKey="thickness"
        stroke="purple"
      />
      <Tooltip />
      <Legend
        layout="vertical"
        verticalAlign="middle"
        align="right"
        wrapperStyle={{
          fontSize: '0.9rem',
          paddingLeft: '1.5rem'
        }}
      />
    </LineChart>
  </ResponsiveContainer>
);

export default DensityChart;
