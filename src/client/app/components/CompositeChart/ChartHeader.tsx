import * as React from 'react';

import ChartControls from '@components/ChartControls/ChartControls';
import { Icon, IconImage } from '@components/Icon/Icon';

import { MeasurementItem } from '@redux/measurements/types';

type Props = {
  measurement: MeasurementItem;
  selectValue: string;
  onAngleClick: (id: string) => void;
  onArrowClick?: () => void;
  onSelectChange?: (value: string, id: string) => void;
};

const ChartHeader: React.FC<Props> = ({
  measurement,
  selectValue,
  onAngleClick,
  onArrowClick,
  onSelectChange
}) => {
  const { taskId, data } = measurement;

  return (
    <div className="chart-header">
      <span className="chart-header__title">{`Задание #${taskId}, заезд`}</span>
      {
        <select
          name="instance"
          value={selectValue}
          onChange={event => onSelectChange(event.target.value, taskId)}
        >
          {Object.keys(data).map(id => (
            <option value={id}>{id}</option>
          ))}
        </select>
      }

      <div className="chart-header__angle">
        <Icon
          image={IconImage.ANGLE}
          size="small"
          onClick={() => onAngleClick(taskId)}
        />
      </div>
      <ChartControls onArrowClick={onArrowClick} />
    </div>
  );
};

export default ChartHeader;
