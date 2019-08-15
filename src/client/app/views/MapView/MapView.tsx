import * as React from 'react';
import { useState } from 'react';

import { Icon, IconImage } from '@components/Icon/Icon';

import { canUseDOM } from '../../utils';

let Map = () => <></>;

if (canUseDOM) {
  Map = require('@components/Map/Map').default;
}

const MapView = () => {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <div className={fullscreen ? 'map-view map-view_fullscreen' : 'map-view'}>
      <div className="map-view__map">
        <Map toggleFullscreen={() => setFullscreen(!fullscreen)} />
      </div>
    </div>
  );
};

export default MapView;
