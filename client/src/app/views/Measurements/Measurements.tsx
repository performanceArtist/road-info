import React from 'react';
import { connect } from 'react-redux';

import ControlForm from '@components/ControlForm/ControlForm';

import DensityChart from './DensityChart/DensityChart';
import MeasurementResults from './MeasurementResults/MeasurementResults';
import TaskPanel from './TaskPanel/TaskPanel';
import ChartSettings from './ChartSettings/ChartSettings';

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

const Measurements: React.FC = ({ taskData, currentTaskId, chartInfo }) => {
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
          <TaskPanel tasks={taskData} />
          <ChartSettings />
        </div>
        <div className="measurements__chart">
          <DensityChart data={chartData} info={chartInfo} />
        </div>
        <div className="measurements__results">
          <MeasurementResults
            measurements={[
              {
                title: 'Плотность, г/см3',
                min: min.density,
                average: average.density,
                max: max.density
              },
              {
                title: 'IRI, м/км',
                min: min.iri,
                average: average.iri,
                max: max.iri
              },
              {
                title: 'Колейность, мм',
                min: min.rutting,
                average: average.rutting,
                max: max.rutting
              },
              {
                title: 'Толщина слоя, мм',
                min: min.thickness,
                average: average.thickness,
                max: max.thickness
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
};

const mapState = ({ measurements }) => ({
  ...measurements
});

export default connect(mapState)(Measurements);
