import React from 'react';
import { connect } from 'react-redux';

import Button from '@shared/Button/Button';
import socket from '@redux/io/socket';

type Props = typeof mapDispatch;

const Start: React.FC<Props> = ({ startChannel, stopChannel }) => {
  return (
    <div className="start">
      <div className="start__button">
        <Button onClick={startChannel}>Открыть канал</Button>
      </div>
      <div className="start__button">
        <Button onClick={stopChannel}>Закрыть канал</Button>
      </div>
    </div>
  );
};

const mapDispatch = {
  startChannel: socket.startChannel,
  stopChannel: socket.stopChannel
};
export default connect(
  null,
  mapDispatch
)(Start);
