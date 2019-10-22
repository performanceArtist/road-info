import * as React from 'react';
import { connect } from 'react-redux';

import { Modal } from '@features/Modal';
import { closeModal } from '@features/Modal/redux/actions';
import { TaskInstance } from '@shared/types';

type OwnProps = {
  instances: Array<TaskInstance>;
};

type Props = OwnProps & typeof mapDispatch;

const TaskHistoryModal: React.FC<Props> = ({ closeModal, instances = [] }) => {
  const getStatus = (status: string, condor: string) => {
    switch (status) {
      case 'ready':
        return 'Ожидает выполнения';
      case 'taken':
        return `Выполняется кондором #${condor}`;
      case 'done':
        return `Выполнено кондором #${condor}`;
      default:
        return 'Статус неизвестен';
    }
  };

  return (
    <Modal open={true} onClose={closeModal}>
      <Modal.Header>История</Modal.Header>
      <Modal.Content>
        <div className="task-history">
          {instances.map(
            ({ status, lane, isForward, condor, date }: TaskInstance) => (
              <div className="task-history__entry" key={date.toString()}>
                <h3>{`${date.toDateString()} ${date.toTimeString()}`}</h3>
                <div>{getStatus(status, condor)}</div>
                <div>Полоса: {lane}</div>
                <div>Направление: {isForward ? 'Прямое' : 'Обратное'}</div>
              </div>
            )
          )}
        </div>
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
