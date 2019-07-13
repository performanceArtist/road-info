import React from 'react';
import { connect } from 'react-redux';

import { reduxIncrement } from './redux/actions';
import { RootState } from '@redux/reducer';

type OwnProps = {
  ownProp: string;
};
type State = {
  reduxCounter: number;
};
type Props = OwnProps & typeof mapDispatch & State;

const TSTest: React.FC<Props> = ({ ownProp, reduxCounter, reduxIncrement }) => (
  <div className="test">
    <h2>{`${ownProp}: ${reduxCounter}`}</h2>
    <button onClick={() => reduxIncrement()}>INCREMENT</button>
  </div>
);

const mapState = ({ test }: RootState) => ({
  reduxCounter: test.counter
});

const mapDispatch = { reduxIncrement };

export default connect(
  mapState,
  mapDispatch
)(TSTest);
