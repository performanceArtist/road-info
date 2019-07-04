import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { MEASUREMENT } from './actions';

function postData(url: string, data = {}) {
  const config = {};
  return axios.post(url, data, config);
}

function* createWorker(action) {
  try {
    const postResult = yield call(
      postData,
      '/api/task',
      action.payload.formData
    );

    const { status, message } = postResult.data;

    if (status !== 'ok') {
      console.error(message);
      throw new Error(`Failed to create a task`);
    }

    yield put({
      type: MEASUREMENT.POST.SUCCESS
    });
  } catch (error) {
    console.log(error);
    yield put({ type: MEASUREMENT.POST.FAILURE, error: error });
  }
}

export default function* createWatcher() {
  yield takeLatest(MEASUREMENT.POST.REQUEST, createWorker);
}
