export interface ChartData {
  distance: number;
  thickness: number;
  density: number;
  iri: number;
  rutting: number;
}

export type ColorBreakpoint = { start: number; finish: number };

export interface ChartInfo {
  name: string;
  units?: string;
  breakpoint?: ColorBreakpoint;
  mainColor?: string;
  warningColor?: string;
}

export interface InfoType {
  mainColor: string;
  units: string;
  show: boolean;
}

export interface TaskType {
  id: string;
  fetching: boolean;
  error: Error | null;
  formData: Object;
  chartData: Array<ChartData>;
}
