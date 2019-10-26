import { a, actionTree } from '@shared/utils';

export const MAP = actionTree('MAP')({
  SET_MODE: a.plain,
  SET_START_DATE: a.plain,
  SET_END_DATE: a.plain,
  GET_HISTORY: a.api,
  GET_TRACK: a.api
});

export const setMode = (mode: 'history' | 'realTime') => ({
  type: MAP.SET_MODE,
  payload: mode
});

export const setStartDate = (date: Date) => ({
  type: MAP.SET_START_DATE,
  payload: date
});

export const setEndDate = (date: Date) => ({
  type: MAP.SET_END_DATE,
  payload: date
});

export const getHistory = (formData: { [key: string]: string | number }) => ({
  type: MAP.GET_HISTORY.REQUEST,
  payload: formData
});

export const getTrack = () => ({ type: MAP.GET_TRACK.REQUEST });
