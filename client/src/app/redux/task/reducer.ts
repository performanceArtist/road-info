import { TASK } from './actions';
import { Task } from './types';

const initialTask = {
  id: 22,
  order: '1178',
  status: 'ready',
  start: 300,
  finish: 2200,
  forward: true,
  backward: true,
  lanesCount: 4,
  description: 'Description',
  kondor: null,
  roadPartName: 'Test1',
  street: 'ул Еланская',
  streetId: '7ef1e3da-f9cf-4b9a-9728-ca0fa06eba2a',
  settlement: 'поселок Апрель',
  settlementId: 'fbc209af-f3e8-46be-94cd-450761404e44',
  city: 'г Томск',
  cityId: 'e3b0eae8-a4ce-4779-ae04-5c0797de66be',
  region: 'Томская обл',
  regionId: '889b1f3a-98aa-40fc-9d3d-0f41192758ab'
};

const initialState: Array<Task> = [initialTask];

export default function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case TASK.ADD:
      return state.concat(payload);
    case TASK.UPDATE: {
      const newState = JSON.parse(JSON.stringify(state));
      const task = newState.find(({ id }) => id == payload.id);
      task.status = payload.status;
      task.kondor = payload.kondor;

      if (payload.status !== 'ready') {
        task.lane = payload.lane;
        task.ifForward = payload.isForward;
      }

      return newState;
    }
    case TASK.REMOVE:
      return state.filter(({ id }) => id !== payload.id);
    default:
      return state;
  }
}
