import { request } from '@shared/utils';

import { NEWTASK } from '../actions';

export default request({
  url: '/api/task/create',
  apiAction: NEWTASK.POST,
  method: 'post'
});
