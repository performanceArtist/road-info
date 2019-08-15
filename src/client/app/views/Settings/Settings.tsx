import * as React from 'react';

import Materials from './Materials';

import TabContainer from '@components/TabContainer/TabContainer';
import ChartForm from '@components/ChartForm/ChartForm';

const Calibration = () => (
  <div className="settings">
    <div className="settings__tabs">
      <TabContainer>
        <div className="settings__chart-form" tab="График">
          <ChartForm />
        </div>
        <div className="settings__calibration" tab="Калибровка">
          <Materials
            materials={[
              { name: 'Алюминий', density: 2.67 },
              { name: 'Стекло', density: 2.45 },
              { name: 'Орг. Стек', density: 1.17 }
            ]}
          />
        </div>
      </TabContainer>
    </div>
  </div>
);

export default Calibration;
