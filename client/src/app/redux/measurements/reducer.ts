import { MEASUREMENTS } from './actions';
import { Measurements, MeasurementItem } from './types';

import testData from './testData';

const initialData: MeasurementItem = {
  taskId: '1',
  data: testData
};

const initialState: Measurements = [initialData];

export default function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case MEASUREMENTS.ADD: {
      const newState = [...state];
      const current = newState.find(({ taskId }) => taskId === payload.taskId);
      if (current) {
        current.data = current.data.concat(payload.data);
        return newState;
      } else {
        return state.concat({
          taskId: payload.taskId,
          data: [payload.data]
        });
      }
    }
    default:
      return state;
  }
}
