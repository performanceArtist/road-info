import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import { SUGGESTION } from './actions';

function postData(url: string, data = {}) {
  const API_KEY = '6dace7b27b05977b00a0bfbe8169678713e06db7';
  const config = {
    headers: {
      Authorization: `Token ${API_KEY}`
    }
  };
  return axios.post(url, data, config);
}

function* suggestionWorker(action: { type: string; payload: any }) {
  try {
    const { name, value } = action.payload;
    const postResult = yield call(
      postData,
      'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
      {
        query: value,
        from_bound: { value: name },
        to_bound: { value: name }
      }
    );

    if (postResult.status !== 200) {
      console.error(postResult.error);
      throw new Error(`Failed to get a suggestion`);
    }

    const { suggestions } = postResult.data;

    yield put({
      type: SUGGESTION.GET.SUCCESS,
      payload: {
        name,
        suggestions: suggestions.map(({ value }) => value)
      }
    });
  } catch (error) {
    console.log(error);
    yield put({ type: SUGGESTION.GET.FAILURE, error: error });
  }
}

export default function* suggestionWatcher() {
  yield takeLatest(SUGGESTION.GET.REQUEST, suggestionWorker);
}
