import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Icon, IconImage } from '@components/Icon/Icon';
import Chart from '@components/Chart/Chart';
import ChartControls from '@components/ChartControls/ChartControls';
import Table from '@components/Table/Table';
import MeasurementInfo from '@components/MeasurementInfo/MeasurementInfo';

import { RootState } from '@redux/reducer';
import { Tasks } from '@redux/task/types';
import {
  Measurements,
  MeasurementItem,
  MeasurementData
} from '@redux/measurements/types';
import { ChartInfo } from '@redux/chart/types';

type MapState = {
  measurements: Measurements;
  tasks: Tasks;
  chartInfo: ChartInfo;
};

type Props = MapState;

const CompositeChart: React.FC<Props> = ({
  measurements,
  tasks,
  chartInfo
}) => {
  const [currentTask, setcurrentTask] = useState(null);
  const [currentChart, setCurrentChart] = useState(null);
  const [tables, setTables] = useState([]);
  const [info, setInfo] = useState([]);

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

  const getPreview = ({ taskId, data }: MeasurementItem) => (
    <div className="composite-chart__preview-container">
      {preview('density', data)}
      {preview('rutting', data)}
      {preview('iri', data)}
      {preview('thickness', data)}
      {getIcons('preview', taskId)}
    </div>
  );

  const getTable = ({ taskId, data }: MeasurementItem) => (
    <div className="composite-chart__table">
      <Table
        data={data.map(({ distance, density, iri, rutting, thickness }) => ({
          distance,
          density,
          iri,
          rutting,
          thickness
        }))}
        chartInfo={chartInfo}
        maxRows={15}
      />
      {getIcons('table', taskId)}
    </div>
  );

  const getPreviews = () =>
    measurements.map(measurement => (
      <div>
        <div
          className="composite-chart__title"
          style={{ width: 'auto', height: 'auto' }}
        >
          {`Задание #${measurement.taskId}`}
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

  return (
    <div className="composite-chart">
      <div className="composite-chart__controls">
        <ChartControls
          onArrowClick={() => {
            if (currentChart) setCurrentChart(null);
            if (!currentChart && currentTask) setcurrentTask(null);
          }}
        />
      </div>
      {currentTask && (
        <>
          <div className="composite-chart__title">
            {`Задание #${currentTask}`}
            <div className="composite-chart__title-icon">
              <Icon
                image={IconImage.ANGLE}
                size="small"
                onClick={() => toggleInfo(currentTask)}
              />
            </div>
          </div>
          {renderInfo(currentTask)}
        </>
      )}
      <div className="composite-chart__previews">
        {currentTask ? getTaskChart() : getPreviews()}
      </div>
      <div>{/*<RoadChart data={tasks[0].measurements} />*/}</div>
    </div>
  );
};

const mapState = ({ measurements, chart, tasks }: RootState) => ({
  measurements,
  tasks,
  chartInfo: chart
});

export default connect(mapState)(CompositeChart);
