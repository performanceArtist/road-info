import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import { reducer as modals } from '@features/Modal/redux';
import { reducer as chart } from '@features/CompositeChart/redux';
import { reducer as tasks } from '@features/Task/redux';
import { reducer as history } from '@features/History/redux';
import { reducer as map } from '@features/Map/redux';
import { reducer as newTask } from '@features/OperatorTaskCreator/redux';

import io from './io/reducer';
import data from './data/reducer';
import suggestions from './suggestion/reducer';
import condors from './condors/reducer';

const rootReducer = combineReducers({
  modals,
  io,
  data,
  chart,
  tasks,
  suggestions,
  history,
  map,
  condors,
  newTask
});

export type RootState = StateType<typeof rootReducer>;

export default rootReducer;
