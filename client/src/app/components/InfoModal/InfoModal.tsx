import React from 'react';
import uuid from 'short-uuid';

import { connect } from 'react-redux';

import Modal from '../Modal/Modal';
import { openModal, closeModal } from '../../redux/modal/actions';

const actions = { openModal, closeModal };

interface Notice {
  message: string;
  warning: boolean;
}

interface InfoModalProps {
  notices: Array<Notice>;
}

class InfoModal extends React.Component<InfoModalProps, {}> {
  constructor(props: InfoModalProps) {
    super(props);

    this.onNextModalClick = this.onNextModalClick.bind(this);
  }

  onNextModalClick = () => {
    const { counter, openModal } = this.props;
    openModal('Info', { counter: counter + 1 });
  };

  render() {
    const { notices, closeModal } = this.props;

    const rows = notices.map(({ message, warning }) => (
      <div
        className={
          warning
            ? 'info-modal__row info-modal__row_warning'
            : 'info-modal__row'
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
  }
}

export default connect(
  null,
  actions
)(InfoModal);
