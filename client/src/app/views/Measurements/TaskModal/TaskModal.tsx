import React from 'react';
import { connect } from 'react-redux';

import Modal from '@components/Modal/Modal';
import Dropdown from '@components/Dropdown/Dropdown';
import Slider from '@components/Slider/Slider';
import Form from '@shared/Form/Form';
import Input from '@shared/Input/Input';
import Button from '@shared/Button/Button';

import { closeModal } from '@redux/modal/actions';
import { saveTask } from '@redux/measurements/actions';

interface Props {
  counter: number;
}

export interface TaskFormType {
  test: string;
}

const defaults = {
  name: '',
  city: 'Томск'
};

class TaskModal extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);

    const { task } = props;

    this.state = task ? { ...task.formData } : { ...defaults };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    const { saveTask, closeModal, task } = this.props;

    saveTask(this.state, task ? task.id : null);
    closeModal();
  }

  render() {
    const { closeModal, task } = this.props;
    const { name } = this.state;

    return (
      <Modal open={true} onClose={closeModal}>
        <Modal.Header>
          {task ? `Редактировать "${task.formData.name}"` : 'Новое задание'}
        </Modal.Header>
        <Modal.Content>
          <Form props={{ onSubmit: this.handleSubmit }}>
            <div className="task">
              <Input
                label="Название"
                props={{
                  type: 'text',
                  name: 'name',
                  value: name,
                  onChange: this.handleChange,
                  required: true
                }}
              />
              <div className="task__dropdowns">
                <Dropdown
                  name="region"
                  label="Регион"
                  options={['Томская область']}
                />
                <Dropdown
                  name="city"
                  label="Населённый пункт"
                  options={['Томск']}
                />
              </div>
              <div className="task__dropdowns">
                <Dropdown name="road" label="Дорога" options={['пр. Ленина']} />
                <Dropdown name="category" label="Категория" options={['IA']} />
              </div>

              <div className="task__slider">
                <div className="task__title">Дистанция:</div>
                <Slider
                  options={{
                    min: 0,
                    max: 2100,
                    step: 100,
                    firstValue: 0,
                    secondValue: 2100,
                    interval: true
                  }}
                />
              </div>
            </div>
            <Form.Footer>
              <Button type="submit">Сохранить</Button>
            </Form.Footer>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default connect(
  null,
  { saveTask, closeModal }
)(TaskModal);
