import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from './icon/icon.png';
//import iconShadow from './icon/icon-shadow.png';
import Multicolor from './Multicolor';

import { connect } from 'react-redux';

const testData = [
  L.latLng(56.4795, 84.9502709877576, 2),
  L.latLng(56.479, 84.9508454414346, 1),
  L.latLng(56.4785, 84.9502900233953, 2),
  L.latLng(56.478, 84.9505815130068, 1),
  L.latLng(56.4775, 84.9500960682586, 2),
  L.latLng(56.477, 84.9504247542883, 2),
  L.latLng(56.4765, 84.950935914971, 2),
  L.latLng(56.476, 84.9502758978535, 2),
  L.latLng(56.4755, 84.9504991561509, 2),
  L.latLng(56.475, 84.9501771212067, 2),
  L.latLng(56.4745, 84.950454688565, 1),
  L.latLng(56.474, 84.9507273459944, 2),
  L.latLng(56.4735, 84.9505374515601, 2),
  L.latLng(56.473, 84.9502886352639, 2),
  L.latLng(56.4725, 84.9505650930294, 2),
  L.latLng(56.472, 84.9501838089963, 2),
  L.latLng(56.4715, 84.9503358044118, 1),
  L.latLng(56.471, 84.9508789510682, 1),
  L.latLng(56.4705, 84.9504428281458, 1),
  L.latLng(56.47, 84.9501052191865, 1),
  L.latLng(56.4695, 84.9502180245349, 1)
];

function pointDistance(lat1, lon1, lat2, lon2) {
  const p = 0.017453292519943295;
  const a =
    0.5 -
    Math.cos((lat2 - lat1) * p) / 2 +
    (Math.cos(lat1 * p) *
      Math.cos(lat2 * p) *
      (1 - Math.cos((lon2 - lon1) * p))) /
      2;
  return 12742 * Math.asin(Math.sqrt(a));
}

function haversine(list, point) {
  const res = list.map(p =>
    pointDistance(point.latitude, point.longitude, p.latitude, p.longitude)
  );

  const index = res.indexOf(Math.min(...res));
  return index;
}

class MapComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lat: 56.472596,
      lng: 84.950367,
      zoom: 14,
      popup: null,
      popupCount: 0
    };

    this.addPopup = this.addPopup.bind(this);
  }

  addPopup(event, index) {
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

  road = [L.latLng(56.472596, 84.950367), L.latLng(56.471067, 84.950463)];
  myLines = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: { altitude: 'high' },
        geometry: {
          type: 'LineString',
          coordinates: [[84.950367, 56.472596], [84.950463, 56.471067]]
        }
      }
    ]
  };

  map = React.createRef();
  defaultIcon = L.icon({
    iconUrl: icon
    /*shadowUrl: iconShadow*/
  });

  renderMarkers() {
    const { taskData } = this.props;

    return taskData.map(({ chartData }) => {
      if (chartData.length !== 0) {
        const last = chartData[chartData.length - 1];
        return (
          <Marker
            key={Math.random()}
            icon={this.defaultIcon}
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

    const getData = chartData =>
      chartData.map(({ latitude, longitude, density }) => {
        const z =
          density > breakpoint.start && density < breakpoint.finish ? 2 : 1;
        return L.latLng(latitude, longitude, z);
      });

    return taskData.map(({ chartData }, index) => (
      <Multicolor
        map={this.map}
        key={Math.random()}
        data={getData(chartData)}
        options={{
          palette: { 0: '#ff0000', 0.5: 'green', 1.0: '#ff0000' },
          outlineColor: 'black',
          weight: 7,
          outlineWidth: 1,
          min: 1,
          max: 3
        }}
        onLineClick={event => this.addPopup(event, index)}
      />
    ));
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
      <Map center={[lat, lng]} zoom={zoom} ref={this.map}>
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

const mapState = ({ measurements }) => ({
  taskData: measurements.taskData,
  chartInfo: measurements.chartInfo
});
export default connect(mapState)(MapComponent);
