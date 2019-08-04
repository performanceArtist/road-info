import { TASK } from './actions';
import { Task } from './types';

const initialTask = {
  id: 1,
  start: 0,
  finish: 2000,
  lane: 1,
  lanesCount: 4,
  description: '',
  kondor: '0',
  partName: 'от ул. Нахимова до ул. Учебной',
  roadName: 'пр. Ленина',
  city: 'г. Томск',
  region: 'Томская область'
};

const initialState: Array<Task> = [initialTask];

export default function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case TASK.ADD:
      return state.concat(payload);
    case TASK.REMOVE:
      return state.filter(({ id }) => id !== payload.id);
    default:
      return state;
  }
}
