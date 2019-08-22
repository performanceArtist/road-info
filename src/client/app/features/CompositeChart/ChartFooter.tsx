import * as React from 'react';

import { Icon, IconImage } from '@components/Icon/Icon';

type Props = {
  type: 'table' | 'preview';
  onTableIconClick: () => void;
  onGraphIconClick: () => void;
  onExpandIconClick: () => void;
};

const ChartFooter: React.FC<Props> = ({
  type,
  onTableIconClick,
  onExpandIconClick,
  onGraphIconClick
}) => {
  return (
    <div className="chart-footer">
      <div className="chart-footer__wrapper">
        <div className="chart-footer__icon">
          {type === 'table' ? (
            <Icon image={IconImage.GRAPH} onClick={onGraphIconClick} />
          ) : (
            <Icon image={IconImage.TABLE} onClick={onTableIconClick} />
          )}
        </div>
        <div className="chart-footer__icon">
          <Icon image={IconImage.EXPAND} onClick={onExpandIconClick} />
        </div>
      </div>
    </div>
  );
};

export default ChartFooter;
