import { all } from 'redux-saga/effects';

import createWatcher from './measurements/create';
import socket from './measurements/socket';

export default function* rootSaga() {
  yield all([socket.startStopChannel(), createWatcher()]);
}
