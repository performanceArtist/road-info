const polyline = require('@mapbox/polyline');
import axios from 'axios';

import { GPSTrack, GPSCoordinates } from '@root/client/shared/types';

export const getRoute = async (points: GPSTrack) => {
  if (!points || points.length < 2) {
    throw new Error('Invalid coordinates');
  }

  const locs = points.map(([lat, lon]) => `loc=${lat},${lon}`).join('&');
  const response = await axios.get(
    `http://routes.maps.sputnik.ru/osrm/router/viaroute?${locs}&instructions=true`
  );

  return polyline
    .decode(response.data.route_geometry)
    .map(([lat, lon]: GPSCoordinates) => [lat / 10, lon / 10]);
};

export const findLocation = async (search: string) => {
  const response = await axios.get('http://search.maps.sputnik.ru/search', {
    params: {
      q: search
    }
  });
  const location = response.data.result[0].position;

  return [location.lat, location.lon];
};
