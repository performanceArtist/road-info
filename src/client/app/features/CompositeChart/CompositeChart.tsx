import * as React from 'react';
import { useState } from 'react';

import Chart from '@components/Chart/Chart';
import Table from '@components/Table/Table';
import Spinner from '@components/Spinner/Spinner';

import MeasurementInfo from './MeasurementInfo';

import { Tasks } from '@redux/task/types';
import {
  Measurements,
  MeasurementItem,
  MeasurementData
} from '@redux/measurements/types';
import { ChartInfo } from '@redux/chart/types';

import ChartPreview from './ChartPreview';
import ChartFooter from './ChartFooter';
import ChartHeader from './ChartHeader';

type OwnProps = {
  measurements: Measurements;
  tasks: Tasks;
  chartInfo: ChartInfo;
  onSelectChange?: (taskId: string, instanceId: string) => void;
  showSpinner?: boolean;
};

type Props = OwnProps;

const CompositeChart: React.FC<Props> = ({
  measurements,
  tasks,
  chartInfo,
  onSelectChange,
  showSpinner = false
}) => {
  const [currentTask, setcurrentTask] = useState(null);
  const [currentChart, setCurrentChart] = useState(null);
  const [bigPreviews, setBigPreviews] = useState([]);
  const [tables, setTables] = useState([]);
  const [info, setInfo] = useState([]);
  const [instances, setInstances] = useState(
    measurements.map(({ taskId, data }) => {
      const keys = Object.keys(data);
      return { taskId, instanceId: keys[keys.length - 1] };
    })
  );

  const hasData = () => {
    if (!onSelectChange) return true;

    const data = measurements[0].data;
    const keys = Object.keys(data);

    return keys.some(key => data[key].length !== 0);
  };

  const toggleExpand = (id: string) => {
    if (bigPreviews.indexOf(id) !== -1) {
      setBigPreviews(bigPreviews.filter(listId => id !== listId));
    } else {
      setBigPreviews(bigPreviews.concat(id));
    }
  };

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

  const getFooter = (type: 'table' | 'preview', id: string) => {
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

  const getPreview = ({ taskId, data }: MeasurementItem) => {
    const ids = instances.find(
      ({ taskId: listTaskId }) => listTaskId === taskId
    );
    if (!ids) return;

    const lastData = data[ids.instanceId];

    return (
      <div className="composite-chart__preview-container">
        <ChartPreview
          chartInfo={chartInfo}
          data={lastData}
          expand={bigPreviews.indexOf(taskId) !== -1}
        />
        {getFooter('preview', taskId)}
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
        {getFooter('table', taskId)}
      </div>
    );
  };

  const getPreviews = () => {
    return measurements.map(measurement => {
      const instance = instances.find(
        ({ taskId }) => taskId === measurement.taskId
      );

      const previews =
        tables.indexOf(measurement.taskId) !== -1
          ? getTable(measurement)
          : getPreview(measurement);

      return (
        <div key={measurement.taskId}>
          {getHeader(measurement, instance ? instance.instanceId : '', false)}
          {renderInfo(measurement.taskId)}
          <div
            className="composite-chart__chart-container"
            onDoubleClick={() => setcurrentTask(measurement.taskId)}
          >
            {showSpinner ? <Spinner /> : previews}
          </div>
        </div>
      );
    });
  };

  const fullChart = (
    keyY: string,
    data: Array<MeasurementData>,
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

  const handleSelectChange = (value: string, taskId: string) => {
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

    setInstances(newInstances);
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
      {currentTask &&
        getHeader(
          measurements.find(({ taskId }) => taskId === currentTask),
          instances.find(({ taskId }) => taskId === currentTask).instanceId
        )}
      {renderInfo(currentTask)}
      <div className="composite-chart__previews">
        {currentTask ? getCurrentChart() : getPreviews()}
      </div>
    </div>
  );
};

export default CompositeChart;
