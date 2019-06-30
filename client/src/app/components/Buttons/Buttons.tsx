import React from 'react';
import { connect } from 'react-redux';

import { openModal } from '../../redux/modal/actions';

const actions = { openModal };

const Buttons = ({ openModal }) => (
  <button onClick={() => openModal('Test', { counter: 1 })}>
    Show Test Modal
  </button>
);

export default connect(
  null,
  actions
)(Buttons);
