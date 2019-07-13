import React from 'react';
import { connect } from 'react-redux';

import DensityChart from './DensityChart/DensityChart';
import TaskPanel from './TaskPanel/TaskPanel';
import ChartSettings from './ChartSettings/ChartSettings';
import TSTest from '@components/TSTest/TSTest';

import ModalManager from '../../layout/ModalManager/ModalManager';

const testData = [
  { distance: 0, density: 3.97835, thickness: 1.94446, rutting: 0, iri: 0 },
  { distance: 100, density: 4.1095, thickness: 0.660076, rutting: 0, iri: 0 },
  { distance: 200, density: 0.680257, thickness: 0.272032, rutting: 0, iri: 0 },
  { distance: 300, density: 0.839476, thickness: 0.165938, rutting: 0, iri: 0 },
  { distance: 400, density: 3.02133, thickness: 1.95549, rutting: 0, iri: 0 },
  { distance: 500, density: 3.06413, thickness: 1.7611, rutting: 0, iri: 0 },
  { distance: 600, density: 0.20638, thickness: 1.7526, rutting: 0, iri: 0 },
  { distance: 700, density: 1.35501, thickness: 0.0522311, rutting: 0, iri: 0 },
  { distance: 800, density: 2.68486, thickness: 0.825381, rutting: 0, iri: 0 },
  { distance: 900, density: 0.126863, thickness: 0.395886, rutting: 0, iri: 0 },
  { distance: 1000, density: 4.06617, thickness: 1.24808, rutting: 0, iri: 0 }
];

const Graph: React.FC = ({ taskData, currentTaskId, chartInfo }) => {
  const current = taskData.find(({ id }) => id === currentTaskId);
  const { chartData = [] } = current ? current : {};

  return (
    <div className="graph">
      <ModalManager />
      <div className="graph__info">
        <div className="graph__form">
          <TaskPanel tasks={taskData} />
        </div>
        <div className="graph__chart">
          <DensityChart data={chartData} info={chartInfo} />
        </div>
        <TSTest ownProp="Test" />
      </div>
    </div>
  );
};

const mapState = ({ measurements }) => ({
  ...measurements
});

export default connect(mapState)(Graph);
