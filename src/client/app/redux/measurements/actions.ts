import { MeasurementData } from '@shared/types';
import { a, actionTree } from '@shared/utils';

export const MEASUREMENTS = actionTree('MEASUREMENTS')({
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
  type: MEASUREMENTS.ADD_MEASUREMENT,
  payload
});

export const generateMeasurements = (payload: {
  id: number;
  lane: number;
  condorId: number;
  isForward: boolean;
}) => ({
  type: MEASUREMENTS.GENERATE.REQUEST,
  payload
});

export const getJob = (id: number) => ({
  type: MEASUREMENTS.GET_JOB.REQUEST,
  payload: { id }
});

export const getTask = (id: number) => ({
  type: MEASUREMENTS.GET_TASK.REQUEST,
  payload: { id }
});
