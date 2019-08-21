import * as React from 'react';

import { Component } from 'react';

import { connect } from 'react-redux';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import { Icon, IconImage } from '@components/Icon/Icon';

import { openModal } from '@redux/modal/actions';

import {
  Measurements,
  MeasurementData,
  MeasurementInstances
} from '@redux/measurements/types';
import { ChartInfo, ColorBreakpoint } from '@redux/chart/types';
import { RootState } from '@redux/reducer';

import Multicolor from './Multicolor';
import { haversine } from './helpers';

interface PopupProps {
  position: L.LatLng;
  message: string;
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

type OwnProps = {
  toggleFullscreen: () => void;
};

type Props = OwnProps & typeof mapDispatch & MapState;

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
    this.getCombined = this.getCombined.bind(this);
    this.renderLines = this.renderLines.bind(this);
    this.addPopup = this.addPopup.bind(this);
    this.renderPopup = this.renderPopup.bind(this);
    this.handleFullscreen = this.handleFullscreen.bind(this);
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

  getCombined(data: MeasurementInstances) {
    const instances = Object.keys(data);
    const lengths = instances.map(key => data[key].length);
    const max = Math.max(...lengths);
    const { chartInfo } = this.props;

    const sum = (param: string, index: number) =>
      instances.reduce(
        (acc, key) => (data[key][index] ? acc + data[key][index][param] : acc),
        0
      );
    const outOfBounds = (index: number) => {
      const lineKeys = Object.keys(chartInfo.lines);

      return instances.map(instance => {
        return lineKeys.reduce((acc, key) => {
          const breakpoint = chartInfo.lines[key].breakpoint;
          if (!breakpoint) return acc;
          if (!data[instance][index]) return acc;

          if (
            data[instance][index][key] > breakpoint.start &&
            data[instance][index][key] < breakpoint.finish
          ) {
            return acc;
          } else {
            return acc + 1;
          }
        }, 0);
      });
    };

    const getDivider = (index: number) =>
      instances.reduce((acc, key) => (data[key][index] ? acc + 1 : acc), 0);

    return [...Array(max)].map((el, index) => {
      const divider = getDivider(index);
      const latitude = sum('latitude', index) / divider;
      const longitude = sum('longitude', index) / divider;
      const out = outOfBounds(index).filter(el => el);

      const z = out.length === 0 ? divider + 4 : out.length;

      return L.latLng(latitude, longitude, z);
    });
  }

  renderMarkers() {
    const { measurements } = this.props;

    return measurements.map(({ taskId, data }) => {
      const keys = Object.keys(data);
      const lastData = data[keys[keys.length - 1]];

      if (lastData && lastData.length !== 0) {
        const last = lastData[lastData.length - 1];
        return (
          <Marker
            key={Math.random()}
            icon={L.icon({
              iconUrl: 'images/icon.png'
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
    const { measurements } = this.props;

    const colors = [
      '#ffb3b3',
      '#fc8888',
      '#ff5252',
      '#ff1f1f',
      '#ffffff',
      '#cccccc',
      '#919191',
      '#363636'
    ];
    const length = colors.length;
    type Palette = { [key: number]: string };

    const palette = colors.reduce((acc: Palette, color, index) => {
      acc[index / length] = color;
      return acc;
    }, {});

    let oneClick = false;

    return measurements.map(({ data }, index) => {
      return (
        <Multicolor
          map={this.ref}
          key={Math.random()}
          data={this.getCombined(data)}
          options={{
            palette,
            outlineColor: 'black',
            weight: 7,
            outlineWidth: 1,
            min: 1,
            max: 8,
            smoothFactor: 1
          }}
          onLineClick={(event: React.MouseEvent) => {
            oneClick = true;
            setTimeout(() => {
              if (oneClick) this.addPopup(event, index);
            }, 200);
          }}
          onDoubleLineClick={() => {
            oneClick = false;
            this.props.openModal('Path');
            this.ref.current.originalEvent.preventDefault();
          }}
        />
      );
    });
  }

  addPopup(event: React.MouseEvent, index: number) {
    const {
      measurements,
      chartInfo: { lines }
    } = this.props;
    const { popupCount } = this.state;
    const data = measurements[index].data;
    const combined = this.getCombined(data).map(({ lat, lng }) => ({
      latitude: lat,
      longitude: lng
    }));
    const closestIndex = haversine(combined, {
      latitude: event.latlng.lat,
      longitude: event.latlng.lng
    });
    const points = Object.keys(data)
      .map(key => data[key][closestIndex])
      .filter(el => el);

    const lineKeys = Object.keys(lines);
    const isValid = (point: MeasurementData) => {
      return lineKeys.reduce((acc: Array<any>, key: string) => {
        const breakpoint = lines[key].breakpoint;
        if (!breakpoint) return acc;

        if (point[key] < breakpoint.start)
          acc.push({ key, difference: point[key] - breakpoint.start });
        if (point[key] > breakpoint.finish)
          acc.push({ key, difference: point[key] - breakpoint.finish });

        return acc;
      }, []);
    };

    const diffs = points.map(isValid);
    const badTrips = diffs.reduce((acc, diff) => {
      return diff.length !== 0 ? acc + 1 : acc;
    }, 0);
    console.log(points, diffs);

    const message =
      badTrips === 0 ? 'Параметры в норме' : `Отклонения в ${badTrips} заездах`;

    this.setState({
      popupCount: popupCount + 1,
      popup: {
        position: event.latlng,
        message
      }
    });
  }

  renderPopup() {
    const { popup, popupCount } = this.state;

    if (!popup) return null;

    /*
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
    }*/

    return (
      <Popup key={`popup-${popupCount}`} position={popup.position}>
        <div>
          <div>{popup.message}</div>
        </div>
      </Popup>
    );
  }

  handleFullscreen() {
    const { toggleFullscreen } = this.props;

    toggleFullscreen();

    setTimeout(() => {
      this.ref.current.leafletElement.invalidateSize();
    }, 400);
  }

  render() {
    const { lat, lng, zoom } = this.state;

    return (
      <>
        <Map center={[lat, lng]} zoom={zoom} ref={this.ref} maxZoom={19}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.renderLines()}
          {this.renderMarkers()}
          {this.renderPopup()}
        </Map>
        <div className="fullscreen-button">
          <Icon image={IconImage.EXPAND} onClick={this.handleFullscreen} />
        </div>
      </>
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
