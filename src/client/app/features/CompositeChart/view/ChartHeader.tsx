import * as React from 'react';

import { Icon, IconImage } from '@components/Icon/Icon';
import ChartControls from './ChartControls';

import { MeasurementItem } from '@root/client/app/redux/data/types';

type Props = {
  measurement: MeasurementItem;
  selectValue: string;
  showArrow?: boolean;
  startOnEmpty?: boolean;
  onAngleClick: (id: string) => void;
  onArrowClick?: () => void;
  onSelectChange?: (value: string, id: string) => void;
};

const ChartHeader: React.FC<Props> = ({
  measurement,
  selectValue,
  startOnEmpty = false,
  showArrow = true,
  onAngleClick,
  onArrowClick,
  onSelectChange
}) => {
  const { taskId, data } = measurement;

  return (
    <div className="chart-header">
      <div className="chart-header__wrapper">
        <span className="chart-header__title">{`Задание #${taskId}, заезд`}</span>
        {
          <select
            className="chart-header__select"
            name="instance"
            value={startOnEmpty ? '' : selectValue}
            onChange={event => onSelectChange(event.target.value, taskId)}
          >
            {startOnEmpty && <option />}
            {Object.keys(data).map(id => (
              <option value={id} key={id}>
                {id}
              </option>
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
        {showArrow && <ChartControls onArrowClick={onArrowClick} />}
      </div>
    </div>
  );
};

export default ChartHeader;
