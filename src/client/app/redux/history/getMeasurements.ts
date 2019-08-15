import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { HISTORY } from './actions';

function* getWorker(action: { type: string; payload: any }) {
  try {
    const response = yield call(axios.get, '/api/measurements', {
      params: action.payload
    });

    if (response.status !== 200) {
      console.error(response);
      throw new Error(`Failed to get measurements`);
    }

    yield put({
      type: HISTORY.GET_MEASUREMENTS.SUCCESS,
      payload: response.data
    });
  } catch (error) {
    console.log(error);
    yield put({ type: HISTORY.GET_MEASUREMENTS.FAILURE, error: error });
  }
}

export default function* getWatcher() {
  yield takeLatest(HISTORY.GET_MEASUREMENTS.REQUEST, getWorker);
}
