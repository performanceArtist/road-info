import * as React from 'react';
import { connect } from 'react-redux';

import Modal from '@components/Modal/Modal';
import RoadChart from '@features/Road/RoadChart';

import { closeModal } from '@redux/modal/actions';
import { MeasurementItem } from '@redux/measurements/types';
import { ChartInfo } from '../../redux/chart/types';

type OwnProps = {
  measurement: MeasurementItem;
  closestIndex: number;
};

type MapState = {
  chartInfo: ChartInfo;
};

type Props = OwnProps & MapState & typeof mapDispatch;

const PathModal: React.FC<Props> = ({
  measurement,
  closestIndex,
  chartInfo,
  closeModal
}) => {
  const { taskId, data } = measurement;

  return (
    <Modal open={true} onClose={closeModal}>
      <Modal.Header>Задание #{taskId}</Modal.Header>
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

const mapDispatch = { closeModal };

export default connect(
  mapState,
  mapDispatch
)(PathModal);
