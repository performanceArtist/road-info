import React from 'react';

import { Profile, Role } from '@components/Profile/Profile';
import Clock from '@components/Clock/Clock';
import Warning from './Warning';
import GeneratePanel from '@components/GeneratePanel/GeneratePanel';

const StatusBar = () => (
  <div className="status-bar">
    <div className="status-bar__title">
      <GeneratePanel />
    </div>
    <div className="status-bar__warning">
      <Warning />
    </div>
    <div className="status-bar__clock">
      <Clock />
    </div>
    <div className="status-bar__profile">
      <Profile />
    </div>
  </div>
);

export default StatusBar;
