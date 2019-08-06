import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import modals from './modal/reducer';
import io from './io/reducer';
import measurements from './measurements/reducer';
import chart from './chart/reducer';
import tasks from './task/reducer';
import suggestions from './suggestion/reducer';
import history from './history/reducer';

const rootReducer = combineReducers({
  modals,
  io,
  measurements,
  chart,
  tasks,
  suggestions,
  history
});

export type RootState = StateType<typeof rootReducer>;

export default rootReducer;
