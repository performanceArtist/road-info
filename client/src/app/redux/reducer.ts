import { combineReducers } from 'redux';

import modalReducer from './modal/reducer';
import measurementsReducer from './measurements/reducer';

const rootReducer = combineReducers({
  modals: modalReducer,
  measurements: measurementsReducer
});

export default rootReducer;
