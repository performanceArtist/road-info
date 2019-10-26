import * as React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login/Login';

ReactDOM.hydrate(<Login />, document.querySelector('.wrapper'));

function importAll(resolve: any) {
  resolve.keys().forEach(resolve);
}

importAll(require.context('../shared', true, /\.(css|scss)$/));

importAll(
  require.context('./', true, /\.(css|scss|jpg|png|svg|png|ico|xml|mp4|)$/)
);
