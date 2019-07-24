import React from 'react';
import { connect } from 'react-redux';

import Button from '@shared/Button/Button';
import { Toggle, ToggleType } from '@components/Toggle/Toggle';
import { Icon, IconImage } from '@components/Icon/Icon';

import { openModal } from '@redux/modal/actions';
import { removeTask, postTask } from '@redux/task/actions';
import { Task } from '@redux/task/types';
import { RootState } from '@redux/reducer';

type OwnProps = {
  tasks: Array<Task>;
};

type Props = OwnProps & typeof mapDispatch;

const TaskPanel: React.FC<Props> = ({
  tasks = [],
  openModal,
  removeTask,
  postTask
}) => {
  const elements = tasks.map(task => {
    const { id, formData } = task;
    const { order } = formData;

    return (
      <div className="task" key={`task-${id}`}>
        <header className="task-panel__header">
          <div className="task-panel__name">{order}</div>
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

const mapState = ({ tasks }: RootState) => ({
  tasks: tasks.tasks
});

const mapDispatch = {
  openModal,
  removeTask,
  postTask
};

export default connect(
  mapState,
  mapDispatch
)(TaskPanel);
