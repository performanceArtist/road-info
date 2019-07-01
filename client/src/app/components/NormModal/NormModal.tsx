import React from 'react';

import { connect } from 'react-redux';

import Modal from '@components/Modal/Modal';
import Form from '@shared/Form/Form';
import Input from '@shared/Input/Input';

import { closeModal } from '@redux/modal/actions';

const NormModal: React.SFC<{}> = ({ closeModal }) => {
  return (
    <Modal open={true} onClose={closeModal}>
      <Modal.Header>Нормативные значения</Modal.Header>
      <Modal.Content>
        <Form>
          <Input label="Коэффициент уплотнения" props={{ type: 'number' }} />
          <Input label="Колейность, мм" props={{ type: 'number' }} />
          <Input label="IRI м/км" props={{ type: 'number' }} />
          <button type="submit">Сохранить</button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

export default connect(
  null,
  { closeModal }
)(NormModal);
