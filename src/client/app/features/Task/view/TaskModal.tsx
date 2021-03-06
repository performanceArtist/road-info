import * as React from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';

import { Button } from '@shared/view';
import { Modal } from '@features/Modal';
import AddressInputs from '@components/AddressInputs/AddressInputs';
import DistanceInput from './DistanceInput';
import { closeModal } from '@features/Modal/redux/actions';
import { saveTask } from '../redux/actions';
import { Task } from '@shared/types';
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
  task = null,
  suggestions
}) => {
  const handleSubmit = async (formData: any) => {
    event.preventDefault();
    saveTask(formData);
    closeModal();
  };

  const companies = (
    <>
      <option value="5">АО Элеси</option>
      <option value="4">НИИ Элеси</option>
      <option value="1">Стройкомплект</option>
    </>
  );

  return (
    <Modal open={true} onClose={closeModal} maxWidthPercentage={58}>
      <Modal.Header>
        {task ? `На основе "${task.id}"` : 'Новое задание'}
      </Modal.Header>
      <Form
        onSubmit={handleSubmit}
        initialValues={
          task
            ? { ...task, customer: '5', executor: '5' }
            : { direction: 'forward', customer: '5', executor: '5' }
        }
        render={({ handleSubmit, pristine, invalid }) => (
          <form onSubmit={handleSubmit}>
            <Modal.Content>
              <div className="task-modal">
                <div className="task-modal__row">
                  <div className="task-modal__meta">
                    <div className="task-modal__text-input">
                      <div className="task-modal__label">Номер заказа</div>
                      <Field name="order" component="input" required={true} />
                    </div>
                    <div className="task-modal__text-input">
                      <div className="task-modal__label">Заказчик</div>
                      <Field name="customer" component="select" required={true}>
                        {companies}
                      </Field>
                    </div>
                    <div className="task-modal__text-input">
                      <div className="task-modal__label">Исполнитель</div>
                      <Field name="executor" component="select" required={true}>
                        {companies}
                      </Field>
                    </div>
                    <div className="task-modal__text-input">
                      <div className="task-modal__label">Описание</div>
                      <Field
                        name="description"
                        component="textarea"
                        style={{ width: 200, height: 60 }}
                      />
                    </div>
                  </div>
                  <div className="task-modal__address">
                    <AddressInputs
                      form="task"
                      defaults={task}
                      suggestions={suggestions}
                    />
                  </div>
                  <div className="task-modal__parameters">
                    <div className="task-modal__input-group">
                      <div className="task-modal__label">
                        Наименование участка
                      </div>
                      <Field
                        name="roadPartName"
                        component="input"
                        required={true}
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
                    </div>
                    <div className="task-modal__input-group">
                      <div className="task-modal__label">Направление</div>
                      <Field component="input" name="forward" type="checkbox" />
                      <span className="task-modal__label">Прямое</span>
                      <Field
                        component="input"
                        name="backward"
                        type="checkbox"
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
