import { MEASUREMENTS } from './actions';
import { Measurements, MeasurementItem } from './types';

import testData from './testData';

const initialData: MeasurementItem = {
  taskId: '1',
  data: testData
};

const initialState: Measurements = [];

export default function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case MEASUREMENTS.ADD: {
      const newState = JSON.parse(JSON.stringify(state));
      const currentTask = newState.find(
        ({ taskId }) => taskId === payload.taskId
      );

      if (!currentTask) {
        return newState.concat({
          taskId: payload.taskId,
          data: { [payload.instanceId]: [payload.data] }
        });
      }

      if (!currentTask.data[payload.instanceId]) {
        currentTask.data[payload.instanceId] = [];
      } else {
        currentTask.data[payload.instanceId].push(payload.data);
      }

      return newState;
    }
    default:
      return state;
  }
}
