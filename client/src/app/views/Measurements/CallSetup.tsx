import React from 'react';
import { connect } from 'react-redux';

import { openModal } from '@redux/modal/actions';

const actions = { openModal };

const CallSetup = ({ openModal }) => (
  <button onClick={() => openModal('Setup', { counter: 1 })}>
    Ввод параметров
  </button>
);

export default connect(
  null,
  actions
)(CallSetup);
