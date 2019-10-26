import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { ApiAction } from '@shared/utils';
import { ApiRequest } from '@shared/types';

type Args = {
  url: string;
  apiAction: ApiAction | ApiAction[];
  method?: 'get' | 'post';
};

export function request({ url, method = 'get', apiAction }: Args) {
  let action: ApiAction | undefined = undefined;
  let response;
  function* worker({ type, payload }: ApiRequest) {
    try {
      if (method === 'get') {
        response = yield call(axios.get, url, {
          params: payload
        });
      } else {
        response = yield call(axios.post, url, payload);
      }

      const getAction = (): ApiAction | undefined => {
        if (!Array.isArray(apiAction)) {
          return apiAction;
        } else {
          return apiAction.find(({ REQUEST }) => REQUEST === type);
        }
      };

      action = getAction();
      if (!action) throw new Error('No action found');

      yield put({
        type: action.SUCCESS,
        payload: response.data
      });
    } catch ({ response }) {
      console.log(response);
      yield put({
        type: action && action.FAILURE,
        response: response.data
      });
    }
  }

  if (Array.isArray(apiAction)) {
    return function* watcher() {
      yield takeEvery(apiAction.map(a => a.REQUEST), worker);
    };
  } else {
    return function* watcher() {
      yield takeLatest([apiAction.REQUEST], worker);
    };
  }
}
