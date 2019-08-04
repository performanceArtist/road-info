import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';

import Input from '@shared/Input/Input';
import FinalInput from '@shared/FinalInput/FinalInput';
import Button from '@shared/Button/Button';

import Modal from '@components/Modal/Modal';
import Dropdown from '@components/Dropdown/Dropdown';
import DistanceInput from '@components/DistanceInput/DistanceInput';
import SuggestionInput from '@components/SuggestionInput/SuggestionInput';

import { closeModal } from '@redux/modal/actions';
import { saveTask } from '@redux/task/actions';
import { getSuggestion, addConstraint } from '@redux/suggestion/actions';

import { RootState } from '@redux/reducer';

type OwnProps = {
  task: any;
};

type Props = OwnProps & typeof mapDispatch;

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
  getSuggestion,
  addConstraint,
  task,
  suggestions
}) => {
  const handleSubmit = async (formData: any) => {
    console.log(formData);
    event.preventDefault();
    saveTask(formData, task ? task.id : null);
    closeModal();
  };

  const getDef = name => {
    const res = suggestions[name]
      ? suggestions[name].items.find(({ id }) => id === suggestions[name].last)
      : null;

    return res ? res.value : null;
  };

  const suggestionInputs = [
    { name: 'region', label: 'Область' },
    { name: 'settlement', label: 'Населённый пункт' },
    { name: 'street', label: 'Дорога' }
  ].map(({ name, label }) => (
    <div className="task-modal__text-input">
      <SuggestionInput
        name={name}
        label={label}
        defaultValue={getDef(name)}
        suggestions={suggestions[name] ? suggestions[name].items : []}
        onChange={({ name, value }) => {
          addConstraint({ name, id: '' });
          getSuggestion({ name, value });
        }}
        onSuggestionClick={addConstraint}
      />
    </div>
  ));

  return (
    <Modal open={true} onClose={closeModal}>
      <Modal.Header>
        {task ? `Редактировать "${task.formData.order}"` : 'Новое задание'}
      </Modal.Header>
      <Form
        onSubmit={handleSubmit}
        render={({ handleSubmit, pristine, invalid }) => (
          <form onSubmit={handleSubmit}>
            <Modal.Content>
              <div className="task-modal">
                <div className="task-modal__row">
                  <div className="task-modal__meta">
                    {suggestionInputs}
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
                      <span className="task-modal__label">ID кондора</span>
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
                      <DistanceInput />
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
  suggestions
});

const mapDispatch = { saveTask, closeModal, getSuggestion, addConstraint };

export default connect(
  mapState,
  mapDispatch
)(TaskModal);
