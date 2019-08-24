import * as React from 'react';
import * as R from 'ramda';

import Chart from '@components/Chart/Chart';
import { MeasurementData, MeasurementItem } from '@redux/measurements/types';
import { ChartInfo } from '@redux/chart/types';

type OwnProps = {
  measurements: MeasurementItem;
  chartInfo: ChartInfo;
};

type Props = OwnProps;

const HistoryChart: React.FC<Props> = ({
  measurements: { taskId, data },
  chartInfo: ChartInfo
}) => {
  const keys = ['iri', 'rutting', 'thickness', 'density', 'distance'];
  const dataKeys = Object.keys(data);
  const all = keys.reduce((acc, cur) => {
    acc[cur] = [...Array(dataKeys.length)].map(() => []);
    return acc;
  }, {});

  dataKeys.forEach((instance, index) => {
    data[instance].forEach(measurement => {
      console.log(measurement);
      keys.forEach(key => {
        all[key][index].push(measurement[key]);
      });
    });
  });

  console.log(all);

  return <div />;
};

export default HistoryChart;
