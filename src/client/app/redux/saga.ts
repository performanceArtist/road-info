import { all } from 'redux-saga/effects';

import { postTask } from '@features/Task/redux/sagas';
import { getMeasurements, getOrders } from '@features/History/redux/sagas';
import { getHistory, getTrack } from '@features/Map/redux/sagas';
import * as newTask from '@features/OperatorTaskCreator/redux/sagas';
import * as condors from './condors/sagas';
import getSuggestions from './suggestion/getSuggestions';
import getGenerate from './measurements/getGenerate';
import socket from './io/socket';

export default function* rootSaga() {
  yield all([
    socket.startStopChannel(),
    postTask(),
    getSuggestions(),
    getGenerate(),
    getMeasurements(),
    getOrders(),
    getHistory(),
    getTrack(),
    condors.init(),
    newTask.create(),
    newTask.getTrack(),
    newTask.search()
  ]);
}
