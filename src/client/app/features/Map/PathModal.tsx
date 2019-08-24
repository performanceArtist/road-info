import * as React from 'react';
import { connect } from 'react-redux';

import Modal from '@components/Modal/Modal';
import RoadChart from '@features/Road/RoadChart';

import { MeasurementItem } from '@redux/measurements/types';
import { ChartInfo } from '../../redux/chart/types';

type OwnProps = {
  measurement: MeasurementItem;
  closestIndex: number;
  onClose: () => void;
};

type MapState = {
  chartInfo: ChartInfo;
};

type Props = OwnProps & MapState & typeof mapDispatch;

const PathModal: React.FC<Props> = ({
  measurement,
  closestIndex,
  chartInfo,
  onClose
}) => {
  const { taskId, data } = measurement;

  return (
    <Modal open={true} onClose={onClose}>
      <Modal.Header>Просмотр</Modal.Header>
      <Modal.Content>
        <div className="path-modal">
          <RoadChart
            title={`Задание #${taskId}`}
            keyX="distance"
            data={data}
            chartInfo={chartInfo}
            xUnits={chartInfo.xAxis.units}
            positionIndex={closestIndex}
          />
        </div>
      </Modal.Content>
      <Modal.Footer />
    </Modal>
  );
};

const mapState = ({ chart }) => ({
  chartInfo: chart
});

export default connect(mapState)(PathModal);
