import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import { ModalManager } from '@features/Modal';

import Header from './layout/Header/Header';
import StatusBar from './layout/StatusBar/StatusBar';
import Footer from './layout/Footer/Footer';
import StartChannel from './layout/StartChannel/StartChannel';
import { Navigation } from './layout/Navigation/Navigation';

import routes from './routes';

const App = () => {
  return (
    <>
      <div className="container">
        <Header title="Кондор 2.0" />
        <ModalManager />
        <StartChannel />
        <StatusBar />
        <main className="app">
          <div className="app__navigation">
            <Navigation links={routes} />
          </div>
          <div className="app__content">
            <Switch>
              {routes.map(({ path, component }) => (
                <Route path={path} key={path} component={component} exact />
              ))}
            </Switch>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default hot(App);
