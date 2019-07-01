import React from 'react';

import Button from '@shared/Button/Button';
import { Toggle } from '@components/Toggle/Toggle';
import Dropdown from '@components/Dropdown/Dropdown';
import Slider from '@components/Slider/Slider';

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
        <Dropdown options={['one', 'two']} />
      </div>
      <div className="ui__row">
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
      <div className="ui__row">
        <Slider
          options={{
            min: 0,
            max: 2100,
            step: 100
          }}
        />
      </div>
    </div>
  </div>
);

export default UI;
