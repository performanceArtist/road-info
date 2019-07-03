import { MEASUREMENT } from './actions';

import { Measurement } from '@views/Measurements/DensityChart/DensityChart';

interface DataType {
  fetching: boolean;
  error: Error | null;
  formData: Object;
  data: Array<Measurement>;
}

const initialState: { taskData: Array<DataType> } = {
  taskData: []
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case MEASUREMENT.TASK.SAVE:
      const { formData, index } = payload;
      const taskData = [...state.taskData];

      if (taskData[index]) {
        taskData[index].formData = formData;
        return {
          taskData
        };
      } else {
        return {
          taskData: taskData.concat({
            fetching: false,
            error: null,
            formData,
            data: []
          })
        };
      }
    case MEASUREMENT.TASK.REMOVE:
      return {
        taskData: state.taskData.filter((el, i) => i !== payload.index)
      };
    default:
      return state;
  }
}
