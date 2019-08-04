import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { HISTORY } from './actions';

function* getWorker(action: { type: string; payload: any }) {
  try {
    const response = yield call(axios.get, '/api/sort', { params: { a: 'b' } });

    if (response.status !== 200) {
      console.error(response);
      throw new Error(`Failed to get history`);
    }

    yield put({
      type: HISTORY.GET.SUCCESS,
      payload: response.data
    });
  } catch (error) {
    console.log(error);
    yield put({ type: HISTORY.GET.FAILURE, error: error });
  }
}

export default function* getWatcher() {
  yield takeLatest(HISTORY.GET.REQUEST, getWorker);
}
