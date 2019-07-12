import uuid from 'short-uuid';

import { TASK, CHART, SERVER } from './actions';
import { TaskType, InfoType } from './types';

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
  chartInfo: {
    lines: {
      [key: string]: InfoType;
    };
    maxTicks: number;
  };
  channelStatus: 'on' | 'off';
  serverStatus: 'unknown' | 'on' | 'off';
} = {
  taskData: [initialTask],
  currentTaskId: null,
  chartInfo: { lines: defaultInfo, maxTicks: 10 },
  channelStatus: 'off',
  serverStatus: 'unknown'
};

export default function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case TASK.SAVE: {
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
    }
    case TASK.REMOVE:
      return {
        ...state,
        taskData: state.taskData.filter(({ id }) => id !== payload.taskId)
      };
    case TASK.SET_CURRENT:
      return { ...state, currentTaskId: payload.taskId };
    case SERVER.ADD_MEASUREMENT: {
      const taskData = [...state.taskData];
      const current = taskData.find(({ id }) => id === state.currentTaskId);
      if (current) {
        current.chartData = current.chartData.concat(payload);
        return { ...state, taskData };
      } else {
        return state;
      }
    }
    case CHART.CHANGE_VISIBILITY: {
      const chartInfo = JSON.parse(JSON.stringify(state.chartInfo));
      chartInfo.lines[payload.name].show = payload.show;
      return { ...state, chartInfo };
    }
    case CHART.SET_BREAKPOINT: {
      const chartInfo = JSON.parse(JSON.stringify(state.chartInfo));
      chartInfo.lines[payload.name].breakpoint = payload.breakpoint;
      return { ...state, chartInfo: chartInfo };
    }
    case CHART.SET_MAX_TICKS: {
      const chartInfo = JSON.parse(JSON.stringify(state.chartInfo));
      chartInfo.maxTicks = payload;
      return { ...state, chartInfo };
    }
    case SERVER.CHANNEL_ON:
      return { ...state, channelStatus: 'on' };
    case SERVER.CHANNEL_OFF:
      return { ...state, channelStatus: 'off', serverStatus: 'unknown' };
    case SERVER.SERVER_OFF:
      return { ...state, serverStatus: 'off' };
    case SERVER.SERVER_ON:
      return { ...state, serverStatus: 'on' };
    default:
      return state;
  }
}
