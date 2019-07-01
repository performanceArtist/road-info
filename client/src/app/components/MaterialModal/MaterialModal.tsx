import React, { useState } from 'react';

import { connect } from 'react-redux';

import Modal from '@components/Modal/Modal';
import Input from '@shared/Input/Input';
import { closeModal } from '@redux/modal/actions';

interface Material {
  name: string;
  density: number;
}

interface MaterialModalProps {
  material: Material;
}

const MaterialModal: React.SFC<MaterialModalProps> = ({
  material,
  closeModal
}) => {
  const { name, density } = material;
  const [checked, setChecked] = useState(false);

  return (
    <Modal open={true} onClose={closeModal}>
      <div className="material-modal">
        <Modal.Header>Параметры эталона</Modal.Header>
        <Modal.Content>
          <Input
            label="Название материала"
            props={{ type: 'text', defaultValue: name }}
          />
          <div className="material-modal__measures">
            <Input
              label="Плотность материала, кг/см3"
              props={{
                type: 'number',
                disabled: checked,
                defaultValue: density
              }}
            />
            <input
              type="checkbox"
              onChange={event => setChecked(event.target.checked)}
            />
            <Input
              label="Усреднённое значение(N)"
              props={{ type: 'number', disabled: !checked }}
            />
          </div>
          <button type="submit" onClick={closeModal}>
            Сохранить
          </button>
        </Modal.Content>
      </div>
    </Modal>
  );
};

export default connect(
  null,
  { closeModal }
)(MaterialModal);
