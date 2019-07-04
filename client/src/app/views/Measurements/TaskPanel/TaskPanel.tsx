import React from 'react';
import { connect } from 'react-redux';

import { Toggle, ToggleType } from '@components/Toggle/Toggle';
import { Icon, IconImage } from '@components/Icon/Icon';
import { openModal } from '@redux/modal/actions';
import { removeTask, MEASUREMENT } from '@redux/measurements/actions';

const TaskPanel = ({
  tasks = [],
  openModal,
  removeTask,
  postData,
  setCurrentTask
}) => {
  const elements = tasks.map((formData, index) => {
    const { name } = formData;

    return (
      <div className="task" key={`task-${index}`}>
        <header className="task-panel__header">
          <div className="task-panel__name">{name}</div>
          <Toggle
            type={ToggleType.RADIO}
            name="start"
            onChange={event => {
              if (event.target.checked) {
                setCurrentTask(index);
                postData(formData, index);
              }
            }}
          />
          <div className="task-panel__icon-container">
            <div className="task-panel__icon">
              <Icon
                size="small"
                image={IconImage.EDIT}
                onClick={() => openModal('Task', { counter: 1, index })}
              />
            </div>
            <div className="task-panel__icon">
              <Icon
                size="small"
                image={IconImage.DELETE}
                onClick={() => removeTask(index)}
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

  return <div className="task-panel">{elements}</div>;
};

export default connect(
  null,
  {
    openModal,
    removeTask,
    postData: (formData, index) => ({
      type: MEASUREMENT.POST.REQUEST,
      payload: { formData, index }
    }),
    setCurrentTask: index => ({
      type: MEASUREMENT.TASK.SET_CURRENT,
      payload: { index }
    })
  }
)(TaskPanel);
