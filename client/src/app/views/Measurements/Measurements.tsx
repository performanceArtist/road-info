import React from 'react';
import { connect } from 'react-redux';

import ControlForm from '@components/ControlForm/ControlForm';
import DensityChart from '@components/DensityChart/DensityChart';
import ChartSettings from '@components/ChartSettings/ChartSettings';

import MeasurementResults from './MeasurementResults/MeasurementResults';
import TaskPanel from './TaskPanel/TaskPanel';
import socket from '@redux/measurements/socket';
import { RootState } from '@redux/reducer';

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

type StateProps = {
  taskData;
  currentTaskId;
  chartInfo;
};

type Props = StateProps;

const Measurements: React.FC<Props> = ({
  taskData,
  currentTaskId,
  chartInfo
}) => {
  const current = taskData.find(({ id }) => id === currentTaskId);
  const { chartData = [] } = current ? current : {};
  const objectReduce = (
    data = [],
    callback = (a, b) => {
      a + b;
    }
  ) => {
    return data.reduce((acc, object) => {
      const results = {};
      Object.keys(object).forEach(property => {
        results[property] = callback(acc[property], object[property]);
      });

      return results;
    }, data[0] || { density: 0, rutting: 0, iri: 0, thickness: 0 });
  };
  const objectMap = (object, callback) => {
    const result = {};

    Object.keys(object).forEach(key => (result[key] = callback(object[key])));
    return result;
  };

  const min = objectReduce(chartData, (a, b) => (a < b ? a : b));
  const max = objectReduce(chartData, (a, b) => (a > b ? a : b));
  const sums = objectReduce(chartData, (a, b) => a + b);
  const average = objectMap(sums, x => x / chartData.length || 0);

  return (
    <div className="measurements">
      <div className="measurements__info">
        <div className="measurements__form">
          <TaskPanel tasks={taskData} currentTaskId={currentTaskId} />
        </div>
        <div className="measurements__chart">
          <DensityChart data={chartData} info={chartInfo} min={min} max={max} />
        </div>
      </div>
    </div>
  );
};

const mapState = ({ measurements }: RootState) => ({
  ...measurements
});

export default connect(mapState)(Measurements);
