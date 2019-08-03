export interface ChartDataItem {
  distance: number;
  longitude: number;
  latitude: number;
  thickness: number;
  density: number;
  iri: number;
  rutting: number;
  [key: string]: number;
}

export type ChartData = Array<ChartDataItem>;

export interface KondorDataItem {
  id: string;
  info: { [key: string]: string | number };
  measurements: ChartData;
}

export type KondorData = Array<KondorDataItem>;
