import * as React from 'react';
import { MapLayer, withLeaflet } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-hotline';

type Props = {
  map: HTMLDivElement;
  data: {};
  options: {};
  onLineClick: Function;
  onDoubleLineClick: Function;
  onContextMenu: Function;
};

class Multicolor extends MapLayer {
  constructor(props: Props) {
    super(props);
  }

  createLeafletElement() {
    const {
      map,
      data,
      options = {},
      onLineClick,
      onDoubleLineClick,
      onContextMenu = () => {}
    } = this.props;

    const el = L.hotline(data, options).addTo(map.current.leafletElement);
    el.on('click', onLineClick);
    el.on('dblclick', onDoubleLineClick);
    el.on('contextmenu', onContextMenu);
    return el;
  }
}

export default withLeaflet(Multicolor);
