import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { connect } from 'react-redux';

import icon from './icon/icon.png';
//import iconShadow from './icon/icon-shadow.png';
import { TaskData, ChartData, ChartInfo } from '@redux/measurements/types';
import { RootState } from '@redux/reducer';
import Multicolor from './Multicolor';
import { testData, haversine } from './helpers';

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
  taskData: TaskData;
  chartInfo: ChartInfo;
};

type Props = typeof mapState & MapState;

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

    this.renderMarkers = this.renderMarkers.bind(this);
    this.renderLines = this.renderLines.bind(this);
    this.addPopup = this.addPopup.bind(this);
    this.renderPopup = this.renderPopup.bind(this);
  }

  renderMarkers() {
    const { taskData } = this.props;

    return taskData.map(({ chartData }) => {
      if (chartData.length !== 0) {
        const last = chartData[chartData.length - 1];
        return (
          <Marker
            key={Math.random()}
            icon={L.icon({
              iconUrl: icon
              /*shadowUrl: iconShadow*/
            })}
            position={[last.latitude, last.longitude]}
          />
        );
      } else {
        return null;
      }
    });
  }

  renderLines() {
    const { taskData, chartInfo } = this.props;
    const { breakpoint } = chartInfo.lines.density;
    const getData = (chartData: ChartData) =>
      chartData.map(({ latitude, longitude, density }) => {
        const z =
          density > breakpoint.start && density < breakpoint.finish ? 2 : 1;
        return L.latLng(latitude, longitude, z);
      });

    return taskData.map(({ chartData }, index) => (
      <Multicolor
        map={this.ref}
        key={Math.random()}
        data={getData(chartData)}
        options={{
          palette: { 0: '#f62a00', 0.5: '#258039', 1.0: '#f62a00' },
          outlineColor: 'black',
          weight: 7,
          outlineWidth: 1,
          min: 1,
          max: 3,
          smoothFactor: 0
        }}
        onLineClick={event => this.addPopup(event, index)}
      />
    ));
  }

  addPopup(event, index: number) {
    const { taskData, chartInfo } = this.props;
    const { popupCount } = this.state;

    const data = taskData[index].chartData;
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

const mapState = ({ measurements }: RootState) => ({
  taskData: measurements.taskData,
  chartInfo: measurements.chartInfo
});

export default connect(mapState)(MapComponent);
