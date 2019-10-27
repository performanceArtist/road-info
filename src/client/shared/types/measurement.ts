import { GPSCoordinates } from './gps';

export interface MeasurementData {
  distance: number;
  longitude: number;
  latitude: number;
  thickness: number;
  density: number;
  iri: number;
  rutting: number;
  [key: string]: number;
}

export type MeasurementInstances = {
  [key: string]: Array<MeasurementData>;
};

export interface MeasurementItem {
  taskId: string;
  data: MeasurementInstances;
  [key: string]: string | MeasurementInstances;
}

export type PointData = {
  key: string;
  value: number;
  name: string;
  difference: number;
};

export type ServerMeasurement = {
  id: number;
  coordinates: GPSCoordinates;
  distance: number;
  track: number[];
  time?: Date;
  density: number;
  thickness: number;
  iri: number;
  coleinost: number;
  order_job_id: number;
};

export type Measurements = {
  [jobId: number]: ServerMeasurement[];
};
