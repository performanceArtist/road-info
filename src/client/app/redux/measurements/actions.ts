import { MeasurementData } from '@shared/types';

export const MEASUREMENTS = {
  ADD: 'MEASUREMENTS.ADD',
  GENERATE: {
    REQUEST: 'MEASUREMENTS.GENERATE.REQUEST',
    SUCCESS: 'MEASUREMENTS.GENERATE.SUCCESS',
    FAILURE: 'MEASUREMENTS.GENERATE.FAILURE'
  }
};

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
  kondorId: number;
  isForward: boolean;
}) => ({
  type: MEASUREMENTS.GENERATE.REQUEST,
  payload
});
