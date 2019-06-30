import { combineReducers } from 'redux';

import modalReducer from './modal/reducer';

const rootReducer = combineReducers({
  modalReducer
});

export default rootReducer;
