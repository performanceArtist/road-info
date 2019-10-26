import { DatabaseCondorInfoType } from './db';
import { GPSCoordinates } from './gps';

export type CondorValue = {
  key: DatabaseCondorInfoType;
  value: GPSCoordinates | number;
};

export type ServerCondor = {
  id: number;
  coordinates: GPSCoordinates;
  speed: number;
};
