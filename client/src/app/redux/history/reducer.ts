import { HISTORY } from './actions';

import { History } from './types';

const today = new Date();
const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

const initialState: History = {
  tasks: [],
  measurements: [],
  filters: {
    kondor: 1,
    startDate: yesterday,
    endDate: today
  }
};

export default function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case HISTORY.GET.SUCCESS:
      return {
        ...state
      };
    case HISTORY.SET_START_DATE:
      return {
        ...state,
        filters: {
          ...state.filters,
          startDate: payload
        }
      };
    case HISTORY.SET_END_DATE:
      return {
        ...state,
        filters: {
          ...state.filters,
          endDate: payload
        }
      };
    case HISTORY.SET_KONDOR:
      return {
        ...state,
        filters: {
          ...state.filters,
          kondor: payload
        }
      };
    default:
      return state;
  }
}
