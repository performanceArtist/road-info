import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import { ModalManager } from '@features/Modal';

import Header from './layout/Header/Header';
import StatusBar from './layout/StatusBar/StatusBar';
import Footer from './layout/Footer/Footer';
import { Navigation } from './layout/Navigation/Navigation';
import Bootstrapper from './layout/Bootstrapper/Bootstrapper';

import routes from './routes';

const App = () => {
  return (
    <>
      <div className="container">
        <Header />
        <ModalManager />
        <Bootstrapper />
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
