import React from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal/Modal';
import Form from '../../../shared/Form/Form';
import Input from '../../../shared/Input/Input';

import { openModal, closeModal } from '../../redux/modal/actions';

interface SetupModalProps {
  counter: number;
}

class SetupModal extends React.Component<SetupModalProps, {}> {
  constructor(props: SetupModalProps) {
    super(props);

    this.onNextModalClick = this.onNextModalClick.bind(this);
  }

  onNextModalClick = () => {
    const { counter, openModal } = this.props;
    openModal('Norm', { counter: counter + 1 });
  };

  render() {
    const { closeModal } = this.props;

    return (
      <Modal open={true} onClose={closeModal}>
        <Modal.Header>Ввод значений</Modal.Header>
        <Modal.Content>
          <Form>
            <div className="setup">
              <div className="setup__text">
                <Input label="№ заказа" props={{ type: 'text' }} />
                <Input label="№ заказа" props={{ type: 'text' }} />
                <Input label="№ заказа" props={{ type: 'text' }} />
              </div>
              <div className="setup__left">
                <Input label="Количество полос" props={{ type: 'number' }} />
                <button type="button" onClick={this.onNextModalClick}>
                  Нормативные значения
                </button>
              </div>
              <div className="setup__right">
                <Input label="Полоса" props={{ type: 'text' }} />
              </div>
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default connect(
  null,
  { openModal, closeModal }
)(SetupModal);
