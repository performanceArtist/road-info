import React from 'react';
import { connect } from 'react-redux';

import { Toggle, ToggleType } from '@components/Toggle/Toggle';
import Button from '@shared/Button/Button';
import { Icon, IconImage } from '@components/Icon/Icon';
import MeasurementInfo from '@components/MeasurementInfo/MeasurementInfo';

import { openModal } from '@redux/modal/actions';
import { Task } from '@redux/task/types';

type OwnProps = {
  task: Task;
};

type Props = OwnProps & typeof mapDispatch;

const TaskInfo: React.FC<Props> = ({ task, openModal }) => {
  return (
    <div className="task-info">
      <header className="task-info__header">
        <div className="task-info__name">{`#${task.id}`}</div>
        <div className="task-info__icon-container">
          <div className="task-info__icon">
            {/*
            <Toggle
              name="task"
              type={ToggleType.RADIO}
              onChange={(event: React.MouseEvent) => {
                if (event.target.checked) generateMeasurements(task.id);
              }}
            />*/}
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
        </div>
      </header>
      <div className="task-info__content">
        <MeasurementInfo
          status={task.status}
          kondor={task.kondor}
          items={[
            { title: 'Регион', value: task.region },
            { title: 'Город', value: task.city },
            { title: 'Дорога', value: task.roadName },
            { title: 'Участок', value: task.partName },
            { title: 'Кол-во полос', value: task.lanesCount },
            { title: 'Текущая полоса', value: task.lane },
            { title: 'Кондор', value: task.kondor },
            { title: 'Старт', value: task.start },
            { title: 'Финиш', value: task.finish }
          ]}
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
