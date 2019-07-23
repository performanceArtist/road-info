import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import RootContainer from './RootContainer';

const render = (Component: any) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.querySelector('.wrapper')
  );
};

render(RootContainer);

if (module.hot) {
  module.hot.accept('./RootContainer', () => {
    render(RootContainer);
  });
}

function importAll(resolve: any) {
  resolve.keys().forEach(resolve);
}

importAll(
  require.context('./', true, /\.(css|scss|jpg|png|svg|png|ico|xml|mp4|)$/)
);
