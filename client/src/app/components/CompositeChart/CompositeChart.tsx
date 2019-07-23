import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Button from '@shared/Button/Button';
import { Icon, IconImage } from '@components/Icon/Icon';
import ControlForm from '@components/ControlForm/ControlForm';
import Chart from '@components/Chart/Chart';
import ChartSettings from '@components/ChartSettings/ChartSettings';
import ChartControls from '@components/ChartControls/ChartControls';

import socket from '@redux/measurements/socket';
import { openModal } from '@redux/modal/actions';
import { RootState } from '@redux/reducer';
import { KondorData, ChartInfo, ChartData } from '@redux/measurements/types';

import testData from '../../views/Measurements/testData';

type MapState = {
  kondors: KondorData;
  chartInfo: ChartInfo;
};

type Props = MapState & typeof mapDispatch;

const CompositeChart: React.FC<Props> = ({
  kondors,
  chartInfo,
  startChannel,
  openModal
}) => {
  const [currentKondor, setCurrentKondor] = useState(null);
  const [currentChart, setCurrentChart] = useState(null);
  useEffect(() => {
    startChannel();
  });

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
      />
    </div>
  );

  const getPreviews = () =>
    kondors.map(({ id, measurements }) => (
      <div
        className="composite-chart__container"
        onDoubleClick={() => setCurrentKondor(id)}
      >
        {preview('density', measurements)}
        {preview('rutting', measurements)}
        {preview('iri', measurements)}
        {preview('thickness', measurements)}
      </div>
    ));

  const getCurrentKondor = () => {
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
      <div className="composite-chart__previews">
        {currentKondor ? getCurrentKondor() : getPreviews()}
      </div>
    </div>
  );
};

const mapState = ({ measurements }: RootState) => ({
  kondors: measurements.kondors,
  chartInfo: measurements.chartInfo
});

const mapDispatch = { startChannel: socket.startChannel, openModal };

export default connect(
  mapState,
  mapDispatch
)(CompositeChart);
