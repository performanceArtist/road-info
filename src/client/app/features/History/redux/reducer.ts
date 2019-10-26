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
    condor: '',
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
      const tasks = payload.map(({ id }) => ({ taskId: id, data: {} }));
      return R.merge(state, { measurements: tasks, tasks: payload });
    }
    case HISTORY.GET_MEASUREMENTS.REQUEST:
      return R.assoc('fetching', true, state);
    case HISTORY.GET_MEASUREMENTS.SUCCESS: {
      const transform = R.when(
        measurement => measurement.taskId === payload.taskId,
        R.always(payload)
      );

      return R.evolve(
        {
          measurements: R.map(transform),
          fetching: R.F
        },
        state
      );
    }
    case HISTORY.SET_START_DATE:
      return R.assocPath(['filters', 'startDate'], payload, state);
    case HISTORY.SET_END_DATE:
      return R.assocPath(['filters', 'endDate'], payload, state);
    case HISTORY.SET_CONDOR:
      return R.assocPath(['filters', 'condor'], payload, state);
    default:
      return state;
  }
}
