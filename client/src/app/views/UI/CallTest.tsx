import React from 'react';
import { connect } from 'react-redux';

import Button from '@shared/Button/Button';
import { openModal } from '@redux/modal/actions';

const actions = { openModal };

const CallTest = ({ openModal }) => (
  <Button onClick={() => openModal('Test', { counter: 1 })}>
    Show Test Modal
  </Button>
);

export default connect(
  null,
  actions
)(CallTest);
