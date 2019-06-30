import React from 'react';

import ControlForm from '../../components/ControlForm/ControlForm';
import CallSetup from './CallSetup';

const Measurements = () => (
  <div className="measurements">
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
);

export default Measurements;
