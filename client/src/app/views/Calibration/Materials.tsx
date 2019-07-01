import React from 'react';
import { connect } from 'react-redux';
import uuid from 'short-uuid';

import Button from '@shared/Button/Button';
import { openModal } from '@redux/modal/actions';

const actions = { openModal };

const Materials = ({ openModal, materials }) => {
  const buttons = materials.map(material => (
    <div className="materials__button" key={uuid.generate()}>
      <Button onClick={() => openModal('Material', { counter: 1, material })}>
        {material.name}
      </Button>
    </div>
  ));

  return <div className="materials">{buttons}</div>;
};

export default connect(
  null,
  actions
)(Materials);
