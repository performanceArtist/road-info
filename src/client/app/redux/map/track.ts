import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { MAP } from './actions';

function* getWorker(action: { type: string; payload: any }) {
  try {
    const response = yield call(axios.get, '/api/track');

    if (!response) return;

    yield put({
      type: MAP.GET_TRACK.SUCCESS,
      payload: response.data
    });
  } catch ({ response }) {
    console.log(response);
    yield put({
      type: MAP.GET_TRACK.FAILURE,
      response: response.data
    });
  }
}

export default function* getWatcher() {
  yield takeLatest(MAP.GET_TRACK.REQUEST, getWorker);
}
