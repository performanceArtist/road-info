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

const defaultInfo = [
  {
    name: 'density',
    mainColor: 'black',
    units: 'Плотность, г/см3'
  },
  { name: 'iri', mainColor: 'blue', units: 'IRI, м/км' },
  { name: 'rutting', mainColor: 'teal', units: 'Колейность, мм' },
  {
    name: 'thickness',
    mainColor: 'wheat',
    units: 'Толщина слоя, мм'
  }
];

const fakeState: TaskType = {
  fetching: false,
  error: null,
  formData: { test: 'Name' },
  chartData: fakeData
};

interface TaskType {
  fetching: boolean;
  error: Error | null;
  formData: Object;
  chartData: Array<DensityChartData>;
}

const initialState: {
  taskData: Array<TaskType>;
  currentTask: number | null;
  chartInfo: Array<DensityChartInfo>;
  channelStatus: string;
  serverStatus: string;
} = {
  taskData: [
    { fetching: false, error: null, formData: { name: 'Test' }, chartData: [] }
  ],
  currentTask: 0,
  chartInfo: defaultInfo,
  channelStatus: 'off',
  serverStatus: 'unknown'
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case MEASUREMENT.TASK.SAVE:
      const { formData, index } = payload;
      const taskData = [...state.taskData];

      if (taskData[index]) {
        taskData[index].formData = formData;
        return {
          ...state,
          taskData
        };
      } else {
        return {
          ...state,
          taskData: taskData.concat({
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
        taskData: state.taskData.filter((el, i) => i !== payload.index)
      };
    case MEASUREMENT.TASK.SET_CURRENT:
      return { ...state, currentTask: payload.index };
    case MEASUREMENT.SERVER.ADD_MEASUREMENT:
      const newData = [...state.taskData];
      const current = newData[state.currentTask];
      if (current) {
        current.chartData = current.chartData.concat(payload);
        return { ...state, taskData: newData };
      } else {
        return { ...state };
      }
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
