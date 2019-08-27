import * as React from 'react';

import { Icon, IconImage } from '@components/Icon/Icon';

type Props = {
  type: 'table' | 'preview';
  onTableIconClick?: () => void;
  onGraphIconClick?: () => void;
  onExpandIconClick?: () => void;
  onHorExpandClick?: () => void;
};

const ChartFooter: React.FC<Props> = ({
  type,
  onTableIconClick,
  onExpandIconClick,
  onGraphIconClick,
  onHorExpandClick
}) => {
  const getIcon = (image: IconImage, onClick: () => void) => {
    if (!onClick) return null;

    return (
      <div className="chart-footer__icon">
        <Icon image={image} onClick={onClick} />
      </div>
    );
  };

  return (
    <div className="chart-footer">
      <div className="chart-footer__wrapper">
        {type === 'table'
          ? getIcon(IconImage.GRAPH, onGraphIconClick)
          : getIcon(IconImage.TABLE, onTableIconClick)}
        {getIcon(IconImage.EXPAND_HOR, onHorExpandClick)}
        {getIcon(IconImage.EXPAND, onExpandIconClick)}
      </div>
    </div>
  );
};

export default ChartFooter;
