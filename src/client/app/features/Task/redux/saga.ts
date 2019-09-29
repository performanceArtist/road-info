import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { TASK } from './actions';

function postData(url: string, data = {}) {
  const config = {};
  return axios.post(url, data, config);
}

function* createWorker(action: { type: string; payload: any }) {
  try {
    yield call(postData, '/api/task', action.payload);
    yield put({
      type: TASK.POST.SUCCESS
    });
  } catch ({ response }) {
    console.log(response);
    yield put({ type: TASK.POST.FAILURE, response: response.data });
  }
}

export default function* createWatcher() {
  yield takeLatest(TASK.POST.REQUEST, createWorker);
}
