import { TaskFormType } from '@views/Measurements/TaskModal/TaskModal';

export const MEASUREMENT = {
  POST: {
    REQUEST: 'MEASUREMENT.POST.REQUEST',
    SUCCESS: 'MEASUREMENT.POST.SUCCESS',
    FAILURE: 'MEASUREMENT.POST.FAILURE'
  },

  TASK: {
    SAVE: 'MEASUREMENT.TASK.SAVE',
    REMOVE: 'MEASUREMENT.TASK.REMOVE',
    SET_CURRENT: 'MEASUREMENT.TASK.SET_CURRENT'
  },

  CHART: {
    CHANGE_SETTINGS: 'CHART.CHANGE_SETTINGS'
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
