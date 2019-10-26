import { ChartLines } from '@shared/types';
import { a, actionTree } from '@shared/utils';

export const CHART = actionTree('CHART')({
  CHANGE_VISIBILITY: a.plain,
  SAVE_SETTINGS: a.plain
});

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
