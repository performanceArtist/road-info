import { request } from '@shared/utils';
import { MEASUREMENTS } from '../actions';

export default request({
  url: '/api/task',
  apiAction: MEASUREMENTS.GET_TASK,
  method: 'get'
});
