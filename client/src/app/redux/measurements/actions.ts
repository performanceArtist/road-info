import { TaskFormType } from '@views/Measurements/TaskModal/TaskModal';

export const MEASUREMENT = {
  TASK: {
    SAVE: 'MEASUREMENT.TASK.SAVE',
    REMOVE: 'MEASUREMENT.TASK.REMOVE',
    SET_CURRENT: 'MEASUREMENT.TASK.SET_CURRENT'
  },

  CHART: {
    SET_BREAKPOINT: 'CHART.SET_BREAKPOINT',
    CHANGE_VISIBILITY: 'CHART.CHANGE_VISIBILITY',
    SET_MAX: 'CHART.SET_MAX'
  },

  SERVER: {
    ADD_MEASUREMENT: 'ADD_MEASUREMENT',
    START_CHANNEL: 'START_CHANNEL',
    STOP_CHANNEL: 'STOP_CHANNEL',
    CHANNEL_ON: 'CHANNEL_ON',
    CHANNEL_OFF: 'CHANNEL_OFF',
    SERVER_ON: 'SERVER_ON',
    SERVER_OFF: 'SERVER_OFF'
  },

  POST: {
    REQUEST: 'MEASUREMENT.POST.REQUEST',
    SUCCESS: 'MEASUREMENT.POST.SUCCESS',
    FAILURE: 'MEASUREMENT.POST.FAILURE'
  }
};

export const saveSettings = (
  formData: TaskFormType,
  id: string | null = null
) => {
  return { type: MEASUREMENT.TASK.SAVE, payload: { formData, taskId: id } };
};

export const postData = (formData: TaskFormType, id: string | null = null) => ({
  type: MEASUREMENT.POST.REQUEST,
  payload: { formData, taskId: id }
});

export const setCurrentTask = (id: string | null = null) => ({
  type: MEASUREMENT.TASK.SET_CURRENT,
  payload: { taskId: id }
});

export const removeTask = (id: string | null = null) => {
  return { type: MEASUREMENT.TASK.REMOVE, payload: { taskId: id } };
};

export const setBreakpoint = (
  name: string,
  breakpoint: { start: number; finish: number }
) => {
  return {
    type: MEASUREMENT.CHART.SET_BREAKPOINT,
    payload: { name, breakpoint }
  };
};

export const setMax = (max: number) => ({
  type: MEASUREMENT.CHART.SET_MAX,
  payload: max
});
