import * as React from 'react';
import { useState, useEffect } from 'react';

import { Icon, IconImage } from '@components/Icon/Icon';
import Chart from '@components/Chart/Chart';
import ChartControls from '@components/ChartControls/ChartControls';
import Table from '@components/Table/Table';
import MeasurementInfo from '@components/MeasurementInfo/MeasurementInfo';

import { Tasks } from '@redux/task/types';
import {
  Measurements,
  MeasurementItem,
  MeasurementData,
  MeasurementInstances
} from '@redux/measurements/types';
import { ChartInfo } from '@redux/chart/types';

type OwnProps = {
  measurements: Measurements;
  tasks: Tasks;
  chartInfo: ChartInfo;
  onSelectChange?: (taskId: string, instanceId: string) => void;
};

type Props = OwnProps;

const CompositeChart: React.FC<Props> = ({
  measurements,
  tasks,
  chartInfo,
  onSelectChange
}) => {
  const [currentTask, setcurrentTask] = useState(null);
  const [currentChart, setCurrentChart] = useState(null);
  const [tables, setTables] = useState([]);
  const [info, setInfo] = useState([]);
  const [instances, setInstances] = useState(
    measurements.map(({ taskId, data }) => {
      const keys = Object.keys(data);
      return { taskId, instanceId: keys[keys.length - 1] };
    })
  );

  useEffect(() => {
    setInstances(
      measurements.map(({ taskId, data }) => {
        const keys = Object.keys(data);
        return { taskId, instanceId: keys[keys.length - 1] };
      })
    );
  }, [measurements]);

  const controls = (
    <ChartControls
      onArrowClick={() => {
        if (currentChart) setCurrentChart(null);
        if (!currentChart && currentTask) setcurrentTask(null);
      }}
    />
  );

  const toggleInfo = (newId: string) => {
    const filtered = info.filter(id => id !== newId);

    if (filtered.length === info.length) {
      setInfo(info.concat(newId));
    } else {
      setInfo(filtered);
    }
  };

  const renderInfo = (newId: string) => {
    const current = info.find(id => id === newId);

    if (!current) return null;

    const {
      status,
      start,
      finish,
      lane,
      lanesCount,
      description,
      kondor,
      partName,
      roadName,
      city,
      region
    } = tasks.find(({ id }) => id == current);

    return (
      <MeasurementInfo
        status={status}
        kondor={kondor}
        items={[
          { title: 'Регион', value: region },
          { title: 'Город', value: city },
          { title: 'Дорога', value: roadName },
          { title: 'Участок', value: partName },
          { title: 'Кол-во полос', value: lanesCount },
          { title: 'Текущая полоса', value: lane },
          { title: 'Кондор', value: kondor },
          { title: 'Старт', value: start },
          { title: 'Финиш', value: finish }
        ]}
      />
    );
  };

  const fullChart = (
    keyY: string,
    data: Array<MeasurementData>,
    isOneOnScreen = false
  ) => (
    <div
      className="composite-chart__chart-container"
      onDoubleClick={() => setCurrentChart(keyY)}
    >
      <div
        className={
          isOneOnScreen
            ? 'composite-chart__chart composite-chart__chart_big'
            : 'composite-chart__chart'
        }
      >
        <Chart
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

  const preview = (keyY: string, data: Array<MeasurementData>) => (
    <div className="composite-chart__chart composite-chart__chart_preview">
      <Chart
        keyX="distance"
        keyY={keyY}
        data={data}
        showMax={false}
        showMin={false}
        showY={false}
        showBrush={false}
        enableZoom={false}
        {...chartInfo.lines[keyY]}
        key={Math.random()}
        maxTicks={1000}
      />
    </div>
  );

  const getIcons = (type: 'table' | 'preview', id: string) => {
    return (
      <div className="composite-chart__icons">
        <div className="composite-chart__icon">
          {type === 'table' ? (
            <Icon
              image={IconImage.GRAPH}
              onClick={() => setTables(tables.filter(el => el !== id))}
            />
          ) : (
            <Icon
              image={IconImage.TABLE}
              onClick={() => setTables(tables.concat(id))}
            />
          )}
        </div>
        <div className="composite-chart__icon">
          <Icon image={IconImage.EXPAND} onClick={() => setcurrentTask(id)} />
        </div>
      </div>
    );
  };

  const getPreview = ({ taskId, data }: MeasurementItem) => {
    const ids = instances.find(
      ({ taskId: listTaskId }) => listTaskId === taskId
    );
    if (!ids) return;

    const lastData = data[ids.instanceId];

    return (
      <div className="composite-chart__preview-container">
        {preview('density', lastData)}
        {preview('rutting', lastData)}
        {preview('iri', lastData)}
        {preview('thickness', lastData)}
        {getIcons('preview', taskId)}
      </div>
    );
  };

  const getTable = ({ taskId, data }: MeasurementItem) => {
    const ids = instances.find(
      ({ taskId: listTaskId }) => listTaskId === taskId
    );
    const lastData = data[ids.instanceId];

    return (
      <div className="composite-chart__table">
        <Table
          data={lastData.map(
            ({ distance, density, iri, rutting, thickness }) => ({
              distance,
              density,
              iri,
              rutting,
              thickness
            })
          )}
          chartInfo={chartInfo}
          maxRows={15}
        />
        {getIcons('table', taskId)}
      </div>
    );
  };

  const handleSelectChange = (event: React.SyntheticEvent, taskId: string) => {
    const target = event.target as HTMLFormElement;
    const newInstances = JSON.parse(JSON.stringify(instances));
    const current = newInstances.find(
      ({ taskId: listTaskId }) => listTaskId == taskId
    );
    current.instanceId = target.value;

    const measurement = measurements.find(
      ({ taskId: listTaskId }) => listTaskId === taskId
    );

    if (onSelectChange && measurement.data[target.value].length === 0)
      onSelectChange(taskId, target.value);

    setInstances(newInstances);
  };

  const getPreviews = () =>
    measurements.map(measurement => (
      <div key={measurement.taskId}>
        <div
          className="composite-chart__title"
          style={{ width: 'auto', height: 'auto' }}
        >
          <span className="composite-chart__title-task">{`Задание #${
            measurement.taskId
          }, заезд`}</span>
          <select
            name="instance"
            value={instances[measurement.taskId]}
            onChange={event => handleSelectChange(event, measurement.taskId)}
          >
            {onSelectChange && <option />}
            {Object.keys(measurement.data).map(id => (
              <option value={id}>{id}</option>
            ))}
          </select>
          <div className="composite-chart__title-icon">
            <Icon
              image={IconImage.ANGLE}
              size="small"
              onClick={() => toggleInfo(measurement.taskId)}
            />
          </div>
        </div>
        {renderInfo(measurement.taskId)}
        <div
          className="composite-chart__chart-container"
          onDoubleClick={() => setcurrentTask(measurement.taskId)}
        >
          {tables.indexOf(measurement.taskId) !== -1
            ? getTable(measurement)
            : getPreview(measurement)}
        </div>
      </div>
    ));

  const getTaskChart = () => {
    const { data } = measurements.find(({ taskId }) => taskId === currentTask);
    const ids = instances.find(
      ({ taskId: listTaskId }) => listTaskId === currentTask
    );
    const lastData = data[ids.instanceId];

    if (currentChart) return fullChart(currentChart, lastData, true);

    return (
      <>
        {fullChart('density', lastData)}
        {fullChart('rutting', lastData)}
        {fullChart('iri', lastData)}
        {fullChart('thickness', lastData)}
      </>
    );
  };

  const getCurrentTitle = () => {
    const measurement = measurements.find(
      ({ taskId }) => taskId === currentTask
    );

    return (
      <>
        <div className="composite-chart__title">
          <span className="composite-chart__title-task">{`Задание #${currentTask}, заезд`}</span>
          {
            <select
              name="instance"
              value={instances[currentTask]}
              onChange={event => handleSelectChange(event, measurement.taskId)}
            >
              {Object.keys(measurement.data).map(id => (
                <option value={id}>{id}</option>
              ))}
            </select>
          }

          <div className="composite-chart__title-icon">
            <Icon
              image={IconImage.ANGLE}
              size="small"
              onClick={() => toggleInfo(currentTask)}
            />
          </div>
          {controls}
        </div>
        {renderInfo(currentTask)}
      </>
    );
  };

  return (
    <div className="composite-chart">
      {currentTask && getCurrentTitle()}
      <div className="composite-chart__previews">
        {currentTask ? getTaskChart() : getPreviews()}
      </div>
    </div>
  );
};

export default CompositeChart;
