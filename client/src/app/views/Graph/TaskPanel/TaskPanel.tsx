import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { postTask, setCurrentTask } from '@redux/measurements/actions';
import socket from '@redux/measurements/socket';

const TaskPanel = ({ tasks = [], postTask, setCurrentTask, startChannel }) => {
  useEffect(() => {
    const { id, formData } = tasks[0];
    startChannel();
    setCurrentTask(id);
    postTask(formData, id);
  }, []);

  return <div className="task-panel" />;
};

const mapStateToProps = ({ measurements }) => ({
  currentTaskId: measurements.currentTaskId
});

export default connect(
  mapStateToProps,
  {
    postTask,
    setCurrentTask,
    startChannel: socket.startChannel
  }
)(TaskPanel);
