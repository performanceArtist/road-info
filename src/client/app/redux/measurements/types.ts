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
}

export type Measurements = Array<MeasurementItem>;
