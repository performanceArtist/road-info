import React from 'react';
import { connect } from 'react-redux';

import Button from '@shared/Button/Button';
import { startChannel, stopChannel } from '@redux/measurements/listen';

const Start = props => {
  const { startChannel, stopChannel } = props;
  return (
    <div className="start">
      <div classsName="start__button">
        <Button onClick={startChannel}>Открыть канал</Button>
      </div>
      <div classsName="start__button">
        <Button onClick={stopChannel}>Закрыть канал</Button>
      </div>
    </div>
  );
};

export default connect(
  null,
  { startChannel, stopChannel }
)(Start);
