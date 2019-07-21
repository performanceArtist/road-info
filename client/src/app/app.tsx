import React from 'react';
import { Switch, HashRouter, BrowserRouter, Route } from 'react-router-dom';

import Header from './layout/Header/Header';
import ModalManager from './layout/ModalManager/ModalManager';
import StatusBar from './layout/StatusBar/StatusBar';
import { Navigation, Icon } from './layout/Navigation/Navigation';
import Footer from './layout/Footer/Footer';

import MapView from './views/MapView/MapView';
import Calibration from './views/Calibration/Calibration';
import Diagnostics from './views/Diagnostics/Diagnostics';
import Measurements from './views/Measurements/Measurements';
import Report from './views/Report/Report';
import UI from './views/UI/UI';
import NotFound from './views/NotFound/NotFound';

const App = () => {
  return (
    <HashRouter>
      <div className="container">
        <Header title="Кондор 2.0" />
        <ModalManager />
        <StatusBar />
        <main className="app">
          <div className="app__navigation">
            <Navigation
              links={[
                {
                  url: '/',
                  title: 'Измерения',
                  icon: Icon.GRAPH
                },
                {
                  url: '/map',
                  title: 'Карта',
                  icon: Icon.TRUCK
                },
                {
                  url: '/calibration',
                  title: 'Калибровка',
                  icon: Icon.OPTIONS
                },
                {
                  url: '/diagnostics',
                  title: 'Диагностика',
                  icon: Icon.DIAGNOSTICS
                },
                { url: '/report', title: 'Отчёт', icon: Icon.HISTORY },
                { url: '/ui', title: 'UI' }
              ]}
            />
          </div>
          <div className="app__content">
            <Switch>
              <Route exact path="/" component={Measurements} />
              <Route path="/map" component={MapView} />
              <Route path="/calibration" component={Calibration} />
              <Route path="/diagnostics" component={Diagnostics} />
              <Route path="/report" component={Report} />
              <Route path="/ui" component={UI} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </main>
      </div>
      <Footer />
    </HashRouter>
  );
};

export default App;
