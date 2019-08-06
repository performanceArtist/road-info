import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LeafletEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { connect } from 'react-redux';

import { openModal } from '@redux/modal/actions';

//import iconShadow from './icon/icon-shadow.png';
import { Measurements, MeasurementData } from '@redux/measurements/types';
import { ChartInfo } from '@redux/chart/types';
import { RootState } from '@redux/reducer';

import Multicolor from './Multicolor';
import { haversine } from './helpers';

interface PopupProps {
  position: L.LatLng;
  less: number;
  more: number;
}

interface State {
  lat: number;
  lng: number;
  zoom: number;
  popup: null | PopupProps;
  popupCount: number;
}

type MapState = {
  measurements: Measurements;
  chartInfo: ChartInfo;
};

type Props = typeof mapDispatch & MapState;

class MapComponent extends Component<Props, State> {
  private ref = React.createRef<HTMLDivElement>();

  constructor(props: Props) {
    super(props);

    this.state = {
      lat: 56.472596,
      lng: 84.950367,
      zoom: 14,
      popup: null,
      popupCount: 0
    };

    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.renderMarkers = this.renderMarkers.bind(this);
    this.renderLines = this.renderLines.bind(this);
    this.addPopup = this.addPopup.bind(this);
    this.renderPopup = this.renderPopup.bind(this);
  }

  handleMarkerClick(event: React.MouseEvent, currentId: string) {
    const { measurements, openModal } = this.props;
    const task = measurements.find(({ taskId }) => taskId === currentId);

    if (task)
      openModal('Kondor', {
        id: currentId,
        counter: 1,
        coordinates: { x: event.clientX, y: event.clientY }
      });
  }

  renderMarkers() {
    const { measurements } = this.props;

    return measurements.map(({ taskId, data }) => {
      if (data.length !== 0) {
        const last = data[data.length - 1];
        return (
          <Marker
            key={Math.random()}
            icon={L.icon({
              iconUrl: 'images/icon.png'
              /*shadowUrl: iconShadow*/
            })}
            position={[last.latitude, last.longitude]}
            onClick={(event: React.MouseEvent) =>
              this.handleMarkerClick(event, taskId)
            }
          />
        );
      } else {
        return null;
      }
    });
  }

  renderLines() {
    const { measurements, chartInfo } = this.props;
    const { breakpoint } = chartInfo.lines.density;
    const getData = (data: Array<MeasurementData>) =>
      data.map(({ latitude, longitude, density }) => {
        const z =
          density > breakpoint.start && density < breakpoint.finish ? 2 : 1;
        return L.latLng(latitude, longitude, z);
      });

    return measurements.map(({ data }, index) => (
      <Multicolor
        map={this.ref}
        key={Math.random()}
        data={getData(data)}
        options={{
          palette: { 0: '#f62a00', 0.5: '#258039', 1.0: '#f62a00' },
          outlineColor: 'black',
          weight: 7,
          outlineWidth: 1,
          min: 1,
          max: 3,
          smoothFactor: 1
        }}
        onLineClick={(event: React.MouseEvent) => this.addPopup(event, index)}
      />
    ));
  }

  addPopup(event: React.MouseEvent, index: number) {
    const { measurements, chartInfo } = this.props;
    const { popupCount } = this.state;

    const data = measurements[index].data;
    const closestIndex = haversine(data, {
      latitude: event.latlng.lat,
      longitude: event.latlng.lng
    });
    const breakpoint = chartInfo.lines.density.breakpoint;
    const closestDensity = data[closestIndex].density;

    this.setState({
      popupCount: popupCount + 1,
      popup: {
        position: event.latlng,
        less: closestDensity - breakpoint.start,
        more: breakpoint.finish - closestDensity
      }
    });
  }

  renderPopup() {
    const { popup, popupCount } = this.state;

    if (!popup) return null;

    let message = '';
    const { less, more } = popup;

    if (less > 0 && more > 0) {
      message = 'Параметры находятся в пределах нормы.';
    } else if (less < 0) {
      message = `Отклонение от нормы плотности в ближайшей точке: меньше эталона на ${Math.abs(
        less
      ).toFixed(2)} г/см3`;
    } else if (more < 0) {
      message = `Отклонение от нормы плотности в ближайшей точке: превышает эталон на ${Math.abs(
        more
      ).toFixed(2)} г/см3`;
    }

    return (
      <Popup key={`popup-${popupCount}`} position={popup.position}>
        <div>
          <div>{message}</div>
        </div>
      </Popup>
    );
  }

  render() {
    const { lat, lng, zoom } = this.state;

    return (
      <Map center={[lat, lng]} zoom={zoom} ref={this.ref}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.renderLines()}
        {this.renderMarkers()}
        {this.renderPopup()}
      </Map>
    );
  }
}

const mapState = ({ measurements, chart }: RootState) => ({
  measurements,
  chartInfo: chart
});

const mapDispatch = { openModal };

export default connect(
  mapState,
  mapDispatch
)(MapComponent);
