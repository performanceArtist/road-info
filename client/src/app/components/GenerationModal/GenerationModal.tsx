import React from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';

import Button from '@shared/Button/Button';
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
      <Modal.Header>Generate</Modal.Header>
      <Modal.Content>
        <Form
          onSubmit={handleSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <span>Полоса</span>
                <Field name="lane" component="input" type="number" required />
              </div>

              <div>
                <span>Кондор</span>
                <Field
                  name="kondorId"
                  component="input"
                  type="number"
                  required
                />
              </div>
              <div>
                <span>Прямое направление</span>
                <Field
                  name="isForward"
                  component="input"
                  type="checkbox"
                  required
                />
              </div>
              <Modal.Footer>
                <Button type="submit">Generate</Button>
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
