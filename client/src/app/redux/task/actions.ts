import { TaskFormType } from '@components/TaskModal/TaskModal';

export const TASK = {
  SAVE: 'TASK.SAVE',
  REMOVE: 'TASK.REMOVE',
  SET_CURRENT: 'TASK.SET_CURRENT',
  POST: {
    REQUEST: 'TASK.POST.REQUEST',
    SUCCESS: 'TASK.POST.SUCCESS',
    FAILURE: 'TASK.POST.FAILURE'
  }
};

export const saveTask = (formData: TaskFormType, id: string | null = null) => {
  return { type: TASK.SAVE, payload: { formData, taskId: id } };
};

export const setCurrentTask = (id: string | null = null) => ({
  type: TASK.SET_CURRENT,
  payload: { taskId: id }
});

export const removeTask = (id: string | null = null) => {
  return { type: TASK.REMOVE, payload: { taskId: id } };
};

export const postTask = (formData: TaskFormType, id: string | null = null) => ({
  type: TASK.POST.REQUEST,
  payload: { formData, taskId: id }
});
