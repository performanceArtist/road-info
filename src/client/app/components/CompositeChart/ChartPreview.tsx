import * as React from 'react';

import Chart from '@components/Chart/Chart';
import { MeasurementData } from '@redux/measurements/types';
import { ChartInfo } from '@redux/chart/types';

type Props = {
  chartInfo: ChartInfo;
  data: Array<MeasurementData>;
};

const ChartPreview: React.FC<Props> = ({ chartInfo, data }) => {
  const { xAxis, lines } = chartInfo;

  const getPreview = (keyY: string, data: Array<MeasurementData>) => (
    <div className="chart-preview__chart" key={Math.random()}>
      <Chart
        modifier="preview"
        keyX={xAxis.key}
        keyY={keyY}
        data={data}
        showMax={false}
        showMin={false}
        showY={false}
        showBrush={false}
        enableZoom={false}
        {...lines[keyY]}
        maxTicks={1000}
      />
    </div>
  );

  return (
    <div className="chart-preview">
      {Object.keys(lines).map(key => getPreview(key, data))}
    </div>
  );
};

export default ChartPreview;
