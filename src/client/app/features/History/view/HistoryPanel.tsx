import * as React from 'react';
import { useState } from 'react';

import Spinner from '@components/Spinner/Spinner';
import ChartContainer from './ChartContainer';

type Props = {
  tasks: Array<any>;
  instances: Array<any>;
  measurements: Array<any>;
  fetching: boolean;
  fetchMeasurements: (taskId: string, instanceId: string) => void;
};

const HistoryPanel: React.FC<Props> = ({
  tasks = [],
  measurements = [],
  fetching = false,
  fetchMeasurements
}) => {
  const [taskId, setTaskId] = useState('');

  const taskSelect = () => {
    if (tasks.length === 0) return null;

    return (
      <div className="history-panel__select">
        Задание #
        <select
          name="task"
          value={taskId}
          onChange={event => {
            setTaskId(event.target.value);
            const task = measurements.find(
              measurement => measurement.taskId === event.target.value
            );
            if (Object.keys(task.data).length === 0)
              fetchMeasurements(event.target.value);
          }}
        >
          <option />
          {tasks.map(({ id }) => (
            <option value={id} key={id}>
              {id}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const current = measurements.find(
    ({ taskId: listTaskId }) => listTaskId === taskId
  );

  const chart = (
    <div>
      {current ? (
        <ChartContainer
          key={taskId}
          measurements={current}
          fetching={fetching}
        />
      ) : (
        <Spinner />
      )}
    </div>
  );

  return (
    <div className="history-panel">
      <div className="history-panel__select-container">{taskSelect()}</div>
      {taskId && chart}
    </div>
  );
};

export default HistoryPanel;
