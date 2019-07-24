import React from 'react';

import Button from '@shared/Button/Button';
import { Toggle } from '@components/Toggle/Toggle';
import Dropdown from '@components/Dropdown/Dropdown';
import Start from '@components/Start/Start';
import FormTest from '@components/FormTest/FormTest';

import CallTest from './CallTest';

const UI = () => (
  <div className="ui">
    <div className="ui__wrapper">
      <div className="ui__row">
        <CallTest />
      </div>
      <div className="ui__row">
        <Toggle label="on/off" />
      </div>
      <div className="ui__row">
        <Button />
      </div>
      <div className="ui__row">
        <Dropdown name="test" label="Test" options={[{ name: 'one', value: 'one' }]} />
      </div>
      <div className="ui__row">
        <Start />
      </div>
      <div>
        <FormTest />
      </div>
    </div>
  </div>
);

export default UI;
