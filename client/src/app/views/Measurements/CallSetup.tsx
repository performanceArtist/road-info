import React from 'react';
import { connect } from 'react-redux';

import Button from '@shared/Button/Button';
import { openModal } from '@redux/modal/actions';

const actions = { openModal };

const CallSetup = ({ openModal }) => (
  <Button onClick={() => openModal('Setup', { counter: 1 })}>
    Ввод параметров
  </Button>
);

export default connect(
  null,
  actions
)(CallSetup);
