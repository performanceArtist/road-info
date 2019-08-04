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
      const data = [...state];
      const current = data.find(({ taskId }) => taskId === payload.id);

      if (current) {
        current.data = current.data.concat(payload.measurement);
        return { ...state, data };
      } else {
        return state.concat({
          taskId: payload.id,
          data: [payload.measurement]
        });
      }
    }
    default:
      return state;
  }
}
