import React from 'react';

import { connect } from 'react-redux';

import Modal from '@components/Modal/Modal';
import Form from '@shared/Form/Form';
import Input from '@shared/Input/Input';
import Button from '@shared/Button/Button';

import { closeModal } from '@redux/modal/actions';

type Props = typeof mapDispatch;

const NormModal: React.FC<Props> = ({ closeModal }) => {
  return (
    <Modal open={true} onClose={closeModal}>
      <Modal.Header>Нормативные значения</Modal.Header>
      <Modal.Content>
        <Form>
          <Input label="Коэффициент уплотнения" props={{ type: 'number' }} />
          <Input label="Колейность, мм" props={{ type: 'number' }} />
          <Input label="IRI м/км" props={{ type: 'number' }} />
          <Button type="submit">Сохранить</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

const mapDispatch = { closeModal };

export default connect(
  null,
  mapDispatch
)(NormModal);
