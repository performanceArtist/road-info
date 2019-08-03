import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Icon, IconImage } from '@components/Icon/Icon';
import Chart from '@components/Chart/Chart';
import ChartControls from '@components/ChartControls/ChartControls';
import Table from '@components/Table/Table';
import MeasurementInfo from '@components/MeasurementInfo/MeasurementInfo';

import { RootState } from '@redux/reducer';
import { taskData, taskDataItem, ChartData } from '@redux/measurements/types';
import { ChartInfo } from '@redux/chart/types';

type MapState = {
  tasks: taskData;
  chartInfo: ChartInfo;
};

type Props = MapState;

const CompositeChart: React.FC<Props> = ({ tasks, chartInfo }) => {
  const [currenttask, setCurrenttask] = useState(null);
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

    return <MeasurementInfo {...tasks.find(({ id }) => id === current).info} />;
  };

  const fullChart = (keyY: string, data: ChartData, isOneOnScreen = false) => (
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

  const preview = (keyY: string, data: ChartData) => (
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
          <Icon image={IconImage.EXPAND} onClick={() => setCurrenttask(id)} />
        </div>
      </div>
    );
  };

  const getPreview = ({ id, measurements }: taskDataItem) => (
    <>
      {preview('density', measurements)}
      {preview('rutting', measurements)}
      {preview('iri', measurements)}
      {preview('thickness', measurements)}
      {getIcons('preview', id)}
    </>
  );

  const getTable = ({ id, measurements }: taskDataItem) => (
    <div className="composite-chart__table">
      <Table
        data={measurements.map(
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
      {getIcons('table', id)}
    </div>
  );

  const getPreviews = () =>
    tasks.map(task => (
      <div>
        <div
          className="composite-chart__title"
          style={{ width: 'auto', height: 'auto' }}
        >
          {`Задание #${task.id}`}
          <Icon
            image={IconImage.ANGLE}
            size="small"
            onClick={() => toggleInfo(task.id)}
          />
        </div>
        {renderInfo(task.id)}
        <div
          className="composite-chart__chart-container"
          onDoubleClick={() => setCurrenttask(task.id)}
        >
          {tables.indexOf(task.id) !== -1 ? getTable(task) : getPreview(task)}
        </div>
      </div>
    ));

  const gettaskChart = () => {
    const { measurements } = tasks.find(({ id }) => id === currenttask);

    if (currentChart) return fullChart(currentChart, measurements, true);

    return (
      <>
        {fullChart('density', measurements)}
        {fullChart('rutting', measurements)}
        {fullChart('iri', measurements)}
        {fullChart('thickness', measurements)}
      </>
    );
  };

  return (
    <div className="composite-chart">
      <div className="composite-chart__controls">
        <ChartControls
          onArrowClick={() => {
            if (currentChart) setCurrentChart(null);
            if (!currentChart && currenttask) setCurrenttask(null);
          }}
        />
      </div>
      {currenttask && (
        <div className="composite-chart__title">{`Задание #${currenttask}`}</div>
      )}
      <div className="composite-chart__previews">
        {currenttask ? gettaskChart() : getPreviews()}
      </div>
      <div>{/*<RoadChart data={tasks[0].measurements} />*/}</div>
    </div>
  );
};

const mapState = ({ measurements, chart }: RootState) => ({
  tasks: measurements.tasks,
  chartInfo: chart
});

export default connect(mapState)(CompositeChart);
