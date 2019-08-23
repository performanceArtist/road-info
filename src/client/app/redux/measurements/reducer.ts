import * as R from 'ramda';

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
      const index = R.findIndex(R.propEq('taskId', payload.taskId), state);

      if (index === -1) {
        return R.append(
          {
            taskId: payload.taskId,
            data: { [payload.instanceId]: [payload.data] }
          },
          state
        );
      }

      return R.adjust(
        index,
        R.evolve({ data: { [payload.instanceId]: R.append(payload.data) } }),
        state
      );
    }
    default:
      return state;
  }
}
