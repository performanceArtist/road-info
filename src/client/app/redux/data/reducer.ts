import { DATA } from './actions';
import { ServerMeasurement, DatabaseJob, ServerTask } from '@shared/types';

type InitialState = {
  measurements: {
    [jobId: number]: ServerMeasurement[];
  };
  jobs: DatabaseJob[];
  tasks: ServerTask[];
};

const initialState: InitialState = {
  measurements: {},
  jobs: [],
  tasks: []
};

export default function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case DATA.ADD_MEASUREMENT: {
      const measurement = payload as ServerMeasurement;
      const job = state.measurements[measurement.order_job_id];

      return {
        ...state,
        measurements: {
          ...state.measurements,
          [payload.order_job_id]: job ? job.concat(payload) : [payload]
        }
      };
    }
    case DATA.GET_JOB.SUCCESS:
      return { ...state, jobs: state.jobs.concat(payload) };
    case DATA.GET_TASK.SUCCESS:
      return { ...state, tasks: state.tasks.concat(payload) };
    default:
      return state;
  }
}
