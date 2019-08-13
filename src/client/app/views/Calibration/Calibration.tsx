import * as React from 'react';

import Materials from './Materials';

import TabContainer from '@components/TabContainer/TabContainer';

const Calibration = () => (
  <div className="calibration">
    <h2>Калибровка</h2>
    <Materials
      materials={[
        { name: 'Алюминий', density: 2.67 },
        { name: 'Стекло', density: 2.45 },
        { name: 'Орг. Стек', density: 1.17 }
      ]}
    />
    <br />
  </div>
);

export default Calibration;
