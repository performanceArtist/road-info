import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { initCondors } from '@redux/condors/actions';
import socket from '@redux/io/socket';

const mapDispatch = { initCondors, startChannel: socket.startChannel };

const Bootstrapper: React.FC<typeof mapDispatch> = ({
  initCondors,
  startChannel
}) => {
  useEffect(() => {
    startChannel();
    initCondors();
  }, []);

  return null;
};

export default connect(
  null,
  mapDispatch
)(Bootstrapper);
