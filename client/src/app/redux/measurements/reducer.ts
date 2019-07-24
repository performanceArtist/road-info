import { CHART, SERVER, GET } from './actions';
import { KondorDataItem, KondorData, ChartInfo } from './types';

import testData from '../../views/Measurements/testData';

const chartSettings = {
  density: {
    mainColor: 'black',
    units: 'Плотность, г/см3',
    show: true,
    breakpoint: { start: 0, finish: 3 }
  },
  iri: { mainColor: 'blue', units: 'IRI, м/км', show: true },
  rutting: { mainColor: 'teal', units: 'Колейность, мм', show: true },
  thickness: {
    mainColor: 'green',
    units: 'Толщина слоя, мм',
    show: true
  }
};

const initialKondor: KondorDataItem = {
  id: '1',
  measurements: testData
};

const initialState: {
  kondors: KondorData;
  chartInfo: ChartInfo;
  channelStatus: 'on' | 'off';
  serverStatus: 'unknown' | 'on' | 'off';
} = {
  kondors: [initialKondor],
  chartInfo: {
    lines: chartSettings,
    maxTicks: 10,
    xAxis: {
      units: 'Дистанция, м'
    }
  },
  channelStatus: 'off',
  serverStatus: 'unknown'
};

export default function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case CHART.CHANGE_VISIBILITY: {
      const chartInfo = JSON.parse(JSON.stringify(state.chartInfo));
      chartInfo.lines[payload.name].show = payload.show;
      return { ...state, chartInfo };
    }
    case CHART.SAVE_SETTINGS: {
      const chartInfo = JSON.parse(JSON.stringify(state.chartInfo));
      chartInfo.lines = payload.lines;
      chartInfo.maxTicks = payload.maxTicks;
      return { ...state, chartInfo };
    }
    case SERVER.ADD_MEASUREMENT: {
      const kondors = [...state.kondors];
      const current = kondors.find(({ id }) => id === payload.id);
      if (current) {
        current.measurements = current.measurements.concat(payload.measurement);
        return { ...state, kondors };
      } else {
        return {
          ...state,
          kondors: kondors.concat({
            id: payload.id,
            measurements: [payload.measurement]
          })
        };
      }
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
      console.log('yeah');
      return state;
    case GET.KONDOR.FAILURE:
      console.log('fail');
      return state;
    default:
      return state;
  }
}
