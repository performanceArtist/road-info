import * as React from 'react';
import { connect } from 'react-redux';

import Modal from '@components/Modal/Modal';
import { closeModal } from '@redux/modal/actions';
import { TaskInstance } from '@redux/task/types';

type OwnProps = {
  instances: Array<TaskInstance>;
};

type Props = OwnProps & typeof mapDispatch;

const TaskHistoryModal: React.FC<Props> = ({ closeModal, instances = [] }) => {
  const getStatus = (status: string, kondor: string) => {
    switch (status) {
      case 'ready':
        return 'Ожидает выполнения';
      case 'taken':
        return `Выполняется кондором #${kondor}`;
      case 'done':
        return `Выполнено кондором #${kondor}`;
      default:
        return 'Статус неизвестен';
    }
  };

  return (
    <Modal open={true} onClose={closeModal}>
      <Modal.Header>История</Modal.Header>
      <Modal.Content>
        {instances.map(
          ({ status, lane, isForward, kondor, date }: TaskInstance) => (
            <div>
              <h3>{`${date.toDateString()} ${date.toTimeString()}`}</h3>
              <div>{getStatus(status, kondor)}</div>
              <div>Полоса: {lane}</div>
              <div>Направление: {isForward ? 'Прямое' : 'Обратное'}</div>
            </div>
          )
        )}
      </Modal.Content>
      <Modal.Footer />
    </Modal>
  );
};

const mapDispatch = { closeModal };

export default connect(
  null,
  mapDispatch
)(TaskHistoryModal);
