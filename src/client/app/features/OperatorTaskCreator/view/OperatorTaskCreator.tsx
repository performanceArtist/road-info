import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as L from 'leaflet';

import TaskMap from './TaskMapEntry';
import { RootState } from '@redux/reducer';
import { TaskFormData, GPSTrack, GPSCoordinates } from '@shared/types';

import TaskForm from './TaskForm';
import LocationSearch from './LocationSearch';
import {
  getLocation,
  createTask,
  getRoute,
  addRoutePoint,
  removeLastRoutePoint
} from '../redux/actions';

const mapDispatch = {
  getLocation,
  createTask,
  getRoute,
  addRoutePoint,
  removeLastRoutePoint
};

const mapState = ({ newTask }: RootState) => ({
  newTask
});

interface IStateProps {
  newTask: {
    location: GPSCoordinates;
    routePoints: GPSTrack;
    track: GPSTrack;
  };
}

type IProps = typeof mapDispatch & IStateProps;

const OperatorTaskCreator: React.FC<IProps> = ({
  newTask,
  getLocation,
  getRoute,
  createTask,
  addRoutePoint,
  removeLastRoutePoint
}) => {
  type ActiveField = 'from' | 'to';
  const [active, setActive] = useState<ActiveField>('from');
  const { routePoints, location, track } = newTask;
  const from = routePoints[0];
  const to =
    routePoints.length > 1 ? routePoints[routePoints.length - 1] : undefined;

  const onMapClick = ({ lat, lng }: L.LatLng) => {
    addRoutePoint([lat, lng]);
    if (active === 'from') {
      setActive('to');
    }
  };

  useEffect(() => {
    if (from && to) {
      getRoute(routePoints);
    }
  }, [routePoints]);

  const handleSearchSubmit = (search: string) => {
    getLocation(search);
  };

  const handleFormSubmit = (formData: TaskFormData) => {
    createTask({ ...formData, routePoints });
  };

  const handleUndo = () => {
    removeLastRoutePoint();
  };

  const coordToString = (c: GPSCoordinates) => {
    return `[${c[0].toFixed(12)}, ${c[1].toFixed(12)}]`;
  };

  return (
    <div className="operator-task-creator">
      <div className="operator-task-creator__row">
        <div className="operator-task-creator__map">
          <div className="operator-task-creator__location-search">
            <LocationSearch onSubmit={handleSearchSubmit} />
          </div>
          <TaskMap onMapClick={onMapClick} location={location} track={track} />
        </div>
        <div className="operator-task-creator__form">
          <TaskForm
            onSubmit={handleFormSubmit}
            activeField={active}
            onActiveFieldClick={(what: ActiveField) => {
              setActive(what);
            }}
            onUndoButtonClick={handleUndo}
            fromValue={from ? coordToString(from) : ''}
            toValue={to ? coordToString(to) : ''}
          />
        </div>
      </div>
    </div>
  );
};

export default connect(
  mapState,
  mapDispatch
)(OperatorTaskCreator);
