import * as React from 'react';
import { useState } from 'react';

type Props = {
  tasks: Array<any>;
  instances: Array<any>;
  onInstanceChange: Function;
  measurements: object;
};

const HistoryPanel: React.FC<Props> = ({
  tasks = [],
  instances = [],
  measurements = {},
  onInstanceChange
}) => {
  const [taskId, setTaskId] = useState(tasks[0] ? tasks[0].id : null);

  const taskSelect = () => {
    if (tasks.length === 0) return <span>Задания отсутствуют</span>;

    return (
      <select name="task" onChange={event => setTaskId(event.target.value)}>
        {tasks.map(({ id }) => (
          <option value={id}>{id}</option>
        ))}
      </select>
    );
  };

  const instanceSelect = () => {
    const filtered = instances.filter(({ order_id }) => order_id === taskId);

    if (filtered.length === 0) return <span>Измерения отсутствуют</span>;

    if (!measurements[id]) onInstanceChange(filtered[0].id);

    return (
      <select
        name="instance"
        onChange={event =>
          !measurements[id] && onInstanceChange(event.target.value)
        }
      >
        {filtered.map(({ id }) => (
          <option value={id}>{id}</option>
        ))}
      </select>
    );
  };

  return (
    <div className="history-panel">
      <h2>История</h2>
      {taskSelect()}
      {instanceSelect()}
    </div>
  );
};

export default HistoryPanel;
