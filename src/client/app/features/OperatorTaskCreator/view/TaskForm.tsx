import React from 'react';

import { Form, Button } from '@shared/view';

import ActivatedInput from './ActivatedInput';

type IProps = {
  onSubmit(formData: any): void;
  onActiveFieldClick(what: 'from' | 'to'): void;
  onUndoButtonClick(): void;
  activeField?: 'from' | 'to';
  fromValue: string;
  toValue: string;
};

const TaskForm: React.FC<IProps> = ({
  onSubmit,
  onActiveFieldClick,
  onUndoButtonClick,
  activeField,
  fromValue,
  toValue
}) => {
  return (
    <Form onSubmit={onSubmit} className="task-form">
      <Form.Header>Новое задание</Form.Header>
      <div onClick={() => onActiveFieldClick('from')}>
        <ActivatedInput
          name="from"
          value={fromValue}
          label="От"
          isActive={activeField === 'from'}
        />
      </div>
      <div onClick={() => onActiveFieldClick('to')}>
        <ActivatedInput
          name="to"
          value={toValue}
          label="До"
          isActive={activeField === 'to'}
        />
      </div>
      <Button onClick={onUndoButtonClick}>Назад</Button>
      <div className="task-form__select-group">
        <span className="task-form__select-label">Водитель:</span>
        <select name="user">
          <option value="10">Борис Петрович</option>
        </select>
      </div>
      <div className="task-form__select-group">
        <span className="task-form__select-label">Кондор:</span>
        <select name="condor">
          <option value="1">#1</option>
        </select>
      </div>
      <div className="task-form__select-group">
        <span className="task-form__select-label">Категория дороги:</span>
        <select name="category">
          <option value="1">IA</option>
        </select>
      </div>
      <div className="task-form__select-group">
        <span className="task-form__select-label">Заказчик:</span>
        <select name="company">
          <option value="1">Элеси</option>
        </select>
      </div>

      <div className="task-form__checkbox-group">
        <div className="task-form__checkbox-label">Направления</div>
        <label className="task-form__checkbox">
          Прямое <input type="radio" name="direction" value="forward" />
        </label>
        <label className="task-form__checkbox">
          Обратное <input type="radio" name="direction" value="backward" />
        </label>
      </div>

      {/*
      <div className="task-form__checkbox-group">
        <div className="task-form__checkbox-label">Приборы</div>
        <label className="task-form__checkbox">
          Георадар <input type="checkbox" name="geo" />
        </label>
        <label className="task-form__checkbox">
          Плотнометр <input type="checkbox" name="dens" />
        </label>
        <label className="task-form__checkbox">
          Профилометр <input type="checkbox" name="prof" />
        </label>
      </div>
      */}
      <Form.Footer>
        <Button type="submit">Создать</Button>
      </Form.Footer>
    </Form>
  );
};

export default TaskForm;
