import * as React from 'react';
import { useState } from 'react';

import Spinner from '@components/Spinner/Spinner';
import ChartContainer from './ChartContainer';

type Props = {
  tasks: Array<any>;
  instances: Array<any>;
  onInstanceChange: Function;
  measurements: Array<any>;
};

const HistoryPanel: React.FC<Props> = ({
  tasks = [],
  instances = [],
  measurements = [],
  onInstanceChange
}) => {
  const [taskId, setTaskId] = useState(tasks[0] ? tasks[0].id : null);
  const [instanceId, setInstanceId] = useState(
    instances[0] ? instances[0].id : null
  );

  const taskSelect = () => {
    if (tasks.length === 0) return null;

    return (
      <select
        name="task"
        value={taskId}
        onChange={event => setTaskId(event.target.value)}
      >
        <option />
        {tasks.map(({ id }) => (
          <option value={id} key={id}>
            {id}
          </option>
        ))}
      </select>
    );
  };

  const instanceSelect = () => {
    const filtered = instances.filter(({ order_id }) => order_id === taskId);

    if (filtered.length === 0) return null;

    return (
      <select
        name="instance"
        value={instanceId}
        onChange={event => {
          setInstanceId(event.target.value);
          if (
            measurements.find(({ taskId }) => taskId === event.target.value)
          ) {
            return;
          }

          onInstanceChange(taskId, instanceId);
        }}
      >
        <option />
        {filtered.map(({ id }) => (
          <option value={id} key={id}>
            {id}
          </option>
        ))}
      </select>
    );
  };

  const current = measurements.find(({ taskId }) => taskId === instanceId);

  const chart = (
    <div>
      {current ? (
        <ChartContainer tasks={tasks} measurements={[current]} />
      ) : (
        <Spinner />
      )}
    </div>
  );

  return (
    <div className="history-panel">
      <div className="history-panel__select-container">
        {taskSelect()}
        {instanceSelect()}
      </div>

      {taskId && instanceId && chart}
    </div>
  );
};

export default HistoryPanel;
