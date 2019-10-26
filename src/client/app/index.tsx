import * as React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import 'leaflet/dist/leaflet.css';
import 'react-datepicker/dist/react-datepicker.css';

import RootContainer from './RootContainer';

if (module.hot) {
  module.hot.accept('./RootContainer', () => {
    ReactDOM.render(
      <AppContainer>
        <RootContainer />
      </AppContainer>,
      document.querySelector('.wrapper')
    );
  });
}

ReactDOM.hydrate(RootContainer, document.querySelector('.wrapper'));

function importAll(resolve: any) {
  resolve.keys().forEach(resolve);
}

importAll(require.context('../shared', true, /\.(css|scss)$/));

importAll(
  require.context('./', true, /\.(css|scss|jpg|png|svg|png|ico|xml|mp4|)$/)
);
