import * as React from 'react';

import { ChartContainer } from '@features/CompositeChart';

const Measurements: React.FC = () => {
  return (
    <div className="measurements-view">
      <ChartContainer />
    </div>
  );
};

export default Measurements;
