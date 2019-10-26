import { request } from '@shared/utils';

import { NEWTASK } from '../actions';

export default request({
  url: 'api/route',
  apiAction: NEWTASK.GET_ROUTE,
  method: 'get'
});
