import { Measurements } from '@root/client/app/redux/data/types';

export type MapHistory = {
  fetching: boolean;
  startDate: Date;
  endDate: Date;
};

export type MapData = {
  mode: 'history' | 'realTime';
  history: MapHistory;
  historyMeasurements: Measurements;
  testTrack: Array<{ latitude: number; longitude: number }>;
};
