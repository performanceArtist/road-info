import L from 'leaflet';

import { ChartDataItem } from '@redux/measurements/types';

export const testData = [
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

function pointDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
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

export function haversine(
  list: Array<ChartDataItem>,
  point: { latitude: number; longitude: number }
) {
  const res = list.map(p =>
    pointDistance(point.latitude, point.longitude, p.latitude, p.longitude)
  );

  const index = res.indexOf(Math.min(...res));
  return index;
}
