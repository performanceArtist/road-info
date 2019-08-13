import * as React from 'react';
import { connect } from 'react-redux';

import Button from '@shared/Button/Button';
import { openModal } from '@redux/modal/actions';

type Props = typeof mapDispatch;

const CallTest: React.FC<Props> = ({ openModal }) => (
  <Button onClick={() => openModal('Test', { counter: 1 })}>
    Show Test Modal
  </Button>
);

const mapDispatch = { openModal };

export default connect(
  null,
  mapDispatch
)(CallTest);
