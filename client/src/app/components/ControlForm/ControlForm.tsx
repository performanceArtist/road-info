import React from 'react';
import uuid from 'short-uuid';

import Form from '../../../shared/Form/Form';
import { Toggle } from '../Toggle/Toggle';

const ControlForm = ({ devices }) => {
  const deviceControls = devices.map(({ name }) => (
    <div className="control-form__device" key={uuid.generate()}>
      <div className="control-form__device-name">{name}</div>
      <Toggle />
    </div>
  ));

  return (
    <div className="control-form">
      <div className="control-form__wrapper">
        <Form>
          <Form.Header>
            <div className="control-form__title">Управление</div>
          </Form.Header>
          <Form.Content>{deviceControls}</Form.Content>
          <Form.Footer>
            <div className="control-form__submit">
              <button type="submit">Старт</button>
            </div>
          </Form.Footer>
        </Form>
      </div>
    </div>
  );
};

export default ControlForm;
