import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { MEASUREMENTS } from './actions';

function* createWorker(action: { type: string; payload: any }) {
  try {
    yield call(axios.get, `/api/generate`, {
      params: action.payload
    });

    yield put({
      type: MEASUREMENTS.GENERATE.SUCCESS
    });
  } catch ({ response }) {
    console.log(response);
    yield put({ type: MEASUREMENTS.GENERATE.FAILURE, response: response.data });
  }
}

export default function* createWatcher() {
  yield takeLatest(MEASUREMENTS.GENERATE.REQUEST, createWorker);
}
