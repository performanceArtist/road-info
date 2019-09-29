import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { HISTORY } from '../actions';

function* getWorker(action: { type: string; payload: any }) {
  try {
    const response = yield call(axios.get, '/api/measurements', {
      params: action.payload
    });

    yield put({
      type: HISTORY.GET_MEASUREMENTS.SUCCESS,
      payload: response.data
    });
  } catch ({ response }) {
    console.log(response);
    yield put({
      type: HISTORY.GET_MEASUREMENTS.FAILURE,
      response: response.data
    });
  }
}

export default function* getWatcher() {
  yield takeLatest(HISTORY.GET_MEASUREMENTS.REQUEST, getWorker);
}
