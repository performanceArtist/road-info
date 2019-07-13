import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import modalReducer from './modal/reducer';
import measurementsReducer from './measurements/reducer';
import testReducer from '@components/TSTest/redux/reducer';

const rootReducer = combineReducers({
  modals: modalReducer,
  measurements: measurementsReducer,
  test: testReducer
});

export type RootState = StateType<typeof rootReducer>;
export default rootReducer;
