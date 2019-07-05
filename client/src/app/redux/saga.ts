import { all } from 'redux-saga/effects';

import createWatcher from './measurements/create';
import listenWatcher from './measurements/listen';

export default function* rootSaga() {
  yield all([listenWatcher(), createWatcher()]);
}
