import { TaskFormType } from '@views/Measurements/TaskModal/TaskModal';

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

export const CHART = {
  CHANGE_VISIBILITY: 'CHART.CHANGE_VISIBILITY',
  SAVE_SETTINGS: 'CHART.SAVE_SETTINGS'
};

export const SERVER = {
  ADD_MEASUREMENT: 'SERVER.ADD_MEASUREMENT',
  START_CHANNEL: 'SERVER.START_CHANNEL',
  STOP_CHANNEL: 'SERVER.STOP_CHANNEL',
  CHANNEL_ON: 'SERVER.CHANNEL_ON',
  CHANNEL_OFF: 'SERVER.CHANNEL_OFF',
  SERVER_ON: 'SERVER.SERVER_ON',
  SERVER_OFF: 'SERVER.SERVER_OFF'
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

export const changeVisibility = (line: string, show: boolean) => ({
  type: CHART.CHANGE_VISIBILITY,
  payload: { line, show }
});

export const saveChartSettings = settings => ({
  type: CHART.SAVE_SETTINGS,
  payload: settings
});
