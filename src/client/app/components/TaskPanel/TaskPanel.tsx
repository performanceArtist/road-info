import * as React from 'react';
import { connect } from 'react-redux';

import Button from '@shared/Button/Button';
import TaskInfo from '@components/TaskInfo/TaskInfo';

import { openModal } from '@redux/modal/actions';
import { Task, TaskInstance } from '@redux/task/types';
import { RootState } from '@redux/reducer';

type OwnProps = {
  tasks: Array<Task>;
  instances: { [key: string]: Array<TaskInstance> };
};

type Props = OwnProps & typeof mapDispatch;

const TaskPanel: React.FC<Props> = ({ tasks = [], instances, openModal }) => {
  const elements = tasks.map(task => {
    return (
      <div className="task-panel__task" key={`task-${task.id}`}>
        <TaskInfo task={task} instances={instances[task.id]} />
      </div>
    );
  });

  return (
    <div className="task-panel">
      {elements}
      <div className="task-panel__create">
        <div className="task-panel__button">
          <Button onClick={() => openModal('Task')}>Новое задание</Button>
        </div>
      </div>
    </div>
  );
};

const mapState = ({ tasks }: RootState) => ({
  tasks: tasks.tasks,
  instances: tasks.instances
});

const mapDispatch = {
  openModal
};

export default connect(
  mapState,
  mapDispatch
)(TaskPanel);
