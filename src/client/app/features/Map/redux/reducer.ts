import * as R from 'ramda';

import { MAP } from './actions';

import { MapData } from './types';

const today = new Date();
const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

const initialState: MapData = {
  mode: 'realTime',
  history: {
    fetching: false,
    startDate: yesterday,
    endDate: today
  },
  historyMeasurements: [],
  testTrack: []
};

export default function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case MAP.SET_MODE:
      return { ...state, mode: payload };
    case MAP.SET_START_DATE:
      return R.assocPath(['history', 'startDate'], payload, state);
    case MAP.SET_END_DATE:
      return R.assocPath(['history', 'endDate'], payload, state);
    case MAP.GET_HISTORY.SUCCESS:
      return {
        ...state,
        historyMeasurements: payload
      };
    case MAP.GET_TRACK.SUCCESS:
      return {
        ...state,
        testTrack: payload
      };
    default:
      return state;
  }
}
