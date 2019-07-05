import React from 'react';
import { connect } from 'react-redux';

import ControlForm from '@components/ControlForm/ControlForm';

import DensityChart from './DensityChart/DensityChart';
import MeasurementResults from './MeasurementResults/MeasurementResults';
import CallTask from './CallTask';
import TaskPanel from './TaskPanel/TaskPanel';
import ChartSettings from './ChartSettings/ChartSettings';
import Start from '@components/Start/Start';

const Measurements: React.SFC = ({ taskData, currentTask, chartInfo }) => {
  const { chartData = [] } = taskData[currentTask] ? taskData[currentTask] : {};
  const tasks = taskData.map(({ formData }) => formData);

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
  const dataLength = chartData.length;
  const average = objectMap(
    sums,
    x => Math.round((100 * x) / dataLength) / 100 || 0
  );

  return (
    <div className="measurements">
      <div className="measurements__info">
        <div className="measurements__form">
          <div className="measurements__tasks">
            <TaskPanel tasks={tasks} />
          </div>
          <div className="measurements__input">
            <CallTask />
          </div>
          <Start />
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

const mapStateToProps = ({ measurements }) => ({
  ...measurements
});

export default connect(mapStateToProps)(Measurements);
