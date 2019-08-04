import { takeLatest, call, put, select } from 'redux-saga/effects';
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

const getConstraints = name => ({ suggestions }) =>
  Object.keys(suggestions)
    .filter(key => key !== name)
    .map(key => {
      const fullKey = `${key}_fias_id`;
      return {
        [fullKey]: suggestions[key].last
      };
    });

function* suggestionWorker(action: { type: string; payload: any }) {
  try {
    const { name, value } = action.payload;
    const constraints = yield select(getConstraints(name));

    const postResult = yield call(
      postData,
      'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
      {
        query: value,
        from_bound: { value: name },
        to_bound: { value: name },
        locations: constraints,
        restrict_value: true
      }
    );

    if (postResult.status !== 200) {
      console.error(postResult.error);
      throw new Error(`Failed to get a suggestion`);
    }

    const { suggestions } = postResult.data;

    console.log(postResult);

    yield put({
      type: SUGGESTION.GET.SUCCESS,
      payload: {
        name,
        suggestions: suggestions.map(({ value, data }) => ({
          value,
          id: data.region_fias_id
        }))
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
