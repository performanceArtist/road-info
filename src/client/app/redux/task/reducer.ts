import { TASK } from './actions';
import { Task } from './types';

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
  settlement: null,
  settlementId: null,
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
      return {
        tasks: state.tasks.concat(payload),
        instances: { [payload.id]: [], ...state.instances }
      };
    case TASK.UPDATE: {
      const newTasks = JSON.parse(JSON.stringify(state.tasks));
      const task = newTasks.find(({ id }) => id == payload.id);
      task.status = payload.status;
      task.kondor = payload.kondor;

      if (payload.status !== 'ready') {
        task.lane = payload.lane;
        task.isForward = payload.isForward;
      }

      return {
        ...state,
        tasks: newTasks,
        instances: {
          ...state.instances,
          [payload.id]: state.instances[payload.id].concat({
            date: new Date(),
            ...payload
          })
        }
      };
    }
    case TASK.REMOVE:
      return {
        ...state,
        tasks: state.tasks.filter(({ id }) => id !== payload.id)
      };
    default:
      return state;
  }
}
