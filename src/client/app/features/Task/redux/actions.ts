import { TaskFormType, ApiRequest } from '@shared/types';
import { a, actionTree } from '@shared/utils';

export const TASK = actionTree('TASK')({
  SAVE: a.plain,
  REMOVE: a.plain,
  SET_CURRENT: a.plain,
  ADD: a.plain,
  UPDATE: a.plain,
  POST: a.api
});

export const addTask = (payload: any) => ({
  type: TASK.ADD,
  payload
});

export const updateTask = (payload: {
  status: 'ready' | 'taken' | 'done';
  condor: null | string;
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

export const saveTask = (formData: TaskFormType): ApiRequest => ({
  type: TASK.POST.REQUEST,
  payload: formData
});

export const postTask = (
  formData: TaskFormType,
  id: string | null = null
): ApiRequest => ({
  type: TASK.POST.REQUEST,
  payload: { formData, taskId: id }
});
