import { request } from '@shared/utils';
import { DATA } from '../actions';

export default request({
  url: '/api/task',
  apiAction: DATA.GET_TASK,
  method: 'get'
});
