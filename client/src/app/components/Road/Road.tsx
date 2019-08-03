import React from 'react';
import { connect } from 'react-redux';

import RoadChart from '@components/RoadChart/RoadChart';

import { KondorData } from '@redux/measurements/types';
import { ChartInfo } from '@redux/chart/types';
import { RootState } from '@redux/reducer';

type MapState = {
  chartInfo: ChartInfo;
  tasks: KondorData;
};

type Props = MapState;

const Road: React.FC<Props> = ({ chartInfo, tasks }) => {
  const graphs = tasks.map(task => {
    const data = task.measurements.map(
      ({ distance, density, iri, rutting, thickness }) => ({
        distance,
        density,
        iri,
        rutting,
        thickness
      })
    );

    return (
      <RoadChart
        title={`Задание #${task.id}`}
        keyX="distance"
        data={data}
        info={chartInfo.lines}
        xUnits={chartInfo.xAxis.units}
        config={{}}
      />
    );
  });

  return <div className="road">{graphs}</div>;
};

const mapState = ({ measurements, chart }: RootState) => ({
  chartInfo: chart,
  tasks: measurements.tasks
});

export default connect(mapState)(Road);
