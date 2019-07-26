import React from 'react';
import { connect } from 'react-redux';

import RoadChart from '@components/RoadChart/RoadChart';

import { ChartInfo, KondorData } from '@redux/measurements/types';
import { RootState } from '@redux/reducer';

type MapState = {
  chartInfo: ChartInfo;
  kondors: KondorData;
};

type Props = MapState;

const Road: React.FC<Props> = ({ chartInfo, kondors }) => {
  const graphs = kondors.map(kondor => {
    const data = kondor.measurements.map(
      ({ distance, density, iri, rutting, thickness }) => ({
        distance,
        density,
        iri,
        rutting,
        thickness
      })
    );

    return (
      <div className="road__chart">
        <RoadChart keyX="distance" data={data} info={chartInfo.lines} />
      </div>
    );
  });

  return <div className="road">{graphs}</div>;
};

const mapState = ({ measurements }: RootState) => ({
  chartInfo: measurements.chartInfo,
  kondors: measurements.kondors
});

export default connect(mapState)(Road);
