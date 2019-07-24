import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '@shared/Button/Button';
import { Icon, IconImage } from '@components/Icon/Icon';
import ControlForm from '@components/ControlForm/ControlForm';
import Chart from '@components/Chart/Chart';
import ChartSettings from '@components/ChartSettings/ChartSettings';
import ChartControls from '@components/ChartControls/ChartControls';
import Table from '@components/Table/Table';
import RoadChart from '@components/RoadChart/RoadChart';

import { openModal } from '@redux/modal/actions';
import { RootState } from '@redux/reducer';
import {
  KondorData,
  KondorDataItem,
  ChartInfo,
  ChartData
} from '@redux/measurements/types';

import testData from '../../views/Measurements/testData';

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
      className="composite-chart__container"
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
          {...chartInfo.lines[keyY]}
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
      />
    </div>
  );

  const getPreview = ({ id, measurements }: KondorDataItem) => (
    <>
      {preview('density', measurements)}
      {preview('rutting', measurements)}
      {preview('iri', measurements)}
      {preview('thickness', measurements)}
      <div className="composite-chart__icons">
        <Icon
          image={IconImage.TABLE}
          onClick={() => setTables(tables.concat(id))}
        />
      </div>
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
        maxRows={14}
      />
      <div className="composite-chart__icons">
        <Icon
          image={IconImage.GRAPH}
          onClick={() => setTables(tables.filter(el => el !== id))}
        />
      </div>
    </>
  );

  const getPreviews = () =>
    kondors.map(kondor => (
      <div
        className="composite-chart__container"
        onDoubleClick={() => setCurrentKondor(kondor.id)}
      >
        <div className="composite-chart__title">{`Кондор #${kondor.id}`}</div>
        {tables.indexOf(kondor.id) !== -1
          ? getTable(kondor)
          : getPreview(kondor)}
      </div>
    ));

  const getKondor = () => kondors.find(({ id }) => id === currentKondor);

  const getKondorChart = () => {
    const { measurements } = getKondor();

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
