import * as React from 'react';

import { canUseDOM } from '../../utils';

let Map = () => <></>;

if (canUseDOM) {
  Map = require('@components/Map/Map').default;
}

const MapView = () => (
  <div className="map-view">
    <div className="map-view__map">
      <Map />
    </div>
  </div>
);

export default MapView;
