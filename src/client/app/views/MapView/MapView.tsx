import * as React from 'react';

import { canUseDOM } from '../../utils';

let Map = () => <></>;

if (canUseDOM) {
  Map = require('@features/Map/Map').default;
}

const MapView = () => (
  <div>
    <Map />
  </div>
);

export default MapView;
