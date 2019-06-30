import React from 'react';

import { Toggle } from '../../components/Toggle/Toggle';
import Button from '../../../shared/Button/Button';
import Dropdown from '../../components/Dropdown/Dropdown';
import Buttons from '../../components/Buttons/Buttons';

const UI = () => (
  <div className="ui">
    <div className="ui__wrapper">
      <div className="ui__row">
        <Buttons />
      </div>
      <div className="ui__row">
        <Toggle label="kek/pok" />
      </div>
      <div className="ui__row">
        <Button />
      </div>
      <div className="ui__row">
        <Dropdown />
      </div>
    </div>
  </div>
);

export default UI;
