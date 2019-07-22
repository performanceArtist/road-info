import React from 'react';
import { connect } from 'react-redux';

import ControlForm from '@components/ControlForm/ControlForm';
import Chart from '@components/Chart/Chart';
import ChartSettings from '@components/ChartSettings/ChartSettings';
import MeasurementResults from '@components/MeasurementResults/MeasurementResults';
import TaskPanel from '@components/TaskPanel/TaskPanel';

import socket from '@redux/measurements/socket';
import { RootState } from '@redux/reducer';

import testData from '../../views/Measurements/testData';

type StateProps = {
  taskData;
  currentTaskId;
  chartInfo;
};

type Props = StateProps;

const CompositeChart: React.FC<Props> = ({
  taskData,
  currentTaskId,
  chartInfo
}) => {
  const current = taskData.find(({ id }) => id === currentTaskId);
  const { chartData = [] } = current ? current : {};

  return (
    <div className="measurements">
      <div className="measurements__info">
        <div className="measurements__form">
          <TaskPanel tasks={taskData} currentTaskId={currentTaskId} />
        </div>
        <div className="measurements__chart">
          <Chart keyX="distance" keyY="density" data={testData} />
        </div>
        <div className="measurements__chart">
          <Chart keyX="distance" keyY="iri" data={testData} />
        </div>
      </div>
    </div>
  );
};

//            maxTicks={chartInfo.maxTicks}
//{...chartInfo.lines.density}

const mapState = ({ measurements }: RootState) => ({
  ...measurements
});

export default connect(mapState)(CompositeChart);
