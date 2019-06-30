import React from 'react';
import { connect } from 'react-redux';

import { openModal } from '../../redux/modal/actions';
import Icon from '../Icon/Icon';

const actions = { openModal };

const Warning = ({ openModal }) => (
  <Icon
    onClick={() =>
      openModal('Info', {
        counter: 1,
        notices: [{ message: 'Test', warning: true }]
      })
    }
  />
);

export default connect(
  null,
  actions
)(Warning);
