import React from 'react';
import uuid from 'short-uuid';

import { connect } from 'react-redux';

import Modal from '../Modal/Modal';
import { closeModal } from '../../redux/modal/actions';

interface Notice {
  message: string;
  warning: boolean;
}

interface InfoModalProps {
  notices: Array<Notice>;
}

const InfoModal: React.SFC<InfoModalProps> = ({ notices, closeModal }) => {
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
    <Modal open={true} onClose={closeModal}>
      <Modal.Header>Информация</Modal.Header>
      <Modal.Content>{rows}</Modal.Content>
    </Modal>
  );
};

export default connect(
  null,
  { closeModal }
)(InfoModal);
