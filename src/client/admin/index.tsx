import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.hydrate(<App />, document.querySelector('.wrapper'));

function importAll(resolve: any) {
  resolve.keys().forEach(resolve);
}

importAll(require.context('../shared', true, /\.(css|scss)$/));

importAll(
  require.context('./', true, /\.(css|scss|jpg|png|svg|png|ico|xml|mp4|)$/)
);
