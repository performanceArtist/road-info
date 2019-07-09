import React, { useState } from 'react';

import { connect } from 'react-redux';

import Modal from '@components/Modal/Modal';
import Form from '@shared/Form/Form';
import Input from '@shared/Input/Input';
import Button from '@shared/Button/Button';
import { closeModal } from '@redux/modal/actions';

interface Material {
  name: string;
  density: number;
}

interface MaterialModalProps {
  material: Material;
  coordinates: { x: number; y: number };
}

const MaterialModal: React.SFC<MaterialModalProps> = ({
  material,
  coordinates,
  closeModal
}) => {
  const { name, density } = material;
  const [checked, setChecked] = useState(false);

  return (
    <Modal open={true} coordinates={coordinates} onClose={closeModal}>
      <div className="material-modal">
        <Modal.Header>Параметры эталона</Modal.Header>
        <Modal.Content>
          <Form>
            <Input
              label="Название материала"
              props={{ type: 'text', defaultValue: name }}
            />
            <div className="material-modal__measures">
              <Input
                label="Плотность материала, кг/см3"
                props={{
                  type: 'number',
                  min: 0,
                  step: 0.01,
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
                props={{
                  type: 'number',
                  min: 0,
                  step: 0.01,
                  disabled: !checked
                }}
              />
            </div>
            <Button type="submit" onClick={closeModal}>
              Сохранить
            </Button>
          </Form>
        </Modal.Content>
      </div>
    </Modal>
  );
};

export default connect(
  null,
  { closeModal }
)(MaterialModal);
