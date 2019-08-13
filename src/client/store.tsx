import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '@redux/reducer';
import rootSaga from '@redux/saga';

export default ({ initialState = {}, browser = false } = {}) => {
  let comp;
  const sagaMiddleware = createSagaMiddleware();

  if (browser) {
    const composeEnhancer =
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    comp = composeEnhancer(applyMiddleware(sagaMiddleware));
  } else {
    comp = applyMiddleware(sagaMiddleware);
  }

  const store = createStore(rootReducer, initialState, comp);
  sagaMiddleware.run(rootSaga);

  return store;
};
