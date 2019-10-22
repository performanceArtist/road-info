import { request } from '@shared/utils';

import { TASK } from '../actions';

export default request({
  url: '/api/task',
  apiAction: TASK.POST,
  method: 'post'
});
