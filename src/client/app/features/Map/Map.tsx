import * as React from 'react';

import { Component } from 'react';

import { connect } from 'react-redux';
import { Map, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';

import { Icon, IconImage } from '@components/Icon/Icon';
import DateRange from '@components/DateRange/DateRange';
import Button from '@shared/Button/Button';
import MapPopup, { PointData } from './MapPopup';

import {
  Measurements,
  MeasurementData,
  MeasurementInstances
} from '@redux/measurements/types';
import { ChartInfo } from '@redux/chart/types';
import { MapHistory } from '@redux/map/types';
import { RootState } from '@redux/reducer';
import { openModal } from '@redux/modal/actions';
import {
  setStartDate,
  setEndDate,
  setMode,
  getHistory
} from '@redux/map/actions';

import Multicolor from './Multicolor';
import { haversine } from './helpers';

type PopupProps = {
  position: L.LatLng;
  data: Array<PointData>;
};

interface State {
  lat: number;
  lng: number;
  zoom: number;
  popup: null | PopupProps;
  popupCount: number;
  fullscreen: boolean;
}

type MapState = {
  measurements: Measurements;
  history: MapHistory;
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
      popupCount: 0,
      fullscreen: false
    };

    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.renderMarkers = this.renderMarkers.bind(this);
    this.getCombined = this.getCombined.bind(this);
    this.getClosestIndex = this.getClosestIndex.bind(this);
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
      '#7BD47B',
      '#5CBD5C',
      '#00A000'
    ];
    const length = colors.length;
    const palette = colors.reduce(
      (acc: { [key: number]: string }, color, index) => {
        acc[index / length] = color;
        return acc;
      },
      {}
    );

    let oneClick = false;

    return measurements.map((measurement, index) => {
      const { data } = measurement;

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
          onDoubleLineClick={(event: React.MouseEvent) => {
            oneClick = false;
            this.props.openModal('Path', {
              measurement,
              closestIndex: this.getClosestIndex(event, measurement.data)
            });
            this.ref.current.originalEvent.preventDefault();
          }}
        />
      );
    });
  }

  getClosestIndex(event, data) {
    const combined = this.getCombined(data).map(({ lat, lng }) => ({
      latitude: lat,
      longitude: lng
    }));

    return haversine(combined, {
      latitude: event.latlng.lat,
      longitude: event.latlng.lng
    });
  }

  addPopup(event: React.MouseEvent, index: number) {
    const {
      measurements,
      chartInfo: { lines }
    } = this.props;
    const { popupCount } = this.state;
    const data = measurements[index].data;
    const closestIndex = this.getClosestIndex(event, data);
    const points = Object.keys(data)
      .map(key => data[key][closestIndex])
      .filter(el => el);

    const lineKeys = Object.keys(lines);
    const isValid = (point: MeasurementData) => {
      return lineKeys.reduce((acc: PointData, key: string) => {
        const breakpoint = lines[key].breakpoint;
        if (!breakpoint) return acc;

        if (point[key] < breakpoint.start)
          acc.push({
            key,
            name: lines[key].name,
            value: point[key],
            difference: point[key] - breakpoint.start
          });
        if (point[key] > breakpoint.finish)
          acc.push({
            key,
            name: lines[key].name,
            value: point[key],
            difference: point[key] - breakpoint.finish
          });

        return acc;
      }, []);
    };

    const diffs = points.map(isValid).filter(el => el.length !== 0);

    this.setState({
      popupCount: popupCount + 1,
      popup: {
        position: event.latlng,
        data: diffs
      }
    });
  }

  renderPopup() {
    const { popup, popupCount } = this.state;

    if (!popup) return null;

    return <MapPopup key={popupCount} {...popup} />;
  }

  handleFullscreen() {
    this.setState({ fullscreen: !this.state.fullscreen }, () =>
      this.ref.current.leafletElement.invalidateSize()
    );
  }

  render() {
    const { lat, lng, zoom } = this.state;
    const {
      history: { startDate, endDate },
      setMode,
      setStartDate,
      setEndDate,
      getHistory
    } = this.props;
    return (
      <div className={this.state.fullscreen ? 'map map_fullscreen' : 'map'}>
        <div className="map__map">
          <Map center={[lat, lng]} zoom={zoom} ref={this.ref} maxZoom={19}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {this.renderLines()}
            {this.renderMarkers()}
            {this.renderPopup()}
          </Map>

          <div className="map__fullscreen-button">
            <Icon image={IconImage.EXPAND} onClick={this.handleFullscreen} />
          </div>
          <div className="map__date-range">
            <DateRange
              startDate={startDate}
              endDate={endDate}
              onStartChange={setStartDate}
              onEndChange={setEndDate}
            />
            <div>
              <Button
                onClick={() => {
                  getHistory({
                    startDate,
                    endDate
                  });
                  setMode('history');
                }}
              >
                Показать историю
              </Button>
            </div>

            <div className="map__mode-switch">
              <Button onClick={() => setMode('realTime')}>
                Реальное время
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = ({
  measurements,
  chart,
  map: { mode, history, historyMeasurements }
}: RootState) => ({
  measurements: mode === 'realTime' ? measurements : historyMeasurements,
  history,
  chartInfo: chart
});

const mapDispatch = {
  openModal,
  setStartDate,
  setEndDate,
  setMode,
  getHistory
};

export default connect(
  mapState,
  mapDispatch
)(MapComponent);
