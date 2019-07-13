import React from 'react';
import uuid from 'short-uuid';

import { connect } from 'react-redux';

import Modal from '@components/Modal/Modal';
import { closeModal } from '@redux/modal/actions';

interface Notice {
  message: string;
  warning: boolean;
}

interface Props {
  notices: Array<Notice>;
}

const InfoModal: React.SFC<Props> = ({ notices, closeModal }) => {
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
        <Modal.Content>{rows}</Modal.Content>
      </Modal>
    </div>
  );
};

export default connect(
  null,
  { closeModal }
)(InfoModal);
