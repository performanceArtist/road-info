import MapView from './views/MapView/MapView';
import Settings from './views/Settings/Settings';
import Task from './views/Task/Task';
import NewTask from './views/NewTask/NewTask';
import Measurements from './views/Measurements/Measurements';
import History from './views/HistoryView/HistoryView';

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
    title: 'Карта',
    icon: Icon.TRUCK,
    component: MapView
  },
  {
    path: '/measurements',
    title: 'Измерения',
    icon: Icon.GRAPH,
    component: Measurements
  },
  {
    path: '/task',
    title: 'Задания',
    icon: Icon.TASK,
    component: Task
  },
  {
    path: '/new-task',
    title: 'Новое задание',
    icon: Icon.REPORT,
    component: NewTask
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
  }
];
