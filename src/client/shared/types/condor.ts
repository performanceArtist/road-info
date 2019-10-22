import { DatabaseCondorInfoType } from './db';
import { GPSCoordinates } from './gps';

export type CondorInfo = {
  coordinates: GPSCoordinates;
  speed: number;
};

export type CondorValue = {
  key: DatabaseCondorInfoType;
  value: GPSCoordinates | number;
};
