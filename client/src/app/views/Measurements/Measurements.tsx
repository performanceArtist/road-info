import React from 'react';

import CompositeChart from '@components/CompositeChart/CompositeChart';
import GeneratePanel from '@components/GeneratePanel/GeneratePanel';

const Measurements: React.FC = () => {
  return (
    <div>
      <div>
        <GeneratePanel />
      </div>
      <CompositeChart />
    </div>
  );
};

export default Measurements;
