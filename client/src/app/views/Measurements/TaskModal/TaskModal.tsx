import React from 'react';
import { connect } from 'react-redux';

import Modal from '@components/Modal/Modal';
import Form from '@shared/Form/Form';
import Input from '@shared/Input/Input';
import Button from '@shared/Button/Button';

import { closeModal } from '@redux/modal/actions';
import { saveSettings } from '@redux/measurements/actions';

interface TaskModalProps {
  counter: number;
}

export interface TaskFormType {
  test: string;
}

const defaults = {
  test: 'test'
};

class TaskModal extends React.Component<TaskModalProps, {}> {
  constructor(props: TaskModalProps) {
    super(props);

    const { taskData, index } = props;

    this.state = taskData[index]
      ? { ...taskData[index].formData }
      : { ...defaults };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const { saveSettings, closeModal, index } = this.props;

    saveSettings(this.state, index);
    closeModal();
  }

  render() {
    const { closeModal, taskData, index } = this.props;
    const { test } = this.state;

    return (
      <Modal open={true} onClose={closeModal}>
        <Modal.Header>
          {taskData[index]
            ? `Редактирование "${taskData[index].formData.test}"`
            : 'Новое задание'}
        </Modal.Header>
        <Modal.Content>
          <Form props={{ onSubmit: this.handleSubmit }}>
            <div className="task">
              <div>
                <Input
                  label="Тест"
                  props={{
                    type: 'text',
                    name: 'test',
                    value: test,
                    onChange: this.handleChange
                  }}
                />
              </div>
            </div>
            <Form.Footer>
              <Button type="submit">Submit</Button>
            </Form.Footer>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = ({ measurementsReducer }) => ({
  ...measurementsReducer
});

export default connect(
  mapStateToProps,
  { saveSettings, closeModal }
)(TaskModal);
