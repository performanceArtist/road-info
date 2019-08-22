import * as React from 'react';
import { connect } from 'react-redux';

import Modal from '@components/Modal/Modal';
import { closeModal } from '@redux/modal/actions';
import { MeasurementItem } from '@redux/measurements/types';

type MapState = {
  measurement: MeasurementItem;
};

type Props = MapState & typeof mapDispatch;

const PathModal: React.FC<Props> = ({ measurement, closeModal }) => {
  const { taskId, data } = measurement;

  return (
    <Modal open={true} onClose={closeModal}>
      <Modal.Header>Задание #{taskId}</Modal.Header>
      <Modal.Content>
        <div className="path-modal">Test</div>
      </Modal.Content>
      <Modal.Footer />
    </Modal>
  );
};

const mapDispatch = { closeModal };

export default connect(
  null,
  mapDispatch
)(PathModal);
