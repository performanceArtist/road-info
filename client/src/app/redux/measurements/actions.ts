import { ChartLineInfo } from './types';

export const CHART = {
  CHANGE_VISIBILITY: 'CHART.CHANGE_VISIBILITY',
  SAVE_SETTINGS: 'CHART.SAVE_SETTINGS'
};

export const SERVER = {
  ADD_MEASUREMENT: 'SERVER.ADD_MEASUREMENT',
  START_CHANNEL: 'SERVER.START_CHANNEL',
  STOP_CHANNEL: 'SERVER.STOP_CHANNEL',
  CHANNEL_ON: 'SERVER.CHANNEL_ON',
  CHANNEL_OFF: 'SERVER.CHANNEL_OFF',
  SERVER_ON: 'SERVER.SERVER_ON',
  SERVER_OFF: 'SERVER.SERVER_OFF'
};

export const GET = {
  KONDOR: {
    REQUEST: 'GET.KONDOR.REQUEST',
    SUCCESS: 'GET.KONDOR.SUCCESS',
    FAILURE: 'GET.KONDOR.FAILURE'
  }
};

export const createCondor = (id: number) => ({
  type: GET.KONDOR.REQUEST,
  payload: id
});

export const changeVisibility = (line: string, show: boolean) => ({
  type: CHART.CHANGE_VISIBILITY,
  payload: { line, show }
});

export const saveChartSettings = (settings: {
  lines: Array<ChartLineInfo>;
  maxTicks: number;
}) => ({
  type: CHART.SAVE_SETTINGS,
  payload: settings
});
