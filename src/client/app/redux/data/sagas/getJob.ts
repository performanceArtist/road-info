import { request } from '@shared/utils';
import { DATA } from '../actions';

export default request({
  url: '/api/job',
  apiAction: DATA.GET_JOB,
  method: 'get'
});
