import React from 'react';
import { connect } from 'react-redux';

import { openModal } from '../../redux/modal/actions';
import Button from '../../../shared/Button/Button';

const actions = { openModal };

const Materials = ({ openModal, materials }) => {
  const buttons = materials.map(material => (
    <Button
      text={material.name}
      onClick={() => openModal('Material', { counter: 1, material })}
    />
  ));

  return <div className="materials">{buttons}</div>;
};

export default connect(
  null,
  actions
)(Materials);
