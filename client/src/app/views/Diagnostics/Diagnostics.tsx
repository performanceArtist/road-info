import React from 'react';

import MeasureTable from '@components/MeasureTable/MeasureTable';

const Diagnostics = () => (
  <div className="diagnostics">
    <MeasureTable
      measures={[
        { name: 'Напряжение аб1', value: '0.00', unit: 'В' },
        { name: 'Напряжение аб2', value: '0.00', unit: 'В' },
        { name: 'Напряжение аб3', value: '0.00', unit: 'В' },
        { name: 'Температура в кунге', value: '23.24', unit: '°C' },
        { name: 'Температура в саркофаге', value: '23.24', unit: '°C' },
        { name: 'Температура в щите', value: '23.24', unit: '°C' },
        { name: 'Дорожный просвет', value: '45', unit: 'см' }
      ]}
    />
  </div>
);

export default Diagnostics;
