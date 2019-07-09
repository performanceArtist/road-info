import React from 'react';
import uuid from 'short-uuid';

import Form from '@shared/Form/Form';
import Button from '@shared/Button/Button';

import { Toggle } from '@components/Toggle/Toggle';

interface Device {
  name: string;
}

interface ControlFormProps {
  devices: Array<Device>;
}

const ControlForm: React.SFC<ControlFormProps> = ({ devices }) => {
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
              <Button type="submit">Старт</Button>
            </div>
          </Form.Footer>
        </Form>
      </div>
    </div>
  );
};

export default ControlForm;
