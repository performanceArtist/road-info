import * as React from 'react';

import { ServerTask } from '@shared/types';
import { getStatus } from '@shared/utils';

import MeasurementInfo from '@shared/view/MeasurementInfo/MeasurementInfo';

type OwnProps = {
  task: ServerTask;
};

type Props = OwnProps;

const TaskInfo: React.FC<Props> = ({ task }) => {
  const items = [
    { title: 'Статус', value: getStatus(task.status) },
    { title: 'Кол-во полос', value: task.lane_number },
    { title: 'Описание', value: task.description },
    { title: 'Старт', value: task.distance[0] },
    { title: 'Финиш', value: task.distance[1] }
  ];

  return (
    <div className="task-info">
      <header className="task-info__header">
        <div className="task-info__name">{`#${task.id}`}</div>
      </header>
      <div className="task-info__content">
        <MeasurementInfo
          items={items.filter(({ value }) => value !== undefined)}
        />
      </div>
    </div>
  );
};

export default TaskInfo;
