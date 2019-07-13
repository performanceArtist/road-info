import React from 'react';
import { connect } from 'react-redux';

import Button from '@shared/Button/Button';
import socket from '@redux/measurements/socket';

const Start = ({ startChannel, stopChannel }) => {
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

export default connect(
  null,
  { startChannel: socket.startChannel, stopChannel: socket.stopChannel }
)(Start);
