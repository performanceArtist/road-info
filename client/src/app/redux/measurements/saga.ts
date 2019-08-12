import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { MEASUREMENTS } from './actions';

function* createWorker(action: { type: string; payload: any }) {
  try {
    const postResult = yield call(axios.get, `/api/generate`, {
      params: action.payload
    });

    const { status, message } = postResult.data;

    if (status !== 'ok') {
      console.error(postResult);
      throw new Error(`Failed to make a generation request`);
    }

    yield put({
      type: MEASUREMENTS.GENERATE.SUCCESS
    });
  } catch (error) {
    console.log(error);
    yield put({ type: MEASUREMENTS.GENERATE.FAILURE, error: error });
  }
}

export default function* createWatcher() {
  yield takeLatest(MEASUREMENTS.GENERATE.REQUEST, createWorker);
}
