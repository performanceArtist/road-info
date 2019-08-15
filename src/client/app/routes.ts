import MapView from './views/MapView/MapView';
import Settings from './views/Settings/Settings';
import Diagnostics from './views/Diagnostics/Diagnostics';
import Task from './views/Task/Task';
import Measurements from './views/Measurements/Measurements';
import Report from './views/Report/Report';
import History from './views/HistoryView/HistoryView';
import UI from './views/UI/UI';
import NotFound from './views/NotFound/NotFound';

import { Icon } from './layout/Navigation/Navigation';

export type Route = {
  path: string;
  title: string;
  icon: Icon;
  component: React.Component;
  exact: boolean;
};

export default [
  {
    path: '/',
    title: 'Измерения',
    icon: Icon.GRAPH,
    component: Measurements
  },
  {
    path: '/map',
    title: 'Карта',
    icon: Icon.TRUCK,
    component: MapView
  },
  {
    path: '/task',
    title: 'Задания',
    icon: Icon.TASK,
    component: Task
  },
  {
    path: '/history',
    title: 'История',
    icon: Icon.HISTORY,
    component: History
  },
  {
    path: '/settings',
    title: 'Настройки',
    icon: Icon.OPTIONS,
    component: Settings
  },
  { path: '/report', title: 'Отчёт', icon: Icon.REPORT, component: Report }
];
