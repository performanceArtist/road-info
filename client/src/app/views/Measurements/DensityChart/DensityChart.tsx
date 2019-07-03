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

const DensityChart: React.SFC<DensityChartProps> = ({ data = [] }) => {
  const colorBreakPoint = 0.25;
  const { min, max } = data.reduce(
    (result, dataPoint) => ({
      min:
        dataPoint.density < result.min || result.min === 0
          ? dataPoint.density
          : result.min,
      max:
        dataPoint.density > result.max || result.max === 0
          ? dataPoint.density
          : result.max
    }),
    { min: 0, max: 0 }
  );
  const colorBreakPointPercentage = `${(1 -
    (colorBreakPoint - min) / (max - min)) *
    100}%`;

  return (
    <ResponsiveContainer>
      <LineChart data={data}>
        <defs>
          <linearGradient id="colorUv" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="green" />
            <stop offset={colorBreakPointPercentage} stopColor="green" />
            <stop offset={colorBreakPointPercentage} stopColor="red" />
            <stop offset="100%" stopColor="red" />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="distance" interval="preserveStartEnd" />
        <Line
          yAxisId="density"
          type="linear"
          name="Плотность, г/см3"
          dataKey="density"
          stroke="url(#colorUv)"
          strokeWidth={2}
          dot={false}
          activeDot={false}
        />
        <Line
          yAxisId="iri"
          type="linear"
          name="IRI, м/км"
          dataKey="iri"
          stroke="blue"
          strokeWidth={2}
          dot={false}
          activeDot={false}
        />
        <Line
          yAxisId="rutting"
          type="linear"
          name="Колейность, мм"
          dataKey="rutting"
          stroke="black"
          strokeWidth={2}
          dot={false}
          activeDot={false}
        />
        <Line
          yAxisId="thickness"
          type="linear"
          name="Толщина слоя, мм"
          dataKey="thickness"
          stroke="purple"
          strokeWidth={2}
          dot={false}
          activeDot={false}
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
};
export default DensityChart;
