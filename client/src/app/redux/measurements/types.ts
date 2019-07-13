export interface ChartData {
  distance: number;
  thickness: number;
  density: number;
  iri: number;
  rutting: number;
}

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

export interface TaskType {
  id: string;
  fetching: boolean;
  error: Error | null;
  formData: Object;
  chartData: Array<ChartData>;
}
