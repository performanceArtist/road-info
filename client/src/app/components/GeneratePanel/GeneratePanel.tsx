import React from 'react';
import { connect } from 'react-redux';

import Button from '@shared/Button/Button';

import { createCondor } from '@redux/measurements/actions';

type Props = typeof mapDispatch;

const GeneratePanel: React.FC<Props> = ({ createCondor }) => (
  <div className="generate-panel">
    <div className="generate-panel__button">
      <Button onClick={() => createCondor(3)}>Create 3</Button>
    </div>
    <div className="generate-panel__button">
      <Button onClick={() => createCondor(6)}>Create 6</Button>
    </div>
    <div className="generate-panel__button">
      <Button onClick={() => createCondor(7)}>Create 7</Button>
    </div>
  </div>
);

const mapDispatch = { createCondor };

export default connect(
  null,
  mapDispatch
)(GeneratePanel);
