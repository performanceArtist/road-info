import React from 'react';
import { connect } from 'react-redux';
import uuid from 'short-uuid';

import Button from '@shared/Button/Button';
import { openModal } from '@redux/modal/actions';

interface Props {
  materials: Array<{ name: string; density: number }>;
}

const Materials: React.SFC<Props> = ({ openModal, materials }) => {
  const buttons = materials.map(material => (
    <div className="materials__button" key={uuid.generate()}>
      <Button
        onClick={(event: React.MouseEvent) => {
          openModal('Material', {
            counter: 1,
            coordinates: { x: event.clientX, y: event.clientY },
            material
          });
        }}
      >
        {material.name}
      </Button>
    </div>
  ));

  return <div className="materials">{buttons}</div>;
};

export default connect(
  null,
  { openModal }
)(Materials);
