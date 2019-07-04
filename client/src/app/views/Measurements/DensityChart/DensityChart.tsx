import React from 'react';
import uuid from 'short-uuid';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  Legend,
  CartesianGrid,
  XAxis
} from 'recharts';

export interface DensityChartData {
  distance: number;
  thickness: number;
  density: number;
  iri: number;
  rutting: number;
}

export interface DensityChartInfo {
  name: string;
  units?: string;
  breakpoint?: { start: number; finish: number };
  mainColor?: string;
  warningColor?: string;
}

interface DensityChartProps {
  data?: Array<DensityChartData>;
  info?: Array<DensityChartInfo>;
}

function getGradients(
  data: Array<DensityChartData> = [],
  info: Array<DensityChartInfo> = []
) {
  return info.map(
    ({
      name = '',
      breakpoint = { start: 1, finish: 2 },
      mainColor = 'green',
      warningColor = 'red'
    }) => {
      const { min, max } = data.reduce(
        (result, dataPoint) => ({
          min:
            dataPoint[name] < result.min || result.min === 0
              ? dataPoint[name]
              : result.min,
          max:
            dataPoint[name] > result.max || result.max === 0
              ? dataPoint[name]
              : result.max
        }),
        { min: 0, max: 0 }
      );
      const { start, finish } = breakpoint;
      const startPercentage = `${(1 - (start - min) / (max - min)) * 100}%`;
      const finishPercentage = `${(1 - (finish - min) / (max - min)) * 100}%`;

      console.log(startPercentage, finishPercentage, min, max);

      return (
        <linearGradient
          id={name}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          key={uuid.generate()}
        >
          <stop offset="0%" stopColor={mainColor} />
          <stop offset={startPercentage} stopColor={mainColor} />
          <stop offset={startPercentage} stopColor={warningColor} />
          <stop offset="100%" stopColor={warningColor} />
        </linearGradient>
      );
    }
  );
}

function getLineCharts(charts: Array<DensityChartInfo> = []) {
  return charts.map(({ name, units = 'm' }) => (
    <Line
      yAxisId={name}
      type="linear"
      name={units}
      dataKey={name}
      stroke={`url(#${name})`}
      strokeWidth={2}
      dot={false}
      activeDot={false}
      key={uuid.generate()}
    />
  ));
}

const DensityChart: React.SFC<DensityChartProps> = ({
  data = [],
  info = []
}) => {
  return (
    <ResponsiveContainer>
      <LineChart data={data}>
        <defs>{getGradients(data, info)}</defs>
        {getLineCharts(info)}
        <CartesianGrid stroke="#ccc" />
        <XAxis
          dataKey="distance"
          interval="preserveStartEnd"
          tick={{ fontSize: '0.8rem' }}
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
