import React from 'react';

import MeasureTable from '@components/MeasureTable/MeasureTable';

import VoltageChart from './VoltageChart/VoltageChart';

const Diagnostics = () => (
  <div className="diagnostics">
    <div className="diagnostics__row">
      <MeasureTable
        measures={[
          { name: 'Напряжение аб1', value: 0.0, unit: 'В' },
          { name: 'Напряжение аб2', value: 0.0, unit: 'В' },
          { name: 'Напряжение аб3', value: 0.0, unit: 'В' },
          { name: 'Температура в кунге', value: 23.24, unit: '°C' },
          { name: 'Температура в саркофаге', value: 23.24, unit: '°C' },
          { name: 'Температура в щите', value: 23.24, unit: '°C' },
          { name: 'Дорожный просвет', value: 45, unit: 'см' }
        ]}
      />
      <div className="diagnostics__chart">
        <div className="diagnostics__chart-container">{VoltageChart}</div>
      </div>
    </div>
  </div>
);

export default Diagnostics;
