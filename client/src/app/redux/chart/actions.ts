import { ChartLines } from './types';

export const CHART = {
  CHANGE_VISIBILITY: 'CHART.CHANGE_VISIBILITY',
  SAVE_SETTINGS: 'CHART.SAVE_SETTINGS'
};

export const changeVisibility = (line: string, show: boolean) => ({
  type: CHART.CHANGE_VISIBILITY,
  payload: { line, show }
});

export const saveChartSettings = (settings: {
  lines: ChartLines;
  maxTicks: number;
}) => ({
  type: CHART.SAVE_SETTINGS,
  payload: settings
});
