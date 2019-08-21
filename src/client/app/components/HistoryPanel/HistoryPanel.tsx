import * as React from 'react';
import { useState } from 'react';

import Spinner from '@components/Spinner/Spinner';
import ChartContainer from './ChartContainer';

type Props = {
  tasks: Array<any>;
  instances: Array<any>;
  measurements: Array<any>;
  fetchMeasurements: (taskId: string, instanceId: string) => void;
};

const HistoryPanel: React.FC<Props> = ({
  tasks = [],
  measurements = [],
  fetchMeasurements
}) => {
  const [taskId, setTaskId] = useState(tasks[0] ? tasks[0].id : '');

  const taskSelect = () => {
    if (tasks.length === 0) return null;

    return (
      <>
        Задание #
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
      </>
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
          tasks={tasks}
          measurements={[current]}
          onSelectChange={fetchMeasurements}
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
