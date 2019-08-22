import * as React from 'react';

import CompositeChart from '@features/CompositeChart/containers/container';

const Measurements: React.FC = () => {
  return (
    <div className="measurements-view">
      <CompositeChart />
    </div>
  );
};

export default Measurements;
