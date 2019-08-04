import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import modals from './modal/reducer';
import measurements from './measurements/reducer';
import chart from './chart/reducer';
import tasks from './task/reducer';
import suggestions from './suggestion/reducer';
import history from './history/reducer';
import test from '@components/TSTest/redux/reducer';

const rootReducer = combineReducers({
  modals,
  measurements,
  chart,
  tasks,
  suggestions,
  history,
  test
});

export type RootState = StateType<typeof rootReducer>;

export default rootReducer;
