import { request } from '@shared/utils';
import { MEASUREMENTS } from '../actions';

export default request({
  url: '/api/job',
  apiAction: MEASUREMENTS.GET_JOB,
  method: 'get'
});
