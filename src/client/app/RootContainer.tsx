import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from './store';

import App from './App';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
const store = createStore({ initialState: preloadedState, browser: true });

const RootContainer = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

export default RootContainer;
