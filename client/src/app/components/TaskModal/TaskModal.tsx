import React from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';

import Modal from '@components/Modal/Modal';
import Dropdown from '@components/Dropdown/Dropdown';
import Input from '@shared/Input/Input';
import FinalInput from '@shared/FinalInput/FinalInput';
import Button from '@shared/Button/Button';
import DistanceInput from '@components/DistanceInput/DistanceInput';

import { closeModal } from '@redux/modal/actions';
import { saveTask } from '@redux/measurements/actions';

type OwnProps = {
  counter: number;
};

type Props = OwnProps & typeof mapDispatch;

export interface TaskFormType {
  test: string;
}

class TaskModal extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(values: any) {
    console.log(values);
    //event.preventDefault();
    //const { saveTask, closeModal, task } = this.props;

    //saveTask(this.state, task ? task.id : null);
    //closeModal();
  }

  render() {
    const { closeModal, task } = this.props;

    return (
      <Modal open={true} onClose={closeModal}>
        <Modal.Header>
          {task ? `Редактировать "${task.formData.name}"` : 'Новое задание'}
        </Modal.Header>
        <Form
          onSubmit={this.handleSubmit}
          render={({ handleSubmit, pristine, invalid }) => (
            <form onSubmit={handleSubmit}>
              <Modal.Content>
                <div className="task-modal">
                  <div className="task-modal__row">
                    <div className="task-modal__meta">
                      <FinalInput name="order" label="Номер заказа:" />
                      <FinalInput name="client" label="Заказчик:" />
                      <FinalInput name="executor" label="Исполнитель:" />
                      <FinalInput name="region" label="Регион:" />
                      <FinalInput name="city" label="Населённый пункт:" />
                      <FinalInput name="road" label="Наименование дороги:" />
                      <FinalInput
                        name="section"
                        label="Наименование участка:"
                      />
                    </div>
                    <div className="task-modal__distance">
                      <DistanceInput />
                    </div>
                  </div>
                </div>
                <Modal.Footer>
                  <Button type="submit">Сохранить</Button>
                </Modal.Footer>
              </Modal.Content>
            </form>
          )}
        />
      </Modal>
    );
  }
}

const mapDispatch = { saveTask, closeModal };

export default connect(
  null,
  mapDispatch
)(TaskModal);
