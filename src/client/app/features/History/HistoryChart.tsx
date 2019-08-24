import * as React from 'react';

import Chart from '@components/Chart/Chart';
import Spinner from '@components/Spinner/Spinner';
import { MeasurementData, MeasurementItem } from '@redux/measurements/types';
import { ChartInfo } from '@redux/chart/types';

type OwnProps = {
  measurements: MeasurementItem;
  chartInfo: ChartInfo;
  fetching: boolean;
};

type Props = OwnProps;

const HistoryChart: React.FC<Props> = ({
  measurements: { taskId, data },
  chartInfo,
  fetching
}) => {
  const keys = ['iri', 'rutting', 'thickness', 'density', 'distance'];
  const dataKeys = Object.keys(data);
  const all = keys.reduce((acc, cur) => {
    acc[cur] = [...Array(dataKeys.length)].map(() => []);
    return acc;
  }, {});

  dataKeys.forEach((instance, index) => {
    data[instance].forEach(measurement => {
      keys.forEach(key => {
        all[key][index].push({ [key]: measurement[key] });
      });
    });
  });

  const getPreview = (keyY: string, data: Array<MeasurementData>) => (
    <div className="chart-preview__chart" key={Math.random()}>
      <Chart
        modifier="preview"
        keyX={chartInfo.xAxis.key}
        keyY={keyY}
        data={data}
        showMax={false}
        showMin={false}
        showY={false}
        showBrush={false}
        enableZoom={false}
        {...chartInfo.lines[keyY]}
        maxTicks={1000}
      />
    </div>
  );

  const charts = ['iri', 'rutting', 'thickness', 'density'].map(key => {
    const chart = all[key].map((group, index) => {
      const data = group.map((value, valIndex) => ({
        ...value,
        ...all.distance[index][valIndex]
      }));
      return getPreview(key, data);
    });

    return <div className="history-chart__chart">{chart}</div>;
  });

  return (
    <div className="history-chart">
      <div className="history-chart__wrapper">
        {fetching ? <Spinner /> : charts}
      </div>
    </div>
  );
};

export default HistoryChart;
