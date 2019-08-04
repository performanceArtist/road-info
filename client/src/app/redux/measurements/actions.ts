import { DataItem } from './types';

export const MEASUREMENTS = {
  ADD: 'MEASUREMENTS.ADD'
};

export const addMeasurement = (taskId: string, data: DataItem) => ({
  type: MEASUREMENTS.ADD,
  payload: {
    taskId,
    data
  }
});
