import uuid from 'short-uuid';

import { MEASUREMENT } from './actions';

import {
  DensityChartInfo,
  DensityChartData
} from '@views/Measurements/DensityChart/DensityChart';

const fakeData = [
  { distance: 100, thickness: 1, density: 1.5, iri: 2.1, rutting: 210 },
  { distance: 200, thickness: 2, density: 1.3, iri: 1.7, rutting: 170 },
  { distance: 300, thickness: 0.8, density: 0.8, iri: 3.2, rutting: 300 },
  { distance: 400, thickness: 1.2, density: 1, iri: 3, rutting: 320 },
  { distance: 500, thickness: 1.5, density: 0.9, iri: 4.2, rutting: 420 }
];

const defaultInfo = {
  density: {
    mainColor: 'black',
    units: 'Плотность, г/см3',
    show: true
  },
  iri: { mainColor: 'blue', units: 'IRI, м/км', show: false },
  rutting: { mainColor: 'teal', units: 'Колейность, мм', show: false },
  thickness: {
    mainColor: 'green',
    units: 'Толщина слоя, мм',
    show: true
  }
};

interface TaskType {
  id: string;
  fetching: boolean;
  error: Error | null;
  formData: Object;
  chartData: Array<DensityChartData>;
}

const initialTask: TaskType = {
  id: uuid.generate(),
  fetching: false,
  error: null,
  formData: { name: 'Test' },
  chartData: []
};

const initialState: {
  taskData: Array<TaskType>;
  currentTaskId: string | null;
  chartInfo: {};
  channelStatus: string;
  serverStatus: string;
} = {
  taskData: [initialTask],
  currentTaskId: null,
  chartInfo: { lines: defaultInfo, max: 10 },
  channelStatus: 'off',
  serverStatus: 'unknown'
};

export default function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case MEASUREMENT.TASK.SAVE:
      const taskData = [...state.taskData];
      const { formData, taskId } = payload;
      const task = taskData.find(({ id }) => id === taskId);

      if (task) {
        task.formData = formData;
        return {
          ...state,
          taskData
        };
      } else {
        return {
          ...state,
          taskData: taskData.concat({
            id: uuid.generate(),
            fetching: false,
            error: null,
            formData,
            chartData: []
          })
        };
      }
    case MEASUREMENT.TASK.REMOVE:
      return {
        ...state,
        taskData: state.taskData.filter(({ id }) => id !== payload.taskId)
      };
    case MEASUREMENT.TASK.SET_CURRENT:
      return { ...state, currentTaskId: payload.taskId };
    case MEASUREMENT.SERVER.ADD_MEASUREMENT:
      const newData = [...state.taskData];
      const current = newData.find(({ id }) => id === state.currentTaskId);
      if (current) {
        current.chartData = current.chartData.concat(payload);
        return { ...state, taskData: newData };
      } else {
        return state;
      }
    case MEASUREMENT.CHART.CHANGE_VISIBILITY:
      const newInfo = JSON.parse(JSON.stringify(state.chartInfo));
      newInfo.lines[payload.name].show = payload.show;
      return { ...state, chartInfo: newInfo };
    case MEASUREMENT.CHART.SET_BREAKPOINT:
      const nInfo = JSON.parse(JSON.stringify(state.chartInfo));
      nInfo.lines[payload.name].breakpoint = payload.breakpoint;
      return { ...state, chartInfo: nInfo };
    case MEASUREMENT.CHART.SET_MAX:
      const netInfo = JSON.parse(JSON.stringify(state.chartInfo));
      netInfo.max = parseInt(payload);
      return { ...state, chartInfo: netInfo };
    case MEASUREMENT.SERVER.CHANNEL_ON:
      return { ...state, channelStatus: 'on' };
    case MEASUREMENT.SERVER.CHANNEL_OFF:
      return { ...state, channelStatus: 'off', serverStatus: 'unknown' };
    case MEASUREMENT.SERVER.SERVER_OFF:
      return { ...state, serverStatus: 'off' };
    case MEASUREMENT.SERVER.SERVER_ON:
      return { ...state, serverStatus: 'on' };
    default:
      return state;
  }
}
