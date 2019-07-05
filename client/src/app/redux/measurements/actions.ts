import { TaskFormType } from '@views/Measurements/TaskModal/TaskModal';

export const MEASUREMENT = {
  TASK: {
    SAVE: 'MEASUREMENT.TASK.SAVE',
    REMOVE: 'MEASUREMENT.TASK.REMOVE',
    SET_CURRENT: 'MEASUREMENT.TASK.SET_CURRENT'
  },

  CHART: {
    CHANGE_SETTINGS: 'CHART.CHANGE_SETTINGS'
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
  index: number | null = null
) => {
  return { type: MEASUREMENT.TASK.SAVE, payload: { formData, index } };
};

export const removeTask = (index: number) => {
  return { type: MEASUREMENT.TASK.REMOVE, payload: { index } };
};
