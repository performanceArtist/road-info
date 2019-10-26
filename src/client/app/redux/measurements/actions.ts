import { MeasurementData } from '@shared/types';
import { a, actionTree } from '@shared/utils';

export const MEASUREMENTS = actionTree('MEASUREMENTS')({
  ADD: a.plain,
  GENERATE: a.api
});

export const addMeasurement = (payload: {
  taskId: string;
  instanceId: string;
  data: MeasurementData;
}) => ({
  type: MEASUREMENTS.ADD,
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
