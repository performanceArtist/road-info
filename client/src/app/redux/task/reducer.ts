import uuid from 'short-uuid';

import { TASK } from './actions';

type Task = {
  id: string;
  formData: { [key: string]: any };
};

const initialState: {
  tasks: Array<Task>;
} = {
  tasks: []
};

export default function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case TASK.SAVE: {
      const tasks = [...state.tasks];
      const { formData, taskId } = payload;
      const task = tasks.find(({ id }) => id === taskId);

      if (task) {
        task.formData = formData;
        return {
          ...state,
          tasks
        };
      } else {
        return {
          ...state,
          tasks: tasks.concat({
            id: uuid.generate(),
            formData
          })
        };
      }
    }
    case TASK.REMOVE:
      return {
        ...state,
        tasks: state.tasks.filter(({ id }) => id !== payload.taskId)
      };
    default:
      return state;
  }
}
