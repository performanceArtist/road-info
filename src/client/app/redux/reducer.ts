import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import { reducer as modals } from '@features/Modal/redux';
import { reducer as chart } from '@features/CompositeChart/redux';
import { reducer as tasks } from '@features/Task/redux';
import { reducer as history } from '@features/History/redux';
import { reducer as map } from '@features/Map/redux';

import io from './io/reducer';
import measurements from './measurements/reducer';
import suggestions from './suggestion/reducer';

const rootReducer = combineReducers({
  modals,
  io,
  measurements,
  chart,
  tasks,
  suggestions,
  history,
  map
});

export type RootState = StateType<typeof rootReducer>;

export default rootReducer;
