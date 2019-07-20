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
}

export type ChartData = Array<ChartDataItem>;

export interface TaskDataItem {
  id: string;
  fetching: boolean;
  error: Error | null;
  formData: Object;
  chartData: ChartData;
}

export type TaskData = Array<TaskDataItem>;
