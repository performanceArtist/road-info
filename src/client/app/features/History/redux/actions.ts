import { a, actionTree } from '@shared/utils';

export const HISTORY = actionTree('HISTORY')({
  SET_CONDOR: a.plain,
  SET_START_DATE: a.plain,
  SET_END_DATE: a.plain,
  GET_ORDERS: a.api,
  GET_MEASUREMENTS: a.api
});

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
