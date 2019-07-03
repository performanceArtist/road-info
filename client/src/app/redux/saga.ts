import { all } from 'redux-saga/effects';

import measurementsWatcher from './measurements/saga';

export default function* rootSaga() {
  yield all([measurementsWatcher()]);
}
