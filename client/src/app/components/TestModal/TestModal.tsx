import React from 'react';
import { connect } from 'react-redux';

import Modal from '@components/Modal/Modal';
import { openModal, closeModal } from '@redux/modal/actions';
import Button from '@shared/Button/Button';

interface TestModalProps {
  counter: number;
}

class TestModal extends React.Component<TestModalProps, {}> {
  constructor(props: TestModalProps) {
    super(props);

    this.onNextModalClick = this.onNextModalClick.bind(this);
  }

  onNextModalClick = () => {
    const { counter, openModal } = this.props;
    openModal('Test', { counter: counter + 1 });
  };

  render() {
    const { counter, closeModal } = this.props;

    return (
      <Modal open={true} onClose={closeModal}>
        <Modal.Header>Test #{counter}</Modal.Header>
        <Modal.Content>Ok</Modal.Content>
        <Modal.Footer>
          <Button onClick={this.onNextModalClick}>New modal</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(
  null,
  { openModal, closeModal }
)(TestModal);
