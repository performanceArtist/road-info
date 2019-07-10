import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { postData, setCurrentTask } from '@redux/measurements/actions';
import { startChannel } from '@redux/measurements/listen';

const TaskPanel = ({ tasks = [], postData, setCurrentTask, startChannel }) => {
  useEffect(() => {
    const { id, formData } = tasks[0];
    startChannel();
    setCurrentTask(id);
    postData(formData, id);
  }, []);

  return <div className="task-panel" />;
};

const mapStateToProps = ({ measurements }) => ({
  currentTaskId: measurements.currentTaskId
});

export default connect(
  mapStateToProps,
  {
    postData,
    setCurrentTask,
    startChannel
  }
)(TaskPanel);
