import { apiAction } from '@shared/utils';

export const HISTORY = {
  SET_CONDOR: 'HISTORY.SET_CONDOR',
  SET_START_DATE: 'HISTORY.SET_START_DATE',
  SET_END_DATE: 'HISTORY.SET_END_DATE',
  GET_ORDERS: apiAction('HISTORY', 'GET_ORDERS'),
  GET_MEASUREMENTS: apiAction('HISTORY', 'GET_MEASUREMENTS')
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

export const setCondor = (id: string | number) => ({
  type: HISTORY.SET_CONDOR,
  payload: id
});
