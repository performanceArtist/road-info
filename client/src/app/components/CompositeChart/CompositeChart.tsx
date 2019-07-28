import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Icon, IconImage } from '@components/Icon/Icon';
import Chart from '@components/Chart/Chart';
import ChartControls from '@components/ChartControls/ChartControls';
import Table from '@components/Table/Table';

import { openModal } from '@redux/modal/actions';
import { RootState } from '@redux/reducer';
import {
  KondorData,
  KondorDataItem,
  ChartInfo,
  ChartData
} from '@redux/measurements/types';

type MapState = {
  kondors: KondorData;
  chartInfo: ChartInfo;
};

type Props = MapState & typeof mapDispatch;

const CompositeChart: React.FC<Props> = ({ kondors, chartInfo, openModal }) => {
  const [currentKondor, setCurrentKondor] = useState(null);
  const [currentChart, setCurrentChart] = useState(null);
  const [tables, setTables] = useState([]);

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
          <Icon image={IconImage.EXPAND} onClick={() => setCurrentKondor(id)} />
        </div>
      </div>
    );
  };

  const getPreview = ({ id, measurements }: KondorDataItem) => (
    <>
      {preview('density', measurements)}
      {preview('rutting', measurements)}
      {preview('iri', measurements)}
      {preview('thickness', measurements)}
      {getIcons('preview', id)}
    </>
  );

  const getTable = ({ id, measurements }: KondorDataItem) => (
    <>
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
    </>
  );

  const getPreviews = () =>
    kondors.map(kondor => (
      <div>
        <div
          className="composite-chart__title"
          style={{ width: 'auto', height: 'auto' }}
        >{`Кондор #${kondor.id}`}</div>
        <div
          className="composite-chart__chart-container"
          onDoubleClick={() => setCurrentKondor(kondor.id)}
        >
          {tables.indexOf(kondor.id) !== -1
            ? getTable(kondor)
            : getPreview(kondor)}
        </div>
      </div>
    ));

  const getKondorChart = () => {
    const { measurements } = kondors.find(({ id }) => id === currentKondor);

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
            if (!currentChart && currentKondor) setCurrentKondor(null);
          }}
        />
      </div>
      {currentKondor && (
        <div className="composite-chart__title">{`Кондор #${currentKondor}`}</div>
      )}
      <div className="composite-chart__previews">
        {currentKondor ? getKondorChart() : getPreviews()}
      </div>
      <div>{/*<RoadChart data={kondors[0].measurements} />*/}</div>
    </div>
  );
};

const mapState = ({ measurements }: RootState) => ({
  kondors: measurements.kondors,
  chartInfo: measurements.chartInfo
});

const mapDispatch = { openModal };

export default connect(
  mapState,
  mapDispatch
)(CompositeChart);
