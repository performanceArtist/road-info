import { Middleware } from 'redux';

import { RootState } from '@redux/reducer';
import { DatabaseMeasurement, DatabaseJob } from '@shared/types';
import { getTask, getJob, MEASUREMENTS } from '@redux/measurements/actions';

const fetchMiddleware: Middleware = store => next => action => {
  if (action.type === MEASUREMENTS.ADD_MEASUREMENT) {
    const { measurements }: RootState = store.getState();
    const measurement = action.payload as DatabaseMeasurement;

    if (!measurements.measurements[measurement.order_job_id]) {
      store.dispatch(getJob(measurement.order_job_id));
    }
  }

  if (action.type === MEASUREMENTS.GET_JOB.SUCCESS) {
    const {
      measurements: { tasks }
    }: RootState = store.getState();
    const job = action.payload as DatabaseJob;

    if (!tasks.find(task => task.id === job.order_id)) {
      store.dispatch(getTask(job.order_id));
    }
  }

  next(action);
};

export default fetchMiddleware;
