import * as React from 'react';
import { useEffect } from 'react';

import { connect } from 'react-redux';

import { Button } from '@shared/view';
import { Task, TaskInstance } from '@shared/types';
import { RootState } from '@redux/reducer';
import { openModal } from '@features/Modal/redux/actions';

import TaskInfo from './TaskInfo';

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
  const ref = React.createRef();

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }, [tasks]);

  return (
    <div className="task-panel">
      {elements}
      <div style={{ float: 'left', clear: 'both' }} ref={ref} />
    </div>
  );
};

const mapState = ({ tasks }: RootState) => ({
  tasks: tasks.tasks,
  instances: tasks.instances
});

const mapDispatch = { openModal };

export default connect(
  mapState,
  mapDispatch
)(TaskPanel);
