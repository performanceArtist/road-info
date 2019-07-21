import React from 'react';

import { MapLayer } from 'react-leaflet';
import L from 'leaflet';
import { withLeaflet } from 'react-leaflet';
import 'leaflet-hotline';

type Props = {
  map: HTMLDivElement;
  data: {};
  options: {};
  onLineClick: Function;
};

class Multicolor extends MapLayer<Props> {
  constructor(props: Props) {
    super(props);
  }

  createLeafletElement() {
    const { map, data, options = {}, onLineClick } = this.props;

    const el = L.hotline(data, options).addTo(map.current.leafletElement);
    el.on('click', onLineClick);

    return el;
  }
}

export default withLeaflet(Multicolor);
