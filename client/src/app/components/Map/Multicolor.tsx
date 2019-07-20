import React from 'react';

import { MapLayer, Popup } from 'react-leaflet';
import L from 'leaflet';
import { withLeaflet } from 'react-leaflet';

// Pass Leaflet to the plugin.
// Only required to overload once, subsequent overloads will return the same instance.
import 'leaflet-hotline';

class Multicolor extends MapLayer {
  createLeafletElement() {
    const { map, data, options = {}, onLineClick } = this.props;

    const el = L.hotline(data, options).addTo(map.current.leafletElement);
    el.on('click', onLineClick);

    return el;
  }
}

export default withLeaflet(Multicolor);
