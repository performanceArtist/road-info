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
      const addTask = R.append({
        taskId: payload.taskId,
        data: { [payload.instanceId]: [payload.data] }
      });

      const addInstance = R.assocPath(
        ['data', payload.instanceId],
        [payload.data]
      );
      const updateInstance = R.evolve({
        data: {
          [payload.instanceId]: R.append(payload.data)
        }
      });

      const noInstance = R.pipe(
        (index: number) => R.nth(index, state),
        R.path(['data', payload.instanceId]),
        R.isNil
      );

      const transformInstance = R.ifElse(
        noInstance,
        index => R.adjust(index, addInstance, state),
        index => R.adjust(index, updateInstance, state)
      );

      const transform = R.pipe(
        R.findIndex(R.propEq('taskId', payload.taskId)),
        R.ifElse(R.equals(-1), addTask, transformInstance)
      );

      return transform(state);
    }
    default:
      return state;
  }
}
