import { SERVER, GET } from './actions';
import { TaskDataItem, TaskData } from './types';

import testData from './testData';

const initialTask: TaskDataItem = {
  id: '1',
  measurements: testData,
  info: {
    start: 0,
    finish: 2000,
    lane: 1,
    lanesCount: 4,
    description: null,
    kondor: '0',
    partName: 'от ул. Нахимова до ул. Учебной',
    roadName: 'пр. Ленина',
    city: 'г. Томск',
    region: 'Томская область'
  }
};

const initialState: {
  tasks: TaskData;
  channelStatus: 'on' | 'off';
  serverStatus: 'unknown' | 'on' | 'off';
} = {
  tasks: [initialTask],
  channelStatus: 'off',
  serverStatus: 'unknown'
};

export default function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case SERVER.ADD_MEASUREMENT: {
      const tasks = [...state.tasks];
      const current = tasks.find(({ id }) => id === payload.id);
      if (current) {
        current.measurements = current.measurements.concat(payload.measurement);
        return { ...state, tasks };
      } else {
        return {
          ...state,
          tasks: tasks.concat({
            id: payload.id,
            info: {},
            measurements: [payload.measurement]
          })
        };
      }
    }
    case SERVER.INIT_MEASUREMENT: {
      const { id, ...info } = payload;
      return {
        ...state,
        tasks: state.tasks.concat({
          id: id.toString(),
          info,
          measurements: []
        })
      };
    }
    case SERVER.CHANNEL_ON:
      return { ...state, channelStatus: 'on' };
    case SERVER.CHANNEL_OFF:
      return { ...state, channelStatus: 'off', serverStatus: 'unknown' };
    case SERVER.SERVER_OFF:
      return { ...state, serverStatus: 'off' };
    case SERVER.SERVER_ON:
      return { ...state, serverStatus: 'on' };
    case GET.KONDOR.SUCCESS:
      console.log('Generation was successful');
      return state;
    case GET.KONDOR.FAILURE:
      console.log('Generation has failed');
      return state;
    default:
      return state;
  }
}
