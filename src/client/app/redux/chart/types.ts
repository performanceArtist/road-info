export type ColorBreakpoint = { start: number; finish: number };

export interface ChartLineInfo {
  name?: string;
  units?: string;
  breakpoint?: ColorBreakpoint;
  mainColor?: string;
  warningColor?: string;
  show?: boolean;
  [key: string]: string | boolean | ColorBreakpoint;
}

export type ChartLines = { [key: string]: ChartLineInfo };

export interface ChartInfo {
  lines: ChartLines;
  xAxis: { key: string; name: string; units: string };
  maxTicks: number;
}
