import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { GET } from './actions';

function getData(url: string) {
  return axios.get(url);
}

function* createWorker(action: { type: string; payload: any }) {
  try {
    const postResult = yield call(getData, `/api/generate/${action.payload}`);

    const { status, message } = postResult.data;

    if (status !== 'ok') {
      console.error(message);
      throw new Error(`Failed to create a generation request`);
    }

    yield put({
      type: GET.KONDOR.SUCCESS
    });
  } catch (error) {
    console.log(error);
    yield put({ type: GET.KONDOR.FAILURE, error: error });
  }
}

export default function* createWatcher() {
  yield takeLatest(GET.KONDOR.REQUEST, createWorker);
}
