import * as React from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';

import Button from '@shared/Button/Button';
import FinalInput from '@shared/FinalInput/FinalInput';

import Modal from '@components/Modal/Modal';
import { closeModal } from '@redux/modal/actions';
import { generateMeasurements } from '@redux/measurements/actions';

type OwnProps = {
  id: number;
};

type Props = OwnProps & typeof mapDispatch;

const GenerationModal: React.FC<Props> = ({
  id,
  generateMeasurements,
  closeModal
}) => {
  const handleSubmit = (formData: {
    lane: number;
    kondorId: number;
    isForward: boolean;
  }) => {
    generateMeasurements({ id, ...formData });
    closeModal();
  };

  return (
    <Modal open={true} onClose={closeModal}>
      <Modal.Header>Генерация значений</Modal.Header>
      <Modal.Content>
        <Form
          onSubmit={handleSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="generation-modal">
              <div className="generation-modal__inputs">
                <FinalInput
                  name="lane"
                  label="Полоса:"
                  type="number"
                  remWidth={4}
                  required={true}
                />

                <FinalInput
                  name="kondorId"
                  label="Кондор:"
                  type="number"
                  remWidth={4}
                  required={true}
                />

                <div>
                  <span>Прямое направление:</span>
                  <Field name="isForward" component="input" type="checkbox" />
                </div>
              </div>
              <Modal.Footer>
                <Button type="submit">Старт</Button>
              </Modal.Footer>
            </form>
          )}
        />
      </Modal.Content>
    </Modal>
  );
};

const mapDispatch = { closeModal, generateMeasurements };

export default connect(
  null,
  mapDispatch
)(GenerationModal);
