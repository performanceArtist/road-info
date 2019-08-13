import { DataItem } from './types';

export const MEASUREMENTS = {
  ADD: 'MEASUREMENTS.ADD',
  GENERATE: {
    REQUEST: 'MEASUREMENTS.GENERATE.REQUEST',
    SUCCESS: 'MEASUREMENTS.GENERATE.SUCCESS',
    FAILURE: 'MEASUREMENTS.GENERATE.FAILURE'
  }
};

export const addMeasurement = (taskId: string, data: DataItem) => ({
  type: MEASUREMENTS.ADD,
  payload: {
    taskId,
    data
  }
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
