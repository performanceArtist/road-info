import React from 'react';
import { connect } from 'react-redux';
import uuid from 'short-uuid';

import { openModal } from '../../redux/modal/actions';
import Button from '@shared/Button/Button';

const actions = { openModal };

const Materials = ({ openModal, materials }) => {
  const buttons = materials.map(material => (
    <Button
      key={uuid.generate()}
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
