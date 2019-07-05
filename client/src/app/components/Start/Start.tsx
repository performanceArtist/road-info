import React from 'react';
import { connect } from 'react-redux';
import { startChannel, stopChannel } from '@redux/measurements/listen';

const Start = props => {
  const { startChannel, stopChannel } = props;
  return (
    <div
      style={{
        display: 'flex',
        width: '120px',
        marginBottom: 1
      }}
    >
      <button style={{ padding: 3 }} onClick={startChannel}>
        Start Socket Channel
      </button>
      <button style={{ padding: 3 }} onClick={stopChannel}>
        Stop Socket Channel
      </button>
    </div>
  );
};

export default connect(
  null,
  { startChannel, stopChannel }
)(Start);
