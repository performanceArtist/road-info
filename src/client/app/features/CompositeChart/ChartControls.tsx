import * as React from 'react';

import { Icon, IconImage } from '@components/Icon/Icon';

type OwnProps = {
  onArrowClick: (event?: React.MouseEvent) => void;
};

type Props = OwnProps;

const ChartControls: React.FC<Props> = ({ onArrowClick }) => {
  return (
    <div className="chart-controls">
      <Icon image={IconImage.BACK_ARROW} size="small" onClick={onArrowClick} />
    </div>
  );
};

export default ChartControls;
