export const HISTORY = {
  SET_KONDOR: 'HISTORY.SET_KONDOR',
  SET_START_DATE: 'HISTORY.SET_START_DATE',
  SET_END_DATE: 'HISTORY.SET_END_DATE',
  GET: {
    REQUEST: 'HISTORY.GET.REQUEST',
    SUCCESS: 'HISTORY.GET.SUCCESS',
    FAILURE: 'HISTORY.GET.FAILURE'
  },
  GET_MEASUREMENTS: {
    REQUEST: 'HISTORY.GET_MEASUREMENTS.REQUEST',
    SUCCESS: 'HISTORY.GET_MEASUREMENTS.SUCCESS',
    FAILURE: 'HISTORY.GET_MEASUREMENTS.FAILURE'
  }
};

export const getHistory = (formData: { [key: string]: string | number }) => ({
  type: HISTORY.GET.REQUEST,
  payload: formData
});

export const getMeasurements = (taskId: string, instanceId: string) => ({
  type: HISTORY.GET_MEASUREMENTS.REQUEST,
  payload: { taskId, instanceId }
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
