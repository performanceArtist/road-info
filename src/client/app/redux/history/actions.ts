export const HISTORY = {
  SET_KONDOR: 'HISTORY.SET_KONDOR',
  SET_START_DATE: 'HISTORY.SET_START_DATE',
  SET_END_DATE: 'HISTORY.SET_END_DATE',
  GET_ORDERS: {
    REQUEST: 'HISTORY.GET_ORDERS.REQUEST',
    SUCCESS: 'HISTORY.GET_ORDERS.SUCCESS',
    FAILURE: 'HISTORY.GET_ORDERS.FAILURE'
  },
  GET_MEASUREMENTS: {
    REQUEST: 'HISTORY.GET_MEASUREMENTS.REQUEST',
    SUCCESS: 'HISTORY.GET_MEASUREMENTS.SUCCESS',
    FAILURE: 'HISTORY.GET_MEASUREMENTS.FAILURE'
  }
};

export const getOrders = (formData: { [key: string]: string | number }) => ({
  type: HISTORY.GET_ORDERS.REQUEST,
  payload: formData
});

export const getMeasurements = (taskId: string) => ({
  type: HISTORY.GET_MEASUREMENTS.REQUEST,
  payload: { taskId }
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
