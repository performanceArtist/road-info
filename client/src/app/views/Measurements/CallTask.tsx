import React from 'react';
import { connect } from 'react-redux';

import Button from '@shared/Button/Button';
import { openModal } from '@redux/modal/actions';

const actions = { openModal };

const CallTask = ({ openModal }) => (
  <Button onClick={() => openModal('Task', { counter: 1 })}>
    Добавить задание
  </Button>
);

export default connect(
  null,
  actions
)(CallTask);
