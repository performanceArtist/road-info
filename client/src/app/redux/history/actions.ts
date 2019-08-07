export const HISTORY = {
  SET_KONDOR: 'HISTORY.SET_KONDOR',
  SET_START_DATE: 'HISTORY.SET_START_DATE',
  SET_END_DATE: 'HISTORY.SET_END_DATE',
  GET: {
    REQUEST: 'HISTORY.GET.REQUEST',
    SUCCESS: 'HISTORY.GET.SUCCESS',
    FAILURE: 'HISTORY.GET.FAILURE'
  }
};

export const getHistory = () => ({
  type: HISTORY.GET.REQUEST
});

export const setStartDate = (date: Date) => ({
  type: HISTORY.SET_START_DATE,
  payload: date
});

export const setEndDate = (date: Date) => ({
  type: HISTORY.SET_END_DATE,
  payload: date
});

export const setKondor = (id: string | number) => ({
  type: HISTORY.SET_KONDOR,
  payload: id
});
