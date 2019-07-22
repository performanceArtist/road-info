import React from 'react';
import { connect } from 'react-redux';

import Button from '@shared/Button/Button';

import { createCondor } from '@redux/measurements/actions';

type Props = typeof mapDispatch;

const GeneratePanel: React.FC<Props> = ({ createCondor }) => (
  <div>
    <Button onClick={() => createCondor(3)}>Create 1</Button>
    <Button onClick={() => createCondor(6)}>Create 2</Button>
    <Button onClick={() => createCondor(7)}>Create 3</Button>
  </div>
);

const mapDispatch = { createCondor };

export default connect(
  null,
  mapDispatch
)(GeneratePanel);
