import * as React from 'react';
import { connect } from 'react-redux';

import Modal from '@components/Modal/Modal';
import { closeModal } from '@redux/modal/actions';

type Props = typeof mapDispatch;

const PathModal: React.FC<Props> = ({ closeModal }) => {
  return (
    <Modal open={true} onClose={closeModal}>
      <Modal.Header>Путь</Modal.Header>
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