import { Middleware } from 'redux';

import { RootState } from '@redux/reducer';
import { ServerMeasurement, DatabaseJob } from '@shared/types';
import { getTask, getJob, DATA } from '@root/client/app/redux/data/actions';

const fetchMiddleware: Middleware = store => next => action => {
  if (action.type === DATA.ADD_MEASUREMENT) {
    const { data }: RootState = store.getState();
    const measurement = action.payload as ServerMeasurement;

    if (!data.measurements[measurement.order_job_id]) {
      store.dispatch(getJob(measurement.order_job_id));
    }
  }

  if (action.type === DATA.GET_JOB.SUCCESS) {
    const {
      data: { tasks }
    }: RootState = store.getState();
    const job = action.payload as DatabaseJob;

    if (!tasks.find(task => task.id === job.order_id)) {
      store.dispatch(getTask(job.order_id));
    }
  }

  next(action);
};

export default fetchMiddleware;
