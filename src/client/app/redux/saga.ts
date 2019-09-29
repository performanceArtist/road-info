import { all } from 'redux-saga/effects';

import { saga as task } from '@features/Task/redux';
import { getMeasurementsSaga, getOrdersSaga } from '@features/History/redux';
import { mapSaga, mapTrackSaga } from '@features/Map/redux';
import suggest from './suggestion/saga';
import generate from './measurements/saga';
import socket from './io/socket';

export default function* rootSaga() {
  yield all([
    socket.startStopChannel(),
    task(),
    suggest(),
    generate(),
    getMeasurementsSaga(),
    getOrdersSaga(),
    mapSaga(),
    mapTrackSaga()
  ]);
}
