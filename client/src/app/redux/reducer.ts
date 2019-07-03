import { combineReducers } from 'redux';

import modalReducer from './modal/reducer';
import measurementsReducer from './measurements/reducer';

const rootReducer = combineReducers({
  modalReducer,
  measurementsReducer
});

export default rootReducer;
