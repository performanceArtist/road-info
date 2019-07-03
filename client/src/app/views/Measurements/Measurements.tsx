import React from 'react';
import { connect } from 'react-redux';

import ControlForm from '@components/ControlForm/ControlForm';

import DensityChart from './DensityChart/DensityChart';
import MeasurementResults from './MeasurementResults/MeasurementResults';
import CallTask from './CallTask';
import TaskPanel from './TaskPanel/TaskPanel';

const Measurements: React.SFC = ({ taskData }) => {
  const { chartData, chartInfo } = taskData[0];
  const tasks = taskData.map(({ formData }) => formData);

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
        </div>
        <div className="measurements__chart">
          <DensityChart data={chartData} info={chartInfo} />
        </div>
        <div className="measurements__results">
          <MeasurementResults
            measurements={[
              { title: 'Плотность, г/см3', min: 0, average: 2.5, max: 5 },
              { title: 'IRI, м/км', min: 0, average: 2.5, max: 5 },
              { title: 'Колейность, мм', min: 0, average: 2.5, max: 5 },
              { title: 'Толщина слоя, мм', min: 0, average: 2.5, max: 5 }
            ]}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ measurementsReducer }) => ({
  ...measurementsReducer
});

export default connect(mapStateToProps)(Measurements);
