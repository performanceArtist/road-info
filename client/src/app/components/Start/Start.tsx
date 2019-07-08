import React from 'react';
import { connect } from 'react-redux';

import Button from '@shared/Button/Button';
import { startChannel, stopChannel } from '@redux/measurements/listen';

const Start = props => {
  const { startChannel, stopChannel } = props;
  return (
    <div>
      <Button onClick={startChannel}>Открыть канал</Button>
      <Button onClick={stopChannel}>Закрыть</Button>
    </div>
  );
};

export default connect(
  null,
  { startChannel, stopChannel }
)(Start);
