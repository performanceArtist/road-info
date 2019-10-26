import * as React from 'react';
import * as L from 'leaflet';
import { Map, TileLayer, Polyline, Marker } from 'react-leaflet';

import { Icon, IconImage } from '@components/Icon/Icon';
import { GPSCoordinates, GPSTrack } from '@shared/types';

interface IState {
  zoom: number;
  fullscreen: boolean;
}

type IProps = {
  location?: GPSCoordinates;
  track?: GPSTrack;
  onMapClick(coordinates: L.LatLng): void;
};

type LeafletDiv = HTMLDivElement & { leafletElement: any };

class TaskMap extends React.Component<IProps, IState> {
  private ref = React.createRef<LeafletDiv>();

  constructor(props: IProps) {
    super(props);

    this.state = {
      zoom: 14,
      fullscreen: false
    };

    this.handleFullscreen = this.handleFullscreen.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
    this.drawRoute = this.drawRoute.bind(this);
    this.markLocation = this.markLocation.bind(this);
  }

  componentDidUpdate() {
    this.ref.current && this.ref.current.leafletElement.invalidateSize();
  }

  handleFullscreen() {
    this.setState(
      { fullscreen: !this.state.fullscreen },
      () => this.ref.current && this.ref.current.leafletElement.invalidateSize()
    );
  }

  handleMapClick(event: any) {
    const { onMapClick } = this.props;

    onMapClick(event.latlng);
  }

  drawRoute() {
    const { track } = this.props;
    if (!track || track.length === 0) return null;

    this.ref.current && this.ref.current.leafletElement.invalidateSize();
    return <Polyline positions={track} color="green" weight={8} />;
  }

  markLocation() {
    const { location } = this.props;
    if (!location) return null;

    return (
      <Marker
        key={Math.random()}
        icon={L.icon({
          iconUrl: 'images/baloon.png',
          iconSize: new L.Point(60, 60),
          iconAnchor: new L.Point(55, 55)
        })}
        position={L.latLng(location[0], location[1])}
      />
    );
  }

  render() {
    const center = this.props.location || [56.472596, 84.950367];
    const { zoom } = this.state;

    const baseClass = 'map map_compact';

    return (
      <div
        className={
          this.state.fullscreen ? `${baseClass} map_fullscreen` : baseClass
        }
      >
        <div className="map__map">
          <Map
            size="compact"
            center={center}
            zoom={zoom}
            ref={this.ref as any}
            maxZoom={19}
            onclick={this.handleMapClick}
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {this.drawRoute()}
            {this.markLocation()}
          </Map>
          <div className="map__fullscreen-button">
            <Icon image={IconImage.EXPAND} onClick={this.handleFullscreen} />
          </div>
        </div>
      </div>
    );
  }
}

export default TaskMap;
