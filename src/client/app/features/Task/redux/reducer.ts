import * as R from 'ramda';

import { TASK } from './actions';
import { Task } from '@shared/types';

const initialTask = {
  id: 23,
  order: '12399',
  status: 'done',
  start: 0,
  finish: 2000,
  forward: true,
  backward: false,
  lanesCount: 3,
  description: 'test',
  kondor: 3,
  roadPartName: 'Тест',
  street: 'пр-кт Фрунзе',
  streetId: 'ba3c2344-f2c5-41e5-8a15-52b4ad9d95bd',
  settlement: '',
  settlementId: '',
  city: 'г Томск',
  cityId: 'e3b0eae8-a4ce-4779-ae04-5c0797de66be',
  region: 'Томская обл',
  regionId: '889b1f3a-98aa-40fc-9d3d-0f41192758ab',
  lane: 2,
  isForward: true
};

const initialState: { tasks: Array<Task>; instances: any } = {
  tasks: [initialTask],
  instances: { '23': [] }
};

export default function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case TASK.ADD:
      return R.evolve(
        {
          tasks: R.append(payload),
          instances: R.assoc(payload.id, [])
        },
        state
      );
    case TASK.UPDATE: {
      const updates = R.pick(
        ['status', 'kondor', 'lane', 'isForward'],
        payload
      );
      const tasks = R.map(
        R.when(R.propEq('id', payload.id), R.merge(R.__, updates)),
        state.tasks
      );

      return {
        tasks,
        instances: R.evolve(
          {
            [payload.id]: R.append({ date: new Date(), ...payload })
          },
          state.instances
        )
      };
    }
    case TASK.REMOVE: {
      const filter = R.reject(R.propEq('id', payload.id));
      return R.evolve({ tasks: filter }, state);
    }
    default:
      return state;
  }
}
