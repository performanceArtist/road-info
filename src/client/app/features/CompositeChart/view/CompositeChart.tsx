import * as React from 'react';
import { useState } from 'react';

import Chart from '@components/Chart/Chart';
import Table from '@components/Table/Table';
import Spinner from '@components/Spinner/Spinner';
import MeasurementInfo from '@shared/view/MeasurementInfo/MeasurementInfo';
import { Measurements, ServerTask, DatabaseJob } from '@shared/types';
import { ChartInfo } from '@shared/types';
import { getStatus, extractMeasurements } from '@shared/utils';

import ChartPreview from './ChartPreview';
import ChartFooter from './ChartFooter';
import ChartHeader from './ChartHeader';

type OwnProps = {
  measurements: Measurements;
  jobs: DatabaseJob[];
  tasks: ServerTask[];
  chartInfo: ChartInfo;
  onSelectChange?: (taskId: string, instanceId: string) => void;
  showSpinner?: boolean;
};

type Props = OwnProps;

const CompositeChart: React.FC<Props> = ({
  measurements,
  tasks,
  jobs,
  chartInfo,
  onSelectChange,
  showSpinner = false
}) => {
  const [currentTask, setcurrentTask] = useState<number | null>(null);
  const [currentChart, setCurrentChart] = useState<string | null>(null);
  const [bigPreviews, setBigPreviews] = useState<number[]>([]);
  const [tables, setTables] = useState<number[]>([]);
  const [info, setInfo] = useState<number[]>([]);
  const [instances, setInstances] = useState([]);

  const hasData = () => {
    /*
    if (!onSelectChange) return true;

    const data = measurements[0];
    const keys = Object.keys(data);

    return keys.some(key => data[key].length !== 0);*/
    return true;
  };

  const toggleExpand = (id: number) => {
    if (bigPreviews.indexOf(id) !== -1) {
      setBigPreviews(bigPreviews.filter(listId => id !== listId));
    } else {
      setBigPreviews(bigPreviews.concat(id));
    }
  };

  const toggleInfo = (newId: number) => {
    const filtered = info.filter(id => id !== newId);

    if (filtered.length === info.length) {
      setInfo(info.concat(newId));
    } else {
      setInfo(filtered);
    }
  };

  const renderInfo = (newId: number) => {
    const current = info.find(id => id === newId);
    if (!current) return null;
    const task = tasks.find(({ id }) => id == current);
    if (!task) return null;

    const items = [
      { title: 'Статус', value: getStatus(task.status) },
      { title: 'Кол-во полос', value: task.lane_number },
      { title: 'Описание', value: task.description },
      { title: 'Старт', value: task.distance[0] },
      { title: 'Финиш', value: task.distance[1] }
    ];

    return <MeasurementInfo items={items} />;
  };

  const getFooter = (type: 'table' | 'preview', id: number) => {
    return (
      <ChartFooter
        type={type}
        onExpandIconClick={() => setcurrentTask(id)}
        onGraphIconClick={() => setTables(tables.filter(el => el !== id))}
        onTableIconClick={() => setTables(tables.concat(id))}
        onHorExpandClick={() => toggleExpand(id)}
      />
    );
  };

  const getPreview = (taskId: number, data: { [key: string]: number }[]) => {
    return (
      <div className="composite-chart__preview-container">
        <ChartPreview
          chartInfo={chartInfo}
          data={data}
          expand={bigPreviews.indexOf(taskId) !== -1}
        />
        {getFooter('preview', taskId)}
      </div>
    );
  };

  const getTable = (taskId: number, data: { [key: string]: number }[]) => {
    return (
      <div className="composite-chart__table">
        <Table data={data} chartInfo={chartInfo} maxRows={15} />
        {getFooter('table', taskId)}
      </div>
    );
  };

  const getPreviews = () => {
    return tasks.map(task => {
      const taskJobs = jobs.filter(job => job.order_id === task.id);
      const last = taskJobs[0];
      if (!last) return null;

      const data = measurements[last.id];

      const previews =
        tables.indexOf(task.id) !== -1
          ? getTable(task.id, extractMeasurements(data))
          : getPreview(task.id, extractMeasurements(data));

      return (
        <div key={task.id}>
          {/*getHeader(measurement, instance ? instance.instanceId : '', false)*/}
          {renderInfo(task.id)}
          <div
            className="composite-chart__chart-container"
            onDoubleClick={() => setcurrentTask(task.id)}
          >
            {showSpinner ? <Spinner /> : previews}
          </div>
        </div>
      );
    });
  };

  const fullChart = (
    keyY: string,
    data: { [key: string]: number }[],
    isOneOnScreen = false
  ) => (
    <div className="composite-chart__chart">
      <div onDoubleClick={() => setCurrentChart(keyY)}>
        <Chart
          modifier={isOneOnScreen ? 'big' : 'default'}
          keyX="distance"
          keyY={keyY}
          data={data}
          maxTicks={chartInfo.maxTicks}
          {...chartInfo.lines[keyY]}
          key={Math.random()}
        />
      </div>
    </div>
  );

  const getCurrentChart = () => {
    const job = jobs.find(job => job.order_id === currentTask);
    if (!job) return;
    const lastData = measurements[job.id];
    if (!lastData) return;
    const data = extractMeasurements(lastData);
    if (currentChart) return fullChart(currentChart, data, true);

    return (
      <>
        {fullChart('density', data)}
        {fullChart('rutting', data)}
        {fullChart('iri', data)}
        {fullChart('thickness', data)}
      </>
    );
  };

  const handleSelectChange = (value: string, taskId: string) => {
    /*
    const newInstances = JSON.parse(JSON.stringify(instances));
    const current = newInstances.find(
      ({ taskId: listTaskId }) => listTaskId == taskId
    );
    current.instanceId = value;

    const measurement = measurements.find(
      ({ taskId: listTaskId }) => listTaskId === taskId
    );

    if (onSelectChange && measurement.data[value].length === 0) {
      onSelectChange(taskId, value);
    }

    setInstances(newInstances);*/
  };

  const getHeader = (
    measurement: MeasurementItem,
    selectValue: string,
    showArrow = true
  ) => {
    return (
      <ChartHeader
        measurement={measurement}
        selectValue={selectValue}
        startOnEmpty={!hasData()}
        showArrow={showArrow}
        onAngleClick={(id: string) => toggleInfo(id)}
        onArrowClick={() => {
          if (currentChart) setCurrentChart(null);
          if (!currentChart && currentTask) setcurrentTask(null);
        }}
        onSelectChange={handleSelectChange}
      />
    );
  };

  return (
    <div className="composite-chart">
      {/*currentTask &&
        getHeader(
          measurements.find(({ taskId }) => taskId === currentTask),
          instances.find(({ taskId }) => taskId === currentTask).instanceId
        )*/}
      {currentTask && renderInfo(currentTask)}
      <div className="composite-chart__previews">
        {currentTask ? getCurrentChart() : getPreviews()}
      </div>
    </div>
  );
};

export default CompositeChart;
