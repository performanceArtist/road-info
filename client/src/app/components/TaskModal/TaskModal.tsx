import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import axios from 'axios';

import Input from '@shared/Input/Input';
import FinalInput from '@shared/FinalInput/FinalInput';
import Button from '@shared/Button/Button';

import Modal from '@components/Modal/Modal';
import Dropdown from '@components/Dropdown/Dropdown';
import DistanceInput from '@components/DistanceInput/DistanceInput';
import SuggestionInput from '@components/SuggestionInput/SuggestionInput';

import { closeModal } from '@redux/modal/actions';
import { saveTask } from '@redux/task/actions';
import { getSuggestion } from '@redux/suggestion/actions';

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
  task,
  suggestions
}) => {
  const handleSubmit = async (formData: any) => {
    console.log(formData);
    event.preventDefault();
    saveTask(formData, task ? task.id : null);
    closeModal();
  };

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
                    <SuggestionInput
                      name="region"
                      label="Область"
                      suggestions={
                        suggestions.region ? suggestions.region.items : []
                      }
                      onChange={getSuggestion}
                    />
                    <SuggestionInput
                      name="city"
                      label="Населённый пункт"
                      suggestions={
                        suggestions.city ? suggestions.city.items : []
                      }
                      onChange={getSuggestion}
                    />
                    <SuggestionInput
                      name="street"
                      label="Дорога"
                      suggestions={suggestions.street ? suggestions.street : []}
                      onChange={getSuggestion}
                    />

                    <FinalInput
                      name="order"
                      label="Номер заказа:"
                      required={true}
                    />
                    <FinalInput name="client" label="Заказчик:" />
                    <FinalInput name="executor" label="Исполнитель:" />
                    <FinalInput name="section" label="Наименование участка:" />
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
};

const mapState = ({ suggestions }: RootState) => ({
  suggestions
});

const mapDispatch = { saveTask, closeModal, getSuggestion };

export default connect(
  mapState,
  mapDispatch
)(TaskModal);
