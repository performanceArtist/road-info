export const MAP = {
  SET_MODE: 'MAP.SET_MODE',
  SET_START_DATE: 'MAP.SET_START_DATE',
  SET_END_DATE: 'MAP.SET_END_DATE',
  GET_HISTORY: {
    REQUEST: 'MAP.GET_HISTORY.REQUEST',
    SUCCESS: 'MAP.GET_HISTORY.SUCCESS',
    FAILURE: 'MAP.GET_HISTORY.FAILURE'
  },
  GET_TRACK: {
    REQUEST: 'MAP.GET_TRACK.REQUEST',
    SUCCESS: 'MAP.GET_TRACK.SUCCESS',
    FAILURE: 'MAP.GET_TRACK.FAILURE'
  }
};

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
