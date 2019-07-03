import React from 'react';
import { connect } from 'react-redux';

import ControlForm from '@components/ControlForm/ControlForm';

import DensityChart from './DensityChart/DensityChart';
import MeasurementResults from './MeasurementResults/MeasurementResults';
import CallTask from './CallTask';
import TaskPanel from './TaskPanel/TaskPanel';

const dataF = [
  { distance: 100, thickness: 1, density: 0.5, iri: 2.1, rutting: 210 },
  { distance: 200, thickness: 2, density: 0.3, iri: 1.7, rutting: 170 },
  { distance: 300, thickness: 0.8, density: 0.12, iri: 3.2, rutting: 300 },
  { distance: 400, thickness: 1.2, density: 0.26, iri: 3, rutting: 320 },
  { distance: 500, thickness: 1.5, density: 0.28, iri: 4.2, rutting: 420 }
];

const Measurements: React.SFC = ({ taskData }) => {
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
          <DensityChart data={dataF} />
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
