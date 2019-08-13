import * as React from 'react';
import uuid from 'short-uuid';

import { connect } from 'react-redux';

import Modal from '@components/Modal/Modal';
import { closeModal } from '@redux/modal/actions';

interface Notice {
  message: string;
  warning: boolean;
}

type OwnProps = {
  notices: Array<Notice>;
};

type Props = OwnProps & typeof mapDispatch;

const InfoModal: React.FC<Props> = ({ notices, closeModal }) => {
  const rows = notices.map(({ message, warning }) => (
    <div
      className={
        warning ? 'info-modal__row info-modal__row_warning' : 'info-modal__row'
      }
      key={uuid.generate()}
    >
      {message}
    </div>
  ));
  return (
    <div className="info-modal">
      <Modal open={true} onClose={closeModal}>
        <Modal.Header>Информация</Modal.Header>
        <Modal.Content>
          {rows}
          <Modal.Footer />
        </Modal.Content>
      </Modal>
    </div>
  );
};

const mapDispatch = { closeModal };

export default connect(
  null,
  mapDispatch
)(InfoModal);
