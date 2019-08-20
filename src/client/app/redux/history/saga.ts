import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { HISTORY } from './actions';

function* getWorker(action: { type: string; payload: any }) {
  try {
    const response = yield call(axios.get, '/api/sort', {
      params: action.payload
    });

    yield put({
      type: HISTORY.GET.SUCCESS,
      payload: response.data
    });
  } catch ({ response }) {
    console.log(response);
    yield put({ type: HISTORY.GET.FAILURE, response: response.data });
  }
}

export default function* getWatcher() {
  yield takeLatest(HISTORY.GET.REQUEST, getWorker);
}
