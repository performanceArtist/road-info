import * as R from 'ramda';

import { HISTORY } from './actions';

import { History } from './types';

const today = new Date();
const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

const initialState: History = {
  tasks: [],
  measurements: [],
  fetching: true,
  filters: {
    kondor: '',
    startDate: yesterday,
    endDate: today
  }
};

export default function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case HISTORY.GET_ORDERS.SUCCESS: {
      const { orders } = payload;

      console.log(orders);
      /*
      return {
        ...state,
        tasks: orders,
        instances,
        measurements: R.map(transform, orders)
      };*/
      return state;
    }
    case HISTORY.GET_MEASUREMENTS.REQUEST:
      return R.assoc('fetching', true, state);
    case HISTORY.GET_MEASUREMENTS.SUCCESS: {
      const transform = R.assocPath(['data', payload.instanceId], payload.data);
      const measurements = R.map(
        R.when(R.propEq('taskId', payload.taskId), transform),
        state.measurements
      );

      return {
        ...state,
        fetching: false,
        measurements
      };
    }
    case HISTORY.SET_START_DATE:
      return R.assocPath(['filters', 'startDate'], payload, state);
    case HISTORY.SET_END_DATE:
      return R.assocPath(['filters', 'endDate'], payload, state);
    case HISTORY.SET_KONDOR:
      return R.assocPath(['filters', 'kondor'], payload, state);
    default:
      return state;
  }
}
