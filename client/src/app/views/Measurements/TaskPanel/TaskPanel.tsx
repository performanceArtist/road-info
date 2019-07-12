import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Toggle, ToggleType } from '@components/Toggle/Toggle';
import { Icon, IconImage } from '@components/Icon/Icon';
import Button from '@shared/Button/Button';
import { openModal } from '@redux/modal/actions';
import {
  removeTask,
  postTask,
  setCurrentTask
} from '@redux/measurements/actions';
import { startChannel } from '@redux/measurements/listen';

const TaskPanel = ({
  tasks = [],
  currentTaskId,
  openModal,
  removeTask,
  postTask,
  setCurrentTask,
  startChannel
}) => {
  useEffect(() => {
    startChannel();
  }, []);

  const elements = tasks.map(task => {
    const { id, formData } = task;
    const { name } = formData;

    return (
      <div className="task" key={`task-${id}`}>
        <header className="task-panel__header">
          <div className="task-panel__name">{name}</div>
          <Toggle
            type={ToggleType.RADIO}
            name="start"
            checked={currentTaskId === id}
            onChange={event => {
              if (event.target.checked) {
                setCurrentTask(id);
                postTask(formData, id);
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
        <Button onClick={() => openModal('Task', { counter: 1 })}>
          Новое задание
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ measurements }) => ({
  currentTaskId: measurements.currentTaskId
});

export default connect(
  mapStateToProps,
  {
    openModal,
    removeTask,
    postTask,
    setCurrentTask,
    startChannel
  }
)(TaskPanel);
