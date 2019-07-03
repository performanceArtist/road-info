import React from 'react';
import uuid from 'short-uuid';
import { connect } from 'react-redux';

import { Toggle } from '@components/Toggle/Toggle';
import { Icon, IconImage } from '@components/Icon/Icon';
import { openModal } from '@redux/modal/actions';
import { removeTask } from '@redux/measurements/actions';

const TaskPanel = ({ tasks = [], openModal, removeTask }) => {
  const elements = tasks.map(({ test }, index) => (
    <div className="task" key={uuid.generate()}>
      <header className="task-panel__header">
        <div className="task-panel__name">{test}</div>
        <Toggle />
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
  ));

  return <div className="task-panel">{elements}</div>;
};

export default connect(
  null,
  { openModal, removeTask }
)(TaskPanel);
