import { all } from 'redux-saga/effects';

import task from './task/saga';
import suggest from './suggestion/saga';
import generate from './measurements/saga';
import socket from './io/socket';
import history from './history/saga';

export default function* rootSaga() {
  yield all([
    socket.startStopChannel(),
    task(),
    suggest(),
    generate(),
    history()
  ]);
}
