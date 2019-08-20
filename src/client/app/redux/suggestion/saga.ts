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

const getConstraint = (form: string, name: string) => ({ suggestions }) => {
  try {
    return suggestions[form][name].constraint;
  } catch (error) {
    return {};
  }
};

function* suggestionWorker(action: { type: string; payload: any }) {
  try {
    const { form, name, value } = action.payload;
    const constraint = yield select(getConstraint(form, name));

    const fromBound =
      name === 'settlement' ? { value: 'city' } : { value: name };
    const toBound = { value: name };

    const postResult = yield call(
      postData,
      'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
      {
        query: value,
        from_bound: fromBound,
        to_bound: toBound,
        locations: constraint,
        restrict_value: true
      }
    );

    const { suggestions } = postResult.data;

    yield put({
      type: SUGGESTION.GET.SUCCESS,
      payload: {
        form,
        name,
        suggestions: suggestions.map(({ value, data }) => ({
          value,
          id: data[`${name}_fias_id`]
        }))
      }
    });
  } catch ({ response }) {
    console.log(response);
    yield put({ type: SUGGESTION.GET.FAILURE, response: response.data });
  }
}

export default function* suggestionWatcher() {
  yield takeLatest(SUGGESTION.GET.REQUEST, suggestionWorker);
}
