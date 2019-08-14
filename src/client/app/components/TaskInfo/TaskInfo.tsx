import * as React from 'react';
import { connect } from 'react-redux';

import Button from '@shared/Button/Button';
import { Icon, IconImage } from '@components/Icon/Icon';
import MeasurementInfo from '@components/MeasurementInfo/MeasurementInfo';

import { openModal } from '@redux/modal/actions';
import { Task, TaskInstance } from '@redux/task/types';

type OwnProps = {
  task: Task;
  instances: Array<TaskInstance>;
};

type Props = OwnProps & typeof mapDispatch;

const TaskInfo: React.FC<Props> = ({ task, instances, openModal }) => {
  const items = [
    { title: 'Регион', value: task.region },
    { title: 'Город', value: task.city },
    { title: 'Населённый пункт', value: task.settlement },
    { title: 'Дорога', value: task.street },
    { title: 'Участок', value: task.roadPartName },
    { title: 'Кол-во полос', value: task.lanesCount },
    { title: 'Старт', value: task.start },
    { title: 'Финиш', value: task.finish },
    { title: 'Текущая полоса', value: task.lane },
    { title: 'Кондор', value: task.kondor }
  ];

  return (
    <div className="task-info">
      <header className="task-info__header">
        <div className="task-info__name">{`#${task.id}`}</div>
        <div className="task-info__icon-container">
          <div className="task-info__icon">
            <Button onClick={() => openModal('Generation', { id: task.id })}>
              Генерация
            </Button>
          </div>
          <div className="task-info__icon">
            <Icon
              size="small"
              image={IconImage.EDIT}
              onClick={() => openModal('Task', { task })}
            />
          </div>
          <div className="task-info__icon">
            <Icon
              size="small"
              image={IconImage.INFO}
              onClick={() => openModal('TaskHistory', { instances })}
            />
          </div>
        </div>
      </header>
      <div className="task-info__content">
        <MeasurementInfo
          status={task.status}
          kondor={task.kondor}
          items={items.filter(({ value }) => value)}
        />
      </div>
    </div>
  );
};

const mapDispatch = {
  openModal
};

export default connect(
  null,
  mapDispatch
)(TaskInfo);
