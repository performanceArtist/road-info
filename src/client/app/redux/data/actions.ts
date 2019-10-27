import { MeasurementData } from '@shared/types';
import { a, actionTree } from '@shared/utils';

export const DATA = actionTree('DATA')({
  ADD_MEASUREMENT: a.plain,
  GET_JOB: a.api,
  GET_TASK: a.api,
  GENERATE: a.api
});

export const addMeasurement = (payload: {
  taskId: string;
  instanceId: string;
  data: MeasurementData;
}) => ({
  type: DATA.ADD_MEASUREMENT,
  payload
});

export const generateMeasurements = (payload: {
  id: number;
  lane: number;
  condorId: number;
  isForward: boolean;
}) => ({
  type: DATA.GENERATE.REQUEST,
  payload
});

export const getJob = (id: number) => ({
  type: DATA.GET_JOB.REQUEST,
  payload: { id }
});

export const getTask = (id: number) => ({
  type: DATA.GET_TASK.REQUEST,
  payload: { id }
});
