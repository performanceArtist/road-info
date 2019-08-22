import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { MAP } from './actions';

function* getWorker(action: { type: string; payload: any }) {
  try {
    const response = yield call(axios.get, '/api/history', {
      params: action.payload
    });

    yield put({
      type: MAP.GET_HISTORY.SUCCESS,
      payload: response.data
    });
  } catch ({ response }) {
    console.log(response);
    yield put({
      type: MAP.GET_HISTORY.FAILURE,
      response: response.data
    });
  }
}

export default function* getWatcher() {
  yield takeLatest(MAP.GET_HISTORY.REQUEST, getWorker);
}
