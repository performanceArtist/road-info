import { HISTORY } from './actions';

import { History } from './types';

const today = new Date();
const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

const initialState: History = {
  tasks: [],
  instances: [],
  measurements: [],
  filters: {
    kondor: null,
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
        ...state,
        tasks: payload.orders,
        instances: payload.instances,
        measurements: payload.orders.map(({ id }) => ({
          taskId: id,
          data: payload.instances
            .filter(({ order_id }) => order_id === id)
            .reduce((acc, { id }) => {
              acc[id] = [];
              return acc;
            }, {})
        }))
      };
    case HISTORY.GET_MEASUREMENTS.SUCCESS: {
      const newMeasurements = JSON.parse(JSON.stringify(state.measurements));

      const current = newMeasurements.find(
        ({ taskId }) => taskId === payload.taskId
      );
      current.data[payload.instanceId] = payload.data;

      return {
        ...state,
        measurements: newMeasurements
      };
    }
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
