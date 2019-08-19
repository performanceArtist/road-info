import { CHART } from './actions';

const chartSettings = {
  density: {
    mainColor: 'black',
    name: 'Плотность',
    units: 'г/см3',
    show: true,
    breakpoint: { start: 0, finish: 3 }
  },
  iri: { mainColor: 'blue', name: 'IRI', units: 'м/км', show: true },
  rutting: { mainColor: 'teal', name: 'Колейность', units: 'мм', show: true },
  thickness: {
    mainColor: 'green',
    name: 'Толщина',
    units: 'мм',
    show: true,
    breakpoint: { start: 0, finish: 1 }
  }
};

const initialState = {
  lines: chartSettings,
  maxTicks: 10,
  xAxis: {
    key: 'distance',
    name: 'Дистанция',
    units: 'м'
  }
};

export default function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case CHART.CHANGE_VISIBILITY: {
      const newLines = JSON.parse(JSON.stringify(state.lines));
      newLines.lines[payload.name].show = payload.show;
      return { ...state, lines: newLines };
    }
    case CHART.SAVE_SETTINGS: {
      const { lines, maxTicks } = payload;
      return { ...state, lines, maxTicks };
    }
    default:
      return state;
  }
}
