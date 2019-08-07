import React from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';

import FinalInput from '@shared/FinalInput/FinalInput';
import Button from '@shared/Button/Button';

import Modal from '@components/Modal/Modal';
import DistanceInput from '@components/DistanceInput/DistanceInput';
import AddressInputs from '@components/AddressInputs/AddressInputs';

import { closeModal } from '@redux/modal/actions';
import { saveTask } from '@redux/task/actions';

import { Task } from '@redux/task/types';
import { RootState } from '@redux/reducer';

type OwnProps = {
  task: Task;
};

type MapState = {
  suggestions: any;
};

type Props = OwnProps & MapState & typeof mapDispatch;

export interface TaskFormType {
  test: string;
}

const debounce = (callback: Function, delay: number) => {
  let inDebounce: NodeJS.Timeout;
  return function callFunction(...args: any) {
    const context = this;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => callback.apply(context, args), delay);
  };
};

const TaskModal: React.FC<Props> = ({
  saveTask,
  closeModal,
  task,
  suggestions
}) => {
  const handleSubmit = async (formData: any) => {
    event.preventDefault();
    saveTask(formData);
    closeModal();
  };

  return (
    <Modal open={true} onClose={closeModal}>
      <Modal.Header>
        {task ? `Редактировать "${task.id}"` : 'Новое задание'}
      </Modal.Header>
      <Form
        onSubmit={handleSubmit}
        initialValues={task ? task : { direction: 'forward' }}
        render={({ handleSubmit, pristine, invalid }) => (
          <form onSubmit={handleSubmit}>
            <Modal.Content>
              <div className="task-modal">
                <div className="task-modal__row">
                  <div className="task-modal__meta">
                    <AddressInputs form="task" suggestions={suggestions} />
                    <div className="task-modal__text-input">
                      <FinalInput
                        name="order"
                        label="Номер заказа"
                        required={true}
                      />
                    </div>
                    <div className="task-modal__text-input">
                      <FinalInput
                        name="partName"
                        label="Наименование участка"
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="task-modal__parameters">
                    <div className="task-modal__input-group">
                      <span className="task-modal__label">Номер кондора</span>
                      <Field
                        className="task-modal__number-input"
                        component="input"
                        name="kondor"
                        type="number"
                        required
                      />
                    </div>
                    <div className="task-modal__input-group">
                      <span className="task-modal__label">
                        Количество полос
                      </span>
                      <Field
                        className="task-modal__number-input"
                        component="input"
                        name="lanesCount"
                        type="number"
                        required
                      />
                      <span className="task-modal__label">Полоса</span>
                      <Field
                        className="task-modal__number-input"
                        component="input"
                        name="lane"
                        type="number"
                        required
                      />
                    </div>
                    <div className="task-modal__input-group">
                      <div>Направление</div>
                      <Field
                        component="input"
                        name="direction"
                        type="radio"
                        value="forward"
                        required
                      />
                      <span className="task-modal__label">Прямое</span>
                      <Field
                        component="input"
                        name="direction"
                        type="radio"
                        value="backward"
                        required
                      />
                      <span className="task-modal__label">Обратное</span>
                    </div>
                    <div className="task-modal__input-group">
                      <DistanceInput
                        defaults={
                          task
                            ? {
                                from: {
                                  kilometers: Math.floor(task.start / 1000),
                                  meters: task.start % 1000
                                },
                                to: {
                                  kilometers: Math.floor(task.finish / 1000),
                                  meters: task.finish % 1000
                                }
                              }
                            : {}
                        }
                      />
                    </div>
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
};

const mapState = ({ suggestions }: RootState) => ({
  suggestions: suggestions.task
});

const mapDispatch = { saveTask, closeModal };

export default connect(
  mapState,
  mapDispatch
)(TaskModal);
