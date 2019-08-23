import * as React from 'react';
import { connect } from 'react-redux';

import RoadChart from './RoadChart';

import { Measurements } from '@redux/measurements/types';
import { ChartInfo } from '@redux/chart/types';
import { RootState } from '@redux/reducer';

type MapState = {
  measurements: Measurements;
  chartInfo: ChartInfo;
};

type Props = MapState;

const Road: React.FC<Props> = ({ measurements, chartInfo }) => {
  const graphs = measurements.map(({ taskId, data }) => {
    return (
      <RoadChart
        title={`Задание #${taskId}`}
        keyX="distance"
        data={data}
        chartInfo={chartInfo}
        xUnits={chartInfo.xAxis.units}
        userConfig={{}}
      />
    );
  });

  return <div className="road">{graphs}</div>;
};

const mapState = ({ measurements, chart }: RootState) => ({
  measurements,
  chartInfo: chart
});

export default connect(mapState)(Road);
