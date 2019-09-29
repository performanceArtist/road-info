import { TaskFormType } from '@features/Task/TaskModal';

export const TASK = {
  SAVE: 'TASK.SAVE',
  REMOVE: 'TASK.REMOVE',
  SET_CURRENT: 'TASK.SET_CURRENT',
  ADD: 'TASK.ADD',
  UPDATE: 'TASK.UPDATE',
  POST: {
    REQUEST: 'TASK.POST.REQUEST',
    SUCCESS: 'TASK.POST.SUCCESS',
    FAILURE: 'TASK.POST.FAILURE'
  }
};

export const saveTask = (formData: TaskFormType) => ({
  type: TASK.POST.REQUEST,
  payload: formData
});

export const addTask = (payload: any) => ({
  type: TASK.ADD,
  payload
});

export const updateTask = (payload: {
  status: 'ready' | 'taken' | 'done';
  kondor: null | string;
  id: string;
}) => ({
  type: TASK.UPDATE,
  payload
});

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
