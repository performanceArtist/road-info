import * as React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';

import Button from '@shared/Button/Button';

import { createCondor } from '@redux/measurements/actions';

type Props = typeof mapDispatch;

const GeneratePanel: React.FC<Props> = ({ createCondor }) => {
  const [value, setValue] = useState(1);

  return (
    <div className="generate-panel">
      <div className="generate-panel__item">ID кондора:</div>
      <div className="generate-panel__item">
        <input
          name="id"
          type="number"
          step={1}
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </div>
      <div className="generate-panel__item">
        <Button onClick={() => createCondor(value)}>Сгенерировать</Button>
      </div>
    </div>
  );
};

const mapDispatch = { createCondor };

export default connect(
  null,
  mapDispatch
)(GeneratePanel);
