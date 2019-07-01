import React from 'react';
import { Switch, HashRouter, BrowserRouter, Route } from 'react-router-dom';

import Header from './layout/Header/Header';
import ModalManager from './layout/ModalManager/ModalManager';
import StatusBar from './layout/StatusBar/StatusBar';
import { Navigation, Icon } from './layout/Navigation/Navigation';
import Footer from './layout/Footer/Footer';

import Index from './views/Index/Index';
import Calibration from './views/Calibration/Calibration';
import Diagnostics from './views/Diagnostics/Diagnostics';
import Measurements from './views/Measurements/Measurements';
import History from './views/History/History';
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
                { url: '/', title: 'Главная', icon: Icon.HOME },
                {
                  url: '/calibration',
                  title: 'Калибровка',
                  icon: Icon.OPTIONS
                },
                {
                  url: '/measurements',
                  title: 'Измерения',
                  icon: Icon.GRAPH
                },
                {
                  url: '/diagnostics',
                  title: 'Диагностика',
                  icon: Icon.DIAGNOSTICS
                },
                { url: '/history', title: 'История', icon: Icon.HISTORY },
                { url: '/ui', title: 'UI' }
              ]}
            />
          </div>
          <div className="app__content">
            <Switch>
              <Route exact path="/" component={Index} />
              <Route path="/calibration" component={Calibration} />
              <Route path="/diagnostics" component={Diagnostics} />
              <Route path="/measurements" component={Measurements} />
              <Route path="/history" component={History} />
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
