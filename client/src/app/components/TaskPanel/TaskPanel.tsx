import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Toggle, ToggleType } from '@components/Toggle/Toggle';
import { Icon, IconImage } from '@components/Icon/Icon';
import Button from '@shared/Button/Button';
import { openModal } from '@redux/modal/actions';
import { removeTask, postTask, setCurrentTask } from '@redux/task/actions';

type OwnProps = {
  tasks: any;
  currentTaskId: string;
};

type Props = OwnProps & typeof mapDispatch;

const TaskPanel: React.FC<Props> = ({
  tasks = [],
  currentTaskId,
  openModal,
  removeTask,
  postTask,
  setCurrentTask
}) => {
  const elements = tasks.map(task => {
    const { id, chartData, formData } = task;
    const { order } = formData;

    return (
      <div className="task" key={`task-${id}`}>
        <header className="task-panel__header">
          <div className="task-panel__name">{order}</div>
          <Toggle
            type={ToggleType.RADIO}
            name="start"
            checked={currentTaskId === id}
            onChange={event => {
              if (event.target.checked) {
                setCurrentTask(id);
                if (chartData.length === 0) postTask(formData, id);
              }
            }}
          />
          <div className="task-panel__icon-container">
            <div className="task-panel__icon">
              <Icon
                size="small"
                image={IconImage.EDIT}
                onClick={() => openModal('Task', { counter: 1, task })}
              />
            </div>
            <div className="task-panel__icon">
              <Icon
                size="small"
                image={IconImage.DELETE}
                onClick={() => removeTask(id)}
              />
            </div>
            <div className="task-panel__icon">
              <Icon size="small" image={IconImage.ANGLE} />
            </div>
          </div>
        </header>
      </div>
    );
  });

  return (
    <div className="task-panel">
      {elements}
      <div className="task-panel__create">
        <div className="task-panel__button">
          <Button onClick={() => openModal('Task', { counter: 1 })}>
            Новое задание
          </Button>
        </div>
      </div>
    </div>
  );
};

const mapDispatch = {
  openModal,
  removeTask,
  postTask,
  setCurrentTask
};

export default connect(
  null,
  mapDispatch
)(TaskPanel);
