import { all } from 'redux-saga/effects';

import task from './task/saga';
import socket from './measurements/socket';
import generate from './measurements/generate';

export default function* rootSaga() {
  yield all([socket.startStopChannel(), task(), generate()]);
}
