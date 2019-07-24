export type ColorBreakpoint = { start: number; finish: number };

export interface ChartLineInfo {
  units?: string;
  breakpoint?: ColorBreakpoint;
  mainColor?: string;
  warningColor?: string;
  show: boolean;
}

export type ChartLines = { [key: string]: ChartLineInfo };

export interface ChartInfo {
  lines: ChartLines;
  xAxis: { units: string };
  maxTicks: number;
}

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
  measurements: ChartData;
}

export type KondorData = Array<KondorDataItem>;
