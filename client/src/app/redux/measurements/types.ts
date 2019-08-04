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

export interface MeasurementItem {
  taskId: string;
  data: Array<MeasurementData>;
}

export type Measurements = Array<MeasurementItem>;
