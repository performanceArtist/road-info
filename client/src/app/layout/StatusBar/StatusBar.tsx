import React from 'react';

import { Profile, Role } from '../../components/Profile/Profile';
import Clock from '../../components/Clock/Clock';
import Warning from '../../components/Warning/Warning';

const StatusBar = () => (
  <div className="status-bar">
    <div className="status-bar__title" />
    <div className="status-bar__warning">
      <Warning />
    </div>
    <div className="status-bar__clock">
      <Clock />
    </div>
    <div className="status-bar__profile">
      <Profile user={{ username: 'Дядя Глеб', role: Role.USER }} />
    </div>
  </div>
);

export default StatusBar;
