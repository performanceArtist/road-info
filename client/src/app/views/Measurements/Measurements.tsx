import React from 'react';

import ControlForm from '../../components/ControlForm/ControlForm';

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
  </div>
);

export default Measurements;
