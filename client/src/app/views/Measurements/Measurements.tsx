import React from 'react';

import ControlForm from '@components/ControlForm/ControlForm';

import DensityChart from './DensityChart/DensityChart';
import MeasurementResults from './MeasurementResults/MeasurementResults';
import CallSetup from './CallSetup';

const Measurements = () => (
  <div className="measurements">
    <div className="measurements__form">
      <ControlForm
        devices={[
          { name: 'Защит. юбка' },
          { name: 'Профилометр' },
          { name: 'Георадар' },
          { name: 'Плотнометр' }
        ]}
      />
      <div className="measurements__input">
        <CallSetup />
      </div>
    </div>
    <div className="measurements__info">
      <div className="measurements__chart">{DensityChart}</div>
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

export default Measurements;
