import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';

import socket from '@redux/io/socket';

const StartChannel: React.FC<typeof mapDispatch> = ({ startChannel }) => {
  useEffect(() => {
    startChannel();
  }, []);

  return null;
};

const mapDispatch = { startChannel: socket.startChannel };

export default connect(
  null,
  mapDispatch
)(StartChannel);
