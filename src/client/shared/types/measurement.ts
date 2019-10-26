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
