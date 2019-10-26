import {
  TaskFormData,
  GPSTrack,
  GPSCoordinates,
  ApiRequest
} from '@shared/types';
import { a, actionTree } from '@shared/utils';

export const NEWTASK = actionTree('NEWTASK')({
  ADD_ROUTE_POINT: a.plain,
  REMOVE_LAST_ROUTE_POINT: a.plain,
  POST: a.api,
  LOCATION_SEARCH: a.api,
  GET_ROUTE: a.api
});

export const addRoutePoint = (payload: GPSCoordinates) => ({
  type: NEWTASK.ADD_ROUTE_POINT,
  payload
});

export const removeLastRoutePoint = () => ({
  type: NEWTASK.REMOVE_LAST_ROUTE_POINT
});

export const createTask = (formData: TaskFormData): ApiRequest => ({
  type: NEWTASK.POST.REQUEST,
  payload: formData
});

export const getLocation = (search: string): ApiRequest => ({
  type: NEWTASK.LOCATION_SEARCH.REQUEST,
  payload: { search }
});

export const getRoute = (points: GPSTrack): ApiRequest => ({
  type: NEWTASK.GET_ROUTE.REQUEST,
  payload: { points }
});
