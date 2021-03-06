import * as React from 'react';

import { Component } from 'react';

import { connect } from 'react-redux';
import { Map, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';

import { Icon, IconImage } from '@components/Icon/Icon';
import DateRange from '@components/DateRange/DateRange';
import { Button } from '@shared/view';
import {
  MeasurementData,
  MeasurementInstances,
  ChartInfo,
  PointData,
  ServerCondor
} from '@shared/types';

import MapPopup from './MapPopup';
import InfoPopup from './InfoPopup';
import PathModal from './PathModal';

import { MapHistory } from '../redux/types';
import { RootState } from '@redux/reducer';
import { openModal } from '@features/Modal/redux/actions';
import {
  setStartDate,
  setEndDate,
  setMode,
  getHistory,
  getTrack
} from '../redux/actions';

import Multicolor from './Multicolor';
import { haversine } from './helpers';
import { Task } from '@shared/types';

type PopupProps = {
  position: L.LatLng;
  data: PointData[];
};

interface State {
  lat: number;
  lng: number;
  zoom: number;
  popup: null | PopupProps;
  fullscreen: boolean;
  pathModal: null | {
    taskId: string;
    closestIndex: any;
  };
  infoPopup: null | {
    position: L.LatLng;
    taskId: string;
    task: Task;
  };
}

type MapState = {
  measurements: MeasurementData[];
  tasks: Task[];
  history: MapHistory;
  testTrack: Array<{ latitude: number; longitude: number }>;
  chartInfo: ChartInfo;
  condors: ServerCondor[];
};

type OwnProps = {
  toggleFullscreen: () => void;
  size?: 'large' | 'compact';
};

type Props = OwnProps & typeof mapDispatch & MapState;

const mapState = ({
  measurements,
  tasks,
  chart,
  map: { mode, history, historyMeasurements, testTrack },
  condors
}: RootState) => ({
  measurements: mode === 'realTime' ? [] : historyMeasurements,
  tasks: tasks.tasks,
  history,
  testTrack,
  chartInfo: chart,
  condors
});

const mapDispatch = {
  openModal,
  setStartDate,
  setEndDate,
  setMode,
  getHistory,
  getTrack
};

class MapComponent extends Component<Props, State> {
  private ref = React.createRef<HTMLDivElement>();

  constructor(props: Props) {
    super(props);

    this.state = {
      lat: 56.472596,
      lng: 84.950367,
      zoom: 14,
      popup: null,
      fullscreen: false,
      pathModal: null,
      infoPopup: null
    };

    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.renderMarkers = this.renderMarkers.bind(this);
    this.getCombined = this.getCombined.bind(this);
    this.getClosestIndex = this.getClosestIndex.bind(this);
    this.renderLines = this.renderLines.bind(this);
    this.addPopup = this.addPopup.bind(this);
    this.renderPopup = this.renderPopup.bind(this);
    this.renderInfoPopup = this.renderInfoPopup.bind(this);
    this.handleFullscreen = this.handleFullscreen.bind(this);
  }

  handleMarkerClick(event: React.MouseEvent, currentId: string) {
    const { measurements, openModal } = this.props;
    const task = measurements.find(({ taskId }) => taskId === currentId);

    if (task)
      openModal('Condor', {
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

    if (instances.length === 0) return [];

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
    const { condors } = this.props;

    return condors.map(({ id, coordinates }) => {
      return (
        <Marker
          key={Math.random()}
          icon={L.icon({
            iconUrl: 'images/icon.png'
          })}
          position={coordinates}
          onClick={(event: React.MouseEvent) =>
            this.handleMarkerClick(event, id)
          }
        />
      );
    });
  }

  renderLines() {
    const { measurements, tasks } = this.props;
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
            this.setState({
              pathModal: {
                taskId: measurement.taskId,
                closestIndex: this.getClosestIndex(event, measurement.data)
              }
            });
            this.ref.current.originalEvent.preventDefault();
          }}
          onContextMenu={(event: React.MouseEvent) => {
            this.setState({
              infoPopup: {
                position: event.latlng,
                taskId: measurement.taskId,
                task: tasks.find(task => task.id === measurement.taskId)
              }
            });
          }}
        />
      );
    });
  }

  renderLineTest() {
    if (this.props.testTrack.length === 0) {
      this.props.getTrack();
      return null;
    }

    const data = this.props.testTrack.map(({ latitude, longitude }) =>
      L.latLng(latitude, longitude, 0)
    );

    return (
      <Multicolor
        map={this.ref}
        key={Math.random()}
        data={data}
        options={{
          outlineColor: 'black',
          weight: 7,
          outlineWidth: 1,
          min: 1,
          max: 8,
          smoothFactor: 1
        }}
      />
    );
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
    const data = measurements[index].data;
    const closestIndex = this.getClosestIndex(event, data);
    const points = Object.keys(data)
      .map(key => data[key][closestIndex])
      .filter(el => el);

    const lineKeys = Object.keys(lines);
    const isValid = (point: MeasurementData) => {
      return lineKeys.reduce((acc: PointData[], key: string) => {
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
      popup: {
        position: event.latlng,
        data: diffs
      }
    });
  }

  renderPopup() {
    const { popup } = this.state;

    if (!popup) return null;

    return <MapPopup key={popup.position.lat} {...popup} />;
  }

  renderInfoPopup() {
    const { infoPopup } = this.state;

    if (!infoPopup) return null;

    return <InfoPopup key={infoPopup.position.lat} {...infoPopup} />;
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
      getHistory,
      size = 'large'
    } = this.props;
    return (
      <div
        className={
          this.state.fullscreen ? 'map map_fullscreen' : `map map_${size}`
        }
      >
        <div className="map__map">
          <Map center={[lat, lng]} zoom={zoom} ref={this.ref} maxZoom={19}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {this.renderLines()}
            {this.renderLineTest()}
            {this.renderMarkers()}
            {this.renderPopup()}
            {this.renderInfoPopup()}
          </Map>
          {this.state.pathModal && (
            <PathModal
              onClose={() => this.setState({ pathModal: null })}
              closestIndex={this.state.pathModal.closestIndex}
              measurement={this.props.measurements.find(
                ({ taskId }) => taskId === this.state.pathModal.taskId
              )}
            />
          )}
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

export default connect(
  mapState,
  mapDispatch
)(MapComponent);
