import React from 'react';
import { connect } from 'react-redux';

import ControlForm from '@components/ControlForm/ControlForm';
import Chart from '@components/Chart/Chart';
import ChartSettings from '@components/ChartSettings/ChartSettings';

import socket from '@redux/measurements/socket';
import { RootState } from '@redux/reducer';
import { KondorData, ChartInfo, ChartData } from '@redux/measurements/types';

import GeneratePanel from '@components/GeneratePanel/GeneratePanel';
import Start from '@components/Start/Start';

import testData from '../../views/Measurements/testData';

type MapState = {
  kondors: KondorData;
  chartInfo: ChartInfo;
};

type Props = MapState;

const CompositeChart: React.FC<Props> = ({ kondors, chartInfo }) => {
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

  const getPreviews = (data: ChartData) => (
    <div className="composite-chart__preview">
      {preview('density', data)}
      {preview('rutting', data)}
      {preview('iri', data)}
      {preview('thickness', data)}
    </div>
  );

  return (
    <div className="composite-chart">
      <div>
        <Start />
      </div>
      <div>
        <GeneratePanel />
      </div>
      <div className="composite-chart__previews">
        {kondors.map(({ measurements }) => getPreviews(measurements))}
      </div>
    </div>
  );
};

const mapState = ({ measurements }: RootState) => ({
  kondors: measurements.kondors,
  chartInfo: measurements.chartInfo
});

export default connect(mapState)(CompositeChart);
