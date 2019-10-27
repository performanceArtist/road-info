export type ColorBreakpoint = { start: number; finish: number };

export interface ChartLineInfo {
  name?: string;
  units?: string;
  breakpoint?: ColorBreakpoint;
  mainColor?: string;
  warningColor?: string;
  show?: boolean;
}

export type ChartLines = { [key: string]: ChartLineInfo };

export type ChartInfo = {
  lines: ChartLines;
  xAxis: { key: string; name: string; units: string };
  maxTicks: number;
};
